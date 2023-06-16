const { body } = require('express-validator');
module.exports = [
    body("first_name").notEmpty().withMessage("First Name field is required."),
    body("last_name").notEmpty().withMessage("Last Name field is required."),
    body("email").notEmpty().withMessage("Email is required."),
    body("password").notEmpty().withMessage("Password is required."),
    body("mobile_number").notEmpty().withMessage("Password is required."),
];