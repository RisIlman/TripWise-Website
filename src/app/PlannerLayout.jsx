import { Navigate, Outlet, useLocation } from 'react-router';
import { useTrip } from '../state/useTrip.js';
import { earliestIncompleteStep } from '../domain/validation.js';
import StepNavigation from '../components/planner/StepNavigation.jsx';
import { STEPS } from './plannerSteps.js';
import TripSnapshot from '../components/planner/TripSnapshot.jsx';
export default function PlannerLayout() {
  const { trip } = useTrip();
  const { pathname } = useLocation();
  const incomplete = earliestIncompleteStep(trip);
  const currentIndex = STEPS.findIndex(([path]) => pathname === `/plan/${path}`);
  const incompleteIndex = STEPS.findIndex(([path]) => incomplete === `/plan/${path}`);
  if (incomplete && currentIndex > incompleteIndex) return <Navigate to={incomplete} replace />;
  return <div className="planner-shell"><StepNavigation /><div className="planner-grid"><section className="planner-content"><Outlet /></section><TripSnapshot /></div></div>;
}
