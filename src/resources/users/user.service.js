const usersRepo = require('./user.db.repository');
const Task = require('../tasks/task.model');

const getAll = () => usersRepo.getAll();
const getById = id => usersRepo.getById(id);
const addUser = user => usersRepo.addUser(user);
const updateUser = userToUpdate => usersRepo.updateUser(userToUpdate);
const deleteUser = async id => {
  await Task.updateMany({ userId: id }, { userId: null });
  return usersRepo.deleteUser(id);
};

module.exports = { getAll, getById, addUser, updateUser, deleteUser };
