import { SLOTS, SLOT_TIMES } from '../../domain/itinerary.js';
import AttractionCard from './AttractionCard.jsx';
export default function DaySchedule({ day, items, editable = false }) {
  return <section className="day-schedule"><h2><span>DAY</span> {String(day).padStart(2, '0')}</h2><div className="day-slots">{SLOTS.map(slot => { const item = items.find(entry => entry.scheduledDay === day && entry.scheduledSlot === slot); return <div className="day-slot" key={slot}><div className="slot-label"><strong>{slot}</strong><small>{SLOT_TIMES[slot]}</small></div>{item ? <AttractionCard item={item} editable={editable} /> : <p className="free-slot">A little room to wander.</p>}</div>; })}</div></section>;
}
