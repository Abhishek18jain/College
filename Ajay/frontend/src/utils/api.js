const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  submitInquiry: async (data) => {
    const res = await fetch(`${API_BASE}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to submit inquiry');
    return json;
  },

  getInquiries: async () => {
    const res = await fetch(`${API_BASE}/inquiries`);
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to fetch inquiries');
    return json;
  },

  deleteInquiry: async (id) => {
    const res = await fetch(`${API_BASE}/inquiries/${id}`, { method: 'DELETE' });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to delete inquiry');
    return json;
  },
};
