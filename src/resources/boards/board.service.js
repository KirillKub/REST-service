const boardRepo = require('./board.db.repository');

const getAllBoards = () => boardRepo.getAllBoards();
const getBoardById = id => boardRepo.getBoardById(id);
const addBoard = board => boardRepo.addBoard(board);
const updateBoard = boardToUpdate => boardRepo.updateBoard(boardToUpdate);
const deleteBoard = id => boardRepo.deleteBoard(id);

module.exports = {
  getAllBoards,
  getBoardById,
  addBoard,
  updateBoard,
  deleteBoard
};
