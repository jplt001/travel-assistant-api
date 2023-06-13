const handle404 = (req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
};

module.exports = handle404;