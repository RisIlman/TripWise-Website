import { createTrip } from '../../src/state/tripReducer.js';
export function sampleTrip(overrides = {}) {
  return { ...createTrip(), region: 'ASEAN', country: 'Thailand', travelFocus: 'City-focused', days: 5, travelers: 2, budgetRM: 5000, ...overrides };
}
export function sampleAttraction(index, overrides = {}) {
  return { id: `attraction-${index}`, name: `Stop ${index}`, area: 'Old Town', ticketPriceRMPerPerson: 20, preferredSlot: 'Morning', scheduledDay: null, scheduledSlot: null, ...overrides };
}
