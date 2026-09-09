# Product requirements

## Objective

Help portfolio leads create a credible four-week resource plan by exposing true availability and the initiative consequences of allocation changes.

## Core user story

As a portfolio lead, I can see capacity, time off, operating commitments, and initiative allocations in one weekly view so I can resolve conflicts before applying a plan.

## Functional requirements

1. Capacity is measured in person-days for each person and week.
2. Availability equals capacity minus time off minus non-project commitments, never below zero.
3. Initiative allocations are editable in half-day increments.
4. Zero availability and overloads are visually and textually identified.
5. Initiative summaries identify when their work intersects with an overload.
6. Draft changes remain separate from the applied baseline until explicitly applied.
7. Users can discard draft edits, reset sample data, and export a draft as JSON.
8. Browser persistence uses a versioned, product-specific key and explains failures.
9. Navigation works through URL hashes; controls support keyboard and touch use.

## Non-goals

Real-time collaboration, HRIS integration, time tracking, authentication, billing, and automated staffing recommendations are outside this sample.

## Proposed success targets

- 80% of evaluators can find the cause of a highlighted overload within 60 seconds.
- 90% can edit and apply a draft without assistance.
- All known time-off conflicts are represented before scenario approval.

These are validation targets, not observed results.
