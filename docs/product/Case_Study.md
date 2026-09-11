# Resource Radar case study

## The product problem

Northstar is a fictional B2B SaaS company planning several launch initiatives across a small cross-functional team. A typical staffing sheet can show assignments while hiding the constraints that matter: a five-day week is not five available project days when time off and operating work are already committed.

Resource Radar makes that arithmetic visible. The working surface starts with people and weeks, subtracts time off and non-project commitments, then compares the remaining person-days with initiative allocations. Draft edits stay separate from the applied baseline so planning changes are deliberate and reversible.

## My role as Product Manager

I defined the product concept, planning model, interaction requirements, information hierarchy, sample scenarios, acceptance criteria, and validation plan. Google Antigravity and other AI tools assisted with implementation and verification. This is a portfolio demonstration, not a record of a shipped Northstar product or customer outcome.

## Key decisions

- Use person-days instead of percentages to make weekly tradeoffs concrete.
- Show time off and non-project commitments beside the resulting availability.
- Preserve baseline and draft scenarios until the user explicitly applies a draft.
- Roll individual overloads up to initiative impact so staffing risk has product context.
- Keep persistence device-local and offer JSON export for inspection.

## Proposed measures

Begin with five formative sessions to inspect conflict diagnosis and baseline-versus-draft understanding. The proposed diagnostic target is four of five evaluators correctly explaining a conflict within 60 seconds. A later ten-person study would test whether nine of ten can edit and apply a scenario without help. The sample must surface all known zero-availability assignments, without implying productivity or burnout diagnoses.

See the [evaluation plan](Measures.md) for denominators and guardrails and the [validation plan](Validation.md) for the study sequence. These are proposed targets; no user study or production measurement has been performed.

## Evidence limits and next investment decision

The sample demonstrates inspectable arithmetic and controls; repository checks are software evidence only. It does not show practitioner understanding, adoption, or delivery outcomes. The next decision is whether five formative sessions show that participants can explain a conflict and intentionally move from draft to applied plan. If they cannot, simplify the workflow before investing in history, import, or shared-system concepts. Review the [discovery plan](Discovery%20Plan.md), [decision record](Product%20Decisions.md), [risk register](Product%20Risks.md), and [validation plan](Validation.md).
