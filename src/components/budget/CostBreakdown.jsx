import { EXPENSE_LABELS } from '../../domain/summary.js';
import { formatMoney } from '../../lib/formatMoney.js';
export default function CostBreakdown({ summary }) {
  return <div className="table-scroll"><table className="cost-table"><caption>Estimated trip expenses</caption><thead><tr><th scope="col">Expense</th><th scope="col">Group total</th><th scope="col">Per person</th></tr></thead><tbody>
    {Object.entries(summary.breakdown).map(([key, cost], index) => <tr key={key}><th scope="row"><span className={`expense-dot dot-${index}`} />{EXPENSE_LABELS[key]}</th><td>{formatMoney(cost)}</td><td>{formatMoney(summary.breakdownPerPerson[key])}</td></tr>)}
    </tbody><tfoot><tr><th scope="row">Total estimate</th><td>{formatMoney(summary.total)}</td><td>{formatMoney(summary.perPerson)}</td></tr></tfoot></table></div>;
}
