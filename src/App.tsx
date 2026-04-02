import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useAppContext } from './lib/AppContext';

// Placeholder Pages (will be replaced by actual components)
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Scores from './pages/Scores';
import Charities from './pages/Charities';
import Draws from './pages/Draws';
import Admin from './pages/Admin';

function App() {
  const { isAuthenticated, user } = useAppContext();

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 'var(--nav-height)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/scores" 
            element={isAuthenticated ? <Scores /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/charities" 
            element={isAuthenticated ? <Charities /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/draws" 
            element={isAuthenticated ? <Draws /> : <Navigate to="/login" />} 
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
