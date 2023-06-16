const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const authController = require("../controllers/Api/authController");
const trackController = require("../controllers/Api/trackController");
const StoreLoginRequest = require("../requests/StoreLoginRequest");
const StoreRegisterRequest = require("../requests/Auth/StoreRegisterRequest");
let passport = require("passport");
const Auth = passport.authenticate('jwt', { session: false });
require("../passports/auth");

router.post("/auth/login", authController.login);

router.post("/auth/register", passport.authenticate('register', { session: false}), authController.register);

router.get("/auth/me", Auth, authController.me);

router.post("/track", Auth, trackController.store);

module.exports = router;