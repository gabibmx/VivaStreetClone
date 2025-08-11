const express = require('express');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const router = express.Router();

// Create a simple status check schema
const statusCheckSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString()
  },
  client_name: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const StatusCheck = mongoose.model('StatusCheck', statusCheckSchema);

// Create status check (for backward compatibility)
router.post('/', [
  body('client_name').notEmpty().trim().withMessage('Client name is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const statusCheck = new StatusCheck({
      client_name: req.body.client_name
    });

    await statusCheck.save();

    res.status(201).json({
      success: true,
      data: statusCheck
    });

  } catch (error) {
    console.error('Create status check error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get all status checks (for backward compatibility)
router.get('/', async (req, res) => {
  try {
    const statusChecks = await StatusCheck.find()
      .sort({ timestamp: -1 })
      .limit(1000);

    res.json({
      success: true,
      data: statusChecks
    });

  } catch (error) {
    console.error('Get status checks error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;