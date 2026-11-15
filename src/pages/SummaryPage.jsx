import { useState } from 'react';
import { Link } from 'react-router';
import { useTrip } from '../state/useTrip.js';
import { calculateSummary } from '../domain/summary.js';
import { isScheduled } from '../domain/itinerary.js';
import { formatMoney } from '../lib/formatMoney.js';
import CostBreakdown from '../components/budget/CostBreakdown.jsx';
import BudgetStatus from '../components/budget/BudgetStatus.jsx';
import DaySchedule from '../components/itinerary/DaySchedule.jsx';
import UnscheduledList from '../components/itinerary/UnscheduledList.jsx';
import Button from '../components/ui/Button.jsx';
import Notice from '../components/ui/Notice.jsx';
export default function SummaryPage() {
  const { trip } = useTrip(); const [visibleDays, setVisibleDays] = useState(7); let summary;
  try { summary = calculateSummary(trip); } catch (error) { return <><h1>Let’s check those amounts.</h1><Notice tone="error">{error.message}</Notice><Link to="/plan/details">Edit trip details</Link></>; }
  return <><div className="eyebrow">06 — YOUR NEXT CHAPTER</div><h1>{trip.country}, here you come.</h1><p className="page-intro">{trip.days} days · {Number(trip.days) - 1} nights · {trip.travelers} traveller{Number(trip.travelers) === 1 ? '' : 's'} · {trip.season} season</p>
    <div className="estimate-hero"><span className="eyebrow">FINAL GROUP ESTIMATE</span><p>{formatMoney(summary.total)}</p><span>{formatMoney(summary.perPerson)} per person · Including scheduled tickets</span></div>
    <CostBreakdown summary={summary} /><BudgetStatus summary={summary} budget={trip.budgetRM} />
    <div className="section-heading"><h2>Your itinerary</h2><Link to="/plan/itinerary">Edit itinerary ↗</Link></div>
    {Array.from({ length: Math.min(Number(trip.days), visibleDays) }, (_, index) => <DaySchedule key={index} day={index + 1} items={trip.attractions} />)}
    {visibleDays < Number(trip.days) && <Button variant="secondary" onClick={() => setVisibleDays(visibleDays + 7)}>Show next days</Button>}
    <UnscheduledList items={trip.attractions.filter(item => !isScheduled(item, trip.days))} />
    <p className="caption">All figures are estimates, not guaranteed prices. Your draft is saved in this browser when browser storage is available.</p><div className="planner-actions"><Button variant="secondary" to="/plan/details">Edit trip details</Button><Button to="/">Back to welcome ↗</Button></div>
  </>;
}
