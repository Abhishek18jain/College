const express = require('express');
const router = express.Router();
const {
  createInquiry,
  getAllInquiries,
  deleteInquiry,
} = require('../controllers/inquiryController');

router.route('/').post(createInquiry).get(getAllInquiries);
router.route('/:id').delete(deleteInquiry);

module.exports = router;
