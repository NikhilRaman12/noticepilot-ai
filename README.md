# NoticePilot AI

**Understand the notice. Know your next step.**

NoticePilot AI is an in-progress, evidence-first proof of concept for turning a fictional public-service notice into plain-language actions that can be checked against the original text.

> **Project status:** This is not a finished submission. The first working slice demonstrates a bundled sample, narrow deterministic extraction, and expandable source excerpts. Conflict detection, explicit missing/ambiguous states, resilient analysis-error recovery, and responsive/accessibility review remain unfinished.

## Current prototype

- Runs in the browser with no account, backend, database, or AI API key.
- Loads a clearly labelled fictional notice and extracts a limited set of explicit summary, document, action, and deadline patterns.
- Displays the exact source line for each current finding.
- Uses deterministic rules; unfamiliar phrasing may not be recognized.

The current sample does not yet demonstrate ambiguous, missing, or conflicting instructions. The analyzer should not be treated as legal, government, or eligibility advice. Do not paste sensitive personal notices into this prototype.

## Run locally

Requirements: Node.js 22.12 or newer and npm.

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

Run tests and check the production build:

```powershell
npm test
npm run build
```

## Demo video plan

The required short demo video should show:

1. Opening NoticePilot AI and its evidence-first promise.
2. Loading the clearly fictional sample and analyzing it.
3. Opening the deadline and document evidence to compare exact excerpts with the notice.
4. Clearly disclosing that this current prototype does not yet implement ambiguity, missing-information, conflict, or robust error-recovery states.

Record the finished workflow only after those planned behaviors are implemented and tested. A local recording is sufficient; deployment is optional. The public repository and demo video are both required for the challenge submission.

## Project planning

- [Scope](devpost/scope.md)
- [Product requirements](devpost/prd.md)
- [Technical specification](devpost/spec.md)

## License

This project is released under the MIT License; see [LICENSE](LICENSE).
