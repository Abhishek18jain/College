import { foods } from '../data/rawData';
import { FoodCard } from '../components/Cards';

export default function Food() {
  return (
    <>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero-content">
          <div className="hero-badge">🍛 Local Delicacies</div>
          <h1>Famous Foods of Vrindavan</h1>
          <p>Savour the authentic flavours of Braj cuisine — a divine blend of tradition and taste</p>
        </div>
      </div>

      {/* Content */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Must Try</p>
            <h2 className="section-title">Iconic <span className="accent">Braj Dishes</span></h2>
            <p className="section-desc">These foods are not just meals — they are part of Vrindavan's spiritual and cultural heritage</p>
          </div>
          <div className="cards-grid">
            {foods.map((f) => <FoodCard key={f.id} food={f} />)}
          </div>
        </div>
      </section>

      {/* Food Tips */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Foodie Guide</p>
            <h2 className="section-title">Food <span className="accent">Tips</span> for Visitors</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {[
              { icon: '🥛', title: 'All Vegetarian City', desc: 'Vrindavan is a pure vegetarian city. You will not find non-vegetarian food anywhere in the city.' },
              { icon: '🙏', title: 'Prasad Culture', desc: 'Temple prasad is freely distributed at most temples. Mathura Peda is the most common prasad.' },
              { icon: '🌅', title: 'Street Food Timing', desc: 'Best street food is available from 7 AM – 10 AM and 5 PM – 9 PM near temple areas.' },
              { icon: '💧', title: 'Drink Bottled Water', desc: 'Always drink packaged or filtered water. Avoid drinking tap water during your visit.' },
            ].map((tip) => (
              <div key={tip.title} style={{ background: 'var(--bg-card)', borderRadius: 16, padding: 28, border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: 16 }}>{tip.icon}</div>
                <h4 style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>{tip.title}</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
