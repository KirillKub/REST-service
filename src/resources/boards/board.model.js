const mongoose = require('mongoose');
const uuid = require('uuid');

const boardSchema = new mongoose.Schema(
  {
    title: String,
    columns: [
      {
        _id: String,
        title: String,
        order: Number
      }
    ],
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

boardSchema.statics.toResponse = board => {
  const { _id, title, columns } = board;
  const newColumns = [];
  columns.forEach(item => {
    newColumns.push({ id: item._id, title: item.title, order: item.order });
  });
  return { id: _id, title, columns: newColumns };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;

// const uuid = require('uuid');

// class Column {
//   constructor({
//     id = uuid(),
//     title = 'TITLE',
//     order = parseInt(Math.random() * 10, 10)
//   } = {}) {
//     this.id = id;
//     this.title = title;
//     this.order = order;
//   }
// }

// class Board {
//   constructor({
//     id = uuid(),
//     title = 'TITLE',
//     columns = [new Column(), new Column(), new Column()]
//   } = {}) {
//     this.id = id;
//     this.title = title;
//     this.columns = columns.map(item => new Column(item));
//   }
// }

// module.exports = Board;
