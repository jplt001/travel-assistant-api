const { validationResult } = require('express-validator');
const generateAPIResponse = require('../helpers/responseHelper');
const socketHandler = require('../handlers/socketHandler');
const db = require("../utils/db");


exports.login = async (request, response) => {
    try {
        const err = validationResult(request);
        if (err.isEmpty() === false) return response.status(400).json(generateAPIResponse(400, "", err.array()));

        response.json(generateAPIResponse(201, "Logged In", body));
    } catch(e) {
        response.status(302).json(generateAPIResponse(302, e.message, e));
    }
};