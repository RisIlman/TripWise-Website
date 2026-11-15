export default function PlaceCard({ place, selected, onToggle }) {
  return <label className={`place-card ${selected ? 'is-selected' : ''}`}><input type="checkbox" checked={selected} onChange={onToggle} /><span><strong>{place.name}</strong><small>{place.description}</small></span></label>;
}
