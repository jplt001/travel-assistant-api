const RequiredApiToken = process.env.API_TOKEN || "itrakl/hfiSF3!wesp=p!Vans2VZNAEDv!1PdlXwHOgoZz?0bV2V0FmJRw?g2oEVnPy65IOBV5ovj0!6uKKLaYKURJP!Ny0=I=IAUzlTzT0q36k5vEMEPc7?ZO!JSxM6Y-AHlq!hCQeB90?DROCA0IJwRb=r6i1e1DBZXg8L5zRt8L6fYxGn/ulI75JLLEu/sGwwPFjDlJmoH4F?IRDIeZorEAggqBG74vg3SGRJ!=VFU2GS!uG2kx70V8vzFf!1";
const jwt = require("jsonwebtoken");
const secretToken = process.env.TOKEN_SECRET || "64bdb66a";
const apiTokenValidation = (requiredRoutes) => {
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (requiredRoutes.includes(req.path)) {

            if (typeof token == "undefined" || token == null) return res.sendStatus(401);
            jwt.verify(token, secretToken, (error, user) => {


                if (error) return res.sendStatus(403);

                req.user = user;
                next();
            });
        } else {
            next();
        }
        
    };
};

module.exports = apiTokenValidation;