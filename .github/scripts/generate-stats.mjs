// Renders assets/stats.svg from live GitHub data.
//
// The SVG is committed to this repo, so the README never depends on a
// third-party image host staying up. Refreshed by .github/workflows/stats.yml.
//
// Runs with or without a token; GITHUB_TOKEN only raises the rate limit.

import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const USER = process.env.STATS_USER || "nipunrautela";
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = resolve(ROOT, "assets/stats.svg");

const LANG_COUNT = 8;
const PALETTE = [
  "#3DDC97", // mint
  "#4CC9F0", // cyan
  "#A78BFA", // violet
  "#FFB703", // amber
  "#FF7A6B", // coral
  "#5EEAD4", // teal
  "#F472B6", // pink
  "#8B98A6", // slate
];

// Languages that inflate a byte-count breakdown without saying anything
// about what was actually written.
const LANG_IGNORE = new Set([
  "HTML",
  "CSS",
  "SCSS",
  "Makefile",
  "Dockerfile",
  "Batchfile",
  "Roff",
  "TeX",
]);

const api = async (path, { search = false } = {}) => {
  const headers = {
    accept: "application/vnd.github+json",
    "user-agent": `${USER}-profile-stats`,
  };
  if (process.env.GITHUB_TOKEN) {
    headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  for (let attempt = 1; attempt <= 4; attempt++) {
    const res = await fetch(`https://api.github.com${path}`, { headers });
    if (res.ok) return res.json();

    // Secondary rate limits on the search endpoints are common and transient.
    const retryable = res.status === 403 || res.status === 429 || res.status >= 500;
    if (!retryable || attempt === 4) {
      throw new Error(`GET ${path} -> ${res.status} ${await res.text()}`);
    }
    const wait = Number(res.headers.get("retry-after") || 0) * 1000 || attempt * 4000;
    await new Promise((r) => setTimeout(r, wait + (search ? 2000 : 0)));
  }
};

const searchCount = async (q) => {
  const { total_count } = await api(`/search/issues?q=${encodeURIComponent(q)}&per_page=1`);
  return total_count;
};

async function collect() {
  const user = await api(`/users/${USER}`);

  const repos = [];
  for (let page = 1; ; page++) {
    const batch = await api(`/users/${USER}/repos?per_page=100&type=owner&page=${page}`);
    repos.push(...batch);
    if (batch.length < 100) break;
  }
  const owned = repos.filter((r) => !r.fork && !r.archived);

  const bytes = new Map();
  for (const repo of owned) {
    const langs = await api(`/repos/${USER}/${repo.name}/languages`);
    for (const [name, size] of Object.entries(langs)) {
      if (LANG_IGNORE.has(name)) continue;
      bytes.set(name, (bytes.get(name) || 0) + size);
    }
  }

  const { total_count: commits } = await api(
    `/search/commits?q=${encodeURIComponent(`author:${USER}`)}&per_page=1`,
    { search: true },
  );

  const languages = [...bytes.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, LANG_COUNT);
  const total = languages.reduce((sum, [, size]) => sum + size, 0) || 1;

  return {
    stars: owned.reduce((sum, r) => sum + r.stargazers_count, 0),
    repos: user.public_repos,
    followers: user.followers,
    since: user.created_at.slice(0, 4),
    commits,
    prs: await searchCount(`author:${USER} type:pr`),
    issues: await searchCount(`author:${USER} type:issue`),
    languages: languages.map(([name, size], i) => ({
      name,
      share: (size / total) * 100,
      color: PALETTE[i % PALETTE.length],
    })),
  };
}

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const fmt = (n) => (n >= 10000 ? `${(n / 1000).toFixed(1)}k` : String(n));

function render(d) {
  const updated = new Date().toISOString().slice(0, 10);

  // Everything here is drawn from public activity only, so the labels say so.
  const tiles = [
    { label: "PUBLIC COMMITS", value: fmt(d.commits), color: "#3DDC97" },
    { label: "STARS EARNED", value: fmt(d.stars), color: "#4CC9F0" },
    { label: "PULL REQUESTS", value: fmt(d.prs), color: "#3DDC97" },
    { label: "PUBLIC REPOS", value: fmt(d.repos), color: "#4CC9F0" },
    { label: "FOLLOWERS", value: fmt(d.followers), color: "#3DDC97" },
    { label: "ON GITHUB SINCE", value: d.since, color: "#4CC9F0" },
  ];

  const tileSvg = tiles
    .map((t, i) => {
      const x = 24 + (i % 3) * 192;
      const y = 92 + Math.floor(i / 3) * 98;
      return `      <g transform="translate(${x},${y})">
        <rect class="tile" width="180" height="86" rx="10"/>
        <text class="mono lbl" x="18" y="30">${t.label}</text>
        <text class="sans val" x="18" y="66" fill="${t.color}">${t.value}</text>
      </g>`;
    })
    .join("\n");

  let cursor = 612;
  const bar = d.languages
    .map((l) => {
      const w = Math.max((l.share / 100) * 564, 2);
      const seg = `      <rect x="${cursor.toFixed(1)}" y="126" width="${w.toFixed(1)}" height="14" fill="${l.color}"/>`;
      cursor += w;
      return seg;
    })
    .join("\n");

  const legend = d.languages
    .map((l, i) => {
      const x = 612 + (i % 2) * 288;
      const y = 182 + Math.floor(i / 2) * 30;
      return `      <g transform="translate(${x},${y})">
        <circle cx="5" cy="-4" r="5" fill="${l.color}"/>
        <text class="sans lang" x="20" y="0">${esc(l.name)}</text>
        <text class="mono pct" x="264" y="0" text-anchor="end">${l.share.toFixed(1)}%</text>
      </g>`;
    })
    .join("\n");

  const label = `GitHub stats for ${USER}: ${tiles
    .map((t) => `${t.value} ${t.label.toLowerCase()}`)
    .join(", ")}. Top languages: ${d.languages
    .map((l) => `${l.name} ${l.share.toFixed(1)} percent`)
    .join(", ")}.`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 300" width="1200" height="300" role="img" aria-label="${esc(label)}">
  <title>GitHub stats</title>

  <defs>
    <linearGradient id="statsCarbon" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"   stop-color="#0B0F14"/>
      <stop offset="100%" stop-color="#0F151D"/>
    </linearGradient>
    <clipPath id="statsFrame"><rect width="1200" height="300" rx="14"/></clipPath>
    <clipPath id="barClip"><rect x="612" y="126" width="564" height="14" rx="7"/></clipPath>
    <style>
      .sans { font-family: "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif; }
      .mono { font-family: "SF Mono", "Cascadia Mono", Consolas, "Liberation Mono", monospace; }
      .tile { fill: #121A23; stroke: #8B98A6; stroke-opacity: 0.14; }
      .lbl  { font-size: 11px; letter-spacing: 2px; fill: #8B98A6; }
      .val  { font-size: 30px; font-weight: 800; }
      .lang { font-size: 14.5px; fill: #C7D0DA; }
      .pct  { font-size: 12.5px; fill: #8B98A6; }
    </style>
  </defs>

  <g clip-path="url(#statsFrame)">
    <rect width="1200" height="300" fill="url(#statsCarbon)"/>

    <rect x="24" y="30" width="4" height="26" rx="2" fill="#3DDC97"/>
    <text class="sans" x="40" y="51" font-size="20" font-weight="700" fill="#FFFFFF">Stats</text>
    <text class="mono" x="1176" y="50" text-anchor="end" font-size="11.5" letter-spacing="2" fill="#6B7684">UPDATED ${updated}</text>
    <rect x="24" y="68" width="1152" height="1" fill="#8B98A6" fill-opacity="0.14"/>

${tileSvg}

    <text class="mono lbl" x="612" y="110">TOP LANGUAGES</text>
    <g clip-path="url(#barClip)">
${bar}
    </g>

${legend}
  </g>
</svg>
`;
}

const data = await collect();
await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, render(data), "utf8");
console.log(`wrote ${OUT}`);
console.log(JSON.stringify({ ...data, languages: data.languages.map((l) => l.name) }, null, 2));
