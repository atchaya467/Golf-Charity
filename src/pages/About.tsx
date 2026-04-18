import { Shield, Target, Users, History } from 'lucide-react';

export default function About() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section style={{ 
        padding: 'var(--space-3xl) 0',
        background: 'var(--gradient-hero)',
        textAlign: 'center'
      }}>
        <div className="container">
          <div className="badge badge-gold" style={{ marginBottom: 'var(--space-md)' }}>
            Our Mission
          </div>
          <h1 style={{ marginBottom: 'var(--space-lg)' }}>
            Empowering the Next Generation <br />
            <span className="gradient-text">Through Golf.</span>
          </h1>
          <p className="text-secondary" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem' }}>
            Fairway Futures Foundation is a registered non-profit dedicated to providing underprivileged youth with the mentorship, specialized coaching, and course access they need to excel.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section style={{ padding: 'var(--space-3xl) 0', background: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: 'var(--space-xl)' 
          }}>
            <div className="card">
              <Target className="text-gold" size={40} style={{ marginBottom: 'var(--space-lg)' }} />
              <h3 style={{ marginBottom: 'var(--space-md)' }}>Our Purpose</h3>
              <p className="text-secondary">
                We believe golf is more than just a game; it's a vehicle for character building, discipline, and networking that should be accessible to everyone, regardless of background.
              </p>
            </div>
            <div className="card">
              <Users className="text-blue" size={40} style={{ marginBottom: 'var(--space-lg)' }} />
              <h3 style={{ marginBottom: 'var(--space-md)' }}>The Community</h3>
              <p className="text-secondary">
                With over 50 partner clubs and 200 volunteer coaches, we've built a network that spans the country, providing safe environments for growth.
              </p>
            </div>
            <div className="card">
              <History className="text-purple" size={40} style={{ marginBottom: 'var(--space-lg)' }} />
              <h3 style={{ marginBottom: 'var(--space-md)' }}>Our History</h3>
              <p className="text-secondary">
                Founded in 2024, what started as a small local tournament has grown into a national movement, raising over $2.5M for youth sports programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section style={{ padding: 'var(--space-3xl) 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
            <h2 style={{ marginBottom: 'var(--space-md)' }}>Leadership Team</h2>
            <p className="text-secondary">The visionary minds driving our mission forward.</p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: 'var(--space-xl)' 
          }}>
            {[
              { name: 'Sarah Montgomery', role: 'Executive Director', bio: 'Former PGA professional with 15 years in non-profit management.' },
              { name: 'David Chen', role: 'Director of Programs', bio: 'Specialist in youth athletic development and educational outreach.' },
              { name: 'Marcus Reed', role: 'Founder & Board Chair', bio: 'Venture philanthropist and lifelong advocate for sports accessibility.' }
            ].map((leader, i) => (
              <div key={i} className="card" style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '50%', 
                  background: 'var(--surface-3)', 
                  margin: '0 auto var(--space-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Users size={32} className="text-tertiary" />
                </div>
                <h4 style={{ marginBottom: 'var(--space-xs)' }}>{leader.name}</h4>
                <div className="text-gold" style={{ fontSize: '0.85rem', marginBottom: 'var(--space-md)', fontWeight: 600 }}>{leader.role}</div>
                <p className="text-tertiary" style={{ fontSize: '0.9rem' }}>{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
