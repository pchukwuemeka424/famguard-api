const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/delete-account', require('../routes/deleteAccount'));
app.use('/privacy-policy', require('../routes/privacyPolicy'));
app.use('/check-database', require('../routes/checkDatabase'));
app.use('/setup-policy', require('../routes/setupPolicy'));

// Root route
app.get('/', (req, res) => {
    res.redirect('/delete-account');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
});

// Export for Vercel
module.exports = app;

