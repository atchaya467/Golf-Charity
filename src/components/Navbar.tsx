import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, Shield } from 'lucide-react';
import { useAppContext } from '../lib/AppContext';
import './Navbar.css';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAppContext();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/about', label: 'About' },
    { path: '/events', label: 'Events' },
    { path: '/transparency', label: 'Transparency' },
    { path: '/contact', label: 'Contact' },
    ...(isAuthenticated ? [
      { path: '/dashboard', label: 'Dashboard' },
      { path: '/donate', label: 'Donate' },
      ...(user?.is_admin ? [{ path: '/admin', label: 'Admin' }] : []),
    ] : [
      { path: '/donate', label: 'Donate' },
    ]),
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <Link to="/" className="navbar-brand">
            <div className="navbar-brand-icon">FF</div>
            <span>Fairway <span className="text-gold">Futures</span></span>
          </Link>

          <div className="navbar-links">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar-link ${isActive(link.path) ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="navbar-actions">
            {isAuthenticated ? (
              <>
                <div className="navbar-user">
                  <div className="navbar-user-avatar">
                    {user?.email.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-secondary" style={{ fontSize: '0.82rem' }}>
                    {user?.email.split('@')[0]}
                  </span>
                  {user?.is_admin && (
                    <Shield size={14} className="text-gold" />
                  )}
                </div>
                <button className="btn btn-ghost btn-sm" onClick={logout}>
                  <LogOut size={16} />
                </button>
                <button
                  className="navbar-mobile-toggle"
                  onClick={() => setMobileOpen(!mobileOpen)}
                >
                  {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm">
                Get Started
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`navbar-mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`navbar-link ${isActive(link.path) ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        {isAuthenticated && (
          <button className="navbar-link" onClick={logout} style={{ textAlign: 'left' }}>
            Sign Out
          </button>
        )}
      </div>
    </>
  );
}
