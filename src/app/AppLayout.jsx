import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router';

export default function AppLayout() {
  const location = useLocation();
  useEffect(() => {
    const heading = document.querySelector('h1');
    if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); document.title = `${heading.textContent} — TripWise`; }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);
  return <><a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header"><Link to="/" className="brand" aria-label="TripWise home"><span className="brand-icon" aria-hidden="true">↗</span>trip<span>wise</span><span className="brand-period">.</span></Link>
      <nav aria-label="Main navigation"><Link to="/pricing" state={{ returnTo: location.pathname }} className="pricing-link">Pricing guide <span aria-hidden="true">↗</span></Link><span className="header-caption">LESS GUESSWORK. MORE GOING.</span></nav>
    </header><main id="main-content"><Outlet /></main>
    <footer className="site-footer"><span>Made for the journey, big or small.</span><span>From KLIA, with possibility. <span aria-hidden="true">↗</span></span></footer>
  </>;
}
