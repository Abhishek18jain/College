import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/temples', label: 'Temples' },
  { to: '/hotels', label: 'Hotels' },
  { to: '/food', label: 'Food' },
  { to: '/festivals', label: 'Festivals' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = !scrolled && !menuOpen;

  return (
    <>
      <nav className={`navbar ${isTransparent ? 'transparent' : 'scrolled'}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
            <span className="logo-icon">🛕</span>
            <span>
              Vrindavan Explorer
              <span className="logo-sub">Smart Tourism Guide</span>
            </span>
          </Link>

          <div className="nav-links">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="nav-actions">
            <button
              id="theme-toggle-btn"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <Link to="/contact" className="nav-cta" style={{ display: 'none' }}>
              Plan Trip
            </Link>
            <Link
              to="/contact"
              className="nav-cta"
              style={{ textDecoration: 'none' }}
            >
              Plan Trip
            </Link>
            <button
              id="hamburger-btn"
              className={`hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle navigation menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className={`mobile-nav${menuOpen ? ' open' : ''}`}>
        {NAV_LINKS.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </NavLink>
        ))}
        <Link
          to="/contact"
          className="nav-cta"
          style={{ textAlign: 'center', marginTop: 8 }}
          onClick={() => setMenuOpen(false)}
        >
          Plan Your Trip
        </Link>
      </div>
    </>
  );
}
