const tasksRepo = require('./task.db.repository');

const getAllTasks = boardId => tasksRepo.getAllTasks(boardId);
const addTask = task => tasksRepo.addTask(task);
const getTaskById = (boardId, id) => tasksRepo.getTaskById(boardId, id);
const updateTask = taskToUpdate => tasksRepo.updateTask(taskToUpdate);
const deleteTask = id => tasksRepo.deleteTask(id);

module.exports = { getAllTasks, addTask, getTaskById, updateTask, deleteTask };
