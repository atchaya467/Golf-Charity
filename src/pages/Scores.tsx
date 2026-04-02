import { useState } from 'react';
import { useAppContext } from '../lib/AppContext';
import { Plus, TrendingUp, AlertCircle } from 'lucide-react';

export default function Scores() {
  const { scores, addScore } = useAppContext();
  const [newScore, setNewScore] = useState('');
  const [error, setError] = useState('');
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const val = parseInt(newScore, 10);
    if (isNaN(val) || val < 1 || val > 45) {
      setError('Score must be between 1 and 45.');
      return;
    }
    addScore(val);
    setJustAdded(`s-${Date.now()}`);
    setNewScore('');
    setTimeout(() => setJustAdded(null), 1500);
  };

  const avgScore = scores.length
    ? (scores.reduce((s, sc) => s + sc.score_value, 0) / scores.length).toFixed(1)
    : '—';

  const bestScore = scores.length ? Math.max(...scores.map(s => s.score_value)) : 0;
  const worstScore = scores.length ? Math.min(...scores.map(s => s.score_value)) : 0;

  function fmtDate(d: string) {
    return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function fmtTime(d: string) {
    return new Date(d).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  }

  function getScoreColor(value: number) {
    if (value >= 36) return 'var(--accent-emerald)';
    if (value >= 27) return 'var(--accent-gold)';
    if (value >= 18) return 'var(--accent-blue)';
    return 'var(--accent-rose)';
  }

  return (
    <div className="container animate-fade-in" style={{ padding: 'var(--space-2xl) var(--space-lg)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-2xl)' }}>
        <h1 style={{ marginBottom: 'var(--space-xs)' }}>Score <span className="gradient-text">Tracker</span></h1>
        <p className="text-secondary">
          Manage your rolling 5 Stableford scores. Only your most recent 5 are kept.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-xl)' }}>
        {/* Left Column - Add + Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          {/* Add Score Card */}
          <div className="card" style={{ border: '1px solid rgba(212, 168, 83, 0.15)' }}>
            <h3 style={{ marginBottom: 'var(--space-lg)' }}>
              <Plus size={20} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
              Submit New Score
            </h3>

            <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {error && (
                <div style={{
                  padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-md)',
                  background: 'var(--accent-rose-glow)', color: 'var(--accent-rose)',
                  fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px'
                }}>
                  <AlertCircle size={16} /> {error}
                </div>
              )}

              <div className="input-group">
                <label htmlFor="score-input">Stableford Score (1–45)</label>
                <input
                  id="score-input"
                  type="number"
                  className="input-field"
                  placeholder="e.g. 34"
                  min={1}
                  max={45}
                  value={newScore}
                  onChange={(e) => setNewScore(e.target.value)}
                  style={{ fontSize: '1.4rem', fontWeight: 700, textAlign: 'center', padding: '1rem' }}
                />
              </div>

              {/* Visual Guide */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem',
                padding: '0 4px'
              }}>
                <span style={{ color: 'var(--accent-rose)' }}>1 — Low</span>
                <span style={{ color: 'var(--accent-blue)' }}>18 — Mid</span>
                <span style={{ color: 'var(--accent-gold)' }}>27 — Good</span>
                <span style={{ color: 'var(--accent-emerald)' }}>36+ — Great</span>
              </div>

              <div style={{
                height: '6px', borderRadius: 'var(--radius-pill)', overflow: 'hidden',
                background: 'linear-gradient(90deg, var(--accent-rose), var(--accent-blue), var(--accent-gold), var(--accent-emerald))'
              }} />

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <Plus size={18} /> Add Score
              </button>

              {scores.length >= 5 && (
                <p className="text-tertiary" style={{ fontSize: '0.82rem', textAlign: 'center' }}>
                  Adding a score will replace your oldest entry.
                </p>
              )}
            </form>
          </div>

          {/* Stats Card */}
          <div className="card">
            <h3 style={{ marginBottom: 'var(--space-lg)' }}>
              <TrendingUp size={20} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
              Quick Stats
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-md)' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-blue)' }}>{avgScore}</div>
                <div className="text-secondary" style={{ fontSize: '0.82rem' }}>Average</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>{bestScore || '—'}</div>
                <div className="text-secondary" style={{ fontSize: '0.82rem' }}>Best</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-rose)' }}>{worstScore || '—'}</div>
                <div className="text-secondary" style={{ fontSize: '0.82rem' }}>Lowest</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Score List */}
        <div className="card">
          <h3 style={{ marginBottom: 'var(--space-lg)' }}>
            Score History
            <span className="badge badge-blue" style={{ marginLeft: '8px', verticalAlign: 'middle' }}>
              {scores.length}/5
            </span>
          </h3>

          {scores.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-3xl) 0' }}>
              <TrendingUp size={48} className="text-tertiary" style={{ marginBottom: 'var(--space-md)' }} />
              <p className="text-secondary">No scores recorded yet.</p>
              <p className="text-tertiary" style={{ fontSize: '0.85rem' }}>Add your first Stableford score above.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              {scores.map((s, index) => (
                <div
                  key={s.id}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: 'var(--space-md)', borderRadius: 'var(--radius-md)',
                    background: justAdded === s.id ? 'var(--accent-gold-glow)' : 'var(--surface-1)',
                    border: `1px solid ${justAdded === s.id ? 'rgba(212,168,83,0.3)' : 'transparent'}`,
                    transition: 'all var(--transition-default)',
                    animation: index === 0 ? 'slide-up 0.4s var(--ease-default)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                    <div style={{
                      width: '48px', height: '48px', borderRadius: 'var(--radius-md)',
                      background: `color-mix(in srgb, ${getScoreColor(s.score_value)} 15%, transparent)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 800, fontSize: '1.2rem', color: getScoreColor(s.score_value),
                      fontFamily: 'var(--font-heading)'
                    }}>
                      {s.score_value}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                        Round #{scores.length - index}
                      </div>
                      <div className="text-tertiary" style={{ fontSize: '0.82rem' }}>
                        {fmtDate(s.date_created)} · {fmtTime(s.date_created)}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    width: '80px', height: '4px', background: 'var(--surface-2)',
                    borderRadius: 'var(--radius-pill)', overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%', width: `${(s.score_value / 45) * 100}%`,
                      background: getScoreColor(s.score_value),
                      borderRadius: 'var(--radius-pill)',
                      transition: 'width 0.6s var(--ease-default)'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
