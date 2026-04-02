import { useState } from 'react';
import { useAppContext } from '../lib/AppContext';
import { Heart, CheckCircle2, Info } from 'lucide-react';

export default function Charities() {
  const { user, charities, selectCharity } = useAppContext();
  const [selectedPercent, setSelectedPercent] = useState<number>(user?.charity_percent || 10);
  const [activeCharity, setActiveCharity] = useState<string | null>(user?.charity_id || null);

  const handleSave = () => {
    if (activeCharity) {
      selectCharity(activeCharity, selectedPercent);
      // Optional: add a toast or success feedback here
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: 'var(--space-2xl) var(--space-lg)' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
        <h1 style={{ marginBottom: 'var(--space-md)' }}>Impact & <span className="gradient-text">Philanthropy</span></h1>
        <p className="text-secondary" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Choose where your subscription contribution goes. A minimum of 10% is always donated.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-2xl)', maxWidth: '900px', margin: '0 auto' }}>
        {/* Settings Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
            <Heart size={24} className="text-emerald" />
            <h3 style={{ margin: 0 }}>Donation Settings</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <label htmlFor="percent-slider" style={{ fontWeight: 600 }}>
              Contribution Percentage: <span className="text-gold" style={{ fontSize: '1.2rem' }}>{selectedPercent}%</span>
            </label>
            <input 
              id="percent-slider"
              type="range" 
              min="10" 
              max="100" 
              step="5" 
              value={selectedPercent}
              onChange={(e) => setSelectedPercent(parseInt(e.target.value))}
              style={{
                width: '100%',
                cursor: 'pointer',
                accentColor: 'var(--accent-gold)'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span className="text-secondary">Min: 10%</span>
              <span className="text-secondary">Max: 100%</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center', padding: 'var(--space-sm)', background: 'var(--surface-1)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem' }}>
            <Info size={16} className="text-blue" />
            <span className="text-secondary">This percentage applies to your monthly subscription fee and potential draw winnings.</span>
          </div>
        </div>

        {/* Charity List */}
        <div>
          <h3 style={{ marginBottom: 'var(--space-lg)' }}>Available Causes</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-md)' }}>
            {charities.filter(c => c.active_status).map((charity) => (
              <div 
                key={charity.id} 
                className={`card ${activeCharity === charity.id ? 'active' : ''}`}
                style={{
                  cursor: 'pointer',
                  border: activeCharity === charity.id ? '2px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                  background: activeCharity === charity.id ? 'var(--accent-gold-glow)' : 'var(--bg-card)',
                  transform: activeCharity === charity.id ? 'translateY(-4px)' : 'none',
                  boxShadow: activeCharity === charity.id ? 'var(--shadow-gold)' : 'var(--shadow-sm)'
                }}
                onClick={() => setActiveCharity(charity.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-md)' }}>
                  <h4 style={{ margin: 0 }}>{charity.name}</h4>
                  {activeCharity === charity.id && <CheckCircle2 size={24} className="text-gold" />}
                </div>
                <p className="text-secondary" style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
                  {charity.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div style={{ textAlign: 'center', marginTop: 'var(--space-lg)' }}>
          <button 
            className="btn btn-primary btn-lg" 
            onClick={handleSave}
            disabled={!activeCharity}
            style={{ minWidth: '200px' }}
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
