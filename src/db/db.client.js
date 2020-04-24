const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const User = require('../resources/users/user.model');

const saltRounds = 10;
let user;
bcrypt.hash('admin', saltRounds, async (err, hash) => {
  user = await new User({ name: 'admin', login: 'admin', password: hash });
});

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async () => {
    console.log("we're connected!");
    await db.dropDatabase();
    user.save();
    cb();
  });
};

module.exports = connectToDB;
