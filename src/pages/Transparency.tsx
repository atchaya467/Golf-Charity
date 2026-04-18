import { ShieldCheck, FileText } from 'lucide-react';

export default function Transparency() {
  const allocation = [
    { category: 'Youth Coaching Programs', percent: 65, color: 'var(--accent-gold)' },
    { category: 'Course Access & Equipment', percent: 20, color: 'var(--accent-blue)' },
    { category: 'Operations & Admin', percent: 10, color: 'var(--accent-purple)' },
    { category: 'Fundraising', percent: 5, color: 'var(--text-tertiary)' },
  ];

  return (
    <div className="animate-fade-in">
      <section style={{ padding: 'var(--space-3xl) 0', background: 'var(--gradient-hero)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="badge badge-blue" style={{ marginBottom: 'var(--space-md)' }}>
            Financial Accountability
          </div>
          <h1 style={{ marginBottom: 'var(--space-lg)' }}>
            Your Impact, <br />
            <span className="gradient-text">Fully Transparent.</span>
          </h1>
          <p className="text-secondary" style={{ maxWidth: '700px', margin: '0 auto' }}>
            We believe that trust is built through openness. Here is how every dollar donated to the Fairway Futures Foundation is utilized.
          </p>
        </div>
      </section>

      <section style={{ padding: 'var(--space-3xl) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--space-2xl)', alignItems: 'center' }}>
            <div>
              <h2 style={{ marginBottom: 'var(--space-lg)' }}>Fund Allocation</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                {allocation.map((item, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-xs)' }}>
                      <span style={{ fontWeight: 500 }}>{item.category}</span>
                      <span className="text-gold" style={{ fontWeight: 700 }}>{item.percent}%</span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--surface-1)', borderRadius: 'var(--radius-pill)', overflow: 'hidden' }}>
                      <div style={{ width: `${item.percent}%`, height: '100%', background: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-glass">
              <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
                <ShieldCheck className="text-gold" size={48} style={{ marginBottom: 'var(--space-md)' }} />
                <h3>Verified Impact</h3>
              </div>
              <p className="text-secondary" style={{ marginBottom: 'var(--space-lg)' }}>
                Our financial records are audited annually by an independent third party to ensure 100% compliance with non-profit regulations.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                  <FileText size={16} /> Annual Report 2024
                </button>
                <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                  <FileText size={16} /> Tax Filings (990)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'var(--space-3xl) 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
            <h2>Real-World Outcomes</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-xl)' }}>
            {[
              { label: 'Scholarships Awarded', value: '1,200+' },
              { label: 'Courses Accessible', value: '54' },
              { label: 'Professional Graduates', value: '12' },
              { label: 'Program Satisfaction', value: '98%' },
            ].map((stat, i) => (
              <div key={i} className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 'var(--space-xs)', color: 'var(--accent-gold)' }}>
                  {stat.value}
                </div>
                <div className="text-secondary" style={{ fontWeight: 500 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
