export default function Terms() {
  return (
    <div className="animate-fade-in">
      <section style={{ padding: 'var(--space-3xl) 0', background: 'var(--gradient-hero)' }}>
        <div className="container">
          <h1 style={{ marginBottom: 'var(--space-md)' }}>Terms of Service</h1>
          <p className="text-secondary">Last Updated: April 18, 2026</p>
        </div>
      </section>

      <section style={{ padding: 'var(--space-3xl) 0' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
            <div>
              <h2 style={{ marginBottom: 'var(--space-md)' }}>1. Acceptance of Terms</h2>
              <p className="text-secondary">
                By accessing and using this website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </div>
            <div>
              <h2 style={{ marginBottom: 'var(--space-md)' }}>2. Use License</h2>
              <p className="text-secondary">
                Permission is granted to temporarily download one copy of the materials on Fairway Futures Foundation's website for personal, non-commercial transitory viewing only.
              </p>
            </div>
            <div>
              <h2 style={{ marginBottom: 'var(--space-md)' }}>3. Donations</h2>
              <p className="text-secondary">
                All donations made through our platform are final and non-refundable, except in cases where unauthorized use of a payment method is proven. Fairway Futures Foundation is a registered non-profit, and tax receipts will be issued for all donations over $20.
              </p>
            </div>
            <div>
              <h2 style={{ marginBottom: 'var(--space-md)' }}>4. Event Registration</h2>
              <p className="text-secondary">
                Participants registering for events must comply with the specific rules and regulations of the hosting golf club. We reserve the right to cancel or reschedule events due to weather or unforeseen circumstances.
              </p>
            </div>
            <div>
              <h2 style={{ marginBottom: 'var(--space-md)' }}>5. Governing Law</h2>
              <p className="text-secondary">
                These terms and conditions are governed by and construed in accordance with the laws of the United Kingdom and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
