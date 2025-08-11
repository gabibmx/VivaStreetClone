const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware to authenticate JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token de acceso requerido'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Verify user still exists
    const user = await User.findById(decoded.userId);
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no válido'
      });
    }

    req.userId = decoded.userId;
    req.userType = decoded.userType;
    req.user = user;
    next();

  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(403).json({
      success: false,
      message: 'Token inválido'
    });
  }
};

// Middleware to check if user is a model
const requireModel = (req, res, next) => {
  if (req.userType !== 'model') {
    return res.status(403).json({
      success: false,
      message: 'Acceso denegado. Solo modelos permitidos'
    });
  }
  next();
};

// Middleware to check if user is a customer
const requireCustomer = (req, res, next) => {
  if (req.userType !== 'customer') {
    return res.status(403).json({
      success: false,
      message: 'Acceso denegado. Solo clientes permitidos'
    });
  }
  next();
};

module.exports = {
  authenticateToken,
  requireModel,
  requireCustomer
};