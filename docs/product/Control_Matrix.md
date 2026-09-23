# Control matrix: Resource Radar

All people, initiatives, allocations, and exported data are fictional samples. The application has no account, live staffing source, collaboration service, recommendation engine, or paid API.

| Area | Control | Expected behavior | Recovery and boundary |
| --- | --- | --- | --- |
| Navigation | Plan, Scenarios, About, brand | Changes the local hash view and active navigation state | Browser back and forward work without a network request |
| Planning sheet | Allocation number fields | Updates the working draft; values are limited to 0–10 person-days | Empty means zero; the applied baseline does not change until Apply draft |
| Planning sheet | Time off and Other commitment disclosure fields | Adjust available capacity for that person and week | Values are limited to the planned weekly capacity |
| Planning sheet | Search | Filters people by name or role | Empty results explain the state and Clear search restores the people list |
| Consequences | Load cells, conflict count, utilization, initiative risks | Recalculate immediately from the working draft | A risk is a capacity signal, not a delivery forecast |
| Scenarios | Undo draft | Restores the local applied baseline into the draft | Disabled when the draft matches the baseline |
| Scenarios | Apply draft | Makes the draft the applied baseline, persists it in this browser, and closes any prior reset-recovery window | A storage warning explains when persistence is unavailable; prior reset text is not shown as current |
| Scenarios | Reset sample | Asks for confirmation, keeps keyboard focus inside the review, then restores original fictional fixtures and removes the saved local plan | Cancel, Escape, or completion returns focus to the reset trigger; one-step recovery restores both the prior applied baseline and working draft |
| Export | Export draft | Downloads the current fictional draft as JSON with a boundary label and separate allocation/availability change counts | It does not upload or share any file; the interface announces the number of draft changes exported, then clears that notice when the draft changes |
| Persistence | Versioned browser storage | Restores a valid applied baseline on refresh | Ambiguous IDs, incomplete records, unknown relationships, duplicate allocations, non-half-day units, duplicate visible week labels, extra week keys, or duplicate initiative codes fall back to the sample plan with a warning and block Apply until Reset sample data; a storage access failure remains usable in the current tab |
| Accessibility | Semantic table, labels, visible focus, keyboard-friendly details | Enables screen-reader and keyboard inspection of each editable field | Responsive view keeps the planning surface scrollable rather than clipping data |
# Local planning controls

| Control | User-visible behavior | Evidence boundary |
| --- | --- | --- |
| Apply draft | Announces the applied baseline and persists it to this browser. | No account, server, or production plan is changed. |
| Undo reset | Restores the prior local scenario after a confirmed reset. | Recovery is session-local and depends on the current tab state. |
| Export draft | Includes the change summary and a local fictional scope label in JSON. | The file is a review artifact, not an operational handoff. |
