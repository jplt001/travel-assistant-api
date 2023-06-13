const { body } = require('express-validator');
module.exports = [
    body("email").notEmpty().withMessage("Device ID is required."),
    body("password").notEmpty().withMessage("GPS Time is required."),
];