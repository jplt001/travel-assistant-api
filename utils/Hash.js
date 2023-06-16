const bcrypt = require("bcrypt");

const saltRounds = 10;
class Hash {

    constructor() {
        saltRounds = 10;
    }

    static async make(planeText) {
       try {
        const salt = await bcrypt.genSalt(saltRounds).catch(error=> {
            console.log(error);
            return Promise.reject(error);
        });
        return await bcrypt.hash(planeText, salt);
       } catch(e) {
        return Promise.reject(e);
       }
    }

    static async validate(planeText, hashedPassword) {
        try {
            return await bcrypt.compare(planeText, hashedPassword);
        } catch(e) {
            return new Promise.reject(e);
        }
    }
}

module.exports = Hash;