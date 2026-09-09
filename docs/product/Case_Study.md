# Resource Radar case study

## The product problem

Northstar is a fictional B2B SaaS company planning several launch initiatives across a small cross-functional team. A typical staffing sheet can show assignments while hiding the constraints that matter: a five-day week is not five available project days when time off and operating work are already committed.

Resource Radar makes that arithmetic visible. The working surface starts with people and weeks, subtracts time off and non-project commitments, then compares the remaining person-days with initiative allocations. Draft edits stay separate from the applied baseline so planning changes are deliberate and reversible.

## My role

I defined the product concept, planning model, interaction requirements, information hierarchy, sample scenarios, acceptance criteria, and validation plan. Antigravity AI was used as the implementation partner for application code and supporting documentation. This is a portfolio demonstration, not a record of a shipped Northstar product or customer outcome.

## Key decisions

- Use person-days instead of percentages to make weekly tradeoffs concrete.
- Show time off and non-project commitments beside the resulting availability.
- Preserve baseline and draft scenarios until the user explicitly applies a draft.
- Roll individual overloads up to initiative impact so staffing risk has product context.
- Keep persistence device-local and offer JSON export for inspection.

## Proposed measures

Targets for a future pilot would include a 30% reduction in time spent reconciling staffing inputs, 90% of planned work with an explicit owner and weekly allocation, and identification of all known zero-availability conflicts before a plan is approved. These are proposed targets; no user study or production measurement has been performed for this demo.
