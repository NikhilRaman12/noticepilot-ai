---
doc: prd
status: approved
---

# NoticePilot AI — Product Requirements

An evidence-first single-page experience that helps a nontechnical citizen understand one confusing public-service notice and verify the next actions against its source.
Source: `scope.md > Who It's For`, `scope.md > The Core Loop`.

## The Core Journey

1. A first-time visitor sees the NoticePilot AI identity, the tagline “Understand the notice. Know your next step.”, a concise value proposition, a notice text area, “Try a sample notice,” and “Analyze notice.” The trust promise explains that important results link to evidence and that gaps or ambiguity are flagged rather than guessed.  
   Source: `scope.md > The Core Loop`, `scope.md > Inspiration & Identity`.
2. The visitor pastes notice text or loads the clearly fictional bundled sample. Blank or whitespace-only input cannot be analyzed.  
   Source: `scope.md > The POC Boundary`.
3. The visitor analyzes the notice. During processing, a restrained loading state is shown and duplicate submissions are prevented. Results appear on the same screen.  
   Source: `scope.md > The Core Loop`, `scope.md > What "Working" Looks Like`.
4. The user scans a plain-language explanation and action-first results: next steps, important dates, and explicitly mentioned documents. The system shows only information supported by the source and flags missing, ambiguous, or conflicting information.  
   Source: `scope.md > The Unique Kernel`, `scope.md > The POC Boundary`.
5. The user opens evidence for an important result to inspect the exact source passage, its location where available, and its verification status. Each checklist action is traceable to evidence, or clearly marked as a suggestion rather than a notice requirement.  
   Source: `scope.md > The Unique Kernel`, `scope.md > What "Working" Looks Like`.
6. The user identifies unresolved questions that may need confirmation with the issuing authority. They can return to the notice text, edit it, and analyze again. A first-time user should be able to complete and verify the demo journey in under a minute.  
   Source: `scope.md > Who It's For`, `scope.md > What "Working" Looks Like`.

## Screens and Layout

### Single-page notice workspace

NoticePilot AI uses one responsive screen with a simple progression from notice input to analysis results; it is not a chat interface and does not introduce extra pages.

- **Header:** Product name, tagline, and concise value proposition: “Turn confusing notices into clear actions—with evidence you can verify.”
- **Input area:** Prominent, labelled “Paste your notice here” text area with a short example placeholder; visible “Try a sample notice” action; and a prominent “Analyze notice” action.
- **Trust promise:** Briefly explains that important dates and checklist items link to source evidence, while missing, ambiguous, or conflicting information is flagged rather than guessed.
- **Results area:** Appears on the same screen after analysis. The original notice remains available for reference, and the user can return to editing or analyzing it.
- **Results hierarchy:** A concise “What this notice means” summary and status overview; “Your next steps” ordered by urgency only when the source supports that ordering; “Important dates”; “Documents mentioned”; and a visible “Needs your attention” section.
- **Evidence details:** Each important result has a consistent “View evidence” interaction that reveals the source excerpt, location where available, and status. This detail supports verification without making a complex timeline or PDF highlighter a requirement.

## Look and Feel

- **Identity:** Calm, modern civic technology; precise, transparent, respectful, and reassuring without implying infallibility. “Evidence-first clarity.”
- **Palette:** Deep navy `#183153` for brand and primary actions; muted teal `#247C78` for supportive interactions and supported-evidence treatments; warm off-white `#F7F8FA` backgrounds; white surfaces with subtle `#E1E6ED` borders.
- **Verification states:** Supported evidence uses a restrained teal treatment and explicit label. Needs verification uses warm amber `#9A5B00`, a warning icon, and a text label. Not found uses neutral slate `#586579` with explanatory text. Conflicts have a distinct warning treatment. Color is never the only status cue.
- **Typography and layout:** Inter if readily available, otherwise a clean system sans-serif; readable body text, clear heading hierarchy, comfortable line spacing, tabular numerals for dates, and metadata that is not tiny or overly faint. Use generous spacing, restrained rounded cards, subtle shadows, and simple line icons.
- **Responsive and accessible:** Keep the workspace usable on laptop and mobile. Evidence excerpts look like quotations from a source document and are visually distinct from generated explanations.
- **Avoid:** Generic chatbot styling, robot mascots, glowing gradients, excessive glassmorphism, decorative AI imagery, unnecessary animation, and charts or complex timelines.

## Features and Behavior

### Notice input and analysis

- The user can enter notice text or load the bundled, clearly fictional public-service sample without an account or external AI API key.
- Loading the sample makes it available to inspect and analyze through the same workflow.
- “Analyze notice” is disabled for blank or whitespace-only input. Show the helpful inline message “Paste a notice or try our sample to get started.” Keep the sample action available and do not treat empty input as an alarming error.
- When usable input is submitted, show a restrained loading indicator, prevent accidental duplicate submissions, and restore the analyze action when processing ends.
- Preserve the user's complete input through validation and analysis failures. The user can edit it or load the sample and retry without restarting the workflow.
- The user can return to the input and analyze edited text. The experience does not require an account or persistent storage.

### Plain-language explanation and action-first results

- Present a concise “What this notice means” explanation based on the notice, not a general summary detached from its evidence.
- Give a compact status overview of actions, deadlines, documents, and items requiring verification. Do not invent a date, item, or count when the source does not establish it.
- Show “Your next steps” as actionable checklist cards. Order by urgency only when the source contains enough information to support that ordering.
- Identify whether each action or document is explicitly required by the notice. Label optional help as a suggestion; never make an unmentioned document appear mandatory.
- Show “Important dates” with the extracted date, original wording, and source location where available. Do not infer a deadline from the current date or treat a mentioned date as a submission deadline without supporting context.
- Show “Documents mentioned” with each explicitly requested document linked to its evidence; flag wording that needs clarification.
- Keep “Needs your attention” visible for ambiguous instructions, missing information, conflicts, and questions the user may need to confirm with the issuing authority.

### Evidence and verification

- Every important explanation, date, requirement, and checklist action exposes a “View evidence” interaction.
- Evidence shows the exact supporting source excerpt and page number or section heading where available. The original notice remains accessible for comparison.
- Apply one of these explicit labels to each result:
  - **Supported by notice** — direct source evidence supports the claim.
  - **Needs verification** — the source is ambiguous or conflicts with another passage.
  - **Not found in notice** — the notice does not establish the requested information.
- For conflicting dates or instructions, display both relevant passages and a warning; do not silently choose one.
- Do not show an uncalibrated numerical confidence score. Explain limitations and uncertainty in plain language.
- Never fill missing fields by inventing dates, requirements, or mandatory documents. Keep unsupported conclusions out of the supported-results presentation.

## States and Boundaries

- **First visit / empty input** — Show the input, sample action, and trust promise. Disable analysis for blank or whitespace-only text and show “Paste a notice or try our sample to get started.”
- **Sample loaded / ready** — The bundled fictional notice is available in the input area and can be analyzed using the regular action.
- **Analyzing** — Show restrained progress, prevent duplicate submission, and restore the analyze action when processing ends.
- **Successful analysis** — Show the same-screen explanation and results, with evidence and status available for inspection.
- **Invalid or insufficient input** — Preserve the original text; explain the issue plainly (for example, “This notice is too short to identify reliable actions.”); say what additional source information would help without inventing it; allow editing or loading the sample and retrying.
- **Analysis failure** — Preserve the complete input and show “We couldn't analyze this notice. Your text is still here—please try again.” Provide Retry and Edit actions. Do not replace existing results with fabricated or partially unsupported ones. If previous results remain visible, clearly mark them as belonging to the previous successful analysis.
- **Partial or uncertain analysis** — Show only results supportable by available source text. Mark unresolved fields “Needs verification” or “Not found in notice.”
- **No persistent session required** — A user does not need an account or saved history. The core experience is the current notice-to-results flow.
- **Product boundary** — This is a small proof of concept, not authoritative legal, government, or eligibility advice. It handles one fictional notice workflow and does not provide production-ready advice.

## Product Decisions

- A single-page, action-first workspace rather than a chatbot or multi-page journey — it should make the first action obvious and show results alongside the source.
- A bundled fictional sample is the reliable first-run path; pasted text supports the same workflow. PDF upload and advanced processing are deferred.
- Evidence, verification labels, missing information, and conflicts are visible product behavior, not optional explanatory copy.
- A deterministic, source-grounded sample workflow is acceptable to keep the demo reliable without an external API key.
- Preserve user input across failures; failed attempts must never force re-entry.
- Treat deadline conflicts as a stretch within scope: ambiguity and missing detail are required for the sample; conflicting dates are included only if they fit after the core experience works reliably.
- Do not add accounts, persistent storage, jurisdiction coverage, integrations, or authoritative advice to this proof of concept.

## What We're Building

- A polished, accessible, responsive single-screen workflow for a fictional public-service notice.
- Notice text input, a bundled sample, empty-input guidance, analysis/loading behavior, and recoverable validation or failure states.
- Plain-language explanation, traceable checklist actions, supported dates and document requirements, an evidence-backed status overview, and visible unresolved questions.
- Source excerpts and available locations for important claims, explicit supported / needs-verification / not-found labels, and transparent handling of uncertainty or conflicts.
- A screen journey that a first-time user can complete and verify in under a minute in the demo.

## Deferred From the POC

- PDF upload, advanced document extraction, and PDF text highlighting — the reliable proof is a text-first workflow with a bundled sample.
- Broader notice types and real jurisdiction coverage — the proof is one fictional public-service notice, not an authoritative service.
- Accounts and persistent saved notices — the learner wants no account or persistent-storage requirement for the demo.
- External AI API dependency — the learner wants the main demo to remain usable without an API key.
- Issuing-authority integrations — explicit user confirmation questions are sufficient for this proof of concept.
- Conflicting-date sample handling is a stretch feature, not a prerequisite for the ambiguity and missing-information proof.

## Possible Later Enhancements

After the core workflow is reliable, explore PDF upload with page-level navigation and additional notice types, while preserving the same evidence and uncertainty rules.

## Non-Goals

- Legal, government, or eligibility advice that users could treat as authoritative.
- Invented requirements, inferred deadlines, or unsupported claims presented as verified facts.
- Automatically resolving conflicting dates or instructions without evidence.
- A general-purpose document platform, production agent, or complex analytics dashboard.
- Requiring an account, API key, or persistent notice history to demonstrate the core flow.

## Open Questions

- **Can wait for `4-spec`:** The exact meaning/length validation boundary for pasted content can be set against the fictional sample and the chosen implementation, while preserving the user-facing behavior defined here.
- **Can wait for `4-spec`:** The source location shown for plain pasted text depends on the final content representation; always show the exact excerpt and show a page or section reference when one exists.
- **Can wait for `4-spec`:** Whether conflict detection for the deliberately conflicting-date sample fits the remaining implementation time; it is not a release-blocking requirement for the core PoC.
