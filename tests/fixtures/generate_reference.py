"""Regenerate fixtures: python3 tests/fixtures/generate_reference.py /path/to/python-reference

The directory must contain the original pricing.py, trip.py, expenses.py,
itinerary.py and summary.py from the completed TripWise Python repository.
"""
import hashlib
import json
from pathlib import Path
import sys

reference = Path(sys.argv[1]).resolve()
sys.path.insert(0, str(reference))
import pricing  # noqa: E402
import expenses  # noqa: E402
import itinerary  # noqa: E402
import summary  # noqa: E402

cases = []
choices = [
    ({"mode": "suggested", "percentage": "", "customAmountRM": ""}, {"mode": "suggested", "percentage": "", "customAmountRM": ""}),
    ({"mode": "increase", "percentage": 25, "customAmountRM": ""}, {"mode": "decrease", "percentage": 50, "customAmountRM": ""}),
    ({"mode": "custom", "percentage": "", "customAmountRM": 0}, {"mode": "custom", "percentage": "", "customAmountRM": 12.75}),
]

def resolve(choice, suggested):
    if choice['mode'] == 'custom': return choice['customAmountRM']
    if choice['mode'] == 'increase': return suggested * (1 + choice['percentage'] / 100)
    if choice['mode'] == 'decrease': return suggested * (1 - choice['percentage'] / 100)
    return suggested

for region, country in [('ASEAN', 'Thailand'), ('West Europe', 'France')]:
    for season in pricing.SEASON_MULTIPLIERS:
        for meal_choice, misc_choice in choices:
            trip = dict(region=region, country=country, days=5, nights=4, travelers=2, budget=5000, season=season)
            costs = expenses.calculate_regional_costs(trip)
            suggestions = pricing.EXPENSE_SUGGESTION[region]
            costs['meals'] = resolve(meal_choice, suggestions['meals']) * 5 * 2
            costs['miscellaneous'] = resolve(misc_choice, suggestions['miscellaneous']) * 5 * 2
            final = summary.calculate_final_budget(costs, 60, 2, 5000)
            cases.append({
                'trip': dict(region=region, country=country, days=5, travelers=2, budgetRM=5000, season=season, travelFocus='City-focused', dailyExpenses=dict(meals=meal_choice, miscellaneous=misc_choice)),
                'expected': final,
            })

attractions = [
    dict(name='Z Museum', area='West', slot='Evening', price=10, day=None),
    dict(name='A Walk', area='Old Town', slot='Morning', price=0, day=None),
    dict(name='B Gallery', area='Old Town', slot='Morning', price=20, day=None),
    dict(name='C Garden', area='Old Town', slot='Evening', price=5, day=None),
    dict(name='D Market', area='Unspecified', slot='Morning', price=0, day=None),
    dict(name='E Tower', area='West', slot='Evening', price=30, day=None),
    dict(name='F Overflow', area='West', slot='Afternoon', price=999, day=None),
]
original = [dict(item) for item in attractions]
itinerary.assign_to_days(attractions, 2)
fixture = {
    'source': 'https://github.com/RisIlman/TripWise-Budget-Tracker/tree/main',
    'sourceSha256': {name: hashlib.sha256((reference / name).read_bytes()).hexdigest() for name in ['pricing.py', 'expenses.py', 'itinerary.py', 'summary.py', 'trip.py']},
    'budgetCases': cases,
    'schedule': dict(input=original, expected=attractions, groupTotal=itinerary.calculate_attraction_total(attractions, 2)),
    'rounding': [{'input': value, 'expected': round(value, 2)} for value in [1.125, 1.375, 2.675, -1.125, 0.005, 4690.285, 4095.995]],
}
Path(__file__).with_name('pythonExpectedResults.json').write_text(json.dumps(fixture, indent=2) + '\n')
print(f'Generated {len(cases)} budget cases, scheduling and rounding fixtures from Python.')
