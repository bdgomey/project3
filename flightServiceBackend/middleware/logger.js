const logger = (req, res, next) => {
    console.log('Request received from ' + req.originalUrl);
    next();
}

module.exports = logger;