import { useState, useEffect, useCallback } from 'react';
import { api } from '../utils/api';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function Admin() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [deleteMsg, setDeleteMsg] = useState('');

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.getInquiries();
      setInquiries(res.data);
    } catch (err) {
      setError(err.message || 'Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchInquiries(); }, [fetchInquiries]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    setDeletingId(id);
    try {
      await api.deleteInquiry(id);
      setInquiries((prev) => prev.filter((i) => i._id !== id));
      setDeleteMsg('Inquiry deleted successfully.');
      setTimeout(() => setDeleteMsg(''), 3000);
    } catch (err) {
      alert(err.message || 'Failed to delete');
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = inquiries.filter(
    (i) =>
      i.name.toLowerCase().includes(query.toLowerCase()) ||
      i.email.toLowerCase().includes(query.toLowerCase()) ||
      i.phone.includes(query) ||
      i.message.toLowerCase().includes(query.toLowerCase())
  );

  const todayCount = inquiries.filter(
    (i) => new Date(i.createdAt).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="admin-page">
      <div className="container">
        {/* Header */}
        <div className="admin-header">
          <h1>⚙️ Admin Dashboard</h1>
          <p>Manage and view all visitor inquiries for Vrindavan Explorer</p>
        </div>

        {/* Stats */}
        <div className="admin-stats">
          {[
            { icon: '📬', value: inquiries.length, label: 'Total Inquiries' },
            { icon: '📅', value: todayCount, label: "Today's Inquiries" },
            { icon: '✅', value: filtered.length, label: 'Showing' },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-info">
                <div className="value">{s.value}</div>
                <div className="label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Delete Message */}
        {deleteMsg && (
          <div style={{ background: 'rgba(45,90,27,0.1)', border: '1px solid rgba(45,90,27,0.3)', borderRadius: 8, padding: '12px 20px', marginBottom: 20, color: 'var(--forest)', fontWeight: 500, fontSize: '0.875rem' }}>
            ✅ {deleteMsg}
          </div>
        )}

        {/* Error Banner */}
        {error && (
          <div className="admin-error">
            ⚠️ {error}
            <button onClick={fetchInquiries} style={{ marginLeft: 16, padding: '4px 12px', background: 'var(--gradient-btn)', color: '#fff', borderRadius: 6, fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer' }}>
              Retry
            </button>
          </div>
        )}

        {/* Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
          <div className="admin-search-bar">
            <span className="search-icon">🔍</span>
            <input
              id="admin-search"
              type="text"
              placeholder="Search by name, email, phone..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button
            id="refresh-btn"
            onClick={fetchInquiries}
            style={{ padding: '10px 20px', background: 'var(--gradient-btn)', color: '#fff', borderRadius: 8, fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            🔄 Refresh
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="admin-loading">
            <div className="spinner" />
            <p>Loading inquiries...</p>
          </div>
        ) : filtered.length === 0 && !error ? (
          <div className="admin-empty">
            <div style={{ fontSize: '3rem', marginBottom: 12 }}>📭</div>
            <p style={{ fontWeight: 600 }}>{query ? 'No inquiries match your search.' : 'No inquiries yet.'}</p>
            <p style={{ fontSize: '0.875rem', marginTop: 8 }}>
              {query ? 'Try a different search term.' : 'Inquiries submitted via the contact form will appear here.'}
            </p>
          </div>
        ) : (
          <div className="inquiries-table-wrap" style={{ overflowX: 'auto' }}>
            <table className="inquiries-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((inq, idx) => (
                  <tr key={inq._id}>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{idx + 1}</td>
                    <td className="td-name">{inq.name}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{inq.email}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{inq.phone}</td>
                    <td className="td-message" title={inq.message}>{inq.message}</td>
                    <td className="td-date">{formatDate(inq.createdAt)}</td>
                    <td>
                      <button
                        id={`delete-btn-${inq._id}`}
                        className="delete-btn"
                        onClick={() => handleDelete(inq._id)}
                        disabled={deletingId === inq._id}
                      >
                        {deletingId === inq._id ? '...' : '🗑️ Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
