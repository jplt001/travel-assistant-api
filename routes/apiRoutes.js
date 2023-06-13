const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const authController = require("../controllers/authController");

const StoreLoginRequest = require("../requests/StoreLoginRequest");
// Protected API route
router.get('/protected-route', apiController.protectedRoute);

// Another protected API route
router.get('/another-protected-route', apiController.anotherProtectedRoute);

router.get('/unprotected-route', apiController.unprotectedRoute);

router.post("/auth/login", StoreLoginRequest, authController.login);

module.exports = router;