import { createTrip } from '../state/tripReducer.js';
import { SLOTS, reconcileDays } from '../domain/itinerary.js';

const KEY = 'tripwise:draft:v1';
const scalar = value => typeof value === 'string' || (typeof value === 'number' && Number.isFinite(value));

export function loadTrip() {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY));
    if (!parsed || parsed.schemaVersion !== 1) return createTrip();
    const trip = createTrip();
    for (const key of ['region', 'country', 'travelFocus', 'season']) if (typeof parsed[key] === 'string') trip[key] = parsed[key];
    for (const key of ['days', 'travelers', 'budgetRM']) if (scalar(parsed[key])) trip[key] = parsed[key];
    trip.selectedPlaceIds = Array.isArray(parsed.selectedPlaceIds) ? parsed.selectedPlaceIds.filter(id => typeof id === 'string') : [];
    for (const key of ['meals', 'miscellaneous']) {
      const choice = parsed.dailyExpenses?.[key];
      if (choice && ['suggested', 'increase', 'decrease', 'custom'].includes(choice.mode) && scalar(choice.percentage) && scalar(choice.customAmountRM)) trip.dailyExpenses[key] = choice;
    }
    trip.attractions = Array.isArray(parsed.attractions) ? parsed.attractions.filter(item =>
      item && typeof item.id === 'string' && typeof item.name === 'string' && typeof item.area === 'string' &&
      Number.isFinite(item.ticketPriceRMPerPerson) && item.ticketPriceRMPerPerson >= 0 && SLOTS.includes(item.preferredSlot) &&
      (item.scheduledDay === null || Number.isInteger(item.scheduledDay)) && (item.scheduledSlot === null || SLOTS.includes(item.scheduledSlot))
    ) : [];
    trip.attractions = reconcileDays(trip.attractions, trip.days);
    trip.itineraryInitialized = parsed.itineraryInitialized === true;
    return trip;
  } catch { return createTrip(); }
}

export function saveTrip(trip) {
  try { localStorage.setItem(KEY, JSON.stringify(trip)); return true; }
  catch { return false; }
}
