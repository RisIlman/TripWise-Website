import SelectField from '../ui/SelectField.jsx';
import FormField from '../ui/FormField.jsx';
import { resolveDailyExpense } from '../../domain/expenses.js';
import { formatMoney } from '../../lib/formatMoney.js';
export default function DailyExpenseEditor({ title, suggested, choice, onChange, error }) {
  let resolved; try { resolved = resolveDailyExpense(suggested, choice); } catch { resolved = NaN; }
  return <section className="expense-editor"><div className="expense-heading"><div><h2>{title}</h2><p className="caption">Suggested: {formatMoney(suggested)} / person / day</p></div><strong>{formatMoney(resolved)}<small>/ person / day</small></strong></div>
    <SelectField label={`${title} budget approach`} options={[{ value: 'suggested', label: 'Use the suggestion' }, { value: 'increase', label: 'Increase by a percentage' }, { value: 'decrease', label: 'Decrease by a percentage' }, { value: 'custom', label: 'Set my own daily amount' }]} value={choice.mode} onChange={event => onChange({ mode: event.target.value })} />
    {choice.mode === 'custom' && <FormField label={`${title} daily amount (RM)`} type="number" min="0" step="any" value={choice.customAmountRM} onChange={event => onChange({ customAmountRM: event.target.value })} error={error} hint="Per person, per day. Zero is allowed." />}
    {['increase', 'decrease'].includes(choice.mode) && <FormField label={`${title} ${choice.mode} (%)`} type="number" min="0" max={choice.mode === 'decrease' ? 100 : undefined} step="any" value={choice.percentage} onChange={event => onChange({ percentage: event.target.value })} error={error} />}
  </section>;
}
