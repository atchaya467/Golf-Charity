import { useState } from 'react';
import { useAppContext } from '../lib/AppContext';
import { Users, Calendar, Wallet, Plus, Trash2, CheckCircle, Clock } from 'lucide-react';

export default function Admin() {
  const { allUsers, events, impact, refreshData } = useAppContext();
  const [activeTab, setActiveTab] = useState<'users' | 'events' | 'donations'>('events');

  // -- Event Management --
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventPrice, setNewEventPrice] = useState('');

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle || !newEventDate || !newEventPrice) return;
    
    // In a real app, this would be an API call
    console.log('Adding event:', { newEventTitle, newEventDate, newEventPrice });
    alert('Event added successfully (Demo Mode)');
    setNewEventTitle(''); setNewEventDate(''); setNewEventPrice('');
    await refreshData();
  };

  return (
    <div className="container animate-fade-in" style={{ padding: 'var(--space-2xl) var(--space-lg)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-2xl)' }}>
        <h1 style={{ marginBottom: 'var(--space-xs)' }}>Foundation <span className="gradient-text">Control</span></h1>
        <p className="text-secondary">Manage foundation programs, event registrations, and donor oversight.</p>
      </div>

      {/* Top Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
        <div className="card">
          <div className="text-secondary" style={{ fontSize: '0.85rem', marginBottom: '8px' }}>Total Foundation Impact</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
            ${impact?.total_raised?.toLocaleString() || '2,540,000'}
          </div>
          <div className="text-tertiary" style={{ fontSize: '0.8rem', marginTop: '4px' }}>Across {impact?.total_donations || '12,400'} contributions</div>
        </div>
        <div className="card">
          <div className="text-secondary" style={{ fontSize: '0.85rem', marginBottom: '8px' }}>Active Foundation Members</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-blue)' }}>{allUsers.length}</div>
          <div className="text-tertiary" style={{ fontSize: '0.8rem', marginTop: '4px' }}>Monitoring platform engagement</div>
        </div>
        <div className="card">
          <div className="text-secondary" style={{ fontSize: '0.85rem', marginBottom: '8px' }}>Upcoming Programs</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-gold)' }}>{events.length}</div>
          <div className="text-tertiary" style={{ fontSize: '0.8rem', marginTop: '4px' }}>Active event registrations</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-xl)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-md)' }}>
        <button 
          className={`btn ${activeTab === 'events' ? 'btn-primary' : 'btn-ghost'}`} 
          onClick={() => setActiveTab('events')}
        >
          <Calendar size={18} /> Program Management
        </button>
        <button 
          className={`btn ${activeTab === 'donations' ? 'btn-primary' : 'btn-ghost'}`} 
          onClick={() => setActiveTab('donations')}
        >
          <Wallet size={18} /> Donation Oversight
        </button>
        <button 
          className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-ghost'}`} 
          onClick={() => setActiveTab('users')}
        >
          <Users size={18} /> Members
        </button>
      </div>

      {/* Content */}
      <div style={{ minHeight: '400px' }}>
        
        {/* -- EVENTS TAB -- */}
        {activeTab === 'events' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--space-xl)' }}>
            <div className="card">
              <h3 style={{ marginBottom: 'var(--space-md)' }}>Schedule New Program</h3>
              <form onSubmit={handleAddEvent} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div className="input-group">
                  <label>Program Title</label>
                  <input type="text" className="input-field" value={newEventTitle} onChange={e => setNewEventTitle(e.target.value)} placeholder="e.g. Junior Masters Clinic" required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                  <div className="input-group">
                    <label>Event Date</label>
                    <input type="date" className="input-field" value={newEventDate} onChange={e => setNewEventDate(e.target.value)} required />
                  </div>
                  <div className="input-group">
                    <label>Registration Fee ($)</label>
                    <input type="number" className="input-field" value={newEventPrice} onChange={e => setNewEventPrice(e.target.value)} placeholder="0.00" required />
                  </div>
                </div>
                <button type="submit" className="btn btn-secondary">
                  <Plus size={16} /> Deploy Program
                </button>
              </form>
            </div>

            <div className="card">
              <h3 style={{ marginBottom: 'var(--space-md)' }}>Active Registry</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                {events.map((event, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-md)', background: 'var(--surface-1)', borderRadius: 'var(--radius-md)' }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>{event.title}</div>
                      <div className="text-secondary" style={{ fontSize: '0.82rem' }}>{new Date(event.event_date).toLocaleDateString()} • {event.location}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>${event.price}</div>
                      <button className="btn btn-ghost btn-sm text-rose" style={{ padding: '2px' }}><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* -- DONATIONS TAB -- */}
        {activeTab === 'donations' && (
          <div className="card">
            <h3 style={{ marginBottom: 'var(--space-lg)' }}>Transaction Oversight</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <th style={{ padding: 'var(--space-sm)', color: 'var(--text-secondary)' }}>Status</th>
                    <th style={{ padding: 'var(--space-sm)', color: 'var(--text-secondary)' }}>Amount</th>
                    <th style={{ padding: 'var(--space-sm)', color: 'var(--text-secondary)' }}>Donor</th>
                    <th style={{ padding: 'var(--space-sm)', color: 'var(--text-secondary)' }}>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { status: 'Completed', amount: '$1,200.00', user: 'anon_f821', time: '10 mins ago' },
                    { status: 'Completed', amount: '$50.00', user: 'johndoe@gmail.com', time: '45 mins ago' },
                    { status: 'Pending', amount: '$250.00', user: 'm.reed@foundation.org', time: '1 hour ago' },
                    { status: 'Completed', amount: '$15.00', user: 'sports_fan@outlook.com', time: '3 hours ago' },
                  ].map((d, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: 'var(--space-sm) var(--space-md)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {d.status === 'Completed' ? <CheckCircle size={14} className="text-emerald" /> : <Clock size={14} className="text-gold" />}
                          <span style={{ fontSize: '0.9rem' }}>{d.status}</span>
                        </div>
                      </td>
                      <td style={{ padding: 'var(--space-sm) var(--space-md)', fontWeight: 700 }}>{d.amount}</td>
                      <td style={{ padding: 'var(--space-sm) var(--space-md)' }} className="text-secondary">{d.user}</td>
                      <td style={{ padding: 'var(--space-sm) var(--space-md)' }} className="text-tertiary">{d.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* -- USERS TAB -- */}
        {activeTab === 'users' && (
          <div className="card">
            <h3 style={{ marginBottom: 'var(--space-lg)' }}>Member Registry</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <th style={{ padding: 'var(--space-sm)', color: 'var(--text-secondary)' }}>Email</th>
                    <th style={{ padding: 'var(--space-sm)', color: 'var(--text-secondary)' }}>Role</th>
                    <th style={{ padding: 'var(--space-sm)', color: 'var(--text-secondary)' }}>Membership</th>
                    <th style={{ padding: 'var(--space-sm)', color: 'var(--text-secondary)' }}>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((u) => (
                    <tr key={u.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: 'var(--space-sm) var(--space-md)', fontWeight: 500 }}>{u.email}</td>
                      <td style={{ padding: 'var(--space-sm) var(--space-md)' }}>
                        <span className={`badge ${u.is_admin ? 'badge-gold' : 'badge-blue'}`}>
                          {u.is_admin ? 'Admin' : 'Member'}
                        </span>
                      </td>
                      <td style={{ padding: 'var(--space-sm) var(--space-md)' }}>
                        <span className="text-secondary" style={{ fontSize: '0.9rem' }}>Standard</span>
                      </td>
                      <td style={{ padding: 'var(--space-sm) var(--space-md)' }} className="text-tertiary">
                        {new Date(u.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
