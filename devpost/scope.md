---
doc: scope
status: approved
---

# NoticePilot AI

An evidence-first assistant that helps a citizen turn one confusing public-service notice into next steps they can verify against the source.

## The Unique Kernel
Every important result stays inspectable: the user can see the notice passage behind a deadline, requirement, or action, while ambiguous, missing, or conflicting information is surfaced rather than guessed or silently resolved.

## Who It's For
A nontechnical citizen who has received a public-service notice asking for additional documents before a deadline and needs to understand what to do without repeatedly rereading the notice.

## The Core Loop
The user opens or pastes a fictional notice, gets its meaning and next actions in plain language, then checks each important result against its supporting passage and sees what still needs confirmation.

## Inspiration & Identity
A simple, polished, approachable experience for ordinary people acting on official communications. Its tone should be clear and calm, prioritizing inspectable evidence over confident-sounding answers.

## Why This Matters to the Learner
The learner wants to build practical AI that makes complex information easier for ordinary people to understand and act on, while practicing a disciplined plan-first workflow.

## What "Working" Looks Like
In a short on-screen demo, a first-time user can go from a bundled fictional notice to an explanation, a deadline, required actions, and a verifiable checklist in under a minute. Selecting an important result reveals its exact source passage and location where available. The sample demonstrates at least one ambiguous instruction and one missing detail; NoticePilot flags them rather than inventing an answer. If it fits after this core flow is reliable, the sample also contains conflicting dates, which the app shows together with a warning. The compelling moment is discovering that an answer is evidence-linked—or that the notice does not support one.

## The POC Boundary
- One complete text-first workflow using a bundled, clearly fictional public-service notice; pasted text can be supported if it fits without delaying the bundled-sample path.
- Plain-language purpose and explanation, supported deadline and document requirements, actionable next steps, and source-linked checklist items.
- Exact supporting excerpts, page or section references where available, and clear supported, ambiguous, and not-found states. Suggestions must be distinguished from notice requirements.
- Explicit missing-information warnings; include a deliberate conflicting-date example if it can be handled reliably within the remaining time.
- A polished, nontechnical-facing interface, useful error handling, and transparent limitations. No external AI API key is required for the main demo.

## Later
- PDF upload and more advanced document processing.
- Broader notice types, real-world jurisdiction coverage, and integrations with issuing authorities.
- Additional capabilities that are not needed to prove this notice-to-verifiable-actions workflow.

## Explicitly Cut
- Production-ready legal, government, or eligibility advice; the proof of concept is not authoritative.
- Inventing requirements, resolving ambiguity or conflicting instructions without evidence, or presenting unsupported interpretations as verified fact.
- A general-purpose document platform or broad agent workflow that would make the core demo less reliable within the hackathon.
