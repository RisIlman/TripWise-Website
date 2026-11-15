import { EXPENSE_SUGGESTION, SEASON_MULTIPLIERS } from '../data/pricing.js';
import { getPrices } from './pricing.js';
import { validateDetails, validateDestination, validateExpense, validateSpending } from './validation.js';

export function resolveDailyExpense(suggested, choice) {
  const error = validateExpense(choice);
  if (error) throw new Error(error);
  if (choice.mode === 'custom') return Number(choice.customAmountRM);
  if (choice.mode === 'increase') return suggested * (1 + Number(choice.percentage) / 100);
  if (choice.mode === 'decrease') return suggested * (1 - Number(choice.percentage) / 100);
  return suggested;
}

export function calculatePreliminary(trip) {
  if (Object.keys({ ...validateDestination(trip), ...validateDetails(trip), ...validateSpending(trip) }).length) throw new Error('Complete the trip details before calculating.');
  const prices = getPrices(trip.region, trip.country);
  const suggestions = EXPENSE_SUGGESTION[trip.region];
  const days = Number(trip.days), people = Number(trip.travelers);
  const costs = {
    accommodation: prices.accommodation * (days - 1) * people,
    public_transport: prices.public_transport * days * people,
    return_transport: prices.return_transport * SEASON_MULTIPLIERS[trip.season] * people,
    meals: resolveDailyExpense(suggestions.meals, trip.dailyExpenses.meals) * days * people,
    miscellaneous: resolveDailyExpense(suggestions.miscellaneous, trip.dailyExpenses.miscellaneous) * days * people,
  };
  if (!Object.values(costs).every(Number.isFinite) || !Number.isFinite(Object.values(costs).reduce((a, b) => a + b, 0))) throw new Error('These amounts are too large to calculate. Reduce the trip values.');
  return costs;
}
