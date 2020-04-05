const tasksRepo = require('./task.memory.repository');

const getAllTasks = () => tasksRepo.getAllTasks();

module.exports = { getAllTasks };
