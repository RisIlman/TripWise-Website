import { createContext, useContext } from 'react';
export const TripContext = createContext(null);
export function useTrip() {
  const context = useContext(TripContext);
  if (!context) throw new Error('TripProvider is required.');
  return context;
}
