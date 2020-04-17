const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');
const createError = require('../../middleware/error');

router.route('/:id/tasks').get(async (req, res, next) => {
  try {
    const tasks = await tasksService.getAllTasks();
    const id = req.params.id;
    const tasksByID = tasks.filter(item => item.boardId === id);
    if (tasksByID.length === 0) {
      throw createError({ statusCode: 404, message: 'Not found' });
    }
    res.json(tasksByID);
  } catch (err) {
    next(err);
    return;
  }
});

router.route('/:id/tasks/:taskID').get(async (req, res, next) => {
  try {
    const tasks = await tasksService.getAllTasks();
    const boardID = req.params.id;
    const taskID = req.params.taskID;
    const element = tasks.find(
      item => item.boardId === boardID && item.id === taskID
    );
    if (!element) throw createError({ statusCode: 404, message: 'Not found' });
    res.json(element);
  } catch (err) {
    next(err);
    return;
  }
});

router.route('/:id/tasks').post(async (req, res, next) => {
  try {
    const tasks = await tasksService.getAllTasks();
    const task = new Task(req.body);
    task.boardId = req.params.id;
    task.columnId = null;
    task.userId = null;
    tasks.push(task);
    res.json(task);
  } catch (err) {
    next(err);
    return;
  }
});

router.route('/:id/tasks/:taskID').put(async (req, res, next) => {
  try {
    const tasks = await tasksService.getAllTasks();
    const boardID = req.params.id;
    const taskID = req.params.taskID;
    const index = tasks.indexOf(
      tasks.find(item => item.boardId === boardID && item.id === taskID)
    );
    if (index === -1) {
      throw createError({ statusCode: 404, message: 'Not found' });
    }
    const task = new Task(req.body);
    tasks[index] = task;
    res.json(Task.toResponse(task));
  } catch (err) {
    next(err);
    return;
  }
});

router.route('/:id/tasks/:taskID').delete(async (req, res, next) => {
  try {
    const tasks = await tasksService.getAllTasks();
    const boardID = req.params.id;
    const taskID = req.params.taskID;
    const index = tasks.indexOf(
      tasks.find(item => item.boardId === boardID && item.id === taskID)
    );
    if (index === -1) {
      throw createError({ statusCode: 404, message: 'Not found' });
    }
    if (index >= 0) tasks.splice(index, 1);
    res.json(tasks);
  } catch (err) {
    next(err);
    return;
  }
});

module.exports = router;
