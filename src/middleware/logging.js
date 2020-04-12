const { logger } = require('./winston/index');

const loggingMiddleware = (req, res, next) => {
  logger.info(
    `URL: ${req.originalUrl}\n query parameters:${JSON.stringify(
      req.query
    )}\n body:${JSON.stringify(req.body)}`
  );
  next();
};

module.exports = loggingMiddleware;