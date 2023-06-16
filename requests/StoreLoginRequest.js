const { body } = require('express-validator');
module.exports = [
    body("email").notEmpty().withMessage("Email address is required."),
    body("password").notEmpty().withMessage("Password is required."),
];