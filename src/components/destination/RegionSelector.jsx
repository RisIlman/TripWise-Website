import SelectField from '../ui/SelectField.jsx';
import { REGIONS } from '../../data/pricing.js';
export default function RegionSelector({ value, onChange, error }) {
  return <SelectField label="Destination region" placeholder="Choose a region" options={REGIONS} value={value} onChange={event => onChange(event.target.value)} error={error} />;
}
