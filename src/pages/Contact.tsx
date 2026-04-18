import { Mail, Phone, MapPin, Send, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="animate-fade-in">
      <section style={{ padding: 'var(--space-3xl) 0', background: 'var(--gradient-hero)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ marginBottom: 'var(--space-md)' }}>Get in Touch</h1>
          <p className="text-secondary" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Whether you're looking to volunteer, partner with us, or have a question about our programs, we're here to help.
          </p>
        </div>
      </section>

      <section style={{ padding: 'var(--space-3xl) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-3xl)' }}>
            {/* Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
              <div>
                <h2 style={{ marginBottom: 'var(--space-xl)' }}>Contact Information</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                  <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
                    <div style={{ width: '48px', height: '48px', background: 'var(--surface-1)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)' }}>
                      <MapPin size={24} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>Headquarters</div>
                      <div className="text-secondary" style={{ fontSize: '0.9rem' }}>124 St Vincent St, Glasgow G2 5ER, UK</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
                    <div style={{ width: '48px', height: '48px', background: 'var(--surface-1)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-blue)' }}>
                      <Mail size={24} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>Email Address</div>
                      <div className="text-secondary" style={{ fontSize: '0.9rem' }}>hello@fairwayfutures.org</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
                    <div style={{ width: '48px', height: '48px', background: 'var(--surface-1)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-purple)' }}>
                      <Phone size={24} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>Phone Number</div>
                      <div className="text-secondary" style={{ fontSize: '0.9rem' }}>+44 141 555 0192</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 style={{ marginBottom: 'var(--space-md)' }}>Connect With Us</h3>
                <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                  {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                    <a key={i} href="#" className="btn btn-secondary btn-sm" style={{ width: '40px', height: '40px', padding: 0 }}>
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card">
              <form style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                <div className="input-group">
                  <label>Full Name</label>
                  <input type="text" className="input-field" placeholder="John Doe" />
                </div>
                <div className="input-group">
                  <label>Email Address</label>
                  <input type="email" className="input-field" placeholder="john@example.com" />
                </div>
                <div className="input-group">
                  <label>Subject</label>
                  <select className="input-field">
                    <option>General Inquiry</option>
                    <option>Partnership Proposal</option>
                    <option>Volunteer Interest</option>
                    <option>Donation Question</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Message</label>
                  <textarea className="input-field" rows={5} placeholder="How can we help you?" style={{ resize: 'none' }}></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <Send size={18} /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
