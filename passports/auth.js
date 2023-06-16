
const LocalStrategy = require("passport-local").Strategy;
const db = require("../utils/db");
const Hash = require("../utils/Hash");
const passport = require("passport");

// ...

passport.use(
    'login',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                // const database = await db.connect();
                // const collection = database.collection("users");

                // let query = { email };

                // const user = await collection.findOne(query);
                
                // if (!user) {
                //     return done(null, false, { message: 'User not found' });
                // }

                // if (!(await Hash.validate(password, user.password))) {
                //     return done(null, false, { message: "Unauthorized Login"});
                // }
                // // db.close();
                let user = {email, passport};
                return done(null, user, { message: 'Logged in Successfully' });
            } catch (error) {
                return done(error);
            }
        }
    )
);


passport.use('register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email, password, done)=> {
    try {
        const user = {
            first_name: null,
            last_name: null,
            mobile_number: null,
            email, password
        };
        done(null, user)
    } catch(e) {
        console.warn(e.message);
        done(e);
    }
    // try {
    //     console.log(first_name, last_name);
    //     const user = {};
    //     return done(null, user);
    // } catch(e) {
    //     console.log("Error: ", e);
    //     return done(null, e.message);
    // }
}));


const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;


passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.TOKEN_SECRET || "64bdb66a",
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);