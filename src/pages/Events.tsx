import { Calendar, MapPin, Users, Ticket, Loader2 } from 'lucide-react';
import { useAppContext } from '../lib/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Events() {
  const { events, isLoading, isAuthenticated, registerForEvent } = useAppContext();
  const navigate = useNavigate();

  const handleRegister = async (eventId: string) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      await registerForEvent(eventId);
      alert('Successfully registered!');
    } catch (err) {
      const error = err as Error;
      alert(error.message || 'Registration failed');
    }
  };

  if (isLoading) return (
    <div className="loading-screen">
      <Loader2 className="spinner" />
      <p className="text-secondary">Loading upcoming events...</p>
    </div>
  );

  return (
    <div className="animate-fade-in">
      <section style={{ padding: 'var(--space-3xl) 0', background: 'var(--gradient-hero)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="badge badge-purple" style={{ marginBottom: 'var(--space-md)' }}>
            Join the Movement
          </div>
          <h1 style={{ marginBottom: 'var(--space-md)' }}>Upcoming Events</h1>
          <p className="text-secondary" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Register for our charity tournaments and help fund the next generation of golfers.
          </p>
        </div>
      </section>

      <section style={{ padding: 'var(--space-3xl) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 'var(--space-xl)' }}>
            {events.map((event) => (
              <div key={event.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div style={{ 
                  height: '200px', 
                  background: 'var(--surface-1)', 
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div style={{ position: 'absolute', top: 'var(--space-sm)', right: 'var(--space-sm)' }} className="badge badge-gold">
                    ${event.price}
                  </div>
                  <Ticket size={64} className="text-tertiary" style={{ opacity: 0.2 }} />
                </div>
                
                <div>
                  <h3 style={{ marginBottom: 'var(--space-xs)' }}>{event.title}</h3>
                  <p className="text-tertiary" style={{ fontSize: '0.9rem', marginBottom: 'var(--space-md)' }}>{event.description}</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', fontSize: '0.9rem' }}>
                    <Calendar size={16} className="text-gold" />
                    <span>{new Date(event.event_date).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', fontSize: '0.9rem' }}>
                    <MapPin size={16} className="text-blue" />
                    <span>{event.location}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', fontSize: '0.9rem' }}>
                    <Users size={16} className="text-purple" />
                    <span>Capacity: {event.capacity} players</span>
                  </div>
                </div>

                <button 
                  onClick={() => handleRegister(event.id)}
                  className="btn btn-primary" 
                  style={{ marginTop: 'auto', width: '100%' }}
                >
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
