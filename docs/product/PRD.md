# Resource Radar — product requirements

## Product brief

**Problem.** A planning sheet can list assignments while concealing the constraint that decides whether a commitment is credible: a nominal five-day week is reduced by time off and operating work before initiative work begins. The result is a conversation about allocation totals instead of an inspectable decision about what the team can actually take on.

**Opportunity.** Give a portfolio lead a four-week, person-day planning surface that exposes availability, makes competing allocations visible, and connects an individual conflict to the initiative it threatens.

**Product decision.** Resource Radar is a decision-support sample, not an automated staffing system. It makes assumptions and consequences inspectable; the team still decides what to move, reduce, or defer.

## Users and job to be done

| User | Job | Evidence needed before acting |
| --- | --- | --- |
| Portfolio lead | Reconcile competing initiative requests before a planning commitment | Available person-days, allocation conflicts, and affected initiatives by week |
| Product or engineering lead | Explain the consequence of moving or retaining work | The baseline, the draft, and the initiative risk created by each allocation |
| Planning participant | Review a proposed scenario without accidentally committing it | A clear distinction between the applied baseline and an editable draft |

## Scope, constraints, and principles

The sample uses fictional Northstar people, initiatives, and allocations. It has no account, real staffing source, collaboration service, recommendation engine, paid API, or external action. Applied plans persist only in the current browser and JSON export stays on the device.

The product follows four principles:

1. **Use person-days.** Concrete days make time-off and operating-work tradeoffs easier to inspect than a percentage.
2. **Keep assumptions beside the result.** Availability is capacity minus time off and non-project commitments, and cannot fall below zero.
3. **Make change deliberate and reversible.** A draft is separate from the applied baseline until the user chooses Apply; reset includes a one-step recovery.
4. **Show the product consequence.** An overload is not just a red cell: the affected initiative is surfaced as at risk. This is a capacity signal, not a delivery forecast.

## Core user story

As a portfolio lead, I can see capacity, time off, operating commitments, and initiative allocations in one weekly view so I can resolve conflicts before applying a plan.

## Primary workflow

1. Review the weekly planning surface and locate an unavailable or overloaded person-week.
2. Inspect the contributing time off, operating commitments, and initiative allocations.
3. Edit fictional allocations or constraints in half-day increments and inspect the immediate load and initiative-risk consequences.
4. Compare the draft with the unchanged baseline; either apply the deliberate choice or undo the draft.
5. Export the fictional draft when an inspection copy would help a planning conversation.

## Functional requirements and acceptance criteria

| Requirement | Acceptance criterion |
| --- | --- |
| Model weekly capacity | Capacity, time off, commitments, allocations, available days, and balance are visible for each person-week. Availability equals capacity minus time off and commitments, with a minimum of zero. |
| Make constraints editable | Allocation values accept 0–10 person-days; time off and commitments accept values from zero through the person’s weekly capacity. The planning surface reflects the result immediately. |
| Identify decision risk | A zero-availability or overloaded person-week is visible in both text and status treatment. Initiative summaries identify allocations that intersect with an overload. |
| Preserve a safe planning state | Draft changes do not alter the applied baseline until Apply draft is selected. Undo restores the draft from that baseline; a reset confirmation restores the fictional sample and offers one-step recovery of the previous scenario. |
| Support review and recovery | Search filters people by name or role and provides a recoverable empty state. The current draft can be exported as local JSON. A storage failure is explained and the current tab remains usable. |
| Make the demo broadly inspectable | Hash navigation supports browser back and forward. Native labels, semantic table structure, visible focus treatment, keyboard controls, touch targets, and responsive horizontal planning access are provided. |

## Explicit non-goals

Real-time collaboration, HRIS integration, time tracking, authentication, billing, automatic staffing recommendations, productivity scoring, and burnout diagnosis are outside this sample. Capacity risk must not be presented as a delivery forecast or a recommendation to change a person’s work.

## Acceptance examples and edge conditions

| Situation | Expected current behavior | Meaning |
| --- | --- | --- |
| Time off plus commitments exceed capacity | Available days stop at zero; inputs remain visible. | No negative availability is implied. |
| A zero-availability person has allocation | The cell is a conflict and related initiative is at risk. | Capacity signal, not a delivery forecast. |
| Allocation is below zero or above 10 | Planning logic bounds it to 0–10; controls use 0.5-day steps. | Inputs remain in documented range. |
| Draft edit is undone | Draft returns to baseline; baseline stays unchanged. | Reversibility supports review. |
| Storage is blocked | Current tab works and explains it cannot save later. | Persistence is not required to inspect. |

## Evaluation plan — proposed, not measured

Research is staged. First, conduct five moderated formative sessions with product operations or engineering-planning practitioners. Participants use the same seeded Northstar scenario to identify Noah’s unavailable week, rebalance work, explain baseline versus draft, apply a choice, and export it. Use these sessions to identify usability failures and refine the task before applying a quantitative completion target in a later ten-person study.

| Evaluation question | Measure and denominator | Proposed target | Guardrail |
| --- | --- | --- | --- |
| Can a reviewer explain a conflict? | Correct diagnoses within 60 seconds / all five evaluators | 4/5 | The explanation names time off or competing work, not only a visual state. |
| Is the draft model understood? | Evaluators who edit and apply without help / all evaluators | 90% in a later ten-person study | No accidental baseline changes. |
| Does the scenario surface unavailable work? | Known zero-availability assignments surfaced / all known assignments | 100% | No productivity or burnout diagnosis. |

Record task time, incorrect assumptions, recovery behavior, and confidence. Automated checks verify planning arithmetic and controls; they do not establish usability, demand, or business impact. No human research or customer outcome is claimed.
