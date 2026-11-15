import { getPrices } from '../../domain/pricing.js';
import { formatMoney } from '../../lib/formatMoney.js';
export default function PricingTable({ names, asean = false }) {
  return <div className="table-scroll"><table className="cost-table pricing-table"><caption>{asean ? 'ASEAN country estimates' : 'Regional estimates'} · per person</caption><thead><tr><th scope="col">{asean ? 'Country' : 'Region'}</th><th scope="col">Accommodation<small>RM / night</small></th><th scope="col">Local transport<small>RM / day</small></th><th scope="col">Return flights<small>RM / round trip</small></th></tr></thead><tbody>{names.map(name => { const rates = getPrices(asean ? 'ASEAN' : name, name); return <tr key={name}><th scope="row">{name}</th><td>{formatMoney(rates.accommodation)}</td><td>{formatMoney(rates.public_transport)}</td><td>{formatMoney(rates.return_transport)}</td></tr>; })}</tbody></table></div>;
}
