import { useAppContext } from '../lib/AppContext';
import { countMatches, calculatePayouts } from '../lib/utils';
import { Calendar, Trophy, AlertCircle, Sparkles } from 'lucide-react';

export default function Draws() {
  const { draws, scores } = useAppContext();
  
  // Get active (upcoming/unpublished) and past (published) draws
  const upcomingDraws = draws.filter(d => !d.is_published);
  const pastDraws = draws.filter(d => d.is_published).sort((a, b) => new Date(b.draw_date).getTime() - new Date(a.draw_date).getTime());

  // Check if user has enough scores (5) to enter
  const isEligible = scores.length === 5;
  const userScoreValues = scores.map(s => s.score_value);

  const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  return (
    <div className="container animate-fade-in" style={{ padding: 'var(--space-2xl) var(--space-lg)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-2xl)' }}>
        <h1 style={{ marginBottom: 'var(--space-xs)' }}>Prize <span className="gradient-text">Draws</span></h1>
        <p className="text-secondary">
          Enter monthly draws based on your rolling performance. Match 3, 4, or 5 numbers to win!
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)', gap: 'var(--space-xl)' }}>
        
        {/* Left Column - User Status & Upcoming */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          {/* Eligibility Card */}
          <div className="card" style={{ 
            border: `1px solid ${isEligible ? 'var(--accent-emerald)' : 'var(--accent-rose)'}`,
            background: isEligible ? 'var(--accent-emerald-glow)' : 'var(--accent-rose-glow)'
          }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
              {isEligible ? <CheckIcon color="var(--accent-emerald)" /> : <AlertCircle className="text-rose" />}
              {isEligible ? 'Ready for Next Draw' : 'Action Required'}
            </h3>
            <p className={isEligible ? 'text-emerald' : 'text-rose'} style={{ fontSize: '0.95rem' }}>
              {isEligible 
                ? `Your rolling 5 scores (${userScoreValues.join(', ')}) are locked in for the upcoming draw.` 
                : `You need ${5 - scores.length} more score(s) to enter the next monthly draw.`}
            </p>
          </div>

          {/* Upcoming Draw */}
          {upcomingDraws.map(draw => (
            <div key={draw.id} className="card" style={{ background: 'var(--surface-1)' }}>
              <div className="badge badge-purple" style={{ marginBottom: 'var(--space-sm)' }}>
                Upcoming Draw
              </div>
              <h2 style={{ marginBottom: 'var(--space-xs)' }}>{fmtDate(draw.draw_date)}</h2>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: 'var(--space-md)' }}>
                £{draw.prize_pool_total.toLocaleString()}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                <Calendar size={16} /> Draw occurs on the 1st of the month
              </div>
              
              <div className="divider" style={{ margin: 'var(--space-md) 0' }} />
              
              <div style={{ fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="text-secondary">Jackpot (5 Matches)</span>
                  <span className="text-gold" style={{ fontWeight: 600 }}>£{(draw.prize_pool_total * 0.4).toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="text-secondary">Tier 2 (4 Matches)</span>
                  <span className="text-blue" style={{ fontWeight: 600 }}>£{(draw.prize_pool_total * 0.35).toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-secondary">Tier 3 (3 Matches)</span>
                  <span className="text-emerald" style={{ fontWeight: 600 }}>£{(draw.prize_pool_total * 0.25).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column - Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
            <Trophy className="text-gold" /> Past Results
          </h2>

          {pastDraws.length === 0 ? (
            <div className="card text-center text-secondary">No past draws available.</div>
          ) : (
             pastDraws.map(draw => {
              // Note: for a REAL app, we'd fetch the user's specific scores AT THE TIME of the draw.
              // Here, we just use their current rolling 5 for demonstration purposes.
              const matches = isEligible ? countMatches(userScoreValues, draw.winning_numbers) : 0;
              const payouts = calculatePayouts(draw.prize_pool_total, 1, 3, 15); // Mocked winner counts
              
              let winnings = 0;
              let tier = '';
              if (matches === 5) { winnings = payouts.tier1; tier = 'Jackpot Winner!'; }
              else if (matches === 4) { winnings = payouts.tier2; tier = 'Tier 2 Winner'; }
              else if (matches === 3) { winnings = payouts.tier3; tier = 'Tier 3 Winner'; }

              return (
                <div key={draw.id} className="card" style={{ 
                  border: matches >= 3 ? '1px solid var(--accent-gold)' : undefined,
                  background: matches >= 3 ? 'var(--accent-gold-glow)' : 'var(--bg-card)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-md)' }}>
                    <div>
                      <h3 style={{ marginBottom: '4px' }}>{fmtDate(draw.draw_date)}</h3>
                      <div className="text-secondary" style={{ fontSize: '0.85rem' }}>Total Pool: £{draw.prize_pool_total.toLocaleString()}</div>
                    </div>
                    {matches >= 3 && (
                      <div className="badge badge-gold" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Sparkles size={12} /> {tier}
                      </div>
                    )}
                  </div>

                  <div style={{ marginBottom: 'var(--space-lg)' }}>
                    <div className="text-tertiary" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Winning Numbers</div>
                    <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                      {draw.winning_numbers.map((num, i) => {
                        const isMatch = isEligible && userScoreValues.includes(num);
                        return (
                          <div key={i} style={{ 
                            width: '40px', height: '40px', borderRadius: '50%',
                            background: isMatch ? 'var(--accent-gold)' : 'var(--surface-2)',
                            color: isMatch ? '#0a0a0f' : 'inherit',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: 700, fontSize: '1.1rem',
                            boxShadow: isMatch ? 'var(--shadow-gold)' : 'none'
                          }}>
                            {num}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {isEligible ? (
                    <div style={{ padding: 'var(--space-md)', background: 'var(--surface-1)', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <span className="text-secondary" style={{ fontSize: '0.85rem', display: 'block' }}>Your Matches</span>
                          <span style={{ fontWeight: 600 }}>{matches} / 5</span>
                        </div>
                        {matches >= 3 && (
                          <div style={{ textAlign: 'right' }}>
                            <span className="text-secondary" style={{ fontSize: '0.85rem', display: 'block' }}>Your Payout</span>
                            <span className="text-gold" style={{ fontWeight: 800, fontSize: '1.2rem' }}>£{winnings.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-tertiary" style={{ fontSize: '0.85rem' }}>You did not have 5 valid scores to enter this draw.</p>
                  )}
                </div>
              );
             })
          )}
        </div>
      </div>
    </div>
  );
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}
