const Task = require('./task.model');

const getAllTasks = async () => {
  // TODO: mock implementation. should be replaced during task development
  return tasks;
};

const tasks = [new Task(), new Task(), new Task(), new Task(), new Task()];

module.exports = { getAllTasks };
