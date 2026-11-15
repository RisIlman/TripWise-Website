import Button from '../ui/Button.jsx';
export default function PlannerActions({ back, nextLabel = 'Continue', next, onNext }) {
  return <div className="planner-actions"><Button variant="text" to={back}>← Back</Button><Button to={next} onClick={onNext} type={next || onNext ? 'button' : 'submit'}>{nextLabel} <span aria-hidden="true">↗</span></Button></div>;
}
