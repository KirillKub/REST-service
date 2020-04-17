const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const User = require('../resources/users/user.model');

const user1 = new User({ name: 'Kirill', login: 'new', password: 'test' });
const user2 = new User({ name: 'Kirill', login: 'new', password: 'test' });
const user3 = new User({ name: 'Kirill', login: 'new', password: 'test' });
const users = [user1, user2, user3];

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log("we're connected!");
    db.dropDatabase();
    users.forEach(user => user.save());
    cb();
  });
};

module.exports = connectToDB;
