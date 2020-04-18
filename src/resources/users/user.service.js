const usersRepo = require('./user.db.repository');

const getAll = () => usersRepo.getAll();
const getById = id => usersRepo.getById(id);
const addUser = user => usersRepo.addUser(user);
const updateUser = userToUpdate => usersRepo.updateUser(userToUpdate);
const deleteUser = id => usersRepo.deleteUser(id);

module.exports = { getAll, getById, addUser, updateUser, deleteUser };
