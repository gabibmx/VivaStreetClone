const express = require('express');
const { body, query, validationResult } = require('express-validator');
const Message = require('../models/Message');
const Profile = require('../models/Profile');

const router = express.Router();

// Send a message
router.post('/', authenticateToken, [
  body('receiverId').isMongoId().withMessage('ID de receptor inválido'),
  body('profileId').isMongoId().withMessage('ID de perfil inválido'),
  body('content').notEmpty().trim().isLength({ max: 1000 }).withMessage('Contenido del mensaje requerido (máximo 1000 caracteres)')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Datos de validación incorrectos',
        errors: errors.array()
      });
    }

    const { receiverId, profileId, content } = req.body;

    // Verify profile exists
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Perfil no encontrado'
      });
    }

    // Create message
    const message = new Message({
      senderId: req.userId,
      receiverId,
      profileId,
      content,
      messageType: 'text'
    });

    await message.save();
    await message.populate([
      { path: 'senderId', select: 'name' },
      { path: 'receiverId', select: 'name' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Mensaje enviado exitosamente',
      data: {
        message: message
      }
    });

  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({
      success: false,
      message: 'Error del servidor'
    });
  }
});

// Get conversation between two users
router.get('/conversation/:userId/:profileId', authenticateToken, [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Parámetros de consulta inválidos',
        errors: errors.array()
      });
    }

    const { userId, profileId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    // Get conversation messages
    const messages = await Message.getConversation(
      req.userId, 
      userId, 
      profileId, 
      page, 
      limit
    );

    // Mark messages as read
    await Message.markAsRead(req.userId, userId, profileId);

    res.json({
      success: true,
      data: {
        messages: messages.reverse(), // Reverse to show oldest first
        pagination: {
          page,
          limit
        }
      }
    });

  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error del servidor'
    });
  }
});

// Get user conversations (inbox)
router.get('/conversations', authenticateToken, async (req, res) => {
  try {
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [
            { senderId: req.userId },
            { receiverId: req.userId }
          ],
          isDeleted: false
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: {
            profileId: '$profileId',
            otherUserId: {
              $cond: {
                if: { $eq: ['$senderId', req.userId] },
                then: '$receiverId',
                else: '$senderId'
              }
            }
          },
          lastMessage: { $first: '$content' },
          lastMessageDate: { $first: '$createdAt' },
          unreadCount: {
            $sum: {
              $cond: {
                if: {
                  $and: [
                    { $eq: ['$receiverId', req.userId] },
                    { $eq: ['$isRead', false] }
                  ]
                },
                then: 1,
                else: 0
              }
            }
          }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id.otherUserId',
          foreignField: '_id',
          as: 'otherUser',
          pipeline: [{ $project: { name: 1, email: 1 } }]
        }
      },
      {
        $lookup: {
          from: 'profiles',
          localField: '_id.profileId',
          foreignField: '_id',
          as: 'profile',
          pipeline: [{ $project: { name: 1, images: 1 } }]
        }
      },
      {
        $project: {
          profileId: '$_id.profileId',
          otherUserId: '$_id.otherUserId',
          otherUser: { $arrayElemAt: ['$otherUser', 0] },
          profile: { $arrayElemAt: ['$profile', 0] },
          lastMessage: 1,
          lastMessageDate: 1,
          unreadCount: 1
        }
      },
      {
        $sort: { lastMessageDate: -1 }
      },
      {
        $limit: 50
      }
    ]);

    res.json({
      success: true,
      data: {
        conversations
      }
    });

  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({
      success: false,
      message: 'Error del servidor'
    });
  }
});

// Get unread message count
router.get('/unread-count', authenticateToken, async (req, res) => {
  try {
    const count = await Message.getUnreadCount(req.userId);

    res.json({
      success: true,
      data: {
        unreadCount: count
      }
    });

  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({
      success: false,
      message: 'Error del servidor'
    });
  }
});

// Delete message
router.delete('/:messageId', authenticateToken, async (req, res) => {
  try {
    const message = await Message.findOne({
      _id: req.params.messageId,
      $or: [
        { senderId: req.userId },
        { receiverId: req.userId }
      ]
    });

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Mensaje no encontrado'
      });
    }

    message.isDeleted = true;
    await message.save();

    res.json({
      success: true,
      message: 'Mensaje eliminado exitosamente'
    });

  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({
      success: false,
      message: 'Error del servidor'
    });
  }
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token de acceso requerido'
    });
  }

  const jwt = require('jsonwebtoken');
  const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Token inválido'
      });
    }

    req.userId = decoded.userId;
    req.userType = decoded.userType;
    next();
  });
}

module.exports = router;