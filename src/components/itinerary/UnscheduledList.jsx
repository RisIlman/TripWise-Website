import AttractionCard from './AttractionCard.jsx';
export default function UnscheduledList({ items, editable = false }) {
  if (!items.length) return null;
  return <section className="unscheduled-list"><h2>Unscheduled ({items.length})</h2><p className="caption">These attractions are not included in the estimate. Move them to a free slot or remove them.</p>{items.map(item => <AttractionCard key={item.id} item={item} editable={editable} />)}</section>;
}
