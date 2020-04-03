const boardRepo = require('./board.memory.repository');

const getAllBoards = () => boardRepo.getAllBoards();

module.exports = { getAllBoards };
