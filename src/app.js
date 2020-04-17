const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const { logger } = require('./middleware/winston/index');
const loggingMiddleware = require('./middleware/logging');

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

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);

app.use('*', (req, res) => {
  logger.warn('Bad request');
  res.status(400).send('Bad request');
});

app.use((err, req, res, next) => { // eslint-disable-line
  const { statusCode, message } = err;
  logger.error(
    `date: ${new Date()} status code: ${statusCode} message: ${message}`
  );
  res.status(statusCode).send(message);
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
