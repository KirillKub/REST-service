const Board = require('./board.model');

const getAllBoards = async () => {
  // TODO: mock implementation. should be replaced during task development
  return boards;
};

const boards = [new Board(), new Board(), new Board()];
const boardsID = boards.map(item => item.id);

module.exports = { getAllBoards, boardsID };
