import { Link } from 'react-router-dom';

const FOOTER_LINKS = {
  Explore: [
    { label: 'Home', to: '/' },
    { label: 'Temples', to: '/temples' },
    { label: 'Hotels', to: '/hotels' },
    { label: 'Food', to: '/food' },
    { label: 'Festivals', to: '/festivals' },
  ],
  'Quick Links': [
    { label: 'Contact Us', to: '/contact' },
    { label: 'Admin Panel', to: '/admin' },
    { label: 'Plan Your Trip', to: '/contact' },
    { label: 'About Vrindavan', to: '/#about' },
  ],
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="logo">🛕 Vrindavan Explorer</div>
            <p>
              Your complete digital guide to the holy city of Vrindavan. Discover
              temples, find hotels, explore food & festivals – all in one place.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">📘</a>
              <a href="#" className="social-link" aria-label="Instagram">📸</a>
              <a href="#" className="social-link" aria-label="Twitter">🐦</a>
              <a href="#" className="social-link" aria-label="YouTube">▶️</a>
            </div>
          </div>

          {/* Explore Links */}
          <div className="footer-col">
            <h4>Explore</h4>
            <ul className="footer-links">
              {FOOTER_LINKS.Explore.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="footer-link">
                    › {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {FOOTER_LINKS['Quick Links'].map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="footer-link">
                    › {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-col">
            <h4>Contact Info</h4>
            <div className="footer-contact-item">
              <span className="icon">📍</span>
              <span>Mathura–Vrindavan Road, Vrindavan, Uttar Pradesh 281121</span>
            </div>
            <div className="footer-contact-item">
              <span className="icon">📞</span>
              <span>+91-98765-43210</span>
            </div>
            <div className="footer-contact-item">
              <span className="icon">✉️</span>
              <span>info@vrindavanexplorer.com</span>
            </div>
            <div className="footer-contact-item">
              <span className="icon">⏰</span>
              <span>Open 24/7 for Inquiries</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Vrindavan Explorer. All rights reserved.</p>
          <p>
            Made with <span className="made-with">❤️</span> for the holy city of Vrindavan
          </p>
        </div>
      </div>
    </footer>
  );
}
