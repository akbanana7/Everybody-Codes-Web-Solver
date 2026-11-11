# Project Context & Agent Guidelines

This is the shared reference for current and future contributors. Keep project facts accurate,
general, and based on the repository. Update this document when durable architecture or conventions
change; do not use it as a task log.

## Project purpose and audience

Everybody Codes Solver is a lightweight project started by ak for the TLV team. Its stated goal is
to help the team solve Everybody Codes problems that are "out of date"—older than five days.
The current site provides a responsive project overview and a reusable challenge input/output
page. It does not currently implement a challenge solver or connect to a backend.

The intended audience is the TLV team working on Everybody Codes challenges. Do not assume
additional users, workflows, supported challenge parts, or product features without repository
evidence or direction from the project owner.

## Technology and architecture

- **Languages:** HTML and CSS, with a small inline vanilla JavaScript integration point in
  `template.html`.
- **Frameworks and dependencies:** None. There is no package manifest, framework, or dependency
  installation step.
- **Architecture:** Static, multi-page frontend. `index.html` and `template.html` are standalone
  documents that share `style.css`. There is no server-side code, API, persistent storage, build
  system, or test suite in the repository.
- **External integrations:** None are currently configured. The solution template optionally calls
  `window.solveChallenge(input, { title, part })` when that function is supplied. The hook must
  return a string or number; the template displays the returned value as text and reports missing
  hooks, invalid return values, and thrown/rejected errors. Do not invent an endpoint or claim that
  solving works until real solution logic is connected.
- **Data handling:** The current static pages do not submit input to a service or save it. A future
  solver integration must document its actual data flow and handle user input safely.

## Project structure

| File | Responsibility |
| --- | --- |
| `index.html` | Homepage, project purpose, navigation, and entry point to the solution workspace |
| `template.html` | Reusable challenge/part title and description, multiline input, Solve action, output, and solver hook |
| `style.css` | Shared palette, typography, layout, responsive behavior, and interaction states for both pages |
| `README.md` | Project overview and local viewing/integration guidance |
| `CONTEXT.md` | Shared project facts and contributor guidelines |

There are no other application directories or source modules at present. Keep the structure
proportionate to this static project; do not add a framework or build tooling without a concrete
need.

## Pages and navigation

- `/` (or `index.html`) is the project homepage.
- `template.html` is the reusable solution workspace.
- The homepage links to the workspace and its own overview sections. The workspace links back to
  the homepage. These are static document links, not application routes managed by a router.
- No challenge-specific pages or challenge catalog currently exist.

To customize the solution page, update the challenge heading, description, and part label in
`template.html`. The Solve form passes the textarea value and those displayed title/part values to
the optional global hook. Keep output as text (`textContent`), not injected HTML.

## Design system

Use the established palette consistently:

| Token | Hex | Intended use |
| --- | --- | --- |
| Deep navy | `#003249` | Primary text, strong contrast, and dark surfaces |
| Ocean blue | `#007EA7` | Links, primary actions, and interactive emphasis |
| Light cyan | `#80CED7` | Highlights and visual accents |
| Pale teal | `#9AD1D4` | Supporting surfaces and accents |
| Cool grey | `#CCDBDC` | Borders, dividers, and subtle surfaces |

White and restrained neutral tints are also used for readable page backgrounds. Maintain the
existing clean, professional visual style, fluid layouts, clear hierarchy, visible focus states,
and reduced-motion support. Check contrast when using palette colors for text; do not rely on color
alone to indicate state.

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
