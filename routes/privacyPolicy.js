const express = require('express');
const router = express.Router();

// GET privacy policy page
router.get('/', (req, res) => {
    res.render('privacy_policy');
});

module.exports = router;

