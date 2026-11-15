import { Link } from 'react-router';
import { useTrip } from '../state/useTrip.js';
import { calculateSummary } from '../domain/summary.js';
import { formatMoney } from '../lib/formatMoney.js';
import CostBreakdown from '../components/budget/CostBreakdown.jsx';
import BudgetStatus from '../components/budget/BudgetStatus.jsx';
import PlannerActions from '../components/planner/PlannerActions.jsx';
import Notice from '../components/ui/Notice.jsx';
export default function EstimatePage() {
  const { trip } = useTrip(); let summary; try { summary = calculateSummary(trip, false); } catch (error) { return <><h1>Let’s check those amounts.</h1><Notice tone="error">{error.message}</Notice><Link to="/plan/details">Edit trip details</Link></>; }
  return <><div className="eyebrow">04 — THE BIG PICTURE</div><h1>Your trip, in numbers.</h1><p className="page-intro">A first look at what {trip.days} days in {trip.country} could cost.</p>
    <div className="estimate-hero"><span className="eyebrow">PRELIMINARY GROUP ESTIMATE</span><p>{formatMoney(summary.total)}</p><span>{formatMoney(summary.perPerson)} per person · Attraction tickets added next</span></div>
    <CostBreakdown summary={summary} /><BudgetStatus summary={summary} budget={trip.budgetRM} />
    <p className="caption">All figures are estimates, not guaranteed prices. <Link to="/plan/details">Edit trip details</Link> or <Link to="/plan/spending">adjust daily spending</Link>.</p>
    <PlannerActions back="/plan/spending" next="/plan/itinerary" nextLabel="Build my itinerary" />
  </>;
}
