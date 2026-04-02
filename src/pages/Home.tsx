import { Link } from 'react-router-dom';
import { Trophy, Heart, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section style={{ 
        padding: 'var(--space-3xl) 0',
        background: 'var(--gradient-hero)',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Abstract background elements */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '40%',
          height: '60%',
          background: 'var(--accent-gold-glow)',
          filter: 'blur(120px)',
          borderRadius: '50%',
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '30%',
          height: '50%',
          background: 'var(--accent-purple-glow)',
          filter: 'blur(100px)',
          borderRadius: '50%',
          zIndex: 0
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '700px' }}>
            <div className="badge badge-gold" style={{ marginBottom: 'var(--space-md)' }}>
              A New Era of Golf Philanthropy
            </div>
            <h1 style={{ marginBottom: 'var(--space-lg)', lineHeight: 1.1 }}>
              Track Your Game. <br />
              <span className="gradient-text">Change the World.</span>
            </h1>
            <p className="text-secondary" style={{ fontSize: '1.2rem', marginBottom: 'var(--space-2xl)', maxWidth: '600px' }}>
              The modern platform for golfers who play for more than just the score. 
              Automate your charitable giving, enter exclusive draws, and track your impact.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
              <Link to="/login" className="btn btn-primary btn-lg">
                Start Tracking <ArrowRight size={20} />
              </Link>
              <Link to="/charities" className="btn btn-secondary btn-lg">
                View Charities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section style={{ padding: 'var(--space-3xl) 0', background: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
            <h2 style={{ marginBottom: 'var(--space-md)' }}>The Experience</h2>
            <p className="text-secondary" style={{ maxWidth: '600px', margin: '0 auto' }}>
              No plaid. No clichés. Just performance and purpose driven by technology.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: 'var(--space-xl)' 
          }}>
            <div className="card">
              <div style={{ 
                width: '48px', 
                height: '48px', 
                background: 'var(--accent-blue-glow)', 
                color: 'var(--accent-blue)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-lg)'
              }}>
                <TrendingUp size={24} />
              </div>
              <h3 style={{ marginBottom: 'var(--space-md)' }}>Rolling Score Logic</h3>
              <p className="text-secondary">
                Input your latest Stableford scores. Our system maintains your last 5 rounds, 
                keeping your entry live and your stats fresh.
              </p>
            </div>

            <div className="card">
              <div style={{ 
                width: '48px', 
                height: '48px', 
                background: 'var(--accent-purple-glow)', 
                color: 'var(--accent-purple)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-lg)'
              }}>
                <Trophy size={24} />
              </div>
              <h3 style={{ marginBottom: 'var(--space-md)' }}>Monthly Prize Logic</h3>
              <p className="text-secondary">
                Your performance converts to entries. Match 3, 4, or 5 numbers in our monthly 
                draws to win from the collective prize pool.
              </p>
            </div>

            <div className="card">
              <div style={{ 
                width: '48px', 
                height: '48px', 
                background: 'var(--accent-gold-glow)', 
                color: 'var(--accent-gold)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-lg)'
              }}>
                <Heart size={24} />
              </div>
              <h3 style={{ marginBottom: 'var(--space-md)' }}>Impact Tracking</h3>
              <p className="text-secondary">
                Select your preferred charity. A portion of every subscription fee and 
                prize pool is automatically donated in your name.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section style={{ padding: 'var(--space-3xl) 0', background: 'var(--bg-secondary)', textAlign: 'center' }}>
        <div className="container">
          <div style={{ 
            maxWidth: '800px', 
            margin: '0 auto', 
            padding: 'var(--space-3xl)', 
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            background: 'var(--bg-card)'
          }}>
            <ShieldCheck size={48} className="text-gold" style={{ marginBottom: 'var(--space-lg)' }} />
            <h2 style={{ marginBottom: 'var(--space-lg)', fontStyle: 'italic' }}>
              "This platform isn't just about golf. It's about a community using our shared passion to create real-world change."
            </h2>
            <div className="text-gold" style={{ fontWeight: 600 }}>Marcus Reed</div>
            <div className="text-tertiary" style={{ fontSize: '0.9rem' }}>Founder, Swings for Hope</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: 'var(--space-3xl) 0', background: 'var(--bg-primary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="navbar-brand" style={{ justifyContent: 'center', marginBottom: 'var(--space-lg)' }}>
            <div className="navbar-brand-icon">GC</div>
            <span>Golf <span className="text-gold">Charity</span></span>
          </div>
          <p className="text-tertiary" style={{ fontSize: '0.9rem' }}>
            © 2026 Golf Charity Philanthropy. All rights reserved. <br />
            Built for modern athletes with a heart for change.
          </p>
        </div>
      </footer>
    </div>
  );
}
