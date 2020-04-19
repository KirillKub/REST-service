const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const Board = require('../resources/boards/board.model');
const uuid = require('uuid');

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
    boards.forEach(board => board.save());
    cb();
  });
};

module.exports = connectToDB;
