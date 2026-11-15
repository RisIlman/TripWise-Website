# TripWise Web development instructions

## Scope and source of truth

- Read `TripWise_Web_Overview.md` for the screen sequence, design intent and acceptance criteria.
- Treat the completed [TripWise Python repository](https://github.com/RisIlman/TripWise-Budget-Tracker/tree/main) as the reference for business rules. Use `main.py` for the overall flow, `trip.py` for inputs, `pricing.py` for prices, `expenses.py` for estimates, `itinerary.py` for scheduling and `summary.py` for budget analysis.
- Use the original planning PDF for project context. Where it differs from the completed code, follow the code. In particular, the completed app uses country-specific ASEAN pricing.
- This planning handoff authorizes documentation only. Begin implementation or publication when the project owner requests that work.

## Welcome and planner flow

- Open on a welcome screen with an atlas-style map on the left and the heading “Welcome to TripWise” on the right. Use “Start planning” as the primary action.
- Offer region selection through the map and an equivalent labelled selector. Map selection should highlight or prefill the region. Let users confirm their selection in the planner and choose a country before selecting a travel focus.
- On narrow screens, keep the welcome message and primary action easy to reach. Support keyboard navigation, visible focus, and reduced motion. Use text as well as colour to communicate selection.
- Collect destination choices in this order: region → country → travel focus (City-focused, Nature-focused or Rural areas). Show researched places for that country and focus when available. Then collect the remaining trip details and daily spending. Show the preliminary estimate before itinerary planning. Finish with the final budget and itinerary. Preserve entered values when users go back and recalculate when a dependency changes.
- Keep the pricing guide available from the welcome and planning screens. Show source rates with their applicable units and use RM throughout.

## Business rules

- Support overseas round trips from KLIA. Use the region options and ASEAN country list from `pricing.py`. Use the existing ASEAN country selector and keep the non-ASEAN country text input until researched country options are available. Reject Malaysia and blank country names. Require at least two whole travel days, at least one whole traveller, and a positive total budget. Nights equal days minus one.
- Use the Python rates and suggestions. The country determines accommodation, local transport and airfare in ASEAN. Elsewhere the region determines these rates. The region determines meal and miscellaneous suggestions. Low, Normal and Peak multiply airfare by 0.85, 1.00 and 1.40 respectively.
- Support suggested, percentage increase, percentage decrease and custom daily amounts for each editable expense. Validate finite amounts and allow zero custom expenses. A decrease cannot exceed 100%.
- Schedule optional attractions in morning, afternoon and evening slots. Use `itinerary.py` for the initial sorting, same-area placement preference and slot fallback order. Support adding, removing and moving attractions. Reject occupied move targets and list any unscheduled entries. Only scheduled tickets count toward the budget.
- Show the group and per-person breakdown, trip total and remaining budget or shortfall. Preserve the original three budget states and show the largest expense when the estimate exceeds the budget. Label rates and totals as estimates.

## Destination research

- Treat travel focus as a filter for places within the selected country. Place records and their focus assignments are pending research. Keep the planner usable where research is incomplete and explain when a country and focus have no researched places.
- Keep destination research separate from the Python pricing rules. Travel focus and place selection do not affect budget calculations unless pricing rules are explicitly updated later.
- Clear country, focus and place selections that become invalid when a parent selection changes. Keep unrelated trip inputs.

## Implementation and verification

- Reuse existing planner logic when available. Keep rate data, calculations and scheduling independent of UI rendering. Read the existing web source before selecting a framework or replacing working logic.
- Verify outputs against the Python version for an ASEAN country and a non-ASEAN region. Check each season, meal and miscellaneous overrides, a full schedule, an occupied move target, and all three budget states.
- Verify the full welcome-to-summary path by keyboard and at desktop and mobile widths. Confirm that revisiting earlier answers updates totals and that itinerary entries outside a shortened trip stay visible as unscheduled until rescheduled or removed.
