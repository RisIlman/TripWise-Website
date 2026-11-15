import { EXPENSE_LABELS } from '../../domain/summary.js';
import { formatMoney } from '../../lib/formatMoney.js';
export default function BudgetStatus({ summary, budget }) {
  const over = summary.remaining < 0;
  const label = summary.status === 'WITHIN BUDGET' ? 'Within budget' : summary.status === 'EXCEEDING BUDGET' ? 'Exceeding budget' : 'At budget limit';
  return <div className={`budget-status ${over ? 'is-over' : ''}`}><div className="budget-status-top"><span className="status-pill">{over ? '↗' : '✓'} {label}</span><span className="caption">Available: {formatMoney(Number(budget))}</span></div>
    <p className="budget-remaining">{formatMoney(Math.abs(summary.remaining))}<span>{over ? 'over your group budget' : 'left in your group budget'}</span></p>
    <p className="caption">{formatMoney(Math.abs(summary.remainingPerPerson))} {over ? 'shortfall' : 'remaining'} per person</p>
    {over && <p className="budget-tip">Your biggest expense is {EXPENSE_LABELS[summary.largestExpense].toLowerCase()}. Reducing it would help most.</p>}
  </div>;
}
