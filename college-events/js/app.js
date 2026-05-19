/* ============================================
   CORE APPLICATION MODULE
   Theme, Auth, Toast, Modal, Utilities
   ============================================ */

const App = (() => {
  /* ---------- Theme Toggle ---------- */
  const Theme = {
    init() {
      const saved = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', saved);
      this.updateToggle(saved);
    },
    toggle() {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      this.updateToggle(next);
    },
    updateToggle(theme) {
      document.querySelectorAll('.theme-toggle-icon').forEach(el => {
        el.textContent = theme === 'dark' ? '☀️' : '🌙';
      });
    }
  };

  /* ---------- LocalStorage Auth ---------- */
  const Auth = {
    KEY: 'eventHub_auth',
    getUser() {
      const data = localStorage.getItem(this.KEY);
      return data ? JSON.parse(data) : null;
    },
    login(email, password) {
      const user = MockData.users.find(u => u.email === email);
      if (!user) return { success: false, message: 'No account found with this email.' };
      // Mock password check (any password works for demo)
      localStorage.setItem(this.KEY, JSON.stringify(user));
      return { success: true, user };
    },
    signup(name, email, password, department) {
      const exists = MockData.users.find(u => u.email === email);
      if (exists) return { success: false, message: 'An account with this email already exists.' };
      const newUser = {
        id: MockData.users.length + 1,
        name, email, avatar: null,
        initials: name.split(' ').map(w => w[0]).join('').toUpperCase(),
        department, year: "1st Year", role: "student",
        registeredEvents: [], certificates: [], achievements: []
      };
      MockData.users.push(newUser);
      localStorage.setItem(this.KEY, JSON.stringify(newUser));
      return { success: true, user: newUser };
    },
    logout() {
      localStorage.removeItem(this.KEY);
      window.location.href = '/';
    },
    isLoggedIn() {
      return !!this.getUser();
    },
    isAdmin() {
      const user = this.getUser();
      return user && user.role === 'admin';
    },
    updateUser(updates) {
      const user = this.getUser();
      if (!user) return;
      Object.assign(user, updates);
      localStorage.setItem(this.KEY, JSON.stringify(user));
      return user;
    }
  };

  /* ---------- Toast Notifications ---------- */
  const Toast = {
    container: null,
    init() {
      if (!document.querySelector('.toast-container')) {
        this.container = document.createElement('div');
        this.container.className = 'toast-container';
        document.body.appendChild(this.container);
      } else {
        this.container = document.querySelector('.toast-container');
      }
    },
    show(message, type = 'info', duration = 4000) {
      if (!this.container) this.init();
      const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.innerHTML = `
        <span class="toast-icon">${icons[type]}</span>
        <span class="toast-message">${message}</span>
        <span class="toast-close" onclick="this.parentElement.classList.add('toast-exit'); setTimeout(() => this.parentElement.remove(), 300)">✕</span>
      `;
      this.container.appendChild(toast);
      setTimeout(() => {
        toast.classList.add('toast-exit');
        setTimeout(() => toast.remove(), 300);
      }, duration);
    },
    success(msg) { this.show(msg, 'success'); },
    error(msg) { this.show(msg, 'error'); },
    warning(msg) { this.show(msg, 'warning'); },
    info(msg) { this.show(msg, 'info'); }
  };

  /* ---------- Modal Manager ---------- */
  const Modal = {
    open(id) {
      const overlay = document.getElementById(id);
      if (overlay) {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    },
    close(id) {
      const overlay = document.getElementById(id);
      if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    },
    closeAll() {
      document.querySelectorAll('.modal-overlay.active').forEach(m => {
        m.classList.remove('active');
      });
      document.body.style.overflow = '';
    }
  };

  /* ---------- Form Validation ---------- */
  const Validate = {
    email(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    },
    required(value) {
      return value.trim().length > 0;
    },
    minLength(value, min) {
      return value.trim().length >= min;
    },
    phone(value) {
      return /^[+]?[\d\s-]{10,}$/.test(value);
    },
    showError(input, message) {
      input.classList.add('input-error');
      let errorEl = input.parentElement.querySelector('.error-text');
      if (!errorEl) {
        errorEl = document.createElement('span');
        errorEl.className = 'error-text';
        input.parentElement.appendChild(errorEl);
      }
      errorEl.textContent = message;
      errorEl.style.display = 'block';
    },
    clearError(input) {
      input.classList.remove('input-error');
      const errorEl = input.parentElement.querySelector('.error-text');
      if (errorEl) errorEl.style.display = 'none';
    }
  };

  /* ---------- Scroll Reveal ---------- */
  const ScrollReveal = {
    init() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }
  };

  /* ---------- Animated Counter ---------- */
  const Counter = {
    animate(el, target, duration = 2000) {
      let start = 0;
      const startTime = performance.now();
      const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        el.textContent = current.toLocaleString();
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString();
      };
      requestAnimationFrame(step);
    },
    initAll() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.dataset.counted) {
            entry.target.dataset.counted = 'true';
            const target = parseInt(entry.target.dataset.target);
            this.animate(entry.target, target);
          }
        });
      }, { threshold: 0.5 });
      document.querySelectorAll('[data-counter]').forEach(el => observer.observe(el));
    }
  };

  /* ---------- Navbar ---------- */
  const Navbar = {
    init() {
      const navbar = document.querySelector('.navbar');
      if (!navbar) return;

      // Sticky state
      let lastScroll = 0;
      window.addEventListener('scroll', () => {
        const current = window.scrollY;
        if (current > 60) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
        lastScroll = current;
      });

      // Mobile toggle
      const toggle = document.querySelector('.nav-toggle');
      const menu = document.querySelector('.nav-menu');
      if (toggle && menu) {
        toggle.addEventListener('click', () => {
          menu.classList.toggle('active');
          toggle.classList.toggle('active');
        });
        // Close on link click
        menu.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', () => {
            menu.classList.remove('active');
            toggle.classList.remove('active');
          });
        });
      }

      // Update auth state in navbar
      this.updateAuthState();
    },
    updateAuthState() {
      const user = Auth.getUser();
      document.querySelectorAll('.nav-auth-btn').forEach(el => {
        if (user) {
          el.innerHTML = `
            <div class="avatar avatar-sm" style="background: var(--gradient-primary)">${user.initials}</div>
            <span>${user.name.split(' ')[0]}</span>
          `;
          el.href = user.role === 'admin' ? 'pages/admin.html' : 'pages/dashboard.html';
        }
      });
    }
  };

  /* ---------- Accordion ---------- */
  const Accordion = {
    init() {
      document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
          const item = header.parentElement;
          const wasActive = item.classList.contains('active');
          // Close all siblings
          item.parentElement.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
          if (!wasActive) item.classList.add('active');
        });
      });
    }
  };

  /* ---------- Dropdown ---------- */
  const Dropdown = {
    init() {
      document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
          e.stopPropagation();
          const dd = trigger.closest('.dropdown');
          document.querySelectorAll('.dropdown.active').forEach(d => { if (d !== dd) d.classList.remove('active'); });
          dd.classList.toggle('active');
        });
      });
      document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown.active').forEach(d => d.classList.remove('active'));
      });
    }
  };

  /* ---------- Utilities ---------- */
  const Utils = {
    formatDate(dateStr) {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    },
    formatDateShort(dateStr) {
      const d = new Date(dateStr);
      return { day: d.getDate(), month: d.toLocaleDateString('en-IN', { month: 'short' }) };
    },
    timeUntil(dateStr) {
      const target = new Date(dateStr).getTime();
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      };
    },
    slugify(text) {
      return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    },
    getParam(key) {
      return new URLSearchParams(window.location.search).get(key);
    },
    debounce(fn, delay) {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
      };
    }
  };

  /* ---------- Event Registration (Mock) ---------- */
  const Registration = {
    register(eventId) {
      const user = Auth.getUser();
      if (!user) {
        Toast.warning('Please login to register for events.');
        setTimeout(() => window.location.href = 'pages/login.html', 1000);
        return false;
      }
      if (user.registeredEvents && user.registeredEvents.includes(eventId)) {
        Toast.info('You are already registered for this event.');
        return false;
      }
      if (!user.registeredEvents) user.registeredEvents = [];
      user.registeredEvents.push(eventId);
      Auth.updateUser({ registeredEvents: user.registeredEvents });
      // Update seat count
      const event = MockData.events.find(e => e.id === eventId);
      if (event) event.seatsLeft = Math.max(0, event.seatsLeft - 1);
      Toast.success('🎉 Successfully registered! Check your dashboard for details.');
      return true;
    },
    unregister(eventId) {
      const user = Auth.getUser();
      if (!user) return false;
      user.registeredEvents = (user.registeredEvents || []).filter(id => id !== eventId);
      Auth.updateUser({ registeredEvents: user.registeredEvents });
      const event = MockData.events.find(e => e.id === eventId);
      if (event) event.seatsLeft++;
      Toast.info('You have been unregistered from this event.');
      return true;
    },
    isRegistered(eventId) {
      const user = Auth.getUser();
      return user && user.registeredEvents && user.registeredEvents.includes(eventId);
    }
  };

  /* ---------- Init ---------- */
  function init() {
    Theme.init();
    Toast.init();
    Navbar.init();
    Accordion.init();
    Dropdown.init();
    ScrollReveal.init();
    Counter.initAll();

    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });

    // Close modals with Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') Modal.closeAll();
    });
  }

  // Auto-init on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', init);

  // Public API
  return { Theme, Auth, Toast, Modal, Validate, ScrollReveal, Counter, Navbar, Accordion, Dropdown, Utils, Registration, init };
})();
