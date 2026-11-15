import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTrip } from '../state/useTrip.js';
import { EXPENSE_SUGGESTION } from '../data/pricing.js';
import { validateSpending } from '../domain/validation.js';
import { calculatePreliminary } from '../domain/expenses.js';
import DailyExpenseEditor from '../components/budget/DailyExpenseEditor.jsx';
import PlannerActions from '../components/planner/PlannerActions.jsx';
import Notice from '../components/ui/Notice.jsx';
export default function DailySpendingPage() {
  const { trip, dispatch } = useTrip(); const navigate = useNavigate(); const [errors, setErrors] = useState({}); const [calculationError, setCalculationError] = useState('');
  const suggestions = EXPENSE_SUGGESTION[trip.region];
  function submit(event) {
    event.preventDefault(); const found = validateSpending(trip); setErrors(found);
    if (!Object.keys(found).length) { try { calculatePreliminary(trip); navigate('/plan/estimate'); } catch (error) { setCalculationError(error.message); } }
    else requestAnimationFrame(() => document.querySelector('[aria-invalid="true"]')?.focus());
  }
  return <><div className="eyebrow">03 — EVERYDAY EXPLORING</div><h1>Find your daily rhythm.</h1><p className="page-intro">Street food or a sit-down meal? Give yourself room for the little things.</p><form noValidate onSubmit={submit}>
    {['meals', 'miscellaneous'].map(key => <DailyExpenseEditor key={key} title={key === 'meals' ? 'Meals' : 'Miscellaneous'} suggested={suggestions[key]} choice={trip.dailyExpenses[key]} onChange={values => dispatch({ type: 'expense', key, values })} error={errors[key]} />)}
    <p className="caption">Suggestions are based on {trip.region}. Accommodation, local transport, and return flights use the reference rates.</p>{calculationError && <Notice tone="error">{calculationError}</Notice>}
    <PlannerActions back="/plan/details" nextLabel="See my estimate" />
  </form></>;
}
