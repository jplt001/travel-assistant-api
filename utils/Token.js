const jwt = require('jsonwebtoken');
const token = process.env.TOKEN_SECRET || "64bdb66a";
module.exports = class Token {
    options = {
        // expiresIn: 10000, // 10 minutes
    };
    constructor(...args) {

    }
    static async getToken(user) {

        try {
            const selfToken = new Token();
            const jwttoken = jwt.sign(user, token, selfToken.options);
            return jwttoken;
            
        } catch(e) {
            return Promise.reject(e);
        }
    }
}