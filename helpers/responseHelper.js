const generateAPIResponse = (statusCode, message, data = null) => {
    if (statusCode >= 400 && statusCode <= 599) {
        return {
            statusCode,
            message,
            errors: (typeof data == "object" || data instanceof Array) ? [...data] : data
        };
    } else {
        return {
            statusCode,
            message,
            data
        };
    }
};

module.exports = generateAPIResponse;