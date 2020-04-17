const { logger } = require('./winston/index');

const loggingMiddleware = (req, res, next) => {
  logger.info(
    `date: ${new Date()} method: ${req.method} URL: ${
      req.originalUrl
    } query parameters:${JSON.stringify(req.query)} body:${JSON.stringify(
      req.body
    )}`
  );
  next();
};

module.exports = loggingMiddleware;
