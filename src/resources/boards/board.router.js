const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAllBoards();
  const board = new Board();
  boards.push(board);
  res.json(boards);
});

router.route('/').post(async (req, res) => {
  const boards = await boardsService.getAllBoards();
  const board = req.body;
  board.id = boards.length + 1;
  board.columns[0].id = board.columns.length;
  boards.push(board);
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const id = req.params.id;
  const boards = await boardsService.getAllBoards();
  const board = boards.find(item => item.id === +id);
  res.json(board);
});

router.route('/:id').put(async (req, res) => {
  const id = req.params.id;
  const boards = await boardsService.getAllBoards();
  boards[id - 1] = req.body;
  boards[id - 1].id = id;
  res.json(boards);
});

router.route('/:id').delete(async (req, res) => {
  const boards = await boardsService.getAllBoards();
  const id = req.params.id;
  const index = boards.indexOf(boards.find(item => item.id === +id));
  boards.splice(index, 1);
  res.json(boards);
});

module.exports = router;
