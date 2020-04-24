const User = require('./user.model');
const bcrypt = require('bcrypt');

const getAll = async () => {
  return User.find({});
};

const getById = async id => {
  return User.findById(id);
};

const addUser = async user => {
  const { name, login, id, password } = user;
  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds); // eslint-disable-line
  return User.create({ name, login, id, password: hash });
};

const updateUser = async userToUpdate => {
  return User.updateOne({ _id: userToUpdate.id }, userToUpdate);
};

const deleteUser = async id => {
  return (await User.deleteOne({ _id: id })).deletedCount;
};

module.exports = { getAll, getById, addUser, updateUser, deleteUser };
