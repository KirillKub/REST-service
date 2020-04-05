const User = require('./user.model');

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return users;
};

const users = [new User(), new User(), new User(), new User(), new User()];
const usersID = users.map(item => item.id);

module.exports = { getAll, usersID };
