const Task = require('./task.model');
const uuid = require('uuid');

const getAllTasks = async boardId => {
  return Task.find({ boardId });
};

const addTask = async task => {
  return Task.create({ ...task, _id: uuid() });
};

const getTaskById = async (boardId, id) => {
  return Task.findOne({ boardId, _id: id });
};

const updateTask = async taskToUpdate => {
  return Task.updateOne({ _id: taskToUpdate.id }, taskToUpdate);
};

const deleteTask = async id => {
  return (await Task.deleteOne({ _id: id })).deletedCount;
};

module.exports = { getAllTasks, addTask, getTaskById, updateTask, deleteTask };
