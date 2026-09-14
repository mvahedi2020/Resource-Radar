# Sample walkthrough: resolve a capacity conflict

This walkthrough uses only the fictional Northstar plan. It demonstrates the decision the sample supports; it does not forecast delivery or recommend a staffing action.

## Start with the seeded constraint

Start from the seeded plan by choosing **Reset sample** if the browser contains earlier local changes; reset replaces the saved local scenario with the fictional fixtures. Open **Plan** and find **Noah Williams** in the **Sep 28** column. His weekly capacity is 5 person-days, time off is 5, and non-project commitments are 0. The result is **0 available**. The same cell still includes **1 day** of Signal accounts work, so the planning surface marks the person-week as a conflict and Signal accounts as at risk.

The useful question is not “can the dashboard make the work fit?” It is “what choice should the planning group inspect before making a commitment?” The zero availability is a capacity signal. It does not predict a missed date or identify a person who should absorb the work.

## Make an explicit draft choice

Change **Noah Williams, Signal accounts, Sep 28 person-days** from **1** to **0**. Allocation fields accept 0–10 person-days in half-day increments, so the sample supports a precise change without inventing a recommendation. The draft now removes work from an unavailable week and the related initiative-risk signal updates.

This is a tradeoff: removing the day resolves Noah's Sep 28 conflict in this scenario, but it does not establish where the work goes or whether the initiative should retain its scope. Signal accounts can remain at risk because its other allocations include a separate overloaded person-week. A planning lead can use the draft to compare options, then discuss deferral, a different week, or a different allocation with the people who own the work.

## Compare, apply, or discard

Open **Scenarios** to compare the editable draft with the applied baseline, then return to **Plan** to choose **Apply draft** or **Undo draft**. Until **Apply draft** is selected, the original plan remains the baseline. Choose Apply only when the group intends to retain this fictional scenario in the current browser; applied plans persist locally. Choose Undo when the option was only an inspection, or use **Export draft** to create a local JSON discussion copy.

The distinction is deliberate. Drafts are not retained across refreshes until they are applied, and exported data never leaves the device through the sample. A resolved conflict is still not a delivery forecast. The next product question is whether planning practitioners can explain that boundary and the arithmetic without help; the [evaluation plan](Measures.md) defines the proposed study and guardrails.
