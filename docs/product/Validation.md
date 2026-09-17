# Validation plan

## Observed implementation checks, September 16, 2026

On Node 24/macOS, lint, strict type checks, production build, eight unit tests, and four repository browser tests passed. `npm audit --omit=dev` reported no vulnerabilities. The unit suite now includes malformed browser-save inputs so a partial, invalid, or unknown allocation cannot be restored into the planning surface; the app falls back to the fictional sample with its existing storage warning.

## Observed implementation checks, September 8, 2026

Lint, strict type checks, production build and five unit tests passed on Node 24/macOS. Two repository browser tests passed. An additional headless Chrome walkthrough verified zero-capacity reallocation, baseline versus draft, apply and refresh persistence, undo, JSON download, about/back navigation, sample reset, mobile search at 390 × 844 with no page overflow, and blocked-storage fallback. No page errors were captured. npm audit reported no vulnerabilities.

Actual workspace screenshots and a workflow recording are in ../media. These are software verification, not moderated user research. See Measures.md for explicit denominators, targets and guardrails.

## What is verified in this repository

Automated tests cover availability subtraction, zero-availability classification, initiative risk propagation, allocation bounds, and baseline/draft change detection. Type checking, linting, and the production build are part of the repository verification scripts.

## Proposed user validation

Conduct five moderated formative sessions with product operations or engineering-planning practitioners. Ask each participant to identify the seeded scenario's unavailable week, rebalance an overloaded initiative, explain baseline versus draft, apply it, and export it. Named sample people are fictional fixtures, not research participants.

Measure task completion, correct diagnosis time, recovery, and five-point confidence. Apply the consent-withdrawal rule in [Measures.md](Measures.md): retain assisted and abandoned attempts, but do not retain a withdrawn participant's performance. A later ten-person study tests 90% unassisted edit-and-apply as successes out of 10 consented, started, non-withdrawn records; record abandonment and assistance separately.

## Moderator answer key for the seeded task

The expected diagnosis is **Noah Williams, Sep 28**: 5 person-days of weekly capacity minus 5 days of time off and 0 days of other commitments leaves 0 available days, while 1 person-day remains allocated to Signal accounts. A person-day is the planning unit, not a headcount or a delivery estimate; inputs support 0.5-day increments. A participant may choose any defensible fictional tradeoff, but a 1-day removal from Noah's Signal allocation must be described accurately: it clears that assigned day without restoring his availability, and it does not prove that Signal accounts is free of other capacity risk.

For the state-boundary task, the participant must identify the edit as a draft, then either Apply it to retain the local baseline or Undo it to restore that baseline. Do not score a preferred allocation as correct; score the availability calculation, the stated tradeoff, and whether the participant distinguishes draft from applied state.

## Scoring protocol

An explanation passes only when it names time off or non-project commitments and connects remaining availability to competing allocation; naming color alone does not pass. Edit-and-apply passes only when a participant changes an input, distinguishes draft from baseline, and deliberately applies without help. This evaluates workflow comprehension, not demand or business value.

For the five formative sessions, retain every started task in the notes, including an abandonment, an assisted attempt, or a participant who declines to apply the fictional draft, subject to the consent-withdrawal rule in [Measures.md](Measures.md). For the later ten-person study, use all 10 consented, started, non-withdrawn records as the denominator for conflict explanation and unassisted edit-and-apply; report help and abandonment alongside the numerator rather than dropping either result.

Stop expansion and return to the conflict explanation if participants repeatedly think zero availability is a delivery prediction, cannot say which inputs caused the conflict, or believe a draft changed the baseline before Apply. Do not add shared planning, imports, or automated recommendations until the workflow boundary is understood in the formative sessions.

## Known limits

The dataset is fictional, persistence is browser-local, and no integrations or multi-user behavior are represented. The current sample does not establish usability, demand, or business impact.
