import { describe, it, expect } from 'vitest';
import { validateDestination, validateDetails, validateExpense, validateAttraction } from '../../src/domain/validation.js';
import { sampleTrip, sampleAttraction } from '../fixtures/sampleTrips.js';

describe('input boundaries', () => {
  it('rejects blank, Malaysian and invalid ASEAN destinations', () => {
    for (const country of ['', '  ', ' Malaysia ', 'Japan']) expect(validateDestination(sampleTrip({ country })).country).toBeTruthy();
    expect(validateDestination(sampleTrip({ region: 'West Europe', country: 'France' }))).toEqual({});
  });
  it('requires whole travel days and people, and a finite positive budget', () => {
    for (const days of ['', 0, 1, 2.5, Infinity, NaN]) expect(validateDetails(sampleTrip({ days })).days).toBeTruthy();
    for (const travelers of [0, -1, 1.5, Infinity]) expect(validateDetails(sampleTrip({ travelers })).travelers).toBeTruthy();
    for (const budgetRM of ['', 0, -1, 'Infinity', NaN]) expect(validateDetails(sampleTrip({ budgetRM })).budgetRM).toBeTruthy();
    expect(validateDetails(sampleTrip())).toEqual({});
  });
  it('allows free expenses and a 100% decrease but rejects invalid amounts', () => {
    expect(validateExpense({ mode: 'custom', customAmountRM: 0 })).toBe('');
    expect(validateExpense({ mode: 'decrease', percentage: 100 })).toBe('');
    for (const percentage of [101, -1, 0, Infinity, '']) expect(validateExpense({ mode: 'decrease', percentage })).toBeTruthy();
    for (const customAmountRM of ['', -1, Infinity]) expect(validateExpense({ mode: 'custom', customAmountRM })).toBeTruthy();
    expect(validateAttraction(sampleAttraction(1, { ticketPriceRMPerPerson: 0 }))).toEqual({});
    expect(validateAttraction(sampleAttraction(1, { name: '  ' })).name).toBeTruthy();
  });
});
