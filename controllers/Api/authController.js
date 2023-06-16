const passport = require('passport');
const jwt = require("jsonwebtoken");
const responseHelper = require("../../helpers/responseHelper");

exports.register = async (request, response) => {

    try {
        console.log(request.user, request.body);

        response.status(201).json({ code: 201 });
    } catch (e) {

    }
}

exports.login = async (req, res, next) => {
    passport.authenticate(
        'login',
        async (err, user, info) => {
            try {
                if (err || !user) {
                    const error = new Error('An error occurred.');

                    return next(error);
                }

                req.login(
                    user,
                    { session: false },
                    async (error) => {
                        if (error) return next(error);

                        const body = { _id: user._id, email: user.email };
                        const token = jwt.sign({ user: body }, process.env.TOKEN_SECRET || "64bdb66a");
                        delete user['password'];
                        const responseBody = { ...user, token};
                        return res.json(responseHelper(201, (typeof info.message != "undefined") ? info.message: "Successfuly Logged In", responseBody));
                    }
                );
                // res.json({ code: 201}).status(201);
            } catch (error) {
                return next(error);
            }
        }
    )(req, res, next);
}


exports.me = async (request, res)=> {
    
    res.json({ user: request.user });
}