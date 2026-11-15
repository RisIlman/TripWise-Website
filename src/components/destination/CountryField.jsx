import SelectField from '../ui/SelectField.jsx';
import FormField from '../ui/FormField.jsx';
import { ASEAN_COUNTRIES } from '../../data/pricing.js';
export default function CountryField({ region, value, onChange, error }) {
  return region === 'ASEAN' ? <SelectField label="Destination country" placeholder="Choose a country" options={ASEAN_COUNTRIES} value={value} onChange={event => onChange(event.target.value)} error={error} /> : <FormField label="Destination country" placeholder="e.g. France" value={value} onChange={event => onChange(event.target.value)} error={error} hint="Enter a country in your selected region, outside Malaysia." autoComplete="off" />;
}
