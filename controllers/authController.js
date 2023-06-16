const { validationResult } = require('express-validator');
const generateAPIResponse = require('../helpers/responseHelper');
const localStrategy = require("passport-local").Strategy;
const passport = require("passport");
const db = require("../utils/db");
const Hash = require("../utils/Hash");
const Token =require("../utils/Token");
exports.login = async (request, response) => {
    try {
        const err = validationResult(request);
        if (err.isEmpty() === false) return response.status(400).json(generateAPIResponse(400, "", err.array()));
        const body = request.body;
        const email = body.email;
        const database = await db.connect();
        const collection = database.collection("users");
        let query = { email };
        
        const user = await collection.findOne(query);
       
        if(!user) {
            delete body['password'];
            return response.json(generateAPIResponse(401, "Invalid account", body));
        }

        if(!(await Hash.validate(body['password'], user.password))) {
            response.json(generateAPIResponse(401, "Unauthorized Login", "Unauthorized Logion"));
            return;
        }
        delete user['password'];
        const token = await Token.getToken(JSON.stringify(user));
        response.json(generateAPIResponse(201, "Logged In", {...user, token}));
        // db.close();
    } catch(e) {
        console.log(e);
        response.status(302).json(generateAPIResponse(302, e.message, e));
    }
};

exports.register = async (request, response)=> {
    try {
        const err = validationResult(request);
        if (err.isEmpty() === false) return response.status(400).json(generateAPIResponse(400, "", err.array()));
        let body= request.body;

        const database = await db.connect();
        const collection = database.collection("users");
        body['password'] = await Hash.make(body['password']);
        let result = await collection.insertOne(body);

        response.json(generateAPIResponse(201, "Register Successfully", result));
        // db.close();
    } catch (e) {
        response.status(302).json(generateAPIResponse(302, e.message, e));
    }
}

exports.register2 = async (request, response) => {
    response.json(generateAPIResponse(201, "success", {...request.user})).status(201);
}