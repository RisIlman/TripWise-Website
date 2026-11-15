import { useLocation } from 'react-router';
import { ASEAN_COUNTRIES, REGIONAL_PRICING, EXPENSE_SUGGESTION, PRICING_SOURCE } from '../data/pricing.js';
import PricingTable from '../components/budget/PricingTable.jsx';
import Button from '../components/ui/Button.jsx';
import { formatMoney } from '../lib/formatMoney.js';
export default function PricingGuidePage() {
  const { state } = useLocation();
  const returnTo = typeof state?.returnTo === 'string' && state.returnTo.startsWith('/plan/') ? state.returnTo : '/';
  return <div className="pricing-page"><div className="eyebrow">A LITTLE TRANSPARENCY</div><h1>Know what goes into it.</h1><p className="page-intro">Reference rates for a clearer starting point. All prices are estimates in RM, per person.</p>
    <div className="pricing-note"><strong>Return flights from KLIA</strong><p>Tables show Normal season. Low season multiplies airfare by 0.85; Normal by 1.00; Peak by 1.40. Accommodation uses nights; local transport uses travel days.</p></div>
    <PricingTable names={ASEAN_COUNTRIES} asean /><PricingTable names={Object.keys(REGIONAL_PRICING)} />
    <div className="table-scroll"><table className="cost-table"><caption>Suggested daily spending · RM / person / day</caption><thead><tr><th scope="col">Region</th><th scope="col">Meals</th><th scope="col">Miscellaneous</th></tr></thead><tbody>{Object.entries(EXPENSE_SUGGESTION).map(([region, rates]) => <tr key={region}><th scope="row">{region}</th><td>{formatMoney(rates.meals)}</td><td>{formatMoney(rates.miscellaneous)}</td></tr>)}</tbody></table></div>
    <p className="caption">Rates follow the <a href={PRICING_SOURCE} target="_blank" rel="noreferrer">TripWise Python pricing reference ↗</a>. These are planning estimates, not live travel quotes.</p><Button to={returnTo} variant="secondary">← {returnTo === '/' ? 'Back to welcome' : 'Back to my plan'}</Button>
  </div>;
}
