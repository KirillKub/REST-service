const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');
const createError = require('../../middleware/error');

router.route('/:id/tasks').get(async (req, res, next) => {
  try {
    const id = req.params.id;
    const tasks = await tasksService.getAllTasks(id);
    if (!tasks) {
      throw createError({ statusCode: 404, message: 'Not found' });
    }
    res.json(tasks.map(Task.toResponse));
  } catch (err) {
    next(err);
    return;
  }
});

router.route('/:id/tasks/:taskID').get(async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const id = req.params.taskID;
    const task = await tasksService.getTaskById(boardId, id);
    if (!task) throw createError({ statusCode: 404, message: 'Not found' });
    res.json(Task.toResponse(task));
  } catch (err) {
    next(err);
    return;
  }
});

router.route('/:id/tasks').post(async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const task = await tasksService.addTask({ ...req.body, boardId });
    res.json(Task.toResponse(task));
  } catch (err) {
    next(err);
    return;
  }
});

router.route('/:id/tasks/:taskID').put(async (req, res, next) => {
  try {
    const id = req.params.taskID;
    const task = await tasksService.updateTask({ id, ...req.body });
    console.log(task);
    if (!task.n) {
      throw createError({ statusCode: 404, message: 'Not found' });
    }
    res.json(Task.toResponse(task));
  } catch (err) {
    next(err);
    return;
  }
});

router.route('/:id/tasks/:taskID').delete(async (req, res, next) => {
  try {
    const id = req.params.taskID;
    const task = await tasksService.deleteTask(id);
    if (!task) {
      throw createError({ statusCode: 404, message: 'Not found' });
    }
    res.json(Task.toResponse(task));
  } catch (err) {
    next(err);
    return;
  }
});

module.exports = router;
