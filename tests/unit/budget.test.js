import { describe, it, expect } from 'vitest';
import reference from '../fixtures/pythonExpectedResults.json';
import { calculateSummary, getBudgetStatus, roundMoney } from '../../src/domain/summary.js';
import { calculatePreliminary } from '../../src/domain/expenses.js';
import { sampleTrip, sampleAttraction } from '../fixtures/sampleTrips.js';

describe('Python budget parity', () => {
  it.each(reference.budgetCases)('matches $trip.region / $trip.season / $trip.dailyExpenses.meals.mode', ({ trip, expected }) => {
    const result = calculateSummary(sampleTrip({ ...trip, attractions: [sampleAttraction(1, { ticketPriceRMPerPerson: 30, scheduledDay: 1, scheduledSlot: 'Morning' })] }));
    for (const key of Object.keys(expected.breakdown)) expect(result.breakdown[key]).toBeCloseTo(expected.breakdown[key], 8);
    expect(result.total).toBe(expected.total);
    expect(result.remaining).toBe(expected.remaining);
    expect(result.perPerson).toBe(expected.per_person);
    expect(result.status).toBe(expected.status);
  });
  it.each(reference.rounding)('rounds $input like Python', ({ input, expected }) => expect(roundMoney(input)).toBe(expected));
  it('keeps finite large amounts finite during cent rounding', () => expect(roundMoney(1e307)).toBe(1e307));
  it('supports all three budget states at the rounded total', () => {
    const trip = sampleTrip(); const total = calculateSummary(trip).total;
    expect(calculateSummary({ ...trip, budgetRM: total + 0.01 }).status).toBe('WITHIN BUDGET');
    expect(calculateSummary({ ...trip, budgetRM: total }).status).toBe('AT BUDGET LIMIT');
    expect(calculateSummary({ ...trip, budgetRM: total - 0.01 }).status).toBe('EXCEEDING BUDGET');
    expect(getBudgetStatus(0)).toBe('AT BUDGET LIMIT');
  });
  it('does not charge unscheduled tickets or change prices based on focus', () => {
    const trip = sampleTrip(); const total = calculateSummary(trip).total;
    expect(calculateSummary({ ...trip, travelFocus: 'Rural areas', selectedPlaceIds: ['any'], attractions: [sampleAttraction(1, { ticketPriceRMPerPerson: 9999 })] }).total).toBe(total);
  });
  it('rejects overflowing totals even when individual input values are finite', () => {
    expect(() => calculatePreliminary(sampleTrip({ dailyExpenses: { meals: { mode: 'custom', customAmountRM: 1e308 }, miscellaneous: { mode: 'suggested' } } }))).toThrow('too large');
  });
});
