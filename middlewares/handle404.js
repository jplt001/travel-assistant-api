const responseBuilder = require("../helpers/responseHelper");

const handle404 = (req, res, next) => {
    res.status(404).json(responseBuilder(404, "Route not found.", req.originalUrl));
};

module.exports = handle404;