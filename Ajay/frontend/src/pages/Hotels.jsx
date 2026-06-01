import { useState } from 'react';
import { hotels } from '../data/rawData';
import { HotelCard } from '../components/Cards';

const CATEGORIES = ['All', 'Luxury', 'Premium', 'Heritage', 'Standard', 'Budget', 'Eco Resort', 'Dharamshala'];

export default function Hotels() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = hotels.filter((h) => {
    const matchSearch =
      h.name.toLowerCase().includes(query.toLowerCase()) ||
      h.location.toLowerCase().includes(query.toLowerCase());
    const matchCategory = category === 'All' || h.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero-content">
          <div className="hero-badge">🏨 Where to Stay</div>
          <h1>Hotels in Vrindavan</h1>
          <p>Find the perfect accommodation for your spiritual journey — from budget dharamshalas to luxury resorts</p>
        </div>
      </div>

      {/* Content */}
      <section className="section">
        <div className="container">
          {/* Search */}
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              id="hotel-search"
              type="text"
              placeholder="Search hotels by name or location..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search hotels"
            />
          </div>

          {/* Category Filter */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 48 }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                id={`filter-${cat.toLowerCase().replace(' ', '-')}`}
                onClick={() => setCategory(cat)}
                style={{
                  padding: '8px 20px',
                  borderRadius: 50,
                  border: `2px solid ${category === cat ? 'var(--saffron)' : 'var(--border-color)'}`,
                  background: category === cat ? 'var(--saffron)' : 'var(--bg-card)',
                  color: category === cat ? '#fff' : 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Count */}
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: 32, fontSize: '0.875rem' }}>
            Showing <strong style={{ color: 'var(--saffron)' }}>{filtered.length}</strong> of {hotels.length} hotels
          </p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="cards-grid-4">
              {filtered.map((h) => <HotelCard key={h.id} hotel={h} />)}
            </div>
          ) : (
            <div className="no-results">
              <span className="emoji">🏨</span>
              <p>No hotels found matching your search.</p>
              <p style={{ fontSize: '0.875rem', marginTop: 8 }}>Try a different search term or category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
