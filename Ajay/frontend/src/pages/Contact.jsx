import { useState } from 'react';
import { api } from '../utils/api';

const initialForm = { name: '', email: '', phone: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    else if (!/^[6-9]\d{9}$/.test(form.phone)) errs.phone = 'Enter a valid 10-digit mobile number';
    if (!form.message.trim()) errs.message = 'Message is required';
    else if (form.message.trim().length < 20) errs.message = 'Message must be at least 20 characters';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await api.submitInquiry(form);
      setSuccess(true);
    } catch (err) {
      setApiError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero-content">
          <div className="hero-badge">📬 Get in Touch</div>
          <h1>Contact Us</h1>
          <p>Have questions about your Vrindavan trip? Our team is ready to help you plan the perfect journey.</p>
        </div>
      </div>

      {/* Content */}
      <section className="section contact-page" style={{ paddingTop: 64 }}>
        <div className="container">
          <div className="contact-grid">
            {/* Info Block */}
            <div className="contact-info-block">
              <h2>Let's Plan Your <span style={{ color: 'var(--saffron)' }}>Journey</span></h2>
              <p>Fill out the form and our tourism experts will get back to you within 24 hours with personalised travel recommendations.</p>

              <div className="contact-items">
                {[
                  { icon: '📍', label: 'Our Location', value: 'Vrindavan, Mathura, Uttar Pradesh 281121' },
                  { icon: '📞', label: 'Phone Number', value: '+91-98765-43210' },
                  { icon: '✉️', label: 'Email Address', value: 'info@vrindavanexplorer.com' },
                  { icon: '⏰', label: 'Working Hours', value: 'Mon–Sun: 9:00 AM – 8:00 PM' },
                ].map((item) => (
                  <div key={item.label} className="contact-item">
                    <div className="contact-item-icon">{item.icon}</div>
                    <div className="contact-item-text">
                      <div className="label">{item.label}</div>
                      <div className="value">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Info */}
              <div style={{ marginTop: 32, padding: '20px 24px', background: 'rgba(255,107,26,0.06)', borderRadius: 12, border: '1px solid rgba(255,107,26,0.15)' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  🛕 <strong>Best time to visit:</strong> October – March<br />
                  ✈️ <strong>Nearest airport:</strong> Agra (55 km) | Delhi (145 km)<br />
                  🚂 <strong>Nearest railway:</strong> Mathura Junction (12 km)
                </p>
              </div>
            </div>

            {/* Form Card */}
            <div className="contact-form-card">
              {success ? (
                <div className="success-message">
                  <div className="success-icon">✅</div>
                  <h3>Inquiry Submitted!</h3>
                  <p>
                    Thank you, <strong>{form.name}</strong>! Your inquiry has been received.
                    Our team will contact you at <strong>{form.email}</strong> within 24 hours.
                  </p>
                  <button
                    id="send-another-btn"
                    onClick={() => { setSuccess(false); setForm(initialForm); }}
                    style={{ padding: '12px 32px', background: 'var(--gradient-btn)', color: '#fff', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <>
                  <h3>Send an Inquiry</h3>

                  {apiError && (
                    <div className="admin-error" style={{ marginBottom: 20 }}>
                      ⚠️ {apiError}
                    </div>
                  )}

                  <form id="contact-form" onSubmit={handleSubmit} noValidate>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name-input">Full Name *</label>
                        <input
                          id="name-input"
                          className="form-input"
                          type="text"
                          name="name"
                          placeholder="Your full name"
                          value={form.name}
                          onChange={handleChange}
                        />
                        {errors.name && <div className="error-msg">⚠ {errors.name}</div>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone-input">Phone Number *</label>
                        <input
                          id="phone-input"
                          className="form-input"
                          type="tel"
                          name="phone"
                          placeholder="10-digit mobile number"
                          value={form.phone}
                          onChange={handleChange}
                          maxLength={10}
                        />
                        {errors.phone && <div className="error-msg">⚠ {errors.phone}</div>}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="email-input">Email Address *</label>
                      <input
                        id="email-input"
                        className="form-input"
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={handleChange}
                      />
                      {errors.email && <div className="error-msg">⚠ {errors.email}</div>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="message-input">Your Message *</label>
                      <textarea
                        id="message-input"
                        className="form-input form-textarea"
                        name="message"
                        placeholder="Tell us about your travel plans, questions, or requirements..."
                        value={form.message}
                        onChange={handleChange}
                      />
                      {errors.message && <div className="error-msg">⚠ {errors.message}</div>}
                    </div>

                    <button id="submit-inquiry-btn" type="submit" className="submit-btn" disabled={loading}>
                      {loading ? (
                        <>
                          <span style={{ display: 'inline-block', width: 18, height: 18, border: '2px solid rgba(255,255,255,0.5)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                          Sending...
                        </>
                      ) : (
                        <>✉️ Submit Inquiry</>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
