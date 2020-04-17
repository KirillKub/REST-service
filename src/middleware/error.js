const createError = err => {
  let { statusCode, message } = err;
  if (!statusCode && !message) {
    statusCode = 500;
    message = 'Internal Server Error';
  }
  return { statusCode, message };
};

module.exports = createError;
