const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  modelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  duration: {
    type: Number, // in hours
    required: true,
    min: 1,
    max: 24
  },
  serviceType: {
    type: String,
    required: true,
    enum: ['incall', 'outcall'] // En mi lugar, A domicilio
  },
  services: [{
    type: String,
    trim: true
  }],
  location: {
    address: String,
    city: String,
    notes: String
  },
  pricing: {
    hourlyRate: {
      type: Number,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'EUR'
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed', 'no-show'],
    default: 'pending'
  },
  customerNotes: {
    type: String,
    maxlength: 500
  },
  modelNotes: {
    type: String,
    maxlength: 500
  },
  customerPhone: {
    type: String,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'transfer'],
    default: 'cash'
  },
  confirmationCode: {
    type: String,
    unique: true,
    sparse: true
  },
  cancelledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  cancelledAt: {
    type: Date
  },
  cancellationReason: {
    type: String,
    maxlength: 500
  },
  completedAt: {
    type: Date
  },
  rating: {
    customerRating: {
      type: Number,
      min: 1,
      max: 5
    },
    modelRating: {
      type: Number,
      min: 1,
      max: 5
    },
    customerReview: {
      type: String,
      maxlength: 500
    },
    modelReview: {
      type: String,
      maxlength: 500
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update updatedAt before saving
bookingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Generate confirmation code before saving
bookingSchema.pre('save', function(next) {
  if (this.isNew) {
    this.confirmationCode = 'VV' + Date.now().toString().slice(-8) + Math.random().toString(36).substr(2, 4).toUpperCase();
  }
  next();
});

// Indexes for better query performance
bookingSchema.index({ customerId: 1, createdAt: -1 });
bookingSchema.index({ modelId: 1, createdAt: -1 });
bookingSchema.index({ profileId: 1, date: 1 });
bookingSchema.index({ status: 1, date: 1 });
bookingSchema.index({ confirmationCode: 1 });

// Virtual for booking reference
bookingSchema.virtual('reference').get(function() {
  return this.confirmationCode || this._id.toString().slice(-8).toUpperCase();
});

// Method to confirm booking
bookingSchema.methods.confirm = function() {
  this.status = 'confirmed';
  return this.save();
};

// Method to cancel booking
bookingSchema.methods.cancel = function(userId, reason) {
  this.status = 'cancelled';
  this.cancelledBy = userId;
  this.cancelledAt = new Date();
  this.cancellationReason = reason;
  return this.save();
};

// Method to complete booking
bookingSchema.methods.complete = function() {
  this.status = 'completed';
  this.completedAt = new Date();
  return this.save();
};

// Static method to get booking stats
bookingSchema.statics.getStats = function(userId, userType) {
  const matchQuery = userType === 'customer' 
    ? { customerId: userId }
    : { modelId: userId };
    
  return this.aggregate([
    { $match: matchQuery },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
};

module.exports = mongoose.model('Booking', bookingSchema);