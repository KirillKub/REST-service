const uuid = require('uuid');

class Column {
  constructor({
    id = uuid(),
    title = 'TITLE',
    order = parseInt(Math.random() * 10, 10)
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

class Board {
  constructor({
    id = uuid(),
    title = 'TITLE',
    columns = [new Column(), new Column(), new Column()]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(item => new Column(item));
  }
}

module.exports = Board;
