const express = require('express');
const router = express.Router();
const webController = require('../controllers/webController');

// Home page
router.get('/', webController.homePage);

// About page
router.get('/about', webController.aboutPage);

// Contact page
router.get('/contact', webController.contactPage);

router.get('/track', webController.track);

module.exports = router;