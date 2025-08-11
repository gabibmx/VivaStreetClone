const express = require('express');
const { body, query, validationResult } = require('express-validator');
const Profile = require('../models/Profile');
const User = require('../models/User');

const router = express.Router();

// Get all profiles with filtering and pagination
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('location').optional().trim(),
  query('minAge').optional().isInt({ min: 18 }),
  query('maxAge').optional().isInt({ min: 18, max: 100 }),
  query('ethnicity').optional().trim(),
  query('category').optional().isIn(['Independiente', 'Agencia']),
  query('sortBy').optional().isIn(['featured', 'newest', 'price-low', 'price-high', 'popular']),
  query('search').optional().trim()
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

    // Build filter query
    const filter = { isActive: true };

    if (req.query.location && req.query.location !== 'all') {
      filter.location = req.query.location;
    }

    if (req.query.minAge && req.query.minAge !== 'all') {
      filter.age = { $gte: parseInt(req.query.minAge) };
    }

    if (req.query.maxAge && req.query.maxAge !== 'all') {
      if (filter.age) {
        filter.age.$lte = parseInt(req.query.maxAge);
      } else {
        filter.age = { $lte: parseInt(req.query.maxAge) };
      }
    }

    if (req.query.ethnicity && req.query.ethnicity !== 'all') {
      filter.ethnicity = req.query.ethnicity;
    }

    if (req.query.category && req.query.category !== 'all') {
      filter.category = req.query.category;
    }

    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
        { location: { $regex: req.query.search, $options: 'i' } },
        { services: { $in: [new RegExp(req.query.search, 'i')] } }
      ];
    }

    // Build sort query
    let sort = {};
    switch (req.query.sortBy) {
      case 'featured':
        sort = { isFeatured: -1, createdAt: -1 };
        break;
      case 'newest':
        sort = { createdAt: -1 };
        break;
      case 'price-low':
        sort = { 'rates.incall': 1 };
        break;
      case 'price-high':
        sort = { 'rates.incall': -1 };
        break;
      case 'popular':
        sort = { 'views.total': -1 };
        break;
      default:
        sort = { isFeatured: -1, createdAt: -1 };
    }

    // Execute query
    const profiles = await Profile.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name email isVerified')
      .lean();

    // Get total count for pagination
    const total = await Profile.countDocuments(filter);

    // Transform data to match frontend format
    const transformedProfiles = profiles.map(profile => ({
      id: profile._id,
      name: profile.name,
      age: profile.age,
      location: profile.location,
      description: profile.description,
      images: profile.images.length > 0 ? profile.images.map(img => img.url) : [
        `https://via.placeholder.com/400x500/e5e7eb/6b7280?text=${encodeURIComponent(profile.name)}`
      ],
      verified: profile.isVerified,
      featured: profile.isFeatured,
      online: profile.isOnline,
      incall: profile.rates.incall,
      outcall: profile.rates.outcall,
      services: profile.services,
      ethnicity: profile.ethnicity,
      category: profile.category,
      rating: profile.rating.average,
      views: profile.views.total
    }));

    res.json({
      success: true,
      data: {
        profiles: transformedProfiles,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get profiles error:', error);
    res.status(500).json({
      success: false,
      message: 'Error del servidor'
    });
  }
});

// Get single profile by ID
router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id)
      .populate('userId', 'name email phone isVerified');

    if (!profile || !profile.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Perfil no encontrado'
      });
    }

    // Increment view count
    await profile.incrementViews();

    // Transform data
    const transformedProfile = {
      id: profile._id,
      name: profile.name,
      age: profile.age,
      location: profile.location,
      description: profile.description,
      images: profile.images.length > 0 ? profile.images.map(img => img.url) : [
        `https://via.placeholder.com/400x500/e5e7eb/6b7280?text=${encodeURIComponent(profile.name)}`
      ],
      verified: profile.isVerified,
      featured: profile.isFeatured,
      online: profile.isOnline,
      incall: profile.rates.incall,
      outcall: profile.rates.outcall,
      services: profile.services,
      ethnicity: profile.ethnicity,
      category: profile.category,
      rating: profile.rating.average,
      reviewCount: profile.rating.count,
      views: profile.views.total,
      availability: profile.availability,
      lastActive: profile.lastActive
    };

    res.json({
      success: true,
      data: {
        profile: transformedProfile
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error del servidor'
    });
  }
});

// Update profile (models only)
router.put('/:id', authenticateToken, [
  body('name').optional().trim().isLength({ min: 2, max: 100 }),
  body('age').optional().isInt({ min: 18, max: 100 }),
  body('location').optional().trim(),
  body('description').optional().trim().isLength({ max: 2000 }),
  body('services').optional().isArray(),
  body('ethnicity').optional().isIn(['Europea', 'Asiática', 'Latina', 'Africana', 'Mixta', 'Árabe', 'India']),
  body('category').optional().isIn(['Independiente', 'Agencia']),
  body('rates.incall').optional().trim(),
  body('rates.outcall').optional().trim()
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

    // Check if user is a model
    if (req.userType !== 'model') {
      return res.status(403).json({
        success: false,
        message: 'Solo los modelos pueden actualizar perfiles'
      });
    }

    const profile = await Profile.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Perfil no encontrado o no autorizado'
      });
    }

    // Update profile fields
    const updateFields = [
      'name', 'age', 'location', 'description', 'services', 
      'ethnicity', 'category'
    ];

    updateFields.forEach(field => {
      if (req.body[field] !== undefined) {
        profile[field] = req.body[field];
      }
    });

    if (req.body.rates) {
      if (req.body.rates.incall) profile.rates.incall = req.body.rates.incall;
      if (req.body.rates.outcall) profile.rates.outcall = req.body.rates.outcall;
    }

    await profile.save();

    res.json({
      success: true,
      message: 'Perfil actualizado exitosamente',
      data: {
        profile: profile
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error del servidor'
    });
  }
});

// Update online status
router.patch('/:id/online-status', authenticateToken, [
  body('isOnline').isBoolean()
], async (req, res) => {
  try {
    if (req.userType !== 'model') {
      return res.status(403).json({
        success: false,
        message: 'Solo los modelos pueden actualizar el estado'
      });
    }

    const profile = await Profile.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Perfil no encontrado'
      });
    }

    await profile.setOnlineStatus(req.body.isOnline);

    res.json({
      success: true,
      message: 'Estado actualizado exitosamente'
    });

  } catch (error) {
    console.error('Update online status error:', error);
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