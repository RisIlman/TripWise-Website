import { Route, Routes, Navigate } from 'react-router';
import AppLayout from './AppLayout.jsx';
import PlannerLayout from './PlannerLayout.jsx';
import WelcomePage from '../pages/WelcomePage.jsx';
import DestinationPage from '../pages/DestinationPage.jsx';
import TripDetailsPage from '../pages/TripDetailsPage.jsx';
import DailySpendingPage from '../pages/DailySpendingPage.jsx';
import EstimatePage from '../pages/EstimatePage.jsx';
import ItineraryPage from '../pages/ItineraryPage.jsx';
import SummaryPage from '../pages/SummaryPage.jsx';
import PricingGuidePage from '../pages/PricingGuidePage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
export default function AppRoutes() {
  return <Routes><Route element={<AppLayout />}>
    <Route index element={<WelcomePage />} /><Route path="pricing" element={<PricingGuidePage />} />
    <Route path="plan" element={<PlannerLayout />}>
      <Route index element={<Navigate to="destination" replace />} />
      <Route path="destination" element={<DestinationPage />} /><Route path="details" element={<TripDetailsPage />} />
      <Route path="spending" element={<DailySpendingPage />} /><Route path="estimate" element={<EstimatePage />} />
      <Route path="itinerary" element={<ItineraryPage />} /><Route path="summary" element={<SummaryPage />} />
    </Route><Route path="*" element={<NotFoundPage />} />
  </Route></Routes>;
}
