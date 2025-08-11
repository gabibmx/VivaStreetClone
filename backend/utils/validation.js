const { body, param, query } = require('express-validator');

// Common validation rules
const validationRules = {
  // User validation
  userRegistration: [
    body('name')
      .notEmpty()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Nombre debe tener entre 2 y 100 caracteres'),
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Email válido requerido'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Contraseña debe tener al menos 6 caracteres'),
    body('phone')
      .notEmpty()
      .trim()
      .matches(/^[+]?[0-9\s\-\(\)]{9,15}$/)
      .withMessage('Número de teléfono válido requerido'),
    body('age')
      .isInt({ min: 18, max: 100 })
      .withMessage('Edad debe estar entre 18 y 100'),
    body('userType')
      .isIn(['customer', 'model'])
      .withMessage('Tipo de usuario debe ser customer o model')
  ],

  userLogin: [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Email válido requerido'),
    body('password')
      .notEmpty()
      .withMessage('Contraseña requerida')
  ],

  // Profile validation
  profileUpdate: [
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Nombre debe tener entre 2 y 100 caracteres'),
    body('age')
      .optional()
      .isInt({ min: 18, max: 100 })
      .withMessage('Edad debe estar entre 18 y 100'),
    body('location')
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Ubicación debe tener entre 2 y 100 caracteres'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 2000 })
      .withMessage('Descripción no puede exceder 2000 caracteres'),
    body('services')
      .optional()
      .isArray()
      .withMessage('Servicios deben ser un array'),
    body('ethnicity')
      .optional()
      .isIn(['Europea', 'Asiática', 'Latina', 'Africana', 'Mixta', 'Árabe', 'India'])
      .withMessage('Etnia no válida'),
    body('category')
      .optional()
      .isIn(['Independiente', 'Agencia'])
      .withMessage('Categoría no válida'),
    body('rates.incall')
      .optional()
      .trim()
      .matches(/^€\d+\/h$/)
      .withMessage('Formato de tarifa incall inválido (ej: €150/h)'),
    body('rates.outcall')
      .optional()
      .trim()
      .matches(/^€\d+\/h$/)
      .withMessage('Formato de tarifa outcall inválido (ej: €200/h)')
  ],

  // Message validation
  sendMessage: [
    body('receiverId')
      .isMongoId()
      .withMessage('ID de receptor inválido'),
    body('profileId')
      .isMongoId()
      .withMessage('ID de perfil inválido'),
    body('content')
      .notEmpty()
      .trim()
      .isLength({ min: 1, max: 1000 })
      .withMessage('Contenido del mensaje requerido (máximo 1000 caracteres)')
  ],

  // Booking validation
  createBooking: [
    body('modelId')
      .isMongoId()
      .withMessage('ID de modelo inválido'),
    body('profileId')
      .isMongoId()
      .withMessage('ID de perfil inválido'),
    body('date')
      .isISO8601()
      .toDate()
      .custom((value) => {
        if (new Date(value) <= new Date()) {
          throw new Error('La fecha debe ser futura');
        }
        return true;
      })
      .withMessage('Fecha inválida'),
    body('time')
      .notEmpty()
      .trim()
      .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .withMessage('Formato de hora inválido (HH:MM)'),
    body('duration')
      .isInt({ min: 1, max: 24 })
      .withMessage('Duración debe estar entre 1 y 24 horas'),
    body('serviceType')
      .isIn(['incall', 'outcall'])
      .withMessage('Tipo de servicio debe ser incall o outcall'),
    body('services')
      .isArray({ min: 1 })
      .withMessage('Al menos un servicio es requerido'),
    body('customerPhone')
      .notEmpty()
      .trim()
      .matches(/^[+]?[0-9\s\-\(\)]{9,15}$/)
      .withMessage('Número de teléfono válido requerido'),
    body('pricing.hourlyRate')
      .isNumeric({ no_symbols: false })
      .withMessage('Tarifa por hora requerida'),
    body('pricing.totalAmount')
      .isNumeric({ no_symbols: false })
      .withMessage('Monto total requerido')
  ],

  // Query parameter validation
  paginationQuery: [
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Página debe ser un número positivo'),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Límite debe estar entre 1 y 100')
  ],

  profileQuery: [
    query('location')
      .optional()
      .trim()
      .withMessage('Ubicación inválida'),
    query('minAge')
      .optional()
      .isInt({ min: 18 })
      .withMessage('Edad mínima debe ser al menos 18'),
    query('maxAge')
      .optional()
      .isInt({ min: 18, max: 100 })
      .withMessage('Edad máxima debe estar entre 18 y 100'),
    query('ethnicity')
      .optional()
      .trim()
      .withMessage('Etnia inválida'),
    query('category')
      .optional()
      .isIn(['Independiente', 'Agencia'])
      .withMessage('Categoría inválida'),
    query('sortBy')
      .optional()
      .isIn(['featured', 'newest', 'price-low', 'price-high', 'popular'])
      .withMessage('Ordenamiento inválido'),
    query('search')
      .optional()
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage('Término de búsqueda inválido')
  ],

  // MongoDB ID validation
  mongoId: [
    param('id')
      .isMongoId()
      .withMessage('ID inválido')
  ]
};

module.exports = validationRules;