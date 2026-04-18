import { useAppContext } from '../lib/AppContext';
import { Heart, Calendar, ArrowRight, Wallet, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAppContext();
  
  // Mock data for impact — in a real app these would come from the API
  const totalDonated = 525.00;
  const eventsRegistered = 2;
  const impactScore = 85;

  return (
    <div className="container animate-fade-in" style={{ padding: 'var(--space-2xl) var(--space-lg)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-2xl)' }}>
        <div className="badge badge-gold" style={{ marginBottom: 'var(--space-sm)' }}>
          {user?.is_admin ? 'Foundation Admin' : 'Foundation Member'}
        </div>
        <h1 style={{ marginBottom: 'var(--space-xs)' }}>
          Welcome, <span className="gradient-text">{user?.email.split('@')[0]}</span>
        </h1>
        <p className="text-secondary">Your personal impact dashboard for Fairway Futures.</p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
        {[
          { label: 'Total Donated', value: `$${totalDonated}`, sub: 'Lifetime contribution', icon: <Wallet size={22} />, color: 'var(--accent-emerald)' },
          { label: 'Events Joined', value: eventsRegistered, sub: 'Upcoming tournaments', icon: <Calendar size={22} />, color: 'var(--accent-blue)' },
          { label: 'Impact Score', value: impactScore, sub: 'Top 10% of donors', icon: <Heart size={22} />, color: 'var(--accent-gold)' },
        ].map((stat) => (
          <div className="card" key={stat.label} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div style={{ padding: '8px', width: 'fit-content', background: `color-mix(in srgb, ${stat.color} 15%, transparent)`, borderRadius: 'var(--radius-md)', color: stat.color }}>
              {stat.icon}
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontWeight: 600, marginTop: '0.4rem' }}>{stat.label}</div>
              <div className="text-tertiary" style={{ fontSize: '0.82rem' }}>{stat.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Two-column: History + Charity */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
        {/* Recent Activity */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
            <h3>Recent Activity</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            {[
              { type: 'Donation', detail: 'Funded 2 coaching sessions', date: '2 days ago', amount: '+$50.00', color: 'var(--accent-emerald)' },
              { type: 'Registration', detail: 'Spring Youth Invitational', date: '1 week ago', amount: 'Joined', color: 'var(--accent-blue)' },
              { type: 'Donation', detail: 'Equipement Drive contribution', date: '2 weeks ago', amount: '+$100.00', color: 'var(--accent-emerald)' },
            ].map((activity, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-sm) 0', borderBottom: i < 2 ? '1px solid var(--border-subtle)' : 'none' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{activity.type}</div>
                  <div className="text-tertiary" style={{ fontSize: '0.82rem' }}>{activity.detail} • {activity.date}</div>
                </div>
                <div style={{ fontWeight: 700, color: activity.color }}>{activity.amount}</div>
              </div>
            ))}
          </div>
          <Link to="/donate" className="btn btn-secondary btn-sm" style={{ width: '100%', marginTop: 'var(--space-lg)' }}>
            Make a New Donation
          </Link>
        </div>

        {/* Foundation Goals */}
        <div className="card" style={{ background: 'var(--bg-secondary)' }}>
          <h3 style={{ marginBottom: 'var(--space-lg)' }}>Active Foundation Goals</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-xs)', fontSize: '0.9rem' }}>
                <span>Annual Youth Scholarship Fund</span>
                <span className="text-gold">85%</span>
              </div>
              <div style={{ height: '8px', background: 'var(--surface-1)', borderRadius: 'var(--radius-pill)', overflow: 'hidden' }}>
                <div style={{ width: '85%', height: '100%', background: 'var(--gradient-gold)' }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-xs)', fontSize: '0.9rem' }}>
                <span>New Equipment Drive</span>
                <span className="text-blue">42%</span>
              </div>
              <div style={{ height: '8px', background: 'var(--surface-1)', borderRadius: 'var(--radius-pill)', overflow: 'hidden' }}>
                <div style={{ width: '42%', height: '100%', background: 'var(--accent-blue)' }} />
              </div>
            </div>
            <div style={{ marginTop: 'var(--space-md)', padding: 'var(--space-md)', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center', marginBottom: 'var(--space-xs)' }}>
                <CheckCircle size={16} className="text-emerald" />
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Mission Verified</span>
              </div>
              <p className="text-tertiary" style={{ fontSize: '0.8rem' }}>
                Your contributions are audited and 100% of goal-specific funds go directly to program execution.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Events CTA */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(78, 140, 255, 0.08) 100%)',
        border: '1px solid rgba(78, 140, 255, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 'var(--space-lg)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
          <div style={{ padding: '14px', background: 'var(--accent-blue-glow)', borderRadius: 'var(--radius-lg)', color: 'var(--accent-blue)' }}>
            <Calendar size={32} />
          </div>
          <div>
            <h3 style={{ marginBottom: '4px' }}>Upcoming Tournaments</h3>
            <p className="text-secondary">New charity events added. Register now to secure your spot.</p>
          </div>
        </div>
        <Link to="/events" className="btn btn-primary">
          View Events <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
