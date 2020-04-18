const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');
const uuid = require('uuid');

const users = [
  new User({ name: 'Kirill', login: 'new', password: 'test' }),
  new User({ name: 'Kirill', login: 'new', password: 'test' }),
  new User({ name: 'Kirill', login: 'new', password: 'test' })
];
const boards = [
  new Board({
    title: 'title',
    columns: { id: uuid(), title: 'title', order: 0 }
  }),
  new Board({
    title: 'title',
    columns: [{ id: uuid(), title: 'title', order: 0 }]
  }),
  new Board({
    title: 'title',
    columns: [{ id: uuid(), title: 'title', order: 0 }]
  })
];

const usersID = users.map(item => item.id);
const boardId = boards.map(board => board.id);

const tasks = [
  new Task({
    _id: uuid(),
    title: 'title',
    order: 0,
    description: 'description',
    userId: usersID[parseInt(Math.random() * 10, 10) % usersID.length],
    boardId: boardId[parseInt(Math.random() * 10, 10) % boardId.length],
    columnId: '1234'
  }),
  new Task({
    _id: uuid(),
    title: 'title',
    order: 0,
    description: 'description',
    userId: usersID[parseInt(Math.random() * 10, 10) % usersID.length],
    boardId: boardId[parseInt(Math.random() * 10, 10) % boardId.length],
    columnId: '1234'
  }),
  new Task({
    _id: uuid(),
    title: 'title',
    order: 0,
    description: 'description',
    userId: usersID[parseInt(Math.random() * 10, 10) % usersID.length],
    boardId: boardId[parseInt(Math.random() * 10, 10) % boardId.length],
    columnId: '1234'
  })
];

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
    boards.forEach(board => board.save());
    tasks.forEach(task => task.save());
    cb();
  });
};

module.exports = connectToDB;
