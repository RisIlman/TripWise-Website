import { useId } from 'react';
export default function FormField({ label, hint, error, className = '', ...props }) {
  const id = useId();
  return <div className={`field ${className}`}>
    <label htmlFor={id}>{label}</label>
    <input id={id} aria-invalid={!!error} aria-describedby={error || hint ? `${id}-help` : undefined} {...props} />
    {(error || hint) && <p id={`${id}-help`} className={error ? 'field-error' : 'field-hint'}>{error || hint}</p>}
  </div>;
}
