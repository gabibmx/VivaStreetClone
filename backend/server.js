const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profiles');
const messageRoutes = require('./routes/messages');
const bookingRoutes = require('./routes/bookings');
const statusRoutes = require('./routes/status');

const app = express();
const PORT = process.env.PORT || 8001;

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URL || 'mongodb://localhost:27017';
    const dbName = process.env.DB_NAME || 'test_database';
    
    await mongoose.connect(`${mongoURI}/${dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Health check route
app.get('/api', (req, res) => {
  res.json({ message: 'Vivastreet API - Node.js Backend' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/status', statusRoutes);

// Handle uploads directory
app.use('/api/uploads', express.static('uploads'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed.');
    process.exit(0);
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});