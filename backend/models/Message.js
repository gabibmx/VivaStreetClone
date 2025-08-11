const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true
  },
  content: {
    type: String,
    required: true,
    maxlength: 1000
  },
  messageType: {
    type: String,
    enum: ['text', 'image', 'system'],
    default: 'text'
  },
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  attachments: [{
    filename: String,
    url: String,
    type: String // image, document
  }],
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
messageSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for conversation queries
messageSchema.index({ senderId: 1, receiverId: 1, createdAt: -1 });
messageSchema.index({ profileId: 1, createdAt: -1 });
messageSchema.index({ isRead: 1, receiverId: 1 });

// Static method to get conversation between two users
messageSchema.statics.getConversation = function(userId1, userId2, profileId, page = 1, limit = 20) {
  const skip = (page - 1) * limit;
  
  return this.find({
    $or: [
      { senderId: userId1, receiverId: userId2 },
      { senderId: userId2, receiverId: userId1 }
    ],
    profileId: profileId,
    isDeleted: false
  })
  .populate('senderId', 'name')
  .populate('receiverId', 'name')
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(limit);
};

// Static method to mark messages as read
messageSchema.statics.markAsRead = function(userId, otherUserId, profileId) {
  return this.updateMany({
    senderId: otherUserId,
    receiverId: userId,
    profileId: profileId,
    isRead: false
  }, {
    isRead: true,
    readAt: new Date()
  });
};

// Static method to get unread message count
messageSchema.statics.getUnreadCount = function(userId) {
  return this.countDocuments({
    receiverId: userId,
    isRead: false,
    isDeleted: false
  });
};

module.exports = mongoose.model('Message', messageSchema);