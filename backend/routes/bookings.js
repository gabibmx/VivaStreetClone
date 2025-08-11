const express = require('express');
const { body, query, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const Profile = require('../models/Profile');
const User = require('../models/User');

const router = express.Router();

// Create a new booking
router.post('/', authenticateToken, [
  body('modelId').isMongoId().withMessage('ID de modelo inválido'),
  body('profileId').isMongoId().withMessage('ID de perfil inválido'),
  body('date').isISO8601().toDate().withMessage('Fecha inválida'),
  body('time').notEmpty().trim().withMessage('Hora requerida'),
  body('duration').isInt({ min: 1, max: 24 }).withMessage('Duración debe estar entre 1 y 24 horas'),
  body('serviceType').isIn(['incall', 'outcall']).withMessage('Tipo de servicio debe ser incall o outcall'),
  body('services').isArray().withMessage('Servicios deben ser un array'),
  body('customerPhone').notEmpty().trim().withMessage('Teléfono del cliente requerido'),
  body('pricing.hourlyRate').isNumeric().withMessage('Tarifa por hora requerida'),
  body('pricing.totalAmount').isNumeric().withMessage('Monto total requerido')
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

    // Only customers can create bookings
    if (req.userType !== 'customer') {
      return res.status(403).json({
        success: false,
        message: 'Solo los clientes pueden crear reservas'
      });
    }

    const {
      modelId,
      profileId,
      date,
      time,
      duration,
      serviceType,
      services,
      location,
      pricing,
      customerPhone,
      customerNotes,
      paymentMethod
    } = req.body;

    // Verify profile exists and belongs to the model
    const profile = await Profile.findOne({
      _id: profileId,
      userId: modelId
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Perfil no encontrado'
      });
    }

    // Check for conflicting bookings
    const existingBooking = await Booking.findOne({
      modelId,
      date,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingBooking) {
      return res.status(409).json({
        success: false,
        message: 'Ya existe una reserva para esta fecha'
      });
    }

    // Create booking
    const booking = new Booking({
      customerId: req.userId,
      modelId,
      profileId,
      date,
      time,
      duration,
      serviceType,
      services,
      location: location || {},
      pricing: {
        hourlyRate: pricing.hourlyRate,
        totalAmount: pricing.totalAmount,
        currency: 'EUR'
      },
      customerPhone,
      customerNotes: customerNotes || '',
      paymentMethod: paymentMethod || 'cash'
    });

    await booking.save();
    await booking.populate([
      { path: 'customerId', select: 'name email' },
      { path: 'modelId', select: 'name email' },
      { path: 'profileId', select: 'name location' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Reserva creada exitosamente',
      data: {
        booking
      }
    });

  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error del servidor'
    });
  }
});

// Get user bookings
router.get('/', authenticateToken, [
  query('status').optional().isIn(['pending', 'confirmed', 'cancelled', 'completed', 'no-show']),
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

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Build filter based on user type
    const filter = req.userType === 'customer' 
      ? { customerId: req.userId }
      : { modelId: req.userId };

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const bookings = await Booking.find(filter)
      .populate('customerId', 'name email phone')
      .populate('modelId', 'name email phone')
      .populate('profileId', 'name location images')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Booking.countDocuments(filter);

    res.json({
      success: true,
      data: {
        bookings,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Error del servidor'
    });
  }
});

// Get single booking
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('customerId', 'name email phone')
      .populate('modelId', 'name email phone')
      .populate('profileId', 'name location images services rates');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Reserva no encontrada'
      });
    }

    // Check if user is authorized to view this booking
    const isAuthorized = booking.customerId._id.toString() === req.userId ||
                        booking.modelId._id.toString() === req.userId;

    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        message: 'No autorizado para ver esta reserva'
      });
    }

    res.json({
      success: true,
      data: {
        booking
      }
    });

  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error del servidor'
    });
  }
});

// Update booking status
router.patch('/:id/status', authenticateToken, [
  body('status').isIn(['confirmed', 'cancelled', 'completed', 'no-show']).withMessage('Estado inválido'),
  body('notes').optional().trim().isLength({ max: 500 })
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

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Reserva no encontrada'
      });
    }

    // Check authorization
    const isCustomer = booking.customerId.toString() === req.userId;
    const isModel = booking.modelId.toString() === req.userId;

    if (!isCustomer && !isModel) {
      return res.status(403).json({
        success: false,
        message: 'No autorizado para actualizar esta reserva'
      });
    }

    const { status, notes } = req.body;

    // Handle status transitions
    switch (status) {
      case 'confirmed':
        if (req.userType !== 'model') {
          return res.status(403).json({
            success: false,
            message: 'Solo el modelo puede confirmar la reserva'
          });
        }
        await booking.confirm();
        break;

      case 'cancelled':
        await booking.cancel(req.userId, notes);
        break;

      case 'completed':
        if (req.userType !== 'model') {
          return res.status(403).json({
            success: false,
            message: 'Solo el modelo puede marcar como completada'
          });
        }
        await booking.complete();
        break;

      case 'no-show':
        if (req.userType !== 'model') {
          return res.status(403).json({
            success: false,
            message: 'Solo el modelo puede marcar como no presentado'
          });
        }
        booking.status = 'no-show';
        await booking.save();
        break;
    }

    // Add notes
    if (notes) {
      if (req.userType === 'customer') {
        booking.customerNotes = notes;
      } else {
        booking.modelNotes = notes;
      }
      await booking.save();
    }

    res.json({
      success: true,
      message: 'Estado de reserva actualizado exitosamente',
      data: {
        booking
      }
    });

  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error del servidor'
    });
  }
});

// Get booking statistics
router.get('/stats/overview', authenticateToken, async (req, res) => {
  try {
    const stats = await Booking.getStats(req.userId, req.userType);

    const overview = {
      total: 0,
      pending: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0
    };

    stats.forEach(stat => {
      overview.total += stat.count;
      overview[stat._id] = stat.count;
    });

    res.json({
      success: true,
      data: {
        stats: overview
      }
    });

  } catch (error) {
    console.error('Get booking stats error:', error);
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