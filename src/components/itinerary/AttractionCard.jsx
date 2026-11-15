import { useState } from 'react';
import { useTrip } from '../../state/useTrip.js';
import { formatMoney } from '../../lib/formatMoney.js';
import Button from '../ui/Button.jsx';
import MoveAttractionForm from './MoveAttractionForm.jsx';
export default function AttractionCard({ item, editable = false }) {
  const { dispatch } = useTrip(); const [moving, setMoving] = useState(false);
  return <article className="attraction-card"><div className="attraction-card-main"><div><h3>{item.name}</h3><p>{item.area} · {formatMoney(item.ticketPriceRMPerPerson)} / person</p></div>{editable && <div className="inline-actions"><Button variant="text" aria-label={`Move ${item.name}`} onClick={() => setMoving(!moving)}>Move</Button><Button variant="text" aria-label={`Remove ${item.name}`} onClick={() => dispatch({ type: 'removeAttraction', id: item.id })}>Remove</Button></div>}</div>{moving && <MoveAttractionForm item={item} onClose={() => setMoving(false)} />}</article>;
}
