import { Routes, Route, Link } from 'react-router-dom';
import TicketListPage from './pages/TicketListPage';
import TicketDetailPage from './pages/TicketDetailPage';
import CreateTicketPage from './pages/CreateTicketPage';

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="container header-inner">
          <Link to="/" className="logo">
            Support Tickets
          </Link>
          <nav>
            <Link to="/">Tickets</Link>
            <Link to="/tickets/new" className="btn btn-primary">
              New Ticket
            </Link>
          </nav>
        </div>
      </header>
      <main className="container main">
        <Routes>
          <Route path="/" element={<TicketListPage />} />
          <Route path="/tickets/new" element={<CreateTicketPage />} />
          <Route path="/tickets/:id" element={<TicketDetailPage />} />
        </Routes>
      </main>
    </div>
  );
}
