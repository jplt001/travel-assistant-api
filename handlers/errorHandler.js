const responseBuilder = require("../helpers/responseHelper");

function buildResponse(status, type = "html", ...args) {
    let response;
    switch(type) {
        case 'json':
            response = responseBuilder(status, "Error", args);
            break;
        default:
            response = htmlError(...args)
    }

    return response;

}

function htmlError(...args) {
    let errorMessage = '';
    args.entries((i)=>{
        errorMessage += `${i}: ${args[i]}<br>`;
    })
    return `<p>${errorMessage}</p>`;
    
}

module.exports = function(error, req, res, next) {
    const contentType = req.is("application/json") ? 'json' : 'html';
    const statusCode = (req.statusCode != null && req.statusCode !== 200 ) ? req.statusCode : 500;
    
    if(contentType == "json") {
        res.status(statusCode).json(buildResponse(statusCode, contentType, error instanceof Error ? { message: error.message, stack: error.stack } : error));
    } else {
        res.status(statusCode).send(buildResponse(statusCode, contentType, error instanceof Error ? { message: error.message, stack: error.stack } : error));
    }

}