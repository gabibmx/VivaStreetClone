// Application constants for the Vivastreet backend

const USER_TYPES = {
  CUSTOMER: 'customer',
  MODEL: 'model'
};

const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  NO_SHOW: 'no-show'
};

const MESSAGE_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  SYSTEM: 'system'
};

const SERVICE_TYPES = {
  INCALL: 'incall',  // En mi lugar
  OUTCALL: 'outcall' // A domicilio
};

const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  REFUNDED: 'refunded'
};

const PAYMENT_METHODS = {
  CASH: 'cash',
  CARD: 'card',
  TRANSFER: 'transfer'
};

const PROFILE_CATEGORIES = {
  INDEPENDENT: 'Independiente',
  AGENCY: 'Agencia'
};

const ETHNICITIES = [
  'Europea',
  'Asiática', 
  'Latina',
  'Africana',
  'Mixta',
  'Árabe',
  'India'
];

const SPANISH_CITIES = [
  'Madrid',
  'Barcelona',
  'Valencia',
  'Sevilla',
  'Bilbao',
  'Málaga',
  'Zaragoza',
  'Murcia',
  'Palma de Mallorca',
  'Las Palmas',
  'Córdoba',
  'Alicante',
  'Santander',
  'Granada',
  'Valladolid',
  'Vitoria-Gasteiz',
  'A Coruña',
  'Pamplona',
  'Toledo',
  'Burgos'
];

const SERVICES_SPANISH = [
  'Experiencia de Novia',
  'Cenas',
  'Acompañante de Viaje',
  'Acompañante de Fiestas',
  'Masajes',
  'Juegos de Rol',
  'Eventos de Negocios',
  'Acompañante Social',
  'Masaje Erótico',
  'Masaje Relajante'
];

const SORT_OPTIONS = {
  FEATURED: 'featured',
  NEWEST: 'newest',
  PRICE_LOW: 'price-low',
  PRICE_HIGH: 'price-high',
  POPULAR: 'popular'
};

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
};

const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 20,
  MAX_LIMIT: 100
};

const CURRENCY = {
  SYMBOL: '€',
  CODE: 'EUR',
  NAME: 'Euro'
};

// Error messages in Spanish
const ERROR_MESSAGES = {
  VALIDATION_ERROR: 'Datos de validación incorrectos',
  USER_EXISTS: 'El usuario ya existe con este email',
  INVALID_CREDENTIALS: 'Credenciales inválidas',
  USER_NOT_FOUND: 'Usuario no encontrado',
  PROFILE_NOT_FOUND: 'Perfil no encontrado',
  BOOKING_NOT_FOUND: 'Reserva no encontrada',
  MESSAGE_NOT_FOUND: 'Mensaje no encontrado',
  UNAUTHORIZED: 'No autorizado',
  ACCESS_DENIED: 'Acceso denegado',
  TOKEN_REQUIRED: 'Token de acceso requerido',
  INVALID_TOKEN: 'Token inválido',
  SERVER_ERROR: 'Error del servidor',
  BOOKING_CONFLICT: 'Ya existe una reserva para esta fecha',
  MODELS_ONLY: 'Solo los modelos pueden realizar esta acción',
  CUSTOMERS_ONLY: 'Solo los clientes pueden realizar esta acción'
};

// Success messages in Spanish
const SUCCESS_MESSAGES = {
  USER_REGISTERED: 'Usuario registrado exitosamente',
  LOGIN_SUCCESS: 'Login exitoso',
  PROFILE_UPDATED: 'Perfil actualizado exitosamente',
  STATUS_UPDATED: 'Estado actualizado exitosamente',
  MESSAGE_SENT: 'Mensaje enviado exitosamente',
  MESSAGE_DELETED: 'Mensaje eliminado exitosamente',
  BOOKING_CREATED: 'Reserva creada exitosamente',
  BOOKING_UPDATED: 'Estado de reserva actualizado exitosamente',
  STATUS_CHECK_CREATED: 'Verificación de estado creada exitosamente'
};

module.exports = {
  USER_TYPES,
  BOOKING_STATUS,
  MESSAGE_TYPES,
  SERVICE_TYPES,
  PAYMENT_STATUS,
  PAYMENT_METHODS,
  PROFILE_CATEGORIES,
  ETHNICITIES,
  SPANISH_CITIES,
  SERVICES_SPANISH,
  SORT_OPTIONS,
  HTTP_STATUS,
  PAGINATION_DEFAULTS,
  CURRENCY,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES
};