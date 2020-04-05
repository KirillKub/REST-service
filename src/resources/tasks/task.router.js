const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/:id/tasks').get(async (req, res) => {
  const tasks = await tasksService.getAllTasks();
  const id = req.params.id;
  const tasksByID = tasks.filter(item => item.boardId === id) || [];
  if (!tasksByID.length) res.json(['undefined']);
  else res.json(tasksByID.map(Task.toResponse));
});

router.route('/:id/tasks/:taskID').get(async (req, res) => {
  const tasks = await tasksService.getAllTasks();
  const boardID = req.params.id;
  const taskID = req.params.taskID;
  const element = tasks.find(
    item => item.boardId === boardID && item.id === taskID
  );
  if (!element) res.json('undefined');
  else res.json(Task.toResponse(element));
});

router.route('/:id/tasks').post(async (req, res) => {
  const tasks = await tasksService.getAllTasks();
  const task = new Task(req.body);
  task.boardId = req.params.id;
  task.columnId = null;
  task.userId = null;
  tasks.push(task);
  res.json(task);
});

router.route('/:id/tasks/:taskID').put(async (req, res) => {
  const tasks = await tasksService.getAllTasks();
  const boardID = req.params.id;
  const taskID = req.params.taskID;
  const index = tasks.indexOf(
    tasks.find(item => item.boardId === boardID && item.id === taskID)
  );
  const task = new Task(req.body);
  task.boardId = req.params.id;
  task.columnId = null;
  task.userId = null;
  tasks[index] = task;
  res.json(tasks.map(Task.toResponse));
});

router.route('/:id/tasks/:taskID').delete(async (req, res) => {
  const tasks = await tasksService.getAllTasks();
  const boardID = req.params.id;
  const taskID = req.params.taskID;
  const index = tasks.indexOf(
    tasks.find(item => item.boardId === boardID && item.id === taskID)
  );
  if (index > 0) tasks.splice(index, 1);
  res.json('The task has been deleted');
});

module.exports = router;
