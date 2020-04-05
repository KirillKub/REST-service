const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAllBoards();
  res.json(boards);
});

router.route('/').post(async (req, res) => {
  const boards = await boardsService.getAllBoards();
  const board = new Board(req.body);
  boards.push(board);
  res.json(board);
});

router.route('/:id').get(async (req, res) => {
  const id = req.params.id;
  const boards = await boardsService.getAllBoards();
  const board = boards.find(item => item.id === id);
  if (!board) res.status(404).json('Not found');
  else res.json(board);
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
  const tasks = await tasksService.getAllTasks();
  const id = req.params.id;
  const index = boards.indexOf(boards.find(item => item.id === id));
  if (index === -1) res.status(404).json('Not found');
  else {
    const newTasks = tasks.filter(item => item.boardId !== boards[index].id);
    tasks.splice(0, tasks.length, ...newTasks);
    boards.splice(index, 1);
    res.json(tasks);
  }
});

module.exports = router;
