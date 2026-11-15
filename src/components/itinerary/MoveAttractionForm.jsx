import { useState } from 'react';
import { SLOTS, moveAttraction } from '../../domain/itinerary.js';
import { useTrip } from '../../state/useTrip.js';
import FormField from '../ui/FormField.jsx';
import SelectField from '../ui/SelectField.jsx';
import Button from '../ui/Button.jsx';
import Notice from '../ui/Notice.jsx';
export default function MoveAttractionForm({ item, onClose }) {
  const { trip, dispatch } = useTrip(); const [day, setDay] = useState(item.scheduledDay || 1); const [slot, setSlot] = useState(item.scheduledSlot || item.preferredSlot); const [error, setError] = useState('');
  function submit(event) { event.preventDefault(); const result = moveAttraction(trip.attractions, item.id, Number(day), slot, trip.days); setError(result.error); if (!result.error) { dispatch({ type: 'setAttractions', items: result.items }); onClose(); } }
  return <form className="move-form" onSubmit={submit} noValidate aria-label={`Move ${item.name}`}><div className="field-grid"><FormField label="Move to day" type="number" min="1" max={trip.days} step="1" value={day} onChange={event => setDay(event.target.value)} /><SelectField label="Move to time" options={SLOTS} value={slot} onChange={event => setSlot(event.target.value)} /></div>{error && <Notice tone="error">{error}</Notice>}<div className="inline-actions"><Button type="submit">Save move</Button><Button variant="text" onClick={onClose}>Cancel</Button></div></form>;
}
