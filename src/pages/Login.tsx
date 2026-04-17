import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAppContext } from '../lib/AppContext';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let success = false;
      if (isRegister) {
        success = await register(email, password);
      } else {
        success = await login(email, password);
      }

      if (success) {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container animate-fade-in" style={{
      minHeight: 'calc(100vh - var(--nav-height))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-2xl) var(--space-lg)'
    }}>
      <div className="card-glass" style={{ width: '100%', maxWidth: '440px' }}>
        <button 
          onClick={() => navigate('/')} 
          className="btn btn-ghost btn-sm text-secondary"
          style={{ marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: 0, fontWeight: 500 }}
        >
          <span style={{ fontSize: '1.2rem' }}>←</span> Back to Home
        </button>

        <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ marginBottom: 'var(--space-xs)' }}>
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-secondary">
            {isRegister ? 'Sign up to start tracking your impact.' : 'Enter your details to access your account.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {error && (
            <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--accent-rose-glow)', color: 'var(--accent-rose)', fontSize: '0.85rem', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="input-field"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label htmlFor="password">Password</label>
              {!isRegister && <a href="#" className="text-gold" style={{ fontSize: '0.85rem' }}>Forgot?</a>}
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="input-field"
                placeholder="••••••••"
                style={{ paddingRight: 'var(--space-2xl)' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-tertiary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {isRegister && <small className="text-tertiary">Must be at least 6 characters.</small>}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: 'var(--space-sm)' }}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></span>
            ) : (isRegister ? 'Sign Up' : 'Sign In')}
          </button>
        </form>

        <div className="divider" style={{ margin: 'var(--space-lg) 0' }} />

        <div style={{ textAlign: 'center' }}>
          <p className="text-secondary" style={{ fontSize: '0.85rem', marginBottom: 'var(--space-md)' }}>
            {isRegister ? 'Already have an account?' : 'Don\'t have an account?'}
            <button
              type="button"
              className="btn btn-ghost btn-sm text-gold"
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
              style={{ marginLeft: '8px' }}
            >
              {isRegister ? 'Log In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
