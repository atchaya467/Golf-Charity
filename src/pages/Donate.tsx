import { useState } from 'react';
import { ShieldCheck, CreditCard, Loader2 } from 'lucide-react';
import { useAppContext } from '../lib/AppContext';

export default function Donate() {
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { donate } = useAppContext();

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    setIsSubmitting(true);
    try {
      await donate(parseFloat(amount));
      alert(`Thank you for your donation of $${amount}!`);
      setAmount('');
    } catch (err) {
      const error = err as Error;
      alert(error.message || 'Donation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <section style={{ padding: 'var(--space-3xl) 0', background: 'var(--gradient-hero)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="badge badge-gold" style={{ marginBottom: 'var(--space-md)' }}>
            Make an Impact
          </div>
          <h1>Support the Future <br /><span className="gradient-text">of the Game.</span></h1>
          <p className="text-secondary" style={{ maxWidth: '600px', margin: '0 auto', marginTop: 'var(--space-md)' }}>
            Your contribution directly funds coaching programs, equipment, and course access for aspiring junior golfers.
          </p>
        </div>
      </section>

      <section style={{ padding: 'var(--space-3xl) 0' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <div className="card">
            <h2 style={{ marginBottom: 'var(--space-xl)', textAlign: 'center' }}>Choose Amount</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
              {['25', '50', '100', '250', '500', '1000'].map((val) => (
                <button 
                  key={val}
                  onClick={() => setAmount(val)}
                  className={`btn ${amount === val ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ width: '100%' }}
                >
                  ${val}
                </button>
              ))}
            </div>

            <form onSubmit={handleDonate} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
              <div className="input-group">
                <label>Custom Amount ($)</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }}>$</span>
                  <input 
                    type="number" 
                    className="input-field" 
                    style={{ paddingLeft: '2.5rem', width: '100%' }}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div style={{ padding: 'var(--space-md)', background: 'var(--surface-1)', borderRadius: 'var(--radius-md)', display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
                <ShieldCheck className="text-emerald" size={24} />
                <div style={{ fontSize: '0.85rem' }}>
                  <div style={{ fontWeight: 600 }}>Secure Payment Processing</div>
                  <div className="text-tertiary">All transactions are encrypted and secured by Stripe.</div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting} style={{ width: '100%' }}>
                {isSubmitting ? <Loader2 className="spinner" /> : <><CreditCard size={20} /> Complete Donation</>}
              </button>
            </form>
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-2xl)' }}>
            <p className="text-tertiary" style={{ fontSize: '0.9rem' }}>
              Fairway Futures Foundation is a 501(c)(3) non-profit organization. <br />
              All donations are tax-deductible to the extent allowed by law.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
