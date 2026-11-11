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

`EC2601.html` is the EC2601 challenge page. `template.html` is currently an exact copy of that page.
Both pages have three independent part sections, and load their implementations from
`solvers/EC2601/part1.js`, `part2.js`, and `part3.js`. Update the challenge heading/description as
needed; HTML comments identify the page customization and JavaScript hook locations.

The EC2601 solver accepts comma- or whitespace-separated non-negative integer pine-cone counts and
returns the total additional cones for that formation. Each script exposes one function:
`window.solveEC2601Part1(input)`, `window.solveEC2601Part2(input)`, or
`window.solveEC2601Part3(input)`. The page loads and calls the matching function for each part;
results are rendered as plain text in that part's output.

See [CONTEXT.md](CONTEXT.md) for the project structure, design system, conventions, and contributor
guidance.
