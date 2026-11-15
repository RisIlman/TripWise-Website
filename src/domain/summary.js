import { calculatePreliminary } from './expenses.js';
import { attractionTotal } from './itinerary.js';

export const EXPENSE_LABELS = {
  accommodation: 'Accommodation', public_transport: 'Local transport', return_transport: 'Return flights',
  meals: 'Meals', miscellaneous: 'Miscellaneous', attractions: 'Attraction tickets',
};

// Round the exact binary float to cents, with Python's ties-to-even rule.
export function roundMoney(value) {
  if (!Number.isFinite(value)) throw new Error('A finite amount is required.');
  if (value === 0) return 0;
  const view = new DataView(new ArrayBuffer(8));
  view.setFloat64(0, Math.abs(value));
  const bits = view.getBigUint64(0);
  const exponent = Number((bits >> 52n) & 0x7ffn);
  const mantissa = (bits & ((1n << 52n) - 1n)) + (exponent ? 1n << 52n : 0n);
  const power = (exponent || 1) - 1023 - 52;
  const numerator = power >= 0 ? (mantissa * 100n) << BigInt(power) : mantissa * 100n;
  const denominator = power >= 0 ? 1n : 1n << BigInt(-power);
  let cents = numerator / denominator;
  const remainder = numerator % denominator;
  if (remainder * 2n > denominator || (remainder * 2n === denominator && cents % 2n === 1n)) cents += 1n;
  return Math.sign(value) * Number(`${cents / 100n}.${String(cents % 100n).padStart(2, '0')}`);
}

export function getBudgetStatus(remaining) {
  return remaining > 0 ? 'WITHIN BUDGET' : remaining < 0 ? 'EXCEEDING BUDGET' : 'AT BUDGET LIMIT';
}

export function calculateSummary(trip, includeAttractions = true) {
  const breakdown = calculatePreliminary(trip);
  if (includeAttractions) breakdown.attractions = attractionTotal(trip.attractions, trip.travelers, trip.days);
  const rawTotal = Object.values(breakdown).reduce((sum, cost) => sum + cost, 0);
  if (!Number.isFinite(rawTotal)) throw new Error('These amounts are too large to calculate. Reduce the trip values.');
  const total = roundMoney(rawTotal);
  const remaining = roundMoney(Number(trip.budgetRM) - total);
  const people = Number(trip.travelers);
  return {
    breakdown,
    breakdownPerPerson: Object.fromEntries(Object.entries(breakdown).map(([key, value]) => [key, value / people])),
    total, perPerson: total / people, remaining, remainingPerPerson: remaining / people,
    status: getBudgetStatus(remaining),
    largestExpense: Object.keys(breakdown).reduce((largest, key) => breakdown[key] > breakdown[largest] ? key : largest),
  };
}
