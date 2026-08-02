<p align="center">
  <img src="assets/header.svg" alt="Nipun Rautela — Software Engineer at Visa, Bangalore. I build software that scales, self-heals, and stays online through change." width="100%">
</p>

<p align="center">
  <a href="https://nipunrautela.me"><img src="https://img.shields.io/badge/Website-nipunrautela.me-3DDC97?style=for-the-badge&labelColor=0B0F14" alt="Website"></a>
  <a href="https://www.linkedin.com/in/nipunrautela/"><img src="https://img.shields.io/badge/LinkedIn-nipunrautela-4CC9F0?style=for-the-badge&logo=linkedin&logoColor=white&labelColor=0B0F14" alt="LinkedIn"></a>
  <a href="https://leetcode.com/u/nipunrautela/"><img src="https://img.shields.io/badge/LeetCode-nipunrautela-FFA116?style=for-the-badge&logo=leetcode&logoColor=white&labelColor=0B0F14" alt="LeetCode"></a>
  <a href="https://stackoverflow.com/users/13910633/nipun"><img src="https://img.shields.io/badge/Stack_Overflow-Nipun-F48024?style=for-the-badge&logo=stackoverflow&logoColor=white&labelColor=0B0F14" alt="Stack Overflow"></a>
  <a href="mailto:rautelanipun@gmail.com"><img src="https://img.shields.io/badge/Email-rautelanipun@gmail.com-8B98A6?style=for-the-badge&logo=gmail&logoColor=white&labelColor=0B0F14" alt="Email"></a>
</p>

---

## `//` Driver profile

Software engineer working on **distributed systems that cannot go down**. Currently at
**Visa**, taking an Ansible automation orchestration platform apart — out of a large
Activiti BPMN and polling-based monolith, into segregated event-driven processors on
custom self-healing active-active Hazelcast queues.

The interesting part is never the new architecture. It is getting there without an
outage: reconstructing the state of every in-flight execution and parking it until the
new processors are ready to pick it up, so the cutover is invisible to everyone using
the platform.

Before that, nearly two years at **Societe Generale Global Solution Centre** moving a
regulated on-premise estate onto Azure and rebuilding the CI/CD and database jobs
underneath it.

```console
$ whoami --verbose
name        Nipun Rautela
role        Software Engineer @ Visa
based       Bangalore, India
focus       Event-driven architecture · Multi-region · Self-healing queues
education   B.Tech CSE, VIT — CGPA 8.99
resume      https://nipunrautela.me/nipunrautela_resume.pdf
```

---

## `//` Track record

<p align="center">
  <img src="assets/telemetry.svg" alt="Track record: nightly batch runtime cut from 5.5h to 3.0h; platform execution overhead down 60%; scheduler trigger lag tightened from ±20s to ±5s with misfires at zero; deployment effort down 80%; blue-green AKS migration 90% automated; code smell down 70%." width="100%">
</p>

---

## `//` Race history

| Season | Team | Seat | What I ran |
| :--- | :--- | :--- | :--- |
| **Oct 2025 —** | **Visa** | Software Engineer | Monolith → event-driven processors on self-healing active-active Hazelcast queues. Zero-downtime cutover via a parking-lot system with full state reconstruction. Token-bucket rate limiter, annotation-enforced and API-overridable. Cross-region dual-DC job scheduler replacing a misfire-prone Quartz setup. |
| **Feb 2024 – Oct 2025** | **Societe Generale GSC** | Software Engineer | On-prem → Azure (AKS, Azure PostgreSQL, DNS, certificates, Key Vault) with automated provisioning. Blue-green AKS migration automated end to end. Docker registry Mirantis → Harbor, artifacts Nexus → JFrog, CI Jenkins → GitHub Actions. Nightly database job 5.5h → 3h. VBA → Python cloud functions at 70% test coverage. |
| **May 2023 – Jul 2023** | **TVS Motor Company** | Data Scientist Intern | Automated 90% of accessories sales and under-performing dealer analysis — cleaning cronjob feeding a Power BI dashboard. Fine-tuned a YOLOv8 accessory recognition model, +3% accuracy. |
| **Apr 2023 – Jun 2023** | **Inxtinct Security** | Full Stack Developer | Email security browser plugin doing intent and threat analysis with prompt-engineered GPT-4 calls. Ported vanilla JS → React + TypeScript + Webpack, cutting subsequent dev time by 40%+. |

---

## `//` The garage

<p align="center">
  <img src="https://skillicons.dev/icons?i=java,python,cpp,ts,js,bash,spring,fastapi,express,react,angular,astro&theme=dark" alt="Java, Python, C++, TypeScript, JavaScript, Bash, Spring Boot, FastAPI, Express, React, Angular, Astro">
  <br>
  <img src="https://skillicons.dev/icons?i=azure,kubernetes,docker,ansible,postgres,mysql,grafana,jenkins,githubactions,maven,git,linux&theme=dark" alt="Azure, Kubernetes, Docker, Ansible, PostgreSQL, MySQL, Grafana, Jenkins, GitHub Actions, Maven, Git, Linux">
</p>

| Bay | Kit |
| :--- | :--- |
| **Languages** | Java · Python · C++ · TypeScript · JavaScript · SQL · Bash |
| **Frameworks** | Spring Boot · FastAPI · Express.js · React · Angular · Activiti BPMN · Quartz · Astro |
| **Distributed systems** | Event-driven architecture · Active-active · Multi-region · Self-healing queues · Rate limiting · Job scheduling |
| **Cloud & infra** | Azure · AKS · Azure Key Vault · Kubernetes · Docker · Ansible (AWX) · Harbor |
| **Data & caching** | PostgreSQL · MySQL · ClickHouse · Hazelcast · Ehcache · Power BI |
| **Build, test & observability** | Git · Maven · Jenkins · GitHub Actions · JFrog · JUnit 5 · Grafana · uv · Linux |
| **AI engineering** | Model Context Protocol · LLM SDKs · A2A |

---

## `//` Starting grid

| Project | What it is | Built with |
| :--- | :--- | :--- |
| **[KoDS Bot](https://github.com/nipunrautela/KoDS-Bot)** | Discord bot running an RPG-style guild of 300+ members — profiles, inventory, reputation, moderation. Item transfers are atomic: the read-modify-write lives in a single database operation, so two simultaneous trades can never duplicate an item. | Python · discord.py · MongoDB |
| **[Graph Visualizer](https://github.com/nipunrautela/graph-visualizer)** | Watches traversal and pathfinding algorithms run step by step. Each algorithm is a generator yielding state after every meaningful operation; the renderer just draws whatever state is current. | Python · Algorithms |
| **[What's On My Plate](https://github.com/nipunrautela/whatsonmyplate)** | Turns whatever is left in your fridge into things you can actually cook. Ranking weights matches by how central each missing ingredient is — "almost makeable" beats "exactly makeable" when the gap is salt, not saffron. | JavaScript · REST API |
| **[Sparks Bank](https://github.com/nipunrautela/sparks-bank)** | Banking front-end with account management, transfers and a ledger. Append-only: a corrected transaction produces a reversing entry rather than editing history. | JavaScript · Bootstrap |
| **[Weather App](https://github.com/nipunrautela/weatherappflutter)** | Location-aware forecasts in a layout that adapts to conditions — the palette shifts so a storm and a clear afternoon don't look identical at a glance. | Flutter · Dart · REST API |
| **[nipunrautela.me](https://github.com/nipunrautela/nipunrautela.github.io)** | This portfolio — content-collection driven, statically built, deployed on GitHub Actions. | Astro · TypeScript |

Also in the pit lane: **[solution-shed](https://github.com/nipunrautela/solution-shed)** (Java idea-submission platform),
**[dsa](https://github.com/nipunrautela/dsa)** and **[tle-eliminator-cp31](https://github.com/nipunrautela/tle-eliminator-cp31)** (C++ practice, ongoing).

---

## `//` Telemetry

<p align="center">
  <img height="165" src="https://github-readme-stats.vercel.app/api?username=nipunrautela&show_icons=true&hide_border=true&bg_color=0B0F14&title_color=3DDC97&text_color=9BA6B2&icon_color=4CC9F0&include_all_commits=true&count_private=true" alt="Nipun Rautela's GitHub stats">
  <img height="165" src="https://github-readme-stats.vercel.app/api/top-langs/?username=nipunrautela&layout=compact&hide_border=true&bg_color=0B0F14&title_color=3DDC97&text_color=9BA6B2&langs_count=8" alt="Most used languages">
</p>

---

## `//` From the notebook

- **[Cutting a nightly job from 5.5 hours to 3](https://nipunrautela.me/blog/parallelizing-a-nightly-database-job/)** — what I learned parallelizing a pl/pgsql and C-shell batch pipeline that had quietly grown past its window.
- **[/now](https://nipunrautela.me/now/)** — what has my attention at the moment.
- **[/uses](https://nipunrautela.me/uses/)** — the tools I actually reach for.

---

## `//` Pit wall

I'm happy where I am, but the door stays open. If you're working on genuinely distributed
problems — the kind where failure modes matter more than benchmarks — I'm glad to talk.

<p align="center">
  <a href="mailto:rautelanipun@gmail.com"><img src="https://img.shields.io/badge/Say_hello-rautelanipun@gmail.com-3DDC97?style=for-the-badge&labelColor=0B0F14" alt="Email Nipun"></a>
  <a href="https://nipunrautela.me/nipunrautela_resume.pdf"><img src="https://img.shields.io/badge/Resume-PDF-4CC9F0?style=for-the-badge&labelColor=0B0F14" alt="Resume PDF"></a>
</p>

<p align="center">
  <sub><code>// built to stay online through change</code></sub>
</p>
