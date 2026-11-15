import { useId } from 'react';
export default function RadioGroup({ label, value, onChange, options, error }) {
  const name = useId();
  return <fieldset className="radio-field" aria-describedby={error ? `${name}-error` : undefined}>
    <legend>{label}</legend>
    <div className="radio-options">{options.map(option => <label key={option.value} className={`radio-card ${value === option.value ? 'is-selected' : ''}`}>
      <input type="radio" name={name} value={option.value} checked={value === option.value} onChange={() => onChange(option.value)} />
      <span><strong>{option.label}</strong>{option.description && <small>{option.description}</small>}</span>
    </label>)}</div>
    {error && <p id={`${name}-error`} className="field-error">{error}</p>}
  </fieldset>;
}
