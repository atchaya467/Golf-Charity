export default function Privacy() {
  return (
    <div className="animate-fade-in">
      <section style={{ padding: 'var(--space-3xl) 0', background: 'var(--gradient-hero)' }}>
        <div className="container">
          <h1 style={{ marginBottom: 'var(--space-md)' }}>Privacy Policy</h1>
          <p className="text-secondary">Last Updated: April 18, 2026</p>
        </div>
      </section>

      <section style={{ padding: 'var(--space-3xl) 0' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
            <div>
              <h2 style={{ marginBottom: 'var(--space-md)' }}>1. Data Collection</h2>
              <p className="text-secondary">
                We collect personal information that you provide to us, such as your name, email address, and payment information when you make a donation or register for an event.
              </p>
            </div>
            <div>
              <h2 style={{ marginBottom: 'var(--space-md)' }}>2. Use of Information</h2>
              <p className="text-secondary">
                We use your information to process transactions, send tax receipts, provide event updates, and improve our services. We never sell your personal data to third parties.
              </p>
            </div>
            <div>
              <h2 style={{ marginBottom: 'var(--space-md)' }}>3. Payment Security</h2>
              <p className="text-secondary">
                All payment processing is handled by Stripe. We do not store your credit card details on our servers. Stripe is PCI-compliant and uses industry-standard encryption to protect your data.
              </p>
            </div>
            <div>
              <h2 style={{ marginBottom: 'var(--space-md)' }}>4. Cookies</h2>
              <p className="text-secondary">
                We use cookies to enhance your experience on our website and to gather analytics about how users interact with our platform.
              </p>
            </div>
            <div>
              <h2 style={{ marginBottom: 'var(--space-md)' }}>5. Your Rights</h2>
              <p className="text-secondary">
                You have the right to access, correct, or delete your personal information at any time. To exercise these rights, please contact us at privacy@fairwayfutures.org.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
