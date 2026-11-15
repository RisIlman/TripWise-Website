import RadioGroup from '../ui/RadioGroup.jsx';
export default function TravelFocusSelector(props) {
  return <RadioGroup label="What kind of trip feels like you?" options={[
    { value: 'City-focused', label: 'City-focused', description: 'Streets, culture & cafés' },
    { value: 'Nature-focused', label: 'Nature-focused', description: 'Trails, coastlines & fresh air' },
    { value: 'Rural areas', label: 'Rural areas', description: 'Quiet places & local life' },
  ]} {...props} />;
}
