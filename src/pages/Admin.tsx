import { useState } from 'react';
import { useAppContext } from '../lib/AppContext';
import { Users, Building2, PlayCircle, Plus } from 'lucide-react';

export default function Admin() {
  const { allUsers, charities, draws, addCharity, deleteCharity, runDrawSimulation } = useAppContext();
  const [activeTab, setActiveTab] = useState<'users' | 'charities' | 'draws'>('draws');

  const upcomingDraws = draws.filter(d => !d.is_published);
  const totalSubscribers = allUsers.filter(u => u.subscription_status === 'active').length;
  const totalCharityPool = allUsers.reduce((sum, u) => {
    if (u.subscription_status === 'active') {
      return sum + (9.99 * ((u.charity_percent || 10) / 100)); // £9.99 monthly subs
    }
    return sum;
  }, 0);

  // -- Charity Management --
  const [newCharityName, setNewCharityName] = useState('');
  const [newCharityDesc, setNewCharityDesc] = useState('');

  const handleAddCharity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCharityName || !newCharityDesc) return;
    addCharity({
      name: newCharityName, description: newCharityDesc, active_status: true, logo_url: null
    });
    setNewCharityName(''); setNewCharityDesc('');
  };

  // -- Draw Simulation --
  const [simResults, setSimResults] = useState<{ nums: number[], payouts: any } | null>(null);
  
  const handleSimulateDraw = async () => {
    const pool = upcomingDraws[0]?.prize_pool_total || 5000;
    await runDrawSimulation(pool);
    setSimResults(null); // Clear local sim results as the real draw is now in the list
  };

  return (
    <div className="container animate-fade-in" style={{ padding: 'var(--space-2xl) var(--space-lg)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-2xl)' }}>
        <h1 style={{ marginBottom: 'var(--space-xs)' }}>Admin <span className="gradient-text">Console</span></h1>
        <p className="text-secondary">Platform management, charitable distributions, and draw controls.</p>
      </div>

      {/* Top Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
        <div className="card">
          <div className="text-secondary" style={{ fontSize: '0.85rem', marginBottom: '8px' }}>Active Subscribers</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-blue)' }}>{totalSubscribers}</div>
          <div className="text-tertiary" style={{ fontSize: '0.8rem', marginTop: '4px' }}>Across {allUsers.length} total users</div>
        </div>
        <div className="card">
          <div className="text-secondary" style={{ fontSize: '0.85rem', marginBottom: '8px' }}>Total Pledged (Month)</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>£{totalCharityPool.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
          <div className="text-tertiary" style={{ fontSize: '0.8rem', marginTop: '4px' }}>Distributing to {charities.filter(c => c.active_status).length} charities</div>
        </div>
        <div className="card">
          <div className="text-secondary" style={{ fontSize: '0.85rem', marginBottom: '8px' }}>Upcoming Prize Pool</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-gold)' }}>£{(upcomingDraws[0]?.prize_pool_total || 0).toLocaleString()}</div>
          <div className="text-tertiary" style={{ fontSize: '0.8rem', marginTop: '4px' }}>{upcomingDraws.length > 0 ? new Date(upcomingDraws[0].draw_date).toLocaleDateString() : 'None Scheduled'}</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-xl)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-md)' }}>
        <button 
          className={`btn ${activeTab === 'draws' ? 'btn-primary' : 'btn-ghost'}`} 
          onClick={() => setActiveTab('draws')}
        >
          <PlayCircle size={18} /> Draw Engine
        </button>
        <button 
          className={`btn ${activeTab === 'charities' ? 'btn-primary' : 'btn-ghost'}`} 
          onClick={() => setActiveTab('charities')}
        >
          <Building2 size={18} /> Charities
        </button>
        <button 
          className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-ghost'}`} 
          onClick={() => setActiveTab('users')}
        >
          <Users size={18} /> Users
        </button>
      </div>

      {/* Content */}
      <div style={{ minHeight: '400px' }}>
        
        {/* -- DRAWS TAB -- */}
        {activeTab === 'draws' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: 'var(--space-xl)' }}>
            <div className="card">
              <h3 style={{ marginBottom: 'var(--space-md)' }}>Next Scheduled Draw</h3>
              {upcomingDraws.length > 0 ? (
                <div>
                  <div style={{ display: 'flex', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
                    <div style={{ flex: 1, padding: 'var(--space-md)', background: 'var(--surface-1)', borderRadius: 'var(--radius-md)' }}>
                      <div className="text-secondary" style={{ fontSize: '0.85rem' }}>Date</div>
                      <div style={{ fontWeight: 600 }}>{new Date(upcomingDraws[0].draw_date).toLocaleDateString()}</div>
                    </div>
                    <div style={{ flex: 1, padding: 'var(--space-md)', background: 'var(--surface-1)', borderRadius: 'var(--radius-md)' }}>
                      <div className="text-secondary" style={{ fontSize: '0.85rem' }}>Prize Pool</div>
                      <div style={{ fontWeight: 600, color: 'var(--accent-gold)' }}>£{upcomingDraws[0].prize_pool_total.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="divider" />
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
                    <div>
                      <h4>Manual Draw Simulation</h4>
                      <p className="text-secondary" style={{ fontSize: '0.85rem' }}>Generates 5 numbers restricting out-of-bounds (1-45).</p>
                    </div>
                    <button className="btn btn-secondary" onClick={handleSimulateDraw}>
                      <PlayCircle size={16} /> Run Engine
                    </button>
                  </div>

                  {simResults && (
                    <div className="animate-slide-up" style={{ padding: 'var(--space-lg)', background: 'var(--accent-purple-glow)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                      <h4 style={{ color: 'var(--accent-purple)', marginBottom: 'var(--space-sm)' }}>Simulation Complete</h4>
                      
                      <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
                        {simResults.nums.map((n, i) => (
                          <div key={i} style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent-purple)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                            {n}
                          </div>
                        ))}
                      </div>
                      
                      <div style={{ display: 'flex', gap: 'var(--space-lg)' }}>
                        <div>
                          <div className="text-secondary" style={{ fontSize: '0.8rem' }}>Jackpot (5)</div>
                          <div style={{ fontWeight: 600 }}>0 Winners</div>
                          <div className="text-tertiary" style={{ fontSize: '0.8rem' }}>Rolls forward: £{simResults.payouts.jackpotPool.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-secondary" style={{ fontSize: '0.8rem' }}>Tier 2 (4)</div>
                          <div style={{ fontWeight: 600 }}>2 Winners</div>
                          <div className="text-tertiary" style={{ fontSize: '0.8rem' }}>£{simResults.payouts.tier2.toLocaleString()} each</div>
                        </div>
                        <div>
                          <div className="text-secondary" style={{ fontSize: '0.8rem' }}>Tier 3 (3)</div>
                          <div style={{ fontWeight: 600 }}>14 Winners</div>
                          <div className="text-tertiary" style={{ fontSize: '0.8rem' }}>£{simResults.payouts.tier3.toLocaleString()} each</div>
                        </div>
                      </div>

                      <div style={{ marginTop: 'var(--space-md)', textAlign: 'right' }}>
                        <button className="btn btn-primary btn-sm">Publish Winners & Payout</button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-secondary">No upcoming draws scheduled.</p>
              )}
            </div>

            <div className="card">
              <h3 style={{ marginBottom: 'var(--space-md)' }}>Audit Logs</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                <div style={{ fontSize: '0.85rem', padding: 'var(--space-sm)', background: 'var(--surface-1)', borderRadius: 'var(--radius-sm)' }}>
                  <span className="text-secondary">03/01/2026</span> - Admin verified draw pool.
                </div>
                <div style={{ fontSize: '0.85rem', padding: 'var(--space-sm)', background: 'var(--surface-1)', borderRadius: 'var(--radius-sm)' }}>
                  <span className="text-secondary">02/01/2026</span> - Published Feb Draw Winners.
                </div>
                <div style={{ fontSize: '0.85rem', padding: 'var(--space-sm)', background: 'var(--surface-1)', borderRadius: 'var(--radius-sm)' }}>
                  <span className="text-secondary">01/30/2026</span> - Automated stripe webhook processed 420 renewals.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -- CHARITIES TAB -- */}
        {activeTab === 'charities' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 'var(--space-xl)' }}>
            <div className="card">
              <h3 style={{ marginBottom: 'var(--space-md)' }}>Add Organization</h3>
              <form onSubmit={handleAddCharity} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div className="input-group">
                  <label>Charity Name</label>
                  <input type="text" className="input-field" value={newCharityName} onChange={e => setNewCharityName(e.target.value)} required />
                </div>
                <div className="input-group">
                  <label>Mission / Description</label>
                  <textarea className="input-field" value={newCharityDesc} onChange={e => setNewCharityDesc(e.target.value)} rows={3} required />
                </div>
                <button type="submit" className="btn btn-secondary">
                  <Plus size={16} /> Add to Platform
                </button>
              </form>
            </div>

            <div className="card">
              <h3 style={{ marginBottom: 'var(--space-md)' }}>Active Database</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                {charities.map(c => (
                  <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-md)', background: 'var(--surface-1)', borderRadius: 'var(--radius-md)' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                        <span style={{ fontWeight: 600 }}>{c.name}</span>
                        {!c.active_status && <span className="badge badge-rose">Inactive</span>}
                      </div>
                      <div className="text-secondary" style={{ fontSize: '0.85rem', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{c.description}</div>
                    </div>
                    <button className="btn btn-ghost btn-danger" style={{ padding: '0.4rem' }} onClick={() => deleteCharity(c.id)}>
                      Deactivate
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* -- USERS TAB -- */}
        {activeTab === 'users' && (
          <div className="card">
            <h3 style={{ marginBottom: 'var(--space-lg)' }}>Member Database</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <th style={{ padding: 'var(--space-sm)', color: 'var(--text-secondary)' }}>Email</th>
                    <th style={{ padding: 'var(--space-sm)', color: 'var(--text-secondary)' }}>Status</th>
                    <th style={{ padding: 'var(--space-sm)', color: 'var(--text-secondary)' }}>Donation %</th>
                    <th style={{ padding: 'var(--space-sm)', color: 'var(--text-secondary)' }}>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((u) => (
                    <tr key={u.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: 'var(--space-sm) var(--space-md)', fontWeight: 500 }}>
                        {u.email}
                        {u.is_admin && <span className="badge badge-gold" style={{ marginLeft: '8px' }}>Admin</span>}
                      </td>
                      <td style={{ padding: 'var(--space-sm) var(--space-md)' }}>
                        <span className={`badge ${u.subscription_status === 'active' ? 'badge-emerald' : 'badge-rose'}`}>
                          {u.subscription_status}
                        </span>
                      </td>
                      <td style={{ padding: 'var(--space-sm) var(--space-md)' }}>{u.charity_percent}%</td>
                      <td style={{ padding: 'var(--space-sm) var(--space-md)' }} className="text-secondary">
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
