import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTrip } from '../state/useTrip.js';
import { validateDestination } from '../domain/validation.js';
import { getPlaces } from '../data/destinations.js';
import RegionSelector from '../components/destination/RegionSelector.jsx';
import CountryField from '../components/destination/CountryField.jsx';
import TravelFocusSelector from '../components/destination/TravelFocusSelector.jsx';
import PlaceCard from '../components/destination/PlaceCard.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import PlannerActions from '../components/planner/PlannerActions.jsx';
export default function DestinationPage() {
  const { trip, dispatch } = useTrip(); const navigate = useNavigate(); const [errors, setErrors] = useState({});
  const places = getPlaces(trip.country, trip.travelFocus);
  function submit(event) { event.preventDefault(); const found = validateDestination(trip); setErrors(found); if (!Object.keys(found).length) navigate('/plan/details'); else requestAnimationFrame(() => document.querySelector('[aria-invalid="true"], .radio-field input')?.focus()); }
  return <><div className="eyebrow">01 — THE DESTINATION</div><h1>Where are we going?</h1><p className="page-intro">Start with a place. We’ll help with the rest.</p><form noValidate onSubmit={submit}>
    <div className="form-panel"><RegionSelector value={trip.region} onChange={value => dispatch({ type: 'region', value })} error={errors.region} />
      {trip.region && <CountryField region={trip.region} value={trip.country} onChange={value => dispatch({ type: 'country', value })} error={errors.country} />}
      {trip.country.trim() && <TravelFocusSelector value={trip.travelFocus} onChange={value => dispatch({ type: 'focus', value })} error={errors.travelFocus} />}
    </div>
    {trip.travelFocus && <section className="places-section"><h2>A little inspiration</h2><p className="caption">Your travel focus filters places. It does not change your estimated rates.</p>{places.length ? places.map(place => <PlaceCard key={place.id} place={place} selected={trip.selectedPlaceIds.includes(place.id)} onToggle={() => dispatch({ type: 'place', id: place.id })} />) : <EmptyState title="Your route is still yours to discover">We haven’t researched {trip.travelFocus.toLowerCase()} places in {trip.country} yet. Continue with your budget and add your own attractions in the itinerary.</EmptyState>}</section>}
    <PlannerActions back="/" />
  </form></>;
}
