const generateAPIResponse = (statusCode, message, data = null) => {
    if (statusCode >= 400 && statusCode <= 599) {
        return {
            statusCode,
            message,
            errors: data
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