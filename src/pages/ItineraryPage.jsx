import { useState } from 'react';
import { useTrip } from '../state/useTrip.js';
import { attractionTotal, isScheduled } from '../domain/itinerary.js';
import { formatMoney } from '../lib/formatMoney.js';
import AttractionForm from '../components/itinerary/AttractionForm.jsx';
import DaySchedule from '../components/itinerary/DaySchedule.jsx';
import UnscheduledList from '../components/itinerary/UnscheduledList.jsx';
import Button from '../components/ui/Button.jsx';
import Notice from '../components/ui/Notice.jsx';
import PlannerActions from '../components/planner/PlannerActions.jsx';
export default function ItineraryPage() {
  const { trip, dispatch } = useTrip(); const [visibleDays, setVisibleDays] = useState(7); const [message, setMessage] = useState('');
  const daysToShow = Math.min(Number(trip.days), visibleDays);
  const unscheduled = trip.attractions.filter(item => !isScheduled(item, trip.days));
  return <><div className="eyebrow">05 — MAKE THE DAYS YOURS</div><h1>A plan with possibilities.</h1><p className="page-intro">Add the places you’re looking forward to. We’ll group nearby stops and find a time for them.</p>
    <AttractionForm onAdd={item => { dispatch({ type: 'addAttraction', item }); setMessage(`${item.name} added${trip.itineraryInitialized ? '.' : '. Build the schedule when your list is ready.'}`); }} />
    {message && <Notice>{message}</Notice>}
    {!trip.itineraryInitialized && trip.attractions.length > 0 && <div className="schedule-cta"><p>Your places are ready. Let’s put them in order.</p><Button onClick={() => { dispatch({ type: 'schedule' }); setMessage('Schedule built. Review your days and any unscheduled attractions below.'); }}>Build my schedule ↗</Button></div>}
    <div className="section-heading"><h2>Your days at a glance</h2><span className="caption">3 time slots each day</span></div>
    {Array.from({ length: daysToShow }, (_, index) => <DaySchedule key={index} day={index + 1} items={trip.attractions} editable />)}
    {daysToShow < Number(trip.days) && <Button variant="secondary" onClick={() => setVisibleDays(visibleDays + 7)}>Show next days</Button>}
    <UnscheduledList items={unscheduled} editable />
    <div className="ticket-total"><span>Scheduled tickets · group estimate</span><strong>{formatMoney(attractionTotal(trip.attractions, trip.travelers, trip.days))}</strong></div>
    <p className="caption">Attractions are optional. Continue with free time if you prefer to decide along the way.</p><PlannerActions back="/plan/estimate" next="/plan/summary" nextLabel="See final summary" />
  </>;
}
