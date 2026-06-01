import { Link } from 'react-router-dom';
import { temples, hotels, foods, festivals, testimonials } from '../data/rawData';
import { TempleCard, HotelCard, FoodCard, TestimonialCard } from '../components/Cards';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// ─── About Section ────────────────────────────────────────────
function AboutSection() {
  const ref = useScrollAnimation();
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Image Collage */}
          <div className="about-image-collage fade-in" ref={ref}>
            <div className="collage-img collage-main">
              <img
                src="https://placehold.co/500x340/8b1a1a/ffffff?text=Vrindavan+Ghats"
                alt="Vrindavan Ghats"
                onError={(e) => { e.target.src = 'https://placehold.co/500x340/8b1a1a/ffffff?text=Vrindavan'; }}
              />
            </div>
            <div className="collage-img collage-sm1">
              <img
                src="https://placehold.co/260x200/ff6b1a/ffffff?text=Yamuna+River"
                alt="Yamuna River"
                onError={(e) => { e.target.src = 'https://placehold.co/260x200/ff6b1a/ffffff?text=Yamuna'; }}
              />
            </div>
            <div className="collage-img collage-sm2">
              <img
                src="https://placehold.co/220x260/d4a017/ffffff?text=Braj+Culture"
                alt="Braj Culture"
                onError={(e) => { e.target.src = 'https://placehold.co/220x260/d4a017/ffffff?text=Braj'; }}
              />
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="section-tag">About the Holy City</p>
            <h2 className="section-title">
              Vrindavan – The Land of <span className="accent">Radha Krishna</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 12, fontSize: '0.95rem' }}>
              Vrindavan, nestled on the banks of the sacred Yamuna river in Uttar Pradesh, is one of the holiest cities in India. Associated with the childhood and youth of Lord Krishna, it is visited by millions of pilgrims every year.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 32, fontSize: '0.95rem' }}>
              With over 5,000 temples, enchanting ghats, lush forests, and a vibrant cultural scene, Vrindavan is a city where spirituality and tradition meet in every corner.
            </p>
            <div className="about-features">
              {[
                { icon: '🛕', title: '5,000+ Temples', desc: 'Home to some of India\'s most sacred and architecturally stunning temples.' },
                { icon: '🎭', title: 'Rich Culture & Festivals', desc: 'Experience world-famous celebrations of Holi and Janmashtami.' },
                { icon: '🍽️', title: 'Authentic Braj Cuisine', desc: 'Taste the legendary Mathura Peda, Kachori, and creamy Lassi.' },
              ].map((f) => (
                <div className="about-feature" key={f.title}>
                  <div className="feature-icon">{f.icon}</div>
                  <div className="feature-text">
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Home Page ────────────────────────────────────────────────
export default function Home() {
  const featuredTemples = temples.slice(0, 3);
  const featuredHotels = hotels.slice(0, 4);
  const featuredFoods = foods.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="hero" id="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <div className="hero-badge">
            🛕 Welcome to Vrindavan
          </div>
          <h1 className="hero-title">
            Explore the Holy City of<br />
            <span className="highlight">Radha &amp; Krishna</span>
          </h1>
          <p className="hero-subtitle">
            Discover sacred temples, premium hotels, authentic cuisine, and vibrant festivals
            in the most spiritually enriched city of India.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="number">5000+</div>
              <div className="label">Temples</div>
            </div>
            <div className="hero-stat">
              <div className="number">50K+</div>
              <div className="label">Daily Visitors</div>
            </div>
            <div className="hero-stat">
              <div className="number">365</div>
              <div className="label">Days Festivals</div>
            </div>
            <div className="hero-stat">
              <div className="number">100+</div>
              <div className="label">Hotels</div>
            </div>
          </div>
          <div className="hero-actions">
            <Link to="/temples" className="btn-primary">Explore Temples</Link>
            <Link to="/contact" className="btn-outline">Plan Your Visit</Link>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Scroll to Discover</span>
          <span className="arrow">↓</span>
        </div>
      </section>

      {/* About */}
      <AboutSection />

      {/* Featured Temples */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Sacred Places</p>
            <h2 className="section-title">Featured <span className="accent">Temples</span></h2>
            <p className="section-desc">Explore the most iconic and spiritually significant temples of Vrindavan</p>
          </div>
          <div className="cards-grid">
            {featuredTemples.map((t) => <TempleCard key={t.id} temple={t} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/temples" className="nav-cta" style={{ display: 'inline-block', padding: '14px 40px', background: 'var(--gradient-btn)', color: '#fff', borderRadius: '8px', fontWeight: 700, boxShadow: '0 4px 20px rgba(255,107,26,0.3)', transition: 'all 0.3s ease' }}>
              View All Temples →
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Hotels */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Where to Stay</p>
            <h2 className="section-title">Popular <span className="accent">Hotels</span></h2>
            <p className="section-desc">Handpicked accommodations for every budget and preference</p>
          </div>
          <div className="cards-grid-4">
            {featuredHotels.map((h) => <HotelCard key={h.id} hotel={h} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/hotels" className="nav-cta" style={{ display: 'inline-block', padding: '14px 40px', background: 'var(--gradient-btn)', color: '#fff', borderRadius: '8px', fontWeight: 700, boxShadow: '0 4px 20px rgba(255,107,26,0.3)' }}>
              View All Hotels →
            </Link>
          </div>
        </div>
      </section>

      {/* Famous Foods */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Local Delicacies</p>
            <h2 className="section-title">Famous <span className="accent">Foods</span></h2>
            <p className="section-desc">Experience the authentic flavours of Braj cuisine</p>
          </div>
          <div className="cards-grid">
            {featuredFoods.map((f) => <FoodCard key={f.id} food={f} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/food" className="nav-cta" style={{ display: 'inline-block', padding: '14px 40px', background: 'var(--gradient-btn)', color: '#fff', borderRadius: '8px', fontWeight: 700, boxShadow: '0 4px 20px rgba(255,107,26,0.3)' }}>
              Explore All Foods →
            </Link>
          </div>
        </div>
      </section>

      {/* Festivals Preview */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Celebrations</p>
            <h2 className="section-title">Vibrant <span className="accent">Festivals</span></h2>
            <p className="section-desc">Immerse yourself in the spectacular festivals that make Vrindavan unique</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {festivals.map((f) => (
              <div key={f.id} style={{ background: 'var(--bg-card)', borderRadius: 16, padding: 28, border: '1px solid var(--border-color)', textAlign: 'center', transition: 'all 0.3s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
              >
                <div style={{ fontSize: '2.8rem', marginBottom: 12 }}>
                  {f.id === 1 ? '🎨' : f.id === 2 ? '🪔' : f.id === 3 ? '🌸' : '🪔'}
                </div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{f.name}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{f.date}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/festivals" className="nav-cta" style={{ display: 'inline-block', padding: '14px 40px', background: 'var(--gradient-btn)', color: '#fff', borderRadius: '8px', fontWeight: 700, boxShadow: '0 4px 20px rgba(255,107,26,0.3)' }}>
              View All Festivals →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <p className="section-tag">Visitor Stories</p>
            <h2 className="section-title">What <span className="accent">Visitors Say</span></h2>
            <p className="section-desc">Real experiences from travellers who explored Vrindavan</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t) => <TestimonialCard key={t.id} t={t} />)}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: '96px 24px', background: 'var(--gradient-hero)', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#fff', marginBottom: 16 }}>
            Ready to Explore Vrindavan?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', maxWidth: 500, margin: '0 auto 36px', lineHeight: 1.7 }}>
            Send us your inquiry and our team will help you plan the perfect spiritual journey.
          </p>
          <Link to="/contact" className="btn-primary">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
