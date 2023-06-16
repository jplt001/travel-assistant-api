const { validationResult } = require("express-validator");
const generateAPIResponse = require("../../helpers/responseHelper");
const db = require("../../utils/db");

exports.store = async (request, response) => {
    try {
        console.log(request.session.user);
        response.sendStatus(201).send("sample");
    } catch(e) {}
};