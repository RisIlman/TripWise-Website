import { getPlaces } from '../data/destinations.js';
import { assignToDays, placeAttraction, reconcileDays } from '../domain/itinerary.js';

export function createTrip() {
  return {
    schemaVersion: 1, region: '', country: '', travelFocus: '', selectedPlaceIds: [],
    days: 5, travelers: 1, budgetRM: '', season: 'Normal',
    dailyExpenses: {
      meals: { mode: 'suggested', percentage: '', customAmountRM: '' },
      miscellaneous: { mode: 'suggested', percentage: '', customAmountRM: '' },
    },
    attractions: [], itineraryInitialized: false,
  };
}

export function tripReducer(state, action) {
  switch (action.type) {
    case 'reset': return createTrip();
    case 'region':
      return action.value === state.region ? state : { ...state, region: action.value, country: '', travelFocus: '', selectedPlaceIds: [] };
    case 'country':
      return action.value === state.country ? state : { ...state, country: action.value, travelFocus: '', selectedPlaceIds: [] };
    case 'focus': {
      const valid = getPlaces(state.country, action.value).map(place => place.id);
      return { ...state, travelFocus: action.value, selectedPlaceIds: state.selectedPlaceIds.filter(id => valid.includes(id)) };
    }
    case 'place': return { ...state, selectedPlaceIds: state.selectedPlaceIds.includes(action.id) ? state.selectedPlaceIds.filter(id => id !== action.id) : [...state.selectedPlaceIds, action.id] };
    case 'details': {
      const next = { ...state, ...action.values };
      if (Number.isInteger(Number(next.days)) && Number(next.days) >= 2) next.attractions = reconcileDays(state.attractions, next.days);
      return next;
    }
    case 'expense': return { ...state, dailyExpenses: { ...state.dailyExpenses, [action.key]: { ...state.dailyExpenses[action.key], ...action.values } } };
    case 'addAttraction': {
      const item = state.itineraryInitialized ? placeAttraction(state.attractions, action.item, Number(state.days)) : action.item;
      return { ...state, attractions: [...state.attractions, item] };
    }
    case 'schedule': return { ...state, attractions: assignToDays(state.attractions, state.days), itineraryInitialized: true };
    case 'removeAttraction': return { ...state, attractions: state.attractions.filter(item => item.id !== action.id) };
    case 'setAttractions': return { ...state, attractions: action.items };
    default: return state;
  }
}
