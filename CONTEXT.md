# Project Context & Agent Guidelines

This is the shared reference for current and future contributors. Keep project facts accurate,
general, and based on the repository. Update this document when durable architecture or conventions
change; do not use it as a task log.

## Project purpose and audience

Everybody Codes Solver is a lightweight project started by ak for the TLV team. Its stated goal is
to help the team solve Everybody Codes problems that are "out of date"—older than five days.
The current site provides a manually maintained challenge index and a reusable three-part
challenge input/output page. EC2601 has local JavaScript solvers for all three parts; no backend is
used.

The intended audience is the TLV team working on Everybody Codes challenges. Do not assume
additional users, workflows, supported challenge parts, or product features without repository
evidence or direction from the project owner.

## Technology and architecture

- **Languages:** HTML and CSS, with vanilla JavaScript solvers in `solvers/EC2601/`.
- **Frameworks and dependencies:** None. There is no package manifest, framework, or dependency
  installation step.
- **Architecture:** Static, multi-page frontend. `index.html`, `EC2601.html`, and `template.html`
  share `style.css`. `EC2601.html` loads its three solver scripts directly. There is no server-side
  code, API, persistent storage, build system, or configured test suite.
- **Solver integration:** `solvers/EC2601/part1.js`, `part2.js`, and `part3.js` expose
  `window.solveEC2601Part1(input)`, `window.solveEC2601Part2(input)`, and
  `window.solveEC2601Part3(input)`, respectively. Each accepts non-negative integer notes separated
  by commas or whitespace and returns the total required pine cones as a decimal string. Each part
  has independent input, output, loading, and error state in the page.
- **Data handling:** The current static pages do not submit input to a service or save it. A future
  solver integration must document its actual data flow and handle user input safely.

## Project structure

| File | Responsibility |
| --- | --- |
| `index.html` | Manually maintained challenge index; duplicate a `.challenge-card` article and edit its title and description |
| `template.html` | Copy of the EC2601 solution page, with challenge title/description and three independent part forms |
| `EC2601.html` | EC2601-specific page loading the three part solver scripts |
| `solvers/EC2601/part1.js` | Computes added pine cones for filled-square formations |
| `solvers/EC2601/part2.js` | Computes added pine cones for square-frame formations |
| `solvers/EC2601/part3.js` | Computes added pine cones for odd filled squares with an empty center |
| `style.css` | Shared permanent dark theme, palette, typography, responsive layouts, and interaction states for both pages |
| `README.md` | Project overview and local viewing/integration guidance |
| `CONTEXT.md` | Shared project facts and contributor guidelines |

There are no other application directories or source modules at present. Keep the structure
proportionate to this static project; do not add a framework or build tooling without a concrete
need.

## Pages and navigation

- `/` (or `index.html`) is the manually maintained challenge index.
- `EC2601.html` is the specific page for challenge EC2601.
- `template.html` currently mirrors `EC2601.html` and includes its challenge-specific solver links.
- Each `.challenge-card` entry in `index.html` contains a challenge number, title, description,
  and link to the solution workspace. To add an entry, duplicate the `<article class="challenge-card">`
  element and edit its number, title, description, and accessible link label. Entries are static
  HTML, not generated from a data file or API.
- The workspace links back to the challenge index. These are static document links, not application
  routes managed by a router.
- No challenge-specific pages or challenge catalog currently exist.

To customize the solution page, update the challenge heading and description in `EC2601.html`
(and keep `template.html` in sync when it is intended to mirror this page).
The page provides three separate sections with `data-part-panel`, `data-part-form`,
`data-part-input`, `data-part-button`, `data-part-output`, and `data-part-status` hooks. Each form
selects the corresponding `window.solveEC2601PartN` function loaded by a `<script src>` element.
Keep output as text (`textContent`), not injected HTML. HTML comments identify the main
customization and JavaScript integration points. These scripts use `BigInt` so integer totals do
not lose precision.

## Design system

The site uses a permanent dark theme; do not add a light-mode toggle or system-preference override.
Use the established palette consistently against dark navy-tinted surfaces:

| Token | Hex | Intended use |
| --- | --- | --- |
| Deep navy | `#003249` | Brand color and supporting dark surfaces |
| Ocean blue | `#007EA7` | Links, primary actions, and interactive emphasis |
| Light cyan | `#80CED7` | High-contrast text accents, focus indicators, and visual highlights |
| Pale teal | `#9AD1D4` | Supporting accents and subtle states |
| Cool grey | `#CCDBDC` | Borders and dividers, generally softened against dark surfaces |

The base and panel surfaces use dark variations of deep navy; primary text is a light neutral and
secondary text uses muted cool neutrals. Maintain the clean, restrained visual style, fluid
layouts, clear hierarchy, visible focus states, and reduced-motion support. Check contrast when
using palette colors for text; do not rely on color alone to indicate state.

## Coding and accessibility conventions

- Keep the implementation framework-free and use semantic HTML, modern CSS, and vanilla JavaScript
  consistent with the existing pages.
- Use two-space indentation in HTML and CSS. Use clear kebab-case CSS classes and descriptive
  element IDs for script hooks.
- Keep presentation in `style.css` and avoid inline styling. The current solution-page behavior is
  a small page-local script because there is no shared JavaScript module architecture.
- Prefer focused edits and reuse the shared stylesheet. Avoid unnecessary dependencies, duplicate
  styles, fake challenge data, and controls that imply functionality that does not exist.
- Use visible labels, meaningful heading order, keyboard-operable controls, visible keyboard focus,
  adequate touch target sizes, and accessible status announcements for dynamic results/errors.
- Let long user input and output wrap without causing horizontal page overflow. Preserve output
  line breaks. Respect reduced-motion preferences.
- Do not use unsafe HTML injection for user input or solver output.

## Run and verification

There is no install, build, lint, or test command because the project has no package manifest or
configured tooling. To view the site, open `index.html` in a browser. Alternatively, if Python is
installed, run `python -m http.server 8000` from the project directory and visit
`http://localhost:8000`; stop the server with Ctrl+C.

For frontend changes, review both pages and check narrow mobile, tablet, and desktop widths,
keyboard focus, navigation links, input/output wrapping, empty/loading/error states, and browser
console errors when browser tooling is available. Report any checks that could not be run; do not
claim a build or test passed when no such command exists.

## General instructions for agents

1. Treat the current repository as the source of truth. Before editing, inspect relevant files,
   documentation, dependencies, and existing behavior.
2. Reuse the current architecture and conventions. Preserve useful existing content and changes
   made by others; do not discard work outside the task.
3. Do not guess at product requirements, routes, APIs, data models, or functionality. Investigate
   uncertainty and clearly distinguish current behavior from future integration points.
4. Make small, complete, maintainable changes. Avoid unrelated fixes, speculative abstractions, and
   unnecessary tooling or dependencies.
5. Handle errors explicitly, protect user data, and do not expose secrets in code, logs, or docs.
6. Review modified files and verify affected behavior with the checks available in this repository.
   Summarize the changes and accurately report validation results.
