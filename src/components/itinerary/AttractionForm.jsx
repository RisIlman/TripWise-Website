import { useState } from 'react';
import { validateAttraction } from '../../domain/validation.js';
import { SLOTS, normalizeArea } from '../../domain/itinerary.js';
import FormField from '../ui/FormField.jsx';
import SelectField from '../ui/SelectField.jsx';
import Button from '../ui/Button.jsx';
const empty = { name: '', area: '', ticketPriceRMPerPerson: '', preferredSlot: 'Morning' };
export default function AttractionForm({ onAdd }) {
  const [draft, setDraft] = useState(empty); const [errors, setErrors] = useState({});
  const change = key => event => setDraft({ ...draft, [key]: event.target.value });
  function submit(event) {
    event.preventDefault(); const found = validateAttraction(draft); setErrors(found);
    if (Object.keys(found).length) { requestAnimationFrame(() => document.querySelector('[aria-invalid="true"]')?.focus()); return; }
    onAdd({ ...draft, id: crypto.randomUUID(), name: draft.name.trim(), area: normalizeArea(draft.area), ticketPriceRMPerPerson: Number(draft.ticketPriceRMPerPerson), scheduledDay: null, scheduledSlot: null }); setDraft(empty);
  }
  return <form noValidate onSubmit={submit} className="attraction-form"><h2>Add a little adventure</h2><div className="field-grid"><FormField label="Attraction name" placeholder="e.g. A museum you've bookmarked" value={draft.name} onChange={change('name')} error={errors.name} /><FormField label="Area or neighbourhood (optional)" placeholder="e.g. Old Town" value={draft.area} onChange={change('area')} /></div><div className="field-grid"><FormField label="Ticket price per person (RM)" type="number" min="0" step="any" placeholder="0 for free" value={draft.ticketPriceRMPerPerson} onChange={change('ticketPriceRMPerPerson')} error={errors.ticketPriceRMPerPerson} /><SelectField label="Preferred time" options={SLOTS} value={draft.preferredSlot} onChange={change('preferredSlot')} /></div><Button type="submit" variant="secondary">+ Add attraction</Button></form>;
}
