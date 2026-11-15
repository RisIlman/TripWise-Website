import { ASEAN_COUNTRIES, REGIONS, SEASON_MULTIPLIERS } from '../data/pricing.js';
import { TRAVEL_FOCUSES } from '../data/destinations.js';

export const isNumber = value => value !== '' && value !== null && value !== undefined && Number.isFinite(Number(value));

export function validateDestination(trip) {
  const errors = {};
  if (!REGIONS.includes(trip.region)) errors.region = 'Choose a destination region.';
  if (!trip.country.trim()) errors.country = 'Enter a destination country.';
  else if (trip.country.trim().toLowerCase() === 'malaysia') errors.country = 'Choose a country outside Malaysia. Trips depart from KLIA.';
  else if (trip.region === 'ASEAN' && !ASEAN_COUNTRIES.includes(trip.country)) errors.country = 'Choose a country from the ASEAN list.';
  if (!TRAVEL_FOCUSES.includes(trip.travelFocus)) errors.travelFocus = 'Choose a travel focus.';
  return errors;
}

export function validateDetails(trip) {
  const errors = {};
  if (!isNumber(trip.days) || !Number.isSafeInteger(Number(trip.days)) || Number(trip.days) < 2) errors.days = 'Enter at least 2 whole travel days.';
  if (!isNumber(trip.travelers) || !Number.isSafeInteger(Number(trip.travelers)) || Number(trip.travelers) < 1) errors.travelers = 'Enter at least 1 whole traveller.';
  if (!isNumber(trip.budgetRM) || Number(trip.budgetRM) <= 0) errors.budgetRM = 'Enter a finite total budget greater than RM 0.';
  if (!(trip.season in SEASON_MULTIPLIERS)) errors.season = 'Choose a travel season.';
  return errors;
}

export function validateExpense(choice) {
  if (!choice || !['suggested', 'increase', 'decrease', 'custom'].includes(choice.mode)) return 'Choose how to set this expense.';
  if (choice.mode === 'suggested') return '';
  const value = choice.mode === 'custom' ? choice.customAmountRM : choice.percentage;
  if (!isNumber(value) || Number(value) < 0) return 'Enter a finite amount of zero or more.';
  if (choice.mode !== 'custom' && Number(value) <= 0) return 'Enter a percentage greater than zero, or use the suggestion.';
  if (choice.mode === 'decrease' && Number(value) > 100) return 'A decrease cannot exceed 100%.';
  return '';
}

export function validateSpending(trip) {
  return Object.fromEntries(['meals', 'miscellaneous'].map(key => [key, validateExpense(trip.dailyExpenses[key])]).filter(([, error]) => error));
}

export function validateAttraction(item) {
  const errors = {};
  if (!item.name.trim()) errors.name = 'Enter an attraction name.';
  if (!isNumber(item.ticketPriceRMPerPerson) || Number(item.ticketPriceRMPerPerson) < 0) errors.ticketPriceRMPerPerson = 'Enter a finite ticket price of zero or more.';
  if (!['Morning', 'Afternoon', 'Evening'].includes(item.preferredSlot)) errors.preferredSlot = 'Choose a time slot.';
  return errors;
}

export function earliestIncompleteStep(trip) {
  if (Object.keys(validateDestination(trip)).length) return '/plan/destination';
  if (Object.keys(validateDetails(trip)).length) return '/plan/details';
  if (Object.keys(validateSpending(trip)).length) return '/plan/spending';
  return null;
}
