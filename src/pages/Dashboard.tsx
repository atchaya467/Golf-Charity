import { useAppContext } from '../lib/AppContext';
import { TrendingUp, Heart, Trophy, Star, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

function ScoreBar({ value }: { value: number }) {
  const pct = (value / 45) * 100;
  const color = value >= 36 ? 'var(--accent-emerald)' : value >= 27 ? 'var(--accent-gold)' : 'var(--accent-blue)';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', width: '100%' }}>
      <div style={{ 
        flex: 1, height: '6px', background: 'var(--surface-2)', borderRadius: 'var(--radius-pill)', overflow: 'hidden' 
      }}>
        <div style={{ 
          height: '100%', width: `${pct}%`, background: color, 
          borderRadius: 'var(--radius-pill)', transition: 'width 0.6s var(--ease-default)' 
        }} />
      </div>
      <span style={{ fontWeight: 700, minWidth: '28px', textAlign: 'right', color }}>{value}</span>
    </div>
  );
}

export default function Dashboard() {
  const { user, scores, charities } = useAppContext();
  const selectedCharity = charities.find(c => c.id === user?.charity_id);
  const avgScore = scores.length
    ? Math.round(scores.reduce((s, sc) => s + sc.score_value, 0) / scores.length)
    : 0;
  const bestScore = scores.length ? Math.max(...scores.map(s => s.score_value)) : 0;
  
  // Charity contribution: monthly plan @ £9.99, charity percent applied
  const monthlyContribution = (9.99 * ((user?.charity_percent ?? 10) / 100)).toFixed(2);

  function fmtDate(d: string) {
    return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  return (
    <div className="container animate-fade-in" style={{ padding: 'var(--space-2xl) var(--space-lg)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-2xl)' }}>
        <div className="badge badge-gold" style={{ marginBottom: 'var(--space-sm)' }}>
          {user?.subscription_status === 'active' ? '● Active Member' : user?.subscription_status}
        </div>
        <h1 style={{ marginBottom: 'var(--space-xs)' }}>
          Welcome, <span className="gradient-text">{user?.email.split('@')[0]}</span>
        </h1>
        <p className="text-secondary">Your performance tracker and impact hub.</p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
        {[
          { label: 'Average Score', value: avgScore, sub: 'Last 5 rounds', icon: <TrendingUp size={22} />, color: 'var(--accent-blue)' },
          { label: 'Best Score', value: bestScore, sub: `Max: 45 pts`, icon: <Star size={22} />, color: 'var(--accent-gold)' },
          { label: 'Rounds Logged', value: scores.length, sub: 'Out of 5 slots', icon: <Clock size={22} />, color: 'var(--accent-purple)' },
          { label: 'Charity %', value: `${user?.charity_percent ?? 10}%`, sub: 'Monthly fee donated', icon: <Heart size={22} />, color: 'var(--accent-emerald)' },
        ].map((stat) => (
          <div className="card" key={stat.label} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ padding: '8px', background: `color-mix(in srgb, ${stat.color} 15%, transparent)`, borderRadius: 'var(--radius-md)', color: stat.color }}>
                {stat.icon}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontWeight: 600, marginTop: '0.2rem' }}>{stat.label}</div>
              <div className="text-tertiary" style={{ fontSize: '0.82rem' }}>{stat.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Two-column: Scores + Charity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
        {/* Recent Scores */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
            <h3>Your Last 5 Scores</h3>
            <Link to="/scores" className="btn btn-ghost btn-sm">
              Manage <ArrowRight size={14} />
            </Link>
          </div>
          {scores.length === 0 ? (
            <p className="text-secondary">No scores yet. <Link to="/scores" className="text-gold">Add your first score →</Link></p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {scores.map((s) => (
                <div key={s.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span className="text-secondary" style={{ fontSize: '0.82rem' }}>{fmtDate(s.date_created)}</span>
                  </div>
                  <ScoreBar value={s.score_value} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Charity Impact */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
            <h3>Your Impact</h3>
            <Link to="/charities" className="btn btn-ghost btn-sm">
              Change <ArrowRight size={14} />
            </Link>
          </div>
          {selectedCharity ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
              <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
                <div style={{ 
                  width: '56px', height: '56px', borderRadius: 'var(--radius-md)',
                  background: 'var(--accent-gold-glow)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexShrink: 0
                }}>
                  <Heart size={28} className="text-gold" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>{selectedCharity.name}</div>
                  <div className="text-secondary" style={{ fontSize: '0.85rem' }}>{selectedCharity.description}</div>
                </div>
              </div>
              <div className="divider" style={{ margin: 0 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div className="text-secondary" style={{ fontSize: '0.82rem' }}>Monthly donation</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>£{monthlyContribution}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="text-secondary" style={{ fontSize: '0.82rem' }}>Your rate</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-gold)' }}>{user?.charity_percent}%</div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-secondary">No charity selected. <Link to="/charities" className="text-gold">Choose a cause →</Link></p>
          )}
        </div>
      </div>

      {/* Prize Draw CTA */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(139, 92, 246, 0.08) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 'var(--space-lg)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
          <div style={{ padding: '14px', background: 'var(--accent-purple-glow)', borderRadius: 'var(--radius-lg)', color: 'var(--accent-purple)' }}>
            <Trophy size={32} />
          </div>
          <div>
            <h3 style={{ marginBottom: '4px' }}>April Draw</h3>
            <p className="text-secondary">Prize pool growing — results published on May 1st.</p>
          </div>
        </div>
        <Link to="/draws" className="btn btn-primary">
          View Draws <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
