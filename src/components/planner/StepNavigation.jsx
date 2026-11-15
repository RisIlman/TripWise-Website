import { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router';
import { STEPS } from '../../app/plannerSteps.js';
export default function StepNavigation() {
  const navigation = useRef(null);
  const { pathname } = useLocation();
  useEffect(() => {
    const nav = navigation.current;
    const current = nav?.querySelector('[aria-current="page"]');
    if (current) nav.scrollTo({ left: nav.scrollLeft + current.getBoundingClientRect().left - nav.getBoundingClientRect().left - 10, behavior: 'instant' });
  }, [pathname]);
  return <nav ref={navigation} className="step-navigation" aria-label="Planning steps"><ol>{STEPS.map(([path, label], index) =>
    <li key={path}><NavLink to={`/plan/${path}`}><span className="step-number">{String(index + 1).padStart(2, '0')}</span><span>{label}</span></NavLink></li>
  )}</ol></nav>;
}
