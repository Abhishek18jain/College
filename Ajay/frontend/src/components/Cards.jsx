import { useScrollAnimation } from '../hooks/useScrollAnimation';

const PLACEHOLDER = 'https://placehold.co/600x400/f4a261/ffffff?text=Image';

function StarRating({ rating, max = 5 }) {
  return (
    <div className="hotel-rating">
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={`star${i < rating ? '' : ' empty'}`}>★</span>
      ))}
    </div>
  );
}

export function TempleCard({ temple }) {
  const ref = useScrollAnimation();
  return (
    <div className="temple-card fade-in" ref={ref}>
      <div className="card-image-wrap">
        <img
          src={temple.image}
          alt={temple.name}
          loading="lazy"
          onError={(e) => { e.target.src = PLACEHOLDER; }}
        />
        <span className="card-badge">{temple.category}</span>
      </div>
      <div className="card-body">
        <h3>{temple.name}</h3>
        <p className="card-desc">{temple.description}</p>
        <div className="card-meta">
          <div className="card-meta-item">
            <span className="icon">⏰</span>
            <span>{temple.timings}</span>
          </div>
          <div className="card-meta-item">
            <span className="icon">📍</span>
            <span>{temple.location}</span>
          </div>
          <div className="card-meta-item">
            <span className="icon">🎟️</span>
            <span className="fee-badge">{temple.entryFee}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HotelCard({ hotel }) {
  const ref = useScrollAnimation();
  return (
    <div className="hotel-card fade-in" ref={ref}>
      <div className="card-image-wrap">
        <img
          src={hotel.image}
          alt={hotel.name}
          loading="lazy"
          onError={(e) => { e.target.src = PLACEHOLDER; }}
        />
        <span className="card-badge">{hotel.category}</span>
      </div>
      <div className="card-body" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <StarRating rating={hotel.rating} />
        <h3>{hotel.name}</h3>
        <p className="card-desc">{hotel.description}</p>
        <div className="card-meta-item" style={{ marginBottom: 10 }}>
          <span className="icon">📍</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{hotel.location}</span>
        </div>
        <div className="hotel-facilities">
          {hotel.facilities.slice(0, 4).map((f) => (
            <span key={f} className="facility-tag">{f}</span>
          ))}
          {hotel.facilities.length > 4 && (
            <span className="facility-tag">+{hotel.facilities.length - 4} more</span>
          )}
        </div>
        <div className="hotel-price">
          💰 {hotel.priceRange}
        </div>
      </div>
    </div>
  );
}

export function FoodCard({ food }) {
  const ref = useScrollAnimation();
  return (
    <div className="food-card fade-in" ref={ref}>
      <div className="card-image-wrap">
        <img
          src={food.image}
          alt={food.name}
          loading="lazy"
          onError={(e) => { e.target.src = PLACEHOLDER; }}
        />
      </div>
      <div className="card-body">
        <span className="food-category">{food.category}</span>
        <h3>{food.name}</h3>
        <p className="card-desc">{food.description}</p>
        <p className="food-place">📍 {food.bestPlace}</p>
        <p className="food-price">💰 {food.price}</p>
      </div>
    </div>
  );
}

export function TestimonialCard({ t }) {
  const ref = useScrollAnimation();
  return (
    <div className="testimonial-card fade-in" ref={ref}>
      <div className="testimonial-quote">"</div>
      <p className="testimonial-text">{t.text}</p>
      <div className="testimonial-author">
        <div className="author-avatar">{t.avatar}</div>
        <div className="author-info">
          <div className="name">{t.name}</div>
          <div className="location">📍 {t.location} · {t.date}</div>
        </div>
        <div className="testimonial-stars">
          {Array.from({ length: t.rating }, (_, i) => (
            <span key={i} className="star">★</span>
          ))}
        </div>
      </div>
    </div>
  );
}
