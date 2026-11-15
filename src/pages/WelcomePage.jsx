import { useTrip } from '../state/useTrip.js';
import { earliestIncompleteStep } from '../domain/validation.js';
import Button from '../components/ui/Button.jsx';
import RegionMap from '../components/destination/RegionMap.jsx';
import RegionSelector from '../components/destination/RegionSelector.jsx';
export default function WelcomePage() {
  const { trip, dispatch } = useTrip();
  const selectRegion = value => dispatch({ type: 'region', value });
  return <div className="welcome-page"><div className="welcome-topline"><span className="eyebrow"><span className="small-star">✳</span> BIG PLANS. THOUGHTFUL BUDGETS.</span><span className="caption">Your next adventure starts here</span></div>
    <section className="welcome-hero"><div className="welcome-map"><RegionMap value={trip.region} onChange={selectRegion} /></div>
      <div className="welcome-copy"><div className="eyebrow">A LITTLE PLAN GOES A LONG WAY</div><h1>Welcome to{' '}<br /><span>TripWise.</span></h1><p className="hero-description">More exploring.{' '}<br />Less “can I afford this?”</p><p className="hero-support">Find your next destination, make your budget go further, and put a little adventure on the itinerary.</p>
        <RegionSelector value={trip.region} onChange={selectRegion} />
        <Button to="/plan/destination" className="start-button">Start planning <span aria-hidden="true">↗</span></Button>
        {trip.country && <Button variant="text" to={earliestIncompleteStep(trip) || '/plan/summary'}>Resume your {trip.country} plan →</Button>}
        <p className="welcome-footnote">No account needed. Just a place in mind.</p>
      </div></section>
    <section className="welcome-features" aria-label="How TripWise helps"><div><span className="feature-number">01 /</span><h2>Pick your somewhere.</h2><p>A city break, an open trail, or the slower road.</p></div><div><span className="feature-number">02 /</span><h2>Know before you go.</h2><p>Flights, stays, food. A clearer picture in RM.</p></div><div><span className="feature-number">03 /</span><h2>Make the days yours.</h2><p>A flexible itinerary, with room to wander.</p></div></section>
  </div>;
}
