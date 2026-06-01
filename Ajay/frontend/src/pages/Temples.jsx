import { useState } from 'react';
import { temples } from '../data/rawData';
import { TempleCard } from '../components/Cards';

export default function Temples() {
  const [query, setQuery] = useState('');

  const filtered = temples.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.location.toLowerCase().includes(query.toLowerCase()) ||
      t.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero-content">
          <div className="hero-badge">🛕 Sacred Spaces</div>
          <h1>Temples of Vrindavan</h1>
          <p>Discover the divine temples that make Vrindavan the spiritual capital of India</p>
        </div>
      </div>

      {/* Content */}
      <section className="section">
        <div className="container">
          {/* Search */}
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              id="temple-search"
              type="text"
              placeholder="Search temples by name, location or category..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search temples"
            />
          </div>

          {/* Count */}
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: 32, fontSize: '0.875rem' }}>
            Showing <strong style={{ color: 'var(--saffron)' }}>{filtered.length}</strong> of {temples.length} temples
          </p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="cards-grid">
              {filtered.map((t) => <TempleCard key={t.id} temple={t} />)}
            </div>
          ) : (
            <div className="no-results">
              <span className="emoji">🛕</span>
              <p>No temples found for "<strong>{query}</strong>"</p>
              <p style={{ fontSize: '0.875rem', marginTop: 8 }}>Try searching for a different name or location.</p>
            </div>
          )}
        </div>
      </section>

      {/* Info Banner */}
      <section className="section section-alt">
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="section-tag">Plan Your Visit</p>
          <h2 className="section-title">Visiting <span className="accent">Tips</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginTop: 40 }}>
            {[
              { icon: '👗', title: 'Dress Code', desc: 'Wear modest, traditional clothing. Avoid shorts and sleeveless tops inside temples.' },
              { icon: '🚫', title: 'Photography', desc: 'Photography is restricted inside most temples. Always seek permission.' },
              { icon: '👟', title: 'Footwear', desc: 'Remove footwear before entering any temple. Lockers are usually available.' },
              { icon: '🌅', title: 'Best Time', desc: 'Early morning (6–8 AM) and evening aarti (7–8 PM) are the best times to visit.' },
            ].map((tip) => (
              <div key={tip.title} style={{ background: 'var(--bg-card)', borderRadius: 16, padding: 24, border: '1px solid var(--border-color)', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: 12 }}>{tip.icon}</div>
                <h4 style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{tip.title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
