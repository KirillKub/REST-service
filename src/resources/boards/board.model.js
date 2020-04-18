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
