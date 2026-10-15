const Enquiry = require('../models/Enquiry');
const mongoose = require('mongoose');

// POST /api/enquiries  (public, no auth)
exports.createEnquiry = async (req, res, next) => {
  try {
    const { name, email, phone, courseInterest } = req.body;

    const enquiry = await Enquiry.create({ name, email, phone, courseInterest });

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      data: enquiry,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/enquiries/unclaimed  (JWT)
exports.getUnclaimed = async (req, res, next) => {
  try {
    const enquiries = await Enquiry.find({ claimedBy: null }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/enquiries/:id/claim  (JWT)
exports.claimEnquiry = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid enquiry id' });
    }

    
    const enquiry = await Enquiry.findOneAndUpdate(
      { _id: id, claimedBy: null },
      { claimedBy: req.user._id, claimedAt: new Date() },
      { new: true }
    );

    if (!enquiry) {
      const exists = await Enquiry.findById(id);
      if (!exists) {
        return res.status(404).json({ success: false, message: 'Enquiry not found' });
      }
      return res.status(409).json({ success: false, message: 'Enquiry already claimed' });
    }

    res.status(200).json({
      success: true,
      message: 'Enquiry claimed successfully',
      data: enquiry,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/enquiries/my-claimed  (JWT)
exports.getMyClaimed = async (req, res, next) => {
  try {
    const enquiries = await Enquiry.find({ claimedBy: req.user._id }).sort({ claimedAt: -1 });

    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (err) {
    next(err);
  }
};