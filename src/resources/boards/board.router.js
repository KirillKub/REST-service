const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const createError = require('../../middleware/error');

router.route('/').get(async (req, res, next) => {
  try {
    const boards = await boardsService.getAllBoards();
    res.json(boards.map(Board.toResponse));
  } catch (err) {
    next(err);
    return;
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const board = new Board(req.body);
    const newBoard = await boardsService.addBoard(board);
    res.json(Board.toResponse(newBoard));
  } catch (err) {
    next(err);
    return;
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const id = req.params.id;
    const board = await boardsService.getBoardById(id);
    if (!board) throw createError({ statusCode: 404, message: 'Not found' });
    else res.json(Board.toResponse(board));
  } catch (err) {
    next(err);
    return;
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const board = await boardsService.updateBoard({ ...req.body });
    if (!board.n) {
      throw createError({ statusCode: 404, message: 'Not found' });
    }
    res.json('Updated');
  } catch (err) {
    next(err);
    return;
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const board = await boardsService.deleteBoard(id);
    if (!board) {
      throw createError({ statusCode: 404, message: 'Not found' });
    } else {
      res.json('Deleted');
    }
  } catch (err) {
    next(err);
    return;
  }
});

module.exports = router;
