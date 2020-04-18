const Board = require('./board.model');

const getAllBoards = async () => {
  return Board.find({});
};

const getBoardById = async id => {
  return Board.findById(id);
};

const addBoard = async board => {
  return Board.create(board);
};

const updateBoard = async boardToUpdate => {
  return Board.updateOne({ _id: boardToUpdate.id }, boardToUpdate);
};

const deleteBoard = async id => {
  return (await Board.deleteOne({ _id: id })).deletedCount;
};

module.exports = {
  getAllBoards,
  getBoardById,
  addBoard,
  updateBoard,
  deleteBoard
};
