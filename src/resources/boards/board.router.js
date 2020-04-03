const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAllBoards();
  res.json(boards);
});

router.route('/').post(async (req, res) => {
  const boards = await boardsService.getAllBoards();
  const board = new Board(req.body);
  boards.push(board);
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const id = req.params.id;
  const boards = await boardsService.getAllBoards();
  const board = boards.find(item => item.id === id);
  res.json(board);
});

router.route('/:id').put(async (req, res) => {
  const id = req.params.id;
  const boards = await boardsService.getAllBoards();
  boards[boards.indexOf(boards.find(item => item.id === id))] = new Board(
    req.body
  );
  res.json(boards);
});

router.route('/:id').delete(async (req, res) => {
  const boards = await boardsService.getAllBoards();
  const id = req.params.id;
  const index = boards.indexOf(boards.find(item => item.id === id));
  boards.splice(index, 1);
  res.json(boards);
});

module.exports = router;
