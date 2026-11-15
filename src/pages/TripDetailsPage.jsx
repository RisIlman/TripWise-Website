import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTrip } from '../state/useTrip.js';
import { validateDetails } from '../domain/validation.js';
import FormField from '../components/ui/FormField.jsx';
import RadioGroup from '../components/ui/RadioGroup.jsx';
import Notice from '../components/ui/Notice.jsx';
import PlannerActions from '../components/planner/PlannerActions.jsx';
export default function TripDetailsPage() {
  const { trip, dispatch } = useTrip(); const navigate = useNavigate(); const [errors, setErrors] = useState({});
  const change = key => event => dispatch({ type: 'details', values: { [key]: event.target.value } });
  function submit(event) { event.preventDefault(); const found = validateDetails(trip); setErrors(found); if (!Object.keys(found).length) navigate('/plan/spending'); else requestAnimationFrame(() => document.querySelector('[aria-invalid="true"]')?.focus()); }
  return <><div className="eyebrow">02 — THE ESSENTIALS</div><h1>A few trip details.</h1><p className="page-intro">A weekend escape or a longer chapter. Make it your own.</p><Notice>Return flights are estimated from KLIA, Kuala Lumpur.</Notice>
    <form noValidate onSubmit={submit}><div className="form-panel"><div className="field-grid"><FormField label="Travel days" type="number" min="2" step="1" value={trip.days} onChange={change('days')} error={errors.days} hint={`${Math.max(0, Number(trip.days) - 1) || 0} nights · Nights are days minus one.`} /><FormField label="Travellers" type="number" min="1" step="1" value={trip.travelers} onChange={change('travelers')} error={errors.travelers} /></div>
      <FormField label="Total group budget (RM)" type="number" min="0.01" step="any" placeholder="e.g. 3000" value={trip.budgetRM} onChange={change('budgetRM')} error={errors.budgetRM} hint="The amount available for everyone travelling, for the whole trip." />
      <RadioGroup label="Travel season" value={trip.season} onChange={value => dispatch({ type: 'details', values: { season: value } })} error={errors.season} options={[{ value: 'Low', label: 'Low', description: 'Airfare × 0.85' }, { value: 'Normal', label: 'Normal', description: 'Airfare × 1.00' }, { value: 'Peak', label: 'Peak', description: 'Airfare × 1.40' }]} />
    </div><PlannerActions back="/plan/destination" /></form></>;
}
