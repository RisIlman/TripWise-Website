import { useTrip } from '../../state/useTrip.js';
import { formatMoney } from '../../lib/formatMoney.js';
export default function TripSnapshot() {
  const { trip } = useTrip();
  return <aside className="trip-snapshot"><div className="eyebrow">YOUR NEXT CHAPTER</div><h2>{trip.country || 'Somewhere new'}</h2><p>{trip.region || 'The world is waiting.'}</p>
    <dl><div><dt>Departing from</dt><dd>KLIA ↗</dd></div><div><dt>Duration</dt><dd>{trip.days || '—'} days</dd></div><div><dt>Travellers</dt><dd>{trip.travelers || '—'}</dd></div><div><dt>Group budget</dt><dd>{trip.budgetRM === '' ? 'To be decided' : formatMoney(Number(trip.budgetRM))}</dd></div></dl>
    <div className="snapshot-note">A little planning.<br />A lot to look forward to.</div><p className="caption">All figures are estimates in RM.</p>
  </aside>;
}
