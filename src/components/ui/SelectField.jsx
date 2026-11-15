import { useId } from 'react';
export default function SelectField({ label, hint, error, options, placeholder, ...props }) {
  const id = useId();
  return <div className="field">
    <label htmlFor={id}>{label}</label>
    <select id={id} aria-invalid={!!error} aria-describedby={error || hint ? `${id}-help` : undefined} {...props}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(option => { const value = typeof option === 'string' ? option : option.value; return <option key={value} value={value}>{typeof option === 'string' ? option : option.label}</option>; })}
    </select>
    {(error || hint) && <p id={`${id}-help`} className={error ? 'field-error' : 'field-hint'}>{error || hint}</p>}
  </div>;
}
