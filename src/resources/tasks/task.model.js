const uuid = require('uuid');
const boardsID = require('../boards/board.memory.repository').boardsID;
const usersID = require('../users/user.memory.repository').usersID;

class Task {
  constructor({
    id = uuid(),
    title = 'TITLE',
    order = parseInt(Math.random() * 10, 10),
    description = 'DESCRIPTION',
    userId = usersID[parseInt(Math.random() * 10, 10) % usersID.length],
    boardId = boardsID[parseInt(Math.random() * 10, 10) % boardsID.length],
    columnId = 'columnID'
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    try {
      const { id, title, order, description, userID } = task;
      return { id, title, order, description, userID };
    } catch (err) {
      return;
    }
  }
}

module.exports = Task;
