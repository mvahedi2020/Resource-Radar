# Product risks

| Risk | Signal to watch | Proposed mitigation | Reconsideration trigger |
| --- | --- | --- | --- |
| Conflict label becomes a delivery forecast | Participants say an initiative will slip without naming capacity inputs. | Keep inputs and non-forecast boundary beside initiative risk. | Repeated forecast interpretation after iteration. |
| Person-day inputs hide an overlapping assumption | A planner enters time off and operating commitments that describe the same unavailable time, or treats a 0.5-day input as headcount. | State the subtraction rule and planning unit in the task; ask whether sources overlap before entering any real data. | The model needs a different input contract before real-data intake. |
| Baseline and draft are missed | Participants think an edit committed a plan. | Preserve separate summaries and observe recovery. | The two-state model remains unclear. |
| Reset recovery looks current after a new scenario is applied | A user applies a new draft but still sees an undo-reset message for an older scenario. | Clear the reset snapshot when Apply succeeds and verify recovery text against the current baseline. | Any notice can describe state from a prior scenario. |
| Export notice is mistaken for current draft status | A user edits after exporting and treats the old exported-change count as current. | Clear export status on every allocation or constraint edit; keep export counts tied to the draft at click time. | Users cannot tell which draft the notice describes. |
| Day model does not fit planning inputs | Participants cannot map availability into days. | Ask them to narrate their current model first. | Translation cost outweighs clarity. |
| Local state fails handoff | Participants need a shared scenario instead of export. | Research handoff needs before shared state. | Data and permissions needs are specified. |
| Local export exposes more planning detail than intended | A participant shares a full fictional-plan export when only a decision summary is needed. | Mark the file as a fictional working draft and include change counts so scope is inspectable; test a smaller decision-summary handoff before any real-data or sharing proposal. | A bounded handoff contract plus retention, access, and minimization design is approved for a pilot. |
| Restored data violates the visible planning unit | A saved plan reappears with duplicate identities or quarter-day values that direct controls cannot create. | Validate saved identities and half-day units before rendering; fall back to the known sample with a warning. | A migration contract is needed before the stored schema changes. |
| Saved maps drift from the visible calendar | A browser payload contains a removed or extra week, or two initiative codes differ only by case. | Require exact week-key coverage and case-insensitive unique initiative codes before accepting saved data. | A schema migration is required before changing the calendar or code contract. |

These are prospective risks for a fictional sample, not reported incidents or customer harm.
