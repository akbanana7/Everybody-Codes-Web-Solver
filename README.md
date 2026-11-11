# Everybody Codes Solver

A lightweight, permanently dark static challenge index and reusable solution workspace for the TLV
team's Everybody Codes challenges that are out of date (older than five days).

## Maintain the challenge index

The homepage is `index.html`. Each challenge is a self-contained
`<article class="challenge-card">` block containing its number, title, description, and workspace
link. Duplicate that article to add an entry, then edit its number, text, and accessible link label.
The entries are static HTML; there is no challenge database or API.

## Run locally

Open `index.html` in a browser, or serve this folder locally with Python:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000`. No dependencies, install step, build, or test command are
currently configured.

## Deployed site

Viewable at: [Everybody Codes Solver](https://everybody-codes-web-solver.akbanana70-afb.workers.dev)

## Solution page and integration

`template.html` is a reusable challenge/part page. Update its heading, description, and part label
for a challenge. The page includes a multiline input, Solve button, output display, and loading/error
feedback.

There is no challenge-solving implementation or API in this project yet. Without an integration,
the Solve action reports that it is not configured and does not fabricate a result. To connect a
solver, define `window.solveChallenge` before the page's inline script runs. It receives the input
text and an object containing the displayed `title` and `part`, and must return a string or number
(synchronously or as a promise). Returned values are rendered as plain text.

See [CONTEXT.md](CONTEXT.md) for the project structure, design system, conventions, and contributor
guidance.
