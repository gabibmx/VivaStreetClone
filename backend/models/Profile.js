const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 100
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  images: [{
    url: String,
    filename: String,
    isMain: {
      type: Boolean,
      default: false
    }
  }],
  services: [{
    type: String,
    trim: true
  }],
  ethnicity: {
    type: String,
    required: true,
    enum: ['Europea', 'Asiática', 'Latina', 'Africana', 'Mixta', 'Árabe', 'India']
  },
  category: {
    type: String,
    required: true,
    enum: ['Independiente', 'Agencia'],
    default: 'Independiente'
  },
  rates: {
    incall: {
      type: String,
      required: true
    },
    outcall: {
      type: String,
      required: true
    }
  },
  availability: {
    monday: { start: String, end: String, available: { type: Boolean, default: true } },
    tuesday: { start: String, end: String, available: { type: Boolean, default: true } },
    wednesday: { start: String, end: String, available: { type: Boolean, default: true } },
    thursday: { start: String, end: String, available: { type: Boolean, default: true } },
    friday: { start: String, end: String, available: { type: Boolean, default: true } },
    saturday: { start: String, end: String, available: { type: Boolean, default: true } },
    sunday: { start: String, end: String, available: { type: Boolean, default: false } }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  views: {
    total: {
      type: Number,
      default: 0
    },
    thisWeek: {
      type: Number,
      default: 0
    },
    thisMonth: {
      type: Number,
      default: 0
    }
  },
  favorites: {
    type: Number,
    default: 0
  },
  lastActive: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
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
profileSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for better search performance
profileSchema.index({ location: 1, isActive: 1 });
profileSchema.index({ age: 1, isActive: 1 });
profileSchema.index({ ethnicity: 1, isActive: 1 });
profileSchema.index({ category: 1, isActive: 1 });
profileSchema.index({ isFeatured: 1, isActive: 1 });
profileSchema.index({ 'rates.incall': 1, isActive: 1 });

// Virtual for profile URL
profileSchema.virtual('profileUrl').get(function() {
  return `/profile/${this._id}`;
});

// Method to increment views
profileSchema.methods.incrementViews = function() {
  this.views.total += 1;
  this.views.thisWeek += 1;
  this.views.thisMonth += 1;
  return this.save();
};

// Method to update online status
profileSchema.methods.setOnlineStatus = function(isOnline) {
  this.isOnline = isOnline;
  this.lastActive = new Date();
  return this.save();
};

module.exports = mongoose.model('Profile', profileSchema);