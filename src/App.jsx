import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import ListClients from './pages/Clients/ListClients';
import RegisterClient from './pages/Clients/RegisterClient';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterClient />} />
        <Route path="/clients" element={<ListClients />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;