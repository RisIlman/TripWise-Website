import { it, expect } from 'vitest';
import { tripReducer } from '../../src/state/tripReducer.js';
import { sampleTrip, sampleAttraction } from '../fixtures/sampleTrips.js';
import { calculateSummary } from '../../src/domain/summary.js';

it('clears invalid child selections while preserving unrelated inputs', () => {
  const trip = sampleTrip({ selectedPlaceIds: ['old-place'] });
  const next = tripReducer(trip, { type: 'region', value: 'West Europe' });
  expect([next.country, next.travelFocus, next.selectedPlaceIds]).toEqual(['', '', []]);
  expect([next.days, next.travelers, next.budgetRM, next.dailyExpenses]).toEqual([trip.days, trip.travelers, trip.budgetRM, trip.dailyExpenses]);
  expect(tripReducer(trip, { type: 'region', value: 'ASEAN' })).toBe(trip);
});

it('retains displaced attractions as unscheduled when shortening a trip', () => {
  const trip = sampleTrip({ attractions: [sampleAttraction(1, { scheduledDay: 4, scheduledSlot: 'Morning' })] });
  const shortened = tripReducer(trip, { type: 'details', values: { days: 2 } });
  expect(shortened.attractions).toHaveLength(1);
  expect(shortened.attractions[0].scheduledDay).toBeNull();
  expect(calculateSummary(shortened).breakdown.attractions).toBe(0);
  expect(tripReducer(shortened, { type: 'details', values: { days: 5 } }).attractions[0].scheduledDay).toBeNull();
});

it('does not discard scheduling while a day field is temporarily empty', () => {
  const trip = sampleTrip({ attractions: [sampleAttraction(1, { scheduledDay: 4, scheduledSlot: 'Morning' })] });
  expect(tripReducer(trip, { type: 'details', values: { days: '' } }).attractions[0].scheduledDay).toBe(4);
});

it('recalculates suggested and percentage choices when the region changes', () => {
  const trip = sampleTrip();
  trip.dailyExpenses.meals = { mode: 'increase', percentage: 20, customAmountRM: '' };
  trip.dailyExpenses.miscellaneous = { mode: 'custom', percentage: '', customAmountRM: 10 };
  const original = calculateSummary(trip);
  const next = { ...tripReducer(trip, { type: 'region', value: 'West Europe' }), country: 'France', travelFocus: 'Nature-focused' };
  const updated = calculateSummary(next);
  expect(original.breakdown.meals).toBe(720);
  expect(updated.breakdown.meals).toBe(1560);
  expect(updated.breakdown.miscellaneous).toBe(original.breakdown.miscellaneous);
});
