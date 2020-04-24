const loginRepo = require('./login.db.repository');
const { getAll } = require('../users/user.service');

const getToken = async user => {
  const users = await getAll();
  return loginRepo.getToken(users, user);
};

module.exports = {
  getToken
};
