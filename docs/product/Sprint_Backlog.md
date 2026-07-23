# Sprint Backlog: Resource Radar

## Sprint Goal
Deliver the interactive Capacity Heatmap so engineering managers can begin assigning mock sprint points and visualizing bandwidth constraints.

## Current Sprint (Sprint 8)

### 1. [Feature] CapacityPlanner UI Component (5 Story Points)
**Description:** Implement the matrix UI where rows are developers and columns are their capacity metrics.
**Acceptance Criteria:**
- Map over the mock `developers` array to render rows.
- Display `assignedPoints` out of `capacityPoints`.
- The UI must use the premium dark-mode glassmorphic theme.
**Assignee:** Alex K. (Frontend)

### 2. [Feature] Dynamic Heatmap Logic (3 Story Points)
**Description:** The progress bar for each developer must change color based on their load percentage.
**Acceptance Criteria:**
- Write a utility function `calculateLoadState(assigned, capacity)` returning "SAFE", "WARNING", or "DANGER".
- Bind "SAFE" to Green (`bg-emerald-500`), "WARNING" to Amber (`bg-amber-500`), and "DANGER" to Red (`bg-red-500`).
**Assignee:** Sarah J. (Frontend)

### 3. [Design] Developer Avatars & Tooltips (2 Story Points)
**Description:** Enhance the UI by adding circular avatars for developers and a hover tooltip explaining their capacity state.
**Acceptance Criteria:**
- Use a placeholder avatar service (e.g., UI Faces).
- Hovering over a Red progress bar triggers a tooltip saying: "Critical Load: Elena is assigned 24 pts but only has capacity for 20 pts."
**Assignee:** David L. (Design)

## Backlog (Next Sprint)
- [Integration] Build the two-way sync webhooks for Jira Cloud.
- [Feature] Allow managers to drag-and-drop story points between developers to instantly re-balance the team.
