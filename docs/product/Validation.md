# Validation plan

## Observed implementation checks, September 8, 2026

Lint, strict type checks, production build and five unit tests passed on Node 24/macOS. Two repository browser tests passed. An additional headless Chrome walkthrough verified zero-capacity reallocation, baseline versus draft, apply and refresh persistence, undo, JSON download, about/back navigation, sample reset, mobile search at 390 × 844 with no page overflow, and blocked-storage fallback. No page errors were captured. npm audit reported no vulnerabilities.

Actual workspace screenshots and a workflow recording are in ../media. These are software verification, not moderated user research. See Measures.md for explicit denominators, targets and guardrails.

## What is verified in this repository

Automated tests cover availability subtraction, zero-availability classification, initiative risk propagation, allocation bounds, and baseline/draft change detection. Type checking, linting, and the production build are part of the repository verification scripts.

## Proposed user validation

Conduct five moderated sessions with product operations or engineering planning practitioners. Ask each participant to identify Noah's unavailable week, rebalance an overloaded initiative, explain the difference between the baseline and draft, apply the draft, and export it.

Measure task completion, time to first correct conflict diagnosis, error recovery, and confidence on a five-point scale. Proposed thresholds are 80% unassisted completion and a median diagnosis time below 60 seconds.

## Known limits

The dataset is fictional, persistence is browser-local, and no integrations or multi-user behavior are represented. The current sample does not establish usability, demand, or business impact.
