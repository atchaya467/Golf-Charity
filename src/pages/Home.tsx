import { Link } from 'react-router-dom';
import { Heart, Quote } from 'lucide-react';

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Demo Project Disclaimer */}
      <div style={{ 
        background: 'var(--accent-gold-glow)', 
        color: 'var(--accent-gold)', 
        textAlign: 'center', 
        padding: 'var(--space-sm)', 
        fontSize: '0.8rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        Professional Portfolio Demo Project • Not a Registered 501(c)(3)
      </div>

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
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '700px' }}>
            <div className="badge badge-gold" style={{ marginBottom: 'var(--space-md)' }}>
              Empowering Youth Through the Game
            </div>
            <h1 style={{ marginBottom: 'var(--space-lg)', lineHeight: 1.1 }}>
              The Future of Golf <br />
              <span className="gradient-text">Starts with Them.</span>
            </h1>
            <p className="text-secondary" style={{ fontSize: '1.2rem', marginBottom: 'var(--space-2xl)', maxWidth: '600px' }}>
              Fairway Futures provides underprivileged youth with professional coaching, 
              equipment, and course access. Every swing you take helps close the opportunity gap.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
              <Link to="/donate" className="btn btn-primary btn-lg">
                Donate Now <Heart size={18} style={{ marginLeft: '8px' }} />
              </Link>
              <Link to="/events" className="btn btn-secondary btn-lg">
                View Tournaments
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Logos */}
      <section style={{ padding: 'var(--space-xl) 0', background: 'var(--bg-secondary)', borderY: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            opacity: 0.5, 
            filter: 'grayscale(1)',
            flexWrap: 'wrap',
            gap: 'var(--space-xl)'
          }}>
            <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>ST. ANDREWS</div>
            <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>PGA REACH</div>
            <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>FIRST TEE</div>
            <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>WENTWORTH</div>
            <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>TITLEIST</div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section style={{ padding: 'var(--space-3xl) 0', background: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
            <h2 style={{ marginBottom: 'var(--space-md)' }}>Our Core Pillars</h2>
            <p className="text-secondary" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Beyond the course, we focus on discipline, character, and future pathways.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: 'var(--space-xl)' 
          }}>
            <div className="card">
              <div className="badge badge-gold" style={{ marginBottom: 'var(--space-md)' }}>Pillar I</div>
              <h3 style={{ marginBottom: 'var(--space-md)' }}>Professional Mentorship</h3>
              <p className="text-secondary">
                We pair young athletes with PGA professionals and business leaders to provide 
                guidance both on and off the fairway.
              </p>
            </div>

            <div className="card">
              <div className="badge badge-blue" style={{ marginBottom: 'var(--space-md)' }}>Pillar II</div>
              <h3 style={{ marginBottom: 'var(--space-md)' }}>Resource Accessibility</h3>
              <p className="text-secondary">
                From high-end equipment to full course membership fees, we ensure no child 
                is limited by their financial background.
              </p>
            </div>

            <div className="card">
              <div className="badge badge-purple" style={{ marginBottom: 'var(--space-md)' }}>Pillar III</div>
              <h3 style={{ marginBottom: 'var(--space-md)' }}>Pathway to Pro</h3>
              <p className="text-secondary">
                For those with elite potential, we provide a structured competitive pathway, 
                funding tournament entries and travel globally.
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
            background: 'var(--bg-card)',
            position: 'relative'
          }}>
            <Quote size={48} className="text-gold" style={{ opacity: 0.1, position: 'absolute', top: '20px', left: '20px' }} />
            <h2 style={{ marginBottom: 'var(--space-lg)', fontStyle: 'italic', position: 'relative', zIndex: 1 }}>
              "Fairway Futures transformed my son's perspective. He didn't just learn to putt; he learned that he belongs in any room he chooses to enter."
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-sm)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--surface-3)' }} />
              <div style={{ textAlign: 'left' }}>
                <div className="text-gold" style={{ fontWeight: 600 }}>Eleanor Thompson</div>
                <div className="text-tertiary" style={{ fontSize: '0.8rem' }}>Parent of Program Graduate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: 'var(--space-3xl) 0', background: 'var(--bg-primary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-2xl)', marginBottom: 'var(--space-2xl)' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <div className="navbar-brand" style={{ marginBottom: 'var(--space-md)' }}>
                <div className="navbar-brand-icon">FF</div>
                <span>Fairway <span className="text-gold">Futures</span></span>
              </div>
              <p className="text-tertiary" style={{ maxWidth: '300px', fontSize: '0.9rem' }}>
                124 St Vincent St, Glasgow G2 5ER, UK <br />
                Registered Charity No. SC012345
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: 'var(--space-md)' }}>Foundation</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }} className="text-tertiary">
                <li><Link to="/about">Our Mission</Link></li>
                <li><Link to="/transparency">Impact & Transparency</Link></li>
                <li><Link to="/events">Charity Events</Link></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: 'var(--space-md)' }}>Legal</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }} className="text-tertiary">
                <li><Link to="/terms">Terms of Service</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/contact">Contact Support</Link></li>
              </ul>
            </div>
          </div>
          <div className="divider" style={{ opacity: 0.5 }} />
          <div style={{ textAlign: 'center' }}>
            <p className="text-tertiary" style={{ fontSize: '0.8rem' }}>
              © 2026 Fairway Futures Foundation. Built for athletes with a heart for change.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
