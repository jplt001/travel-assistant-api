const RequiredApiToken = process.env.API_TOKEN || "itrakl/hfiSF3!wesp=p!Vans2VZNAEDv!1PdlXwHOgoZz?0bV2V0FmJRw?g2oEVnPy65IOBV5ovj0!6uKKLaYKURJP!Ny0=I=IAUzlTzT0q36k5vEMEPc7?ZO!JSxM6Y-AHlq!hCQeB90?DROCA0IJwRb=r6i1e1DBZXg8L5zRt8L6fYxGn/ulI75JLLEu/sGwwPFjDlJmoH4F?IRDIeZorEAggqBG74vg3SGRJ!=VFU2GS!uG2kx70V8vzFf!1";

const apiTokenValidation = (requiredRoutes) => {
    return (req, res, next) => {
        const apiToken = req.headers['api-token'];
        // Check if the API token is valid for the required routes
        if (requiredRoutes.includes(req.path) && (!apiToken || apiToken !== RequiredApiToken)) {
            return res.status(401).json({ error: 'Invalid API token' });
        }

        next(); // Token is valid or not required, proceed to the next middleware or route handler
    };
};

module.exports = apiTokenValidation;