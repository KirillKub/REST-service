const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');

const getToken = async (users, user) => {
  const userExist = users.find(
    person =>
      person.login === user.login &&
      bcrypt.compareSync(user.password, person.password) // eslint-disable-line
  );
  if (userExist) {
    const { id, login } = userExist;
    const token = jwt.sign({ userId: id, login }, JWT_SECRET_KEY, {
      algorithm: 'HS256'
    });
    return token;
  }
  return false;
};

module.exports = {
  getToken
};
