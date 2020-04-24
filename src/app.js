const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/login/login.router');
const { logger } = require('./middleware/winston/index');
const loggingMiddleware = require('./middleware/logging');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./common/config.js');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(loggingMiddleware);
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter);
app.use((req, res, next) => {
  if (typeof req.headers.authorization !== 'undefined') {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, JWT_SECRET_KEY, { algorithm: 'HS256' }, err => {
      if (err) {
        res.status(401).json({ error: 'Unauthorized' });
        logger.error(
          `date: ${new Date()} status code: 401 message: Unauthorized`
        );
      }
      return next();
    });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
    logger.error(`date: ${new Date()} status code: 401 message: Unauthorized`);
  }
});
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);
app.use('*', (req, res) => {
  logger.warn('Bad request');
  res.status(400).send('Bad request');
});

app.use((err, req, res, next) => { // eslint-disable-line
  try {
    const { statusCode, message } = err;
    res.status(statusCode).send(message);
    logger.error(
      `date: ${new Date()} status code: ${statusCode} message: ${message}`
    );
  } catch (error) {
    logger.error(
      `date: ${new Date()} status code: 500 message: Internal Server Error`
    );
    res.status(500).send('Internal Server Error');
  }
});

process.on('uncaughtException', err => {
  console.error(`captured error: ${err.message}`);
  const { exit } = process;
  exit(1);
});

process.on('unhandledRejection', err => {
  console.error(`Unhandled rejection detected: ${err.message}`);
  const { exit } = process;
  exit(1);
});

module.exports = app;
