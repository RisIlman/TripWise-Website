import { BrowserRouter } from 'react-router';
import TripProvider from '../state/TripProvider.jsx';
import AppRoutes from './routes.jsx';
export default function App() { return <BrowserRouter><TripProvider><AppRoutes /></TripProvider></BrowserRouter>; }
