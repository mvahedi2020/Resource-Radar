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
| Scenarios | Apply draft | Makes the draft the applied baseline and persists it in this browser | A storage warning explains when persistence is unavailable |
| Scenarios | Reset sample | Asks for confirmation, keeps keyboard focus inside the review, then restores original fictional fixtures and removes the saved local plan | Cancel, Escape, or completion returns focus to the reset trigger; one-step recovery restores both the prior applied baseline and working draft |
| Export | Export draft | Downloads the current fictional draft as JSON with a boundary label and separate allocation/availability change counts | It does not upload or share any file; the interface announces the number of draft changes exported |
| Persistence | Versioned browser storage | Restores a valid applied baseline on refresh | Ambiguous IDs, incomplete records, unknown relationships, duplicate allocations, or non-half-day units fall back to the sample plan with a warning |
| Accessibility | Semantic table, labels, visible focus, keyboard-friendly details | Enables screen-reader and keyboard inspection of each editable field | Responsive view keeps the planning surface scrollable rather than clipping data |
