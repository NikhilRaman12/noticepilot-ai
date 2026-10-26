---
doc: spec
status: approved
---

# NoticePilot AI — Technical Spec

## How This Works, In Plain Language

NoticePilot is a small web page that runs in the browser. React draws the page and keeps the notice text and current results on screen. A local TypeScript analyzer reads the notice using a small set of explicit text rules; it does not call an AI model or send the notice anywhere. The analyzer returns findings together with exact excerpts cut from the original text. The page displays only those findings and marks unclear or absent information instead of filling gaps with guesses.

The fictional sample is included with the app so the demo works immediately. Vite serves the app during local development, and the same project can be built into static files. This shape avoids a server, API key, account, database, and network dependency at runtime. The tradeoff is that deterministic rules can only interpret patterns they explicitly recognize; unfamiliar wording may produce partial results and a “Needs verification” or “Not found in notice” state.

## The Core Journey Through the System

PRD ref: `prd.md > The Core Journey`.

1. Vite serves the one-page React app. The user sees the input, trust promise, and “Try a sample notice.”
2. Choosing the sample copies the clearly fictional notice fixture into the editable text area. Pasting or editing text updates the same in-memory input.
3. Submitting nonblank text passes its exact string to the TypeScript analyzer. The analyzer examines lines/sentences without rewriting the original source, finds only supported patterns, and records each excerpt's start/end offsets and line or heading location.
4. The analyzer groups recognized actions, dates, and documents. It pairs each claim with source evidence; when two deadline passages conflict, it returns both passages in one finding marked for verification. Missing fields become explicit “Not found in notice” results without a fabricated citation.
5. React renders the summary and same-screen action-first results. The user expands a finding to inspect the exact excerpt. Editing and retrying reuses the input; results from an earlier successful input remain labelled as previous results until a new analysis succeeds.

```text
Fictional sample or pasted text
              |
              v
     React input (in memory)
              |
              v
  deterministic TypeScript rules
     |          |           |
 supported   ambiguous/   not found
 excerpt     conflicting  no citation
     \          |           /
      \         v          /
       same-screen findings
       + expandable evidence
```

## Stack

- **React + TypeScript** — a familiar component model for the responsive single-page UI, with types for findings and verification states. The learner requested this as the preferred option if it is quick to implement.
- **Vite** — starts the local development server and builds static browser files without adding a backend. Official guide: [Vite Guide](https://vite.dev/guide/).
- **TypeScript** — keeps the analyzer's evidence and status data shapes explicit. Official handbook: [TypeScript Documentation](https://www.typescriptlang.org/docs/).
- **React** — official documentation: [React Learn](https://react.dev/learn).
- **Vitest** — runs unit and component tests using the Vite configuration. Official guide: [Vitest Guide](https://vitest.dev/guide/).
- **React Testing Library** and **user-event** — exercise visible behavior through accessible controls instead of testing private component internals. Documentation: [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/), [user-event](https://testing-library.com/docs/user-event/intro/).
- **CSS** — plain responsive CSS, with no component library, chart library, router, or icon dependency. Simple inline/text symbols may supplement labels; status meaning never depends on color or an icon alone.

The workspace currently has no application manifest or established runtime version. During `5-build`, verify an installed Node.js/npm version compatible with the selected Vite release, choose mutually compatible dependency versions, and record them in `package.json` and the lockfile. No version has been independently checked or installed yet.

## Where It Runs and How Someone Tries It

- **Runtime:** Local development server in Node.js; the user opens the app in a desktop or mobile browser. Analysis runs in that browser.
- **Requirements:** Node.js with npm; exact supported versions are to be verified when dependencies are selected. No account, API key, database, backend, or network service is required to analyze the bundled sample.
- **Install:** `npm install`
- **Start:** `npm run dev`
- **Open:** Use the local URL printed by Vite, normally `http://localhost:5173`.
- **Test:** `npm test`
- **Production build check:** `npm run build`
- **Demo recording:** Start the local app, load and analyze the fictional sample, inspect a supported finding and the ambiguous/conflicting or not-found state, and show the input remains editable. A local app is sufficient for the short demo video.
- **Submission:** A short demo video and public GitHub repository are required. Deployment is optional and is not a replacement for either.

## Look and Feel

Implement `prd.md > Look and Feel` using CSS variables and semantic controls: deep navy `#183153`, muted teal `#247C78`, warm off-white `#F7F8FA`, white cards, and `#E1E6ED` borders. Use amber `#9A5B00` plus text/icon labels for “Needs verification,” and slate `#586579` plus explanatory labels for “Not found in notice.” Use teal plus a label for “Supported by notice.” Give conflicts a distinct warning treatment. Keep colors from being the only way to convey state.

Use Inter only if it is already available locally or can be included without a runtime network requirement; otherwise use a clean system sans-serif. Provide readable body sizes, clear heading hierarchy, comfortable line height, tabular date numerals, visible keyboard focus, and responsive spacing. Evidence excerpts should be visually quoted and distinct from generated/template text. Keep transitions subtle or omit them; no gradients, glass effects, chatbot styling, decorative AI imagery, or animation dependency.

## Components

### Notice Workspace

`App` owns the current input, active analysis status, latest successful result, and any analysis error. It renders the product header, trust promise, editable text area, sample action, analyze/retry controls, and same-screen results. Empty input disables analysis and displays the PRD's inline prompt. Inputs remain in memory when validation or analysis fails.

PRD ref: `prd.md > Screens and Layout`, `prd.md > Features and Behavior > Notice input and analysis`, `prd.md > States and Boundaries`.

### Fictional Sample Notice

A bundled, clearly labelled fictional notice is the reliable first-run experience. It includes explicit action/document wording, a clearly contextualized date, at least one ambiguous instruction, and a deliberately omitted detail. The sample must never resemble an actual government notice or claim to describe real procedures. Conflicting deadline passages may be included if they fit after the core flow works; if included, they must exercise the same dual-evidence conflict behavior as analyzer tests. Editing the loaded sample is allowed.

PRD ref: `prd.md > Features and Behavior > Notice input and analysis`, `prd.md > Product Decisions`.

### Deterministic Notice Analyzer

`analyzeNotice(text)` is a pure local function: same text produces the same result and has no network or storage side effects. It segments the original text into lines/sentences while retaining raw character offsets. A small documented set of rules recognizes explicit action/requirement language, supported document names, and date formats only when nearby wording establishes the date's role. Rules can normalize recognized instructions into concise templates, but every template claim must retain the exact sentence or source spans that support it.

Do not use a generative model, broad legal interpretation, current date, inferred jurisdiction, or invented requirements. Unrecognized text remains available for the user's inspection and leads to partial results. If the analyzer throws unexpectedly, the UI catches the error at the submit boundary, preserves the input, and shows the PRD failure message.

PRD ref: `prd.md > Features and Behavior > Plain-language explanation and action-first results`, `prd.md > Features and Behavior > Evidence and verification`.

### Evidence and Finding Views

Render results in the PRD order: “What this notice means,” “Your next steps,” “Important dates,” “Documents mentioned,” and “Needs your attention.” Each important finding exposes a keyboard-operable “View evidence” control. Opening it shows the exact excerpt stored with the finding, its line/heading location when available, and its status. For a conflict, render all conflicting excerpts together and explain that the notice does not establish which instruction controls. A not-found result explains that the requested detail was not located and has no fabricated source passage.

PRD ref: `prd.md > Screens and Layout`, `prd.md > Features and Behavior > Evidence and verification`, `prd.md > States and Boundaries`.

### Verification and Partial-Result Rules

Use exactly these user-facing statuses:

- `supported` → “Supported by notice”: a claim is directly supported by its evidence.
- `needs_verification` → “Needs verification”: wording is ambiguous, date role is unclear, or source passages conflict. Include the relevant excerpt(s).
- `not_found` → “Not found in notice”: no supporting source span exists. Never attach a fabricated citation.

A finding may contain multiple evidence spans; a conflict must contain both (or all detected) relevant passages. A date is a deadline only when recognized contextual wording supports that role; otherwise show it as an undetermined/ambiguous date, not a deadline. Never use numerical confidence values. Build any plain-language summary from supported structured findings and templated wording; if evidence is insufficient, state that directly rather than generating a plausible narrative.

PRD ref: `prd.md > Features and Behavior > Evidence and verification`, `prd.md > States and Boundaries`.

### Validation, Loading, and Recovery

Whitespace-only input is blocked in the UI with the specified inline message. Nonblank text is analyzed conservatively; if no reliable actions can be identified, show useful insufficient/partial guidance while preserving the text, rather than discarding it. The exact threshold is evidence-based: do not add an arbitrary word-count cutoff.

While analysis is in progress, prevent duplicate submissions and show restrained progress. On failure, preserve all input and any prior successful result; label prior output as belonging to the previous analysis and provide Retry and Edit actions. Replace the prior result only after a later analysis succeeds. No history survives page refresh or closing the tab.

PRD ref: `prd.md > Features and Behavior > Notice input and analysis`, `prd.md > States and Boundaries`.

## Data Model

All working data lives in React component memory; it is not sent to a server or persisted. On refresh or when the tab is closed, the notice and results disappear; returning opens the initial experience. This follows `prd.md > States and Boundaries`.

```ts
type VerificationStatus = "supported" | "needs_verification" | "not_found";
type FindingKind = "summary" | "action" | "deadline" | "document" | "issue";

interface EvidenceSpan {
  start: number;       // Inclusive offset in the exact input string
  end: number;         // Exclusive offset in the exact input string
  quote: string;       // Must equal input.slice(start, end)
  line?: number;       // 1-based physical line when available
  heading?: string;    // Only an actual heading found in the source
}

interface Finding {
  id: string;
  kind: FindingKind;
  text: string;        // Short, rule-generated explanation; not an unsupported inference
  status: VerificationStatus;
  evidence: EvidenceSpan[];
  requirement?: "explicit" | "suggestion" | "unknown";
  dateValue?: string; // Only a normalized, unambiguous source date
}

interface AnalysisResult {
  sourceText: string; // Exact text analyzed; identifies which input produced these results
  findings: Finding[];
  issues: Finding[];  // Ambiguities, conflicts, and not-found fields
}
```

The analyzer creates evidence spans from the original text, not from a normalized copy. Tests must assert `quote === sourceText.slice(start, end)` for every span. Not-found findings use an empty evidence array. The UI stores the current editable input separately from `AnalysisResult.sourceText`; that separation makes it possible to preserve and edit new input while accurately labelling prior results.

## Analyzer Rules and Analysis Flow

1. Do not reject nonblank input at the analyzer boundary; the UI handles whitespace-only input. Do not silently trim or replace the stored source.
2. Split into physical lines and sentence-like spans while retaining offsets into the original string. Match against normalized copies only; derive quotes and locations from the original spans.
3. Recognize a deliberately bounded vocabulary of explicit action and document-request markers. A document is a requirement only when source wording explicitly requires/provides/submits it; weaker or unclear wording is “Needs verification,” not a mandatory checklist item.
4. Recognize supported date formats and bind a date to a deadline only when nearby language explicitly establishes a due/submission context. Do not compare with today's date or infer urgency.
5. If multiple distinct dates are explicitly associated with the same deadline/action, return one `needs_verification` conflict with both source spans. Never select one. Ambiguous date formats or unclear date roles also need verification.
6. Create not-found findings for key requested fields that are absent, with no evidence span. Keep supported findings even when other fields are missing or uncertain.
7. Build the short summary and status overview only from findings; omit unsupported counts and dates. Return a partial result rather than a fabricated completion.
8. Validate every emitted span against the original input before returning. If internal offsets do not match the excerpt, fail analysis and let UI recovery preserve the source.

The rules should be small and explicit enough to review in tests; this is not a general NLP engine. Add or expand patterns only when the corresponding behavior is covered by a fictional sample/test fixture and preserves evidence fidelity.

## File Structure

```text
NoticePilotAI/
├── index.html                  # Vite document shell and app mount
├── package.json                # Scripts and dependencies
├── package-lock.json           # Reproducible npm install
├── LICENSE                     # MIT open-source license, learner-confirmed
├── README.md                   # Setup, run, test, and demo-video instructions
├── tsconfig.json               # TypeScript options
├── vite.config.ts              # React and Vitest configuration
├── src/
│   ├── main.tsx                # Browser entry and React mount
│   ├── App.tsx                 # Single-page input/results/recovery flow
│   ├── styles.css              # Responsive civic-tech styling and focus states
│   ├── types.ts                # Evidence, finding, and result contracts
│   ├── sampleNotice.ts         # Clearly fictional bundled demo notice
│   ├── analyzer.ts             # Pure deterministic, evidence-preserving rules
│   └── components/
│       ├── NoticeInput.tsx     # Text area, sample, analyze/retry controls
│       ├── Results.tsx         # Summary and action-first results
│       ├── FindingCard.tsx     # Status label and expandable source evidence
│       └── AttentionPanel.tsx  # Ambiguous, conflicting, and not-found items
└── tests/
    ├── analyzer.test.ts        # Extraction, exact spans, missing/ambiguous/conflict cases
    └── app.test.tsx            # Sample, blank, success, evidence, error and retry behavior
```

## External Services and Dependencies

- **Runtime external services:** None. There are no API calls, payloads, credentials, database, or hosted processing service.
- **Build/test packages:** npm dependencies are installed for development/build and are not runtime services. Use React, React DOM, Vite, TypeScript, Vitest, a DOM test environment, React Testing Library, and user-event. Pin mutually compatible versions in the npm lockfile during `5-build`; verify Node/Vite compatibility then.
- **Fonts:** No required font download. Use local Inter if available; otherwise system fonts, so offline rendering remains usable.
- **Deployment:** Not selected or required. A local recording plus public GitHub repository and short demo video satisfy the approved workflow.

## Accessibility

- Use semantic headings, labels, buttons, lists, and `blockquote`-style source excerpts.
- Keep every action operable by keyboard and show visible focus. Evidence details must have an accessible name and expose expanded/collapsed state.
- Announce loading and analysis errors with appropriate live-region semantics; associate validation text with the notice field.
- Communicate every status in text, not color alone; pair warning icons with their text.
- Preserve readable contrast, comfortable text sizes, and layout at narrow mobile widths.
- Respect reduced-motion preferences; motion is not needed to understand any state.

## Testing and Acceptance

Run `npm test` for the focused unit and UI suite, then `npm run build` to confirm the production bundle compiles. Include the learner-confirmed MIT open-source license in `LICENSE` and document the license and demo-video recording steps in `README.md`.

- **Analyzer unit tests:** sample yields supported explicit actions/documents/deadline with exact quotations; each quote equals its source slice; missing information has `not_found` and no evidence; ambiguous wording produces `needs_verification`; conflicting supported deadline passages produce one warning with both exact excerpts; unsupported date context is never called a deadline; unfamiliar text returns useful partial results; repeated identical input returns identical findings.
- **UI tests:** initial empty state disables analysis and shows the prompt; sample loads into the text area; successful analysis renders the result hierarchy and evidence control; evidence expansion shows the exact excerpt; blank/invalid input is safely handled and never creates unsupported results; insufficient or failed analysis preserves text; retry works; previous results are clearly tied to the previous input and are not overwritten on failure; loading prevents duplicate submissions.
- **Build check:** `npm run build` completes without type or bundler errors.
- **Demo check:** Starting with the sample, a first-time user can see the plain-language action, inspect its exact source passage, and identify ambiguity/missing information in under one minute. A conflict example is shown if included in the sample; it must display both excerpts.
- **Honesty check:** Every extracted claim has exact source evidence; ambiguous, conflicting, and unsupported information is flagged; unfamiliar notices yield supported partial results where possible; no finding lacks a source excerpt unless its status is `not_found`; no fabricated fact, citation, page number, current-date inference, or confidence score is visible.
- **Publication/demo readiness:** A chosen open-source license is present in `LICENSE`; `README.md` has local install/run/test commands and a practical outline for recording the required demo video. Deployment remains optional.

## Important Failure Modes

- **Blank or insufficient notice** → Keep the source in the input, show the non-alarming inline guidance, and allow sample/edit/retry.
- **Unrecognized or ambiguous language** → Return supported findings only alongside explicit “Needs verification” and “Not found in notice” items; do not fill gaps with guessed output.
- **Unexpected analyzer failure** → Preserve input and previous results, label previous results as stale, show the PRD retry message, and provide Retry and Edit.

## What Was Simplified and Why

- **Browser-local deterministic rules** instead of an external generative AI service — the sample works without credentials or network failures, and every claim can be tied directly to source text. The tradeoff is intentionally partial interpretation of unfamiliar language.
- **Bundled fictional text and pasted text** instead of PDF upload — avoids OCR, page extraction, and upload handling while proving the evidence loop.
- **In-memory single-session data** instead of accounts, database, or history — no persistence is required for the demo, and input/results disappear when the page is refreshed.
- **Exact excerpts plus line/real heading anchors** instead of PDF page citations or text highlighting — pasted text has no true page numbers; never invent them.
- **Small rule set and one sample workflow** instead of a general legal NLP/agent platform — keeps the proof auditable and reachable in the 2–4-hour active-work target.

## Decisions and Open Issues

### Decisions

- **Learner-approved approach:** React + Vite + TypeScript is preferred if it can be implemented and tested quickly; this workspace has no existing stack. Use a single-page browser app with a local deterministic analyzer and no backend or mandatory service.
- **Learner-confirmed license:** MIT, for the open-source proof of concept.
- **Learner-approved analyzer behavior:** Bounded, deterministic, evidence-first extraction; evidence precedes claims, unsupported facts are never guessed, conflicts expose both excerpts, unfamiliar text yields partial results, and the fictional sample works without external services or an API key.
- **Learner requirement:** Every emitted evidence quote must exactly match the original input. Never fabricate citations, locations, or numerical confidence.
- **Derived implementation detail:** Use original-string offsets plus exact quote and physical line/actual heading anchors; pasted text does not receive page numbers.
- **Run/deployment:** Local browser workflow is the implementation target, consistent with the request for local run instructions and no service dependencies. Deployment remains optional and unconfigured.
- **Useful uncertainty clarified:** The analyzer cannot reliably understand arbitrary notice language. The learner accepted bounded rules with honest partial results rather than broad, opaque model output; tests will demonstrate the boundary.
- **Verification:** Unit-test the pure analyzer and component-test the user-visible workflow; build and run locally before considering the demo ready.

### Open Issues

- **Non-blocking for spec approval; verify early in build:** Select compatible Node.js, npm, Vite, React, TypeScript, and Vitest versions based on the available local runtime; no application toolchain is installed in the workspace yet.
- **Bounded behavior, not a promise of broad coverage:** Analyzer vocabulary and date formats must stay explicit and test-covered. Unrecognized text is partial/uncertain, never implicitly supported.
- **Conflict sample priority:** The data model and tests support conflicts. The PRD makes a contradictory-date sample conditional on remaining time; implement it after the core sample path, and omit only the sample conflict if it would jeopardize the reliable end-to-end flow.
- **Pasted-text source location:** Show exact excerpt and physical line/actual heading when present; page numbers are unavailable without a document/PDF and remain deferred.
