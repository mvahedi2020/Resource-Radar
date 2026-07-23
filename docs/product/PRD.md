# Product Requirements Document (PRD): Resource Radar

## 1. Executive Summary
**Vision:** Resource Radar is the ultimate capacity planning tool for modern agile teams. It replaces static Excel spreadsheets with a dynamic, real-time heatmap of engineer bandwidth, preventing burnout and ensuring predictable sprint deliveries.
**Target Audience:** Engineering Managers, Scrum Masters, and Technical Program Managers (TPMs).

## 2. Problem Statement
Sprints frequently fail not because the code is too hard, but because points are assigned blindly. Without a centralized view of capacity vs. assigned load, top-performing engineers become bottlenecks and inevitably burn out.

## 3. Product Goals & Success Metrics
- **Goal 1:** Provide a 1-click view of team capacity across multiple concurrent projects.
- **Goal 2:** Alert managers proactively when a developer is assigned >100% of their velocity.
- **Success Metrics:**
  - `Burnout Prevention`: Reduce the number of engineers assigned >120% capacity to 0.
  - `Sprint Predictability`: Increase the percentage of sprints that deliver 100% of committed points from 60% to 85%.

## 4. Key Features & Requirements
### 4.1 Capacity Heatmap UI
- **Description:** A matrix showing Developers (Rows) and Sprints/Weeks (Columns).
- **Acceptance Criteria:**
  - Each cell displays Assigned Points / Capacity Points.
  - Cells change color dynamically: Green (<80%), Amber (80-100%), Red (>100%).

### 4.2 Auto-Sync with Jira/Linear
- **Description:** Two-way synchronization with issue trackers to keep the heatmap accurate without manual data entry.
- **Acceptance Criteria:**
  - If a 5-point ticket is assigned to Elena in Jira, her Resource Radar capacity instantly drops by 5 points.

## 5. Security & Data Privacy
- **Role-Based Access Control:** Individual Contributors can only see their own capacity and the aggregated team capacity. Only Managers can see the individual capacities of other team members to prevent unhealthy internal competition.

## 6. Future Considerations
Implement a "What-If" scenario builder. E.g., "If we bring forward the Q3 Roadmap by 2 weeks, who becomes the bottleneck?"
