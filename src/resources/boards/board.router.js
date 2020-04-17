const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service');
const createError = require('../../middleware/error');

router.route('/').get(async (req, res, next) => {
  try {
    const boards = await boardsService.getAllBoards();
    res.json(boards);
  } catch (err) {
    next(err);
    return;
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const boards = await boardsService.getAllBoards();
    const board = new Board(req.body);
    boards.push(board);
    res.json(board);
  } catch (err) {
    next(err);
    return;
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const id = req.params.id;
    const boards = await boardsService.getAllBoards();
    const board = boards.find(item => item.id === id);
    if (!board) throw createError({ statusCode: 404, message: 'Not found' });
    else res.json(board);
  } catch (err) {
    next(err);
    return;
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const id = req.params.id;
    const boards = await boardsService.getAllBoards();
    const index = boards.indexOf(boards.find(item => item.id === id));
    if (index === -1) {
      throw createError({ statusCode: 404, message: 'Not found' });
    }
    boards[index] = new Board(req.body);
    res.json(boards);
  } catch (err) {
    next(err);
    return;
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const boards = await boardsService.getAllBoards();
    const tasks = await tasksService.getAllTasks();
    const id = req.params.id;
    const index = boards.indexOf(boards.find(item => item.id === id));
    if (index === -1) {
      throw createError({ statusCode: 404, message: 'Not found' });
    } else {
      const newTasks = tasks.filter(item => item.boardId !== boards[index].id);
      tasks.splice(0, tasks.length, ...newTasks);
      boards.splice(index, 1);
      res.json(boards);
    }
  } catch (err) {
    next(err);
    return;
  }
});

module.exports = router;
