import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useAppContext } from './lib/AppContext';

// Core Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import About from './pages/About';
import Transparency from './pages/Transparency';
import Contact from './pages/Contact';
import Events from './pages/Events';
import Donate from './pages/Donate';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

function App() {
  const { isAuthenticated, user } = useAppContext();

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 'var(--nav-height)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/transparency" element={<Transparency />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events" element={<Events />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
          />
          
          {/* Admin Route */}
          <Route 
            path="/admin" 
            element={isAuthenticated && user?.is_admin ? <Admin /> : <Navigate to="/dashboard" />} 
          />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
