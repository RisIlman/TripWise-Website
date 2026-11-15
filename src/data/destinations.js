export const TRAVEL_FOCUSES = ['City-focused', 'Nature-focused', 'Rural areas'];

// Publish records only after their country, focus assignments and sources are researched.
// Shape: { id, country, name, area, focusTags, description, sourceUrls, researchedAt }
export const DESTINATIONS = [];

export function getPlaces(country, focus) {
  return DESTINATIONS.filter(place => place.country === country && place.focusTags.includes(focus));
}
