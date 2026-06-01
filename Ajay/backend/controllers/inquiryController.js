const fs = require('fs');
const path = require('path');
const Inquiry = require('../models/Inquiry');

const JSON_FILE_PATH = path.join(__dirname, '../data/inquiries.json');

// Ensure the local inquiries data folder and file exists
const ensureJsonFile = () => {
  const dir = path.dirname(JSON_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(JSON_FILE_PATH)) {
    fs.writeFileSync(JSON_FILE_PATH, JSON.stringify([]));
  }
};

const getLocalInquiries = () => {
  ensureJsonFile();
  try {
    const data = fs.readFileSync(JSON_FILE_PATH, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    return [];
  }
};

const saveLocalInquiries = (inquiries) => {
  ensureJsonFile();
  fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(inquiries, null, 2));
};

// @desc    Create a new inquiry
// @route   POST /api/inquiries
// @access  Public
const createInquiry = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: name, email, phone, message',
      });
    }

    // Phone & Email pattern validation for local DB fallback
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address' });
    }
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid 10-digit Indian phone number' });
    }

    let inquiry;
    if (global.useLocalDB) {
      const inquiries = getLocalInquiries();
      inquiry = {
        _id: new Date().getTime().toString(),
        name,
        email,
        phone,
        message,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      inquiries.unshift(inquiry);
      saveLocalInquiries(inquiries);
    } else {
      inquiry = await Inquiry.create({ name, email, phone, message });
    }

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully! We will contact you soon.',
      data: inquiry,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Public (Admin)
const getAllInquiries = async (req, res) => {
  try {
    let inquiries;
    if (global.useLocalDB) {
      inquiries = getLocalInquiries();
    } else {
      inquiries = await Inquiry.find().sort({ createdAt: -1 });
    }
    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

// @desc    Delete an inquiry
// @route   DELETE /api/inquiries/:id
// @access  Public (Admin)
const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    if (global.useLocalDB) {
      let inquiries = getLocalInquiries();
      const exists = inquiries.some((i) => i._id === id);
      if (!exists) {
        return res.status(404).json({ success: false, message: 'Inquiry not found.' });
      }
      inquiries = inquiries.filter((i) => i._id !== id);
      saveLocalInquiries(inquiries);
    } else {
      const inquiry = await Inquiry.findById(id);
      if (!inquiry) {
        return res.status(404).json({ success: false, message: 'Inquiry not found.' });
      }
      await Inquiry.findByIdAndDelete(id);
    }

    res.status(200).json({ success: true, message: 'Inquiry deleted successfully.' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid inquiry ID.' });
    }
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

module.exports = { createInquiry, getAllInquiries, deleteInquiry };
