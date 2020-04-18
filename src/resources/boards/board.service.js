const boardRepo = require('./board.db.repository');
const Task = require('../tasks/task.model');

const getAllBoards = () => boardRepo.getAllBoards();
const getBoardById = id => boardRepo.getBoardById(id);
const addBoard = board => boardRepo.addBoard(board);
const updateBoard = boardToUpdate => boardRepo.updateBoard(boardToUpdate);
const deleteBoard = async id => {
  await Task.deleteMany({ boardId: id });
  return boardRepo.deleteBoard(id);
};

module.exports = {
  getAllBoards,
  getBoardById,
  addBoard,
  updateBoard,
  deleteBoard
};
