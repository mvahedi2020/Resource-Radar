# Validation plan

## Observed implementation checks, September 8, 2026

Lint, strict type checks, production build and five unit tests passed on Node 24/macOS. Two repository browser tests passed. An additional headless Chrome walkthrough verified zero-capacity reallocation, baseline versus draft, apply and refresh persistence, undo, JSON download, about/back navigation, sample reset, mobile search at 390 × 844 with no page overflow, and blocked-storage fallback. No page errors were captured. npm audit reported no vulnerabilities.

Actual workspace screenshots and a workflow recording are in ../media. These are software verification, not moderated user research. See Measures.md for explicit denominators, targets and guardrails.

## What is verified in this repository

Automated tests cover availability subtraction, zero-availability classification, initiative risk propagation, allocation bounds, and baseline/draft change detection. Type checking, linting, and the production build are part of the repository verification scripts.

## Proposed user validation

Conduct five moderated formative sessions with product operations or engineering-planning practitioners. Ask each participant to identify the seeded scenario's unavailable week, rebalance an overloaded initiative, explain baseline versus draft, apply it, and export it. Named sample people are fictional fixtures, not research participants.

Measure task completion, correct diagnosis time, recovery, and five-point confidence. Retain all five formative participants in the diagnostic denominator. A later ten-person study tests 90% unassisted edit-and-apply as successes out of all 10; record abandonment and assistance separately.

## Scoring protocol

An explanation passes only when it names time off or non-project commitments and connects remaining availability to competing allocation; naming color alone does not pass. Edit-and-apply passes only when a participant changes an input, distinguishes draft from baseline, and deliberately applies without help. This evaluates workflow comprehension, not demand or business value.

## Known limits

The dataset is fictional, persistence is browser-local, and no integrations or multi-user behavior are represented. The current sample does not establish usability, demand, or business impact.
