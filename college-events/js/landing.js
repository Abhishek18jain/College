/* ============================================
   LANDING PAGE — Dynamic Content
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  renderHeroPreview();
  renderCarousel();
  renderFeatures();
  renderCategories();
  renderTestimonials();
  updateNavAuth();
});

/* ---------- Hero Event Preview ---------- */
function renderHeroPreview() {
  const container = document.getElementById('heroEventPreview');
  if (!container) return;
  const events = MockData.events.filter(e => e.featured).slice(0, 4);
  container.innerHTML = events.map(e => {
    const d = App.Utils.formatDateShort(e.date);
    return `
      <a href="pages/event-details.html?id=${e.id}" class="hero-event-item">
        <div class="hero-event-date" style="background: ${e.bannerGradient}; color: white;">
          <span class="day">${d.day}</span>
          <span class="month">${d.month}</span>
        </div>
        <div class="hero-event-info">
          <h4>${e.title}</h4>
          <p>${e.venue}</p>
        </div>
      </a>
    `;
  }).join('');
}

/* ---------- Carousel ---------- */
let carouselIndex = 0;
function renderCarousel() {
  const track = document.getElementById('carouselTrack');
  const dots = document.getElementById('carouselDots');
  if (!track) return;

  const events = MockData.events;
  track.innerHTML = events.map(e => {
    const d = App.Utils.formatDate(e.date);
    const seatsClass = e.seatsLeft < 20 ? 'seats-low' : 'seats-ok';
    return `
      <div class="event-card glass-card">
        <div class="event-card-banner" style="background: ${e.bannerGradient};">
          <div class="event-banner-overlay"></div>
          <div class="event-card-badges">
            <span class="badge ${e.isFree ? 'badge-success' : 'badge-primary'}">${e.isFree ? 'Free' : '₹' + e.price}</span>
            <span class="badge badge-info">${e.category}</span>
          </div>
        </div>
        <div class="event-card-body">
          <div class="event-card-date">📅 ${d}</div>
          <h3>${e.title}</h3>
          <p style="font-size: var(--fs-sm); margin: 0;">${e.subtitle}</p>
          <div class="event-card-meta">
            <span>📍 ${e.venue}</span>
            <span>🏢 ${e.organizer}</span>
          </div>
          <div class="event-card-footer">
            <span class="seats ${seatsClass}">${e.seatsLeft} seats left</span>
            <a href="pages/event-details.html?id=${e.id}" class="btn btn-primary btn-sm">Register →</a>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Dots
  const totalDots = Math.ceil(events.length / getVisibleCards());
  dots.innerHTML = Array.from({ length: totalDots }, (_, i) =>
    `<span class="carousel-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`
  ).join('');

  // Events
  document.getElementById('carouselPrev')?.addEventListener('click', () => moveCarousel(-1));
  document.getElementById('carouselNext')?.addEventListener('click', () => moveCarousel(1));
  dots.addEventListener('click', (e) => {
    if (e.target.classList.contains('carousel-dot')) {
      carouselIndex = parseInt(e.target.dataset.index);
      updateCarousel();
    }
  });
}

function getVisibleCards() {
  if (window.innerWidth < 480) return 1;
  if (window.innerWidth < 768) return 1.5;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

function moveCarousel(dir) {
  const total = Math.ceil(MockData.events.length / getVisibleCards());
  carouselIndex = Math.max(0, Math.min(total - 1, carouselIndex + dir));
  updateCarousel();
}

function updateCarousel() {
  const track = document.getElementById('carouselTrack');
  const cardWidth = track.querySelector('.event-card')?.offsetWidth || 340;
  const gap = window.innerWidth < 768 ? 16 : 24;
  track.style.transform = `translateX(-${carouselIndex * (cardWidth + gap) * getVisibleCards()}px)`;
  document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === carouselIndex);
  });
}

/* ---------- Features ---------- */
function renderFeatures() {
  const grid = document.getElementById('featuresGrid');
  if (!grid) return;
  const features = [
    { icon: '🎯', title: 'Smart Discovery', desc: 'Find events that match your interests with intelligent search and filtering.', bg: 'rgba(108,92,231,0.1)' },
    { icon: '⚡', title: 'Instant Registration', desc: 'Register for events in seconds with our streamlined process.', bg: 'rgba(0,206,201,0.1)' },
    { icon: '📅', title: 'Personal Calendar', desc: 'Track your schedule with an integrated calendar synced to your events.', bg: 'rgba(253,121,168,0.1)' },
    { icon: '🏆', title: 'Achievements & Badges', desc: 'Earn badges and certificates for every event you attend.', bg: 'rgba(253,203,110,0.15)' },
    { icon: '🔔', title: 'Smart Notifications', desc: 'Never miss an event with timely reminders and updates.', bg: 'rgba(116,185,255,0.1)' },
    { icon: '📊', title: 'Analytics Dashboard', desc: 'Track your participation history, achievements, and event analytics.', bg: 'rgba(0,184,148,0.1)' }
  ];
  grid.innerHTML = features.map(f => `
    <div class="feature-card glass-card reveal">
      <div class="feature-icon" style="background: ${f.bg}">${f.icon}</div>
      <h4>${f.title}</h4>
      <p>${f.desc}</p>
    </div>
  `).join('');
  App.ScrollReveal.init();
}

/* ---------- Categories ---------- */
function renderCategories() {
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return;
  grid.innerHTML = MockData.categories.map(c => `
    <a href="pages/events.html?category=${encodeURIComponent(c.name)}" class="category-card glass-card reveal">
      <div class="category-icon" style="background: ${c.color}15; color: ${c.color}">${c.icon}</div>
      <h4>${c.name}</h4>
      <p>${c.count} events</p>
    </a>
  `).join('');
  App.ScrollReveal.init();
}

/* ---------- Testimonials ---------- */
function renderTestimonials() {
  const grid = document.getElementById('testimonialsGrid');
  if (!grid) return;
  grid.innerHTML = MockData.testimonials.map(t => {
    const initials = t.name.split(' ').map(w => w[0]).join('');
    return `
      <div class="testimonial-card glass-card reveal">
        <span class="quote-icon">❝</span>
        <div class="stars">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
        <p class="text">"${t.text}"</p>
        <div class="testimonial-author">
          <div class="avatar">${initials}</div>
          <div class="info">
            <h5>${t.name}</h5>
            <p>${t.department}</p>
          </div>
        </div>
      </div>
    `;
  }).join('');
  App.ScrollReveal.init();
}

/* ---------- Nav Auth State ---------- */
function updateNavAuth() {
  const user = App.Auth.getUser();
  if (user) {
    document.querySelectorAll('.nav-auth-btn').forEach(el => {
      el.textContent = user.name.split(' ')[0];
      el.href = user.role === 'admin' ? 'pages/admin.html' : 'pages/dashboard.html';
    });
  }
}
