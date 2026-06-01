import { festivals } from '../data/rawData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const PLACEHOLDER = 'https://placehold.co/600x400/f4a261/ffffff?text=Festival';

function FestivalCard({ festival }) {
  const ref = useScrollAnimation();
  return (
    <div className="festival-card fade-in" ref={ref}>
      <div className="festival-image">
        <img
          src={festival.image}
          alt={festival.name}
          loading="lazy"
          onError={(e) => { e.target.src = PLACEHOLDER; }}
        />
      </div>
      <div className="festival-content">
        <p className="festival-date">📅 {festival.date}</p>
        <h3>{festival.name}</h3>
        <p>{festival.description}</p>
        <div className="festival-highlight">
          ⭐ <span>{festival.highlight}</span>
        </div>
        <div className="festival-duration">
          ⏱️ Duration: {festival.duration}
        </div>
      </div>
    </div>
  );
}

export default function Festivals() {
  return (
    <>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero-content">
          <div className="hero-badge">🎉 Celebrations</div>
          <h1>Festivals of Vrindavan</h1>
          <p>Experience the world-famous festivals that fill Vrindavan with colour, devotion, and joy</p>
        </div>
      </div>

      {/* Content */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Celebrations</p>
            <h2 className="section-title">Major <span className="accent">Festivals</span></h2>
            <p className="section-desc">Vrindavan celebrates festivals with unmatched devotion and grandeur that draws visitors from around the world</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {festivals.map((f) => <FestivalCard key={f.id} festival={f} />)}
          </div>
        </div>
      </section>

      {/* Festival Calendar */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Plan Ahead</p>
            <h2 className="section-title">Festival <span className="accent">Calendar</span></h2>
          </div>
          <div style={{ background: 'var(--bg-card)', borderRadius: 20, border: '1px solid var(--border-color)', overflow: 'hidden' }}>
            {[
              { month: 'February – March', event: 'Holi & Lathmar Holi', emoji: '🎨', color: '#e63946' },
              { month: 'August – September', event: 'Janmashtami', emoji: '🪔', color: '#6a0dad' },
              { month: 'September', event: 'Radhashtami', emoji: '🌸', color: '#e76f51' },
              { month: 'October – November', event: 'Kartik Deepotsav', emoji: '🕯️', color: '#f4a261' },
              { month: 'Year Round', event: 'Daily Aarti & Bhajan', emoji: '🎵', color: '#2a9d8f' },
            ].map((item, i) => (
              <div key={item.event} style={{
                display: 'flex', alignItems: 'center', gap: 20, padding: '20px 28px',
                borderBottom: i < 4 ? '1px solid var(--border-color)' : 'none',
                transition: 'background 0.2s ease'
              }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,107,26,0.04)'}
                onMouseLeave={(e) => e.currentTarget.style.background = ''}
              >
                <span style={{ fontSize: '1.8rem' }}>{item.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{item.event}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.month}</div>
                </div>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
