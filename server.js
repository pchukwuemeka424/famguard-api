const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/delete-account', require('./routes/deleteAccount'));
app.use('/privacy-policy', require('./routes/privacyPolicy'));
app.use('/check-database', require('./routes/checkDatabase'));
app.use('/setup-policy', require('./routes/setupPolicy'));

// Root route
app.get('/', (req, res) => {
    res.redirect('/delete-account');
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    
    // Don't leak error details in production
    const isDevelopment = process.env.NODE_ENV !== 'production';
    const message = isDevelopment ? err.message : 'Internal Server Error';
    
    res.status(err.status || 500).json({
        error: message,
        ...(isDevelopment && { stack: err.stack })
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Start server
const server = app.listen(PORT, () => {
    console.log(`FamGuard server is running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Database: ${process.env.DATABASE_URL ? 'Configured' : 'Not configured'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});

module.exports = app;
