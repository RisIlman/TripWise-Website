import { useEffect, useReducer, useRef } from 'react';
import { tripReducer } from './tripReducer.js';
import { TripContext } from './useTrip.js';
import { loadTrip, saveTrip } from '../lib/storage.js';

export default function TripProvider({ children }) {
  const [trip, dispatch] = useReducer(tripReducer, undefined, loadTrip);
  const saveNotice = useRef(null);
  useEffect(() => {
    const saved = saveTrip(trip);
    if (saveNotice.current) saveNotice.current.textContent = saved ? '' : 'Browser saving is unavailable. Your plan will remain available in this tab until you reload.';
  }, [trip]);
  return <TripContext.Provider value={{ trip, dispatch }}>
    <div className="storage-notice" ref={saveNotice} role="status" />
    {children}
  </TripContext.Provider>;
}
