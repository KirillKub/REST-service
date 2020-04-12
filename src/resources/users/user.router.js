const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const tasksService = require('../tasks/task.service');

router.route('/').get(async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.json(users.map(User.toResponse));
  } catch (err) {
    next(err);
    return;
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const id = req.params.id;
    const users = await usersService.getAll();
    const user = users.find(item => item.id === id);
    res.json(User.toResponse(user));
  } catch (err) {
    next(err);
    return;
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    const user = new User(req.body);
    users.push(user);
    res.json(User.toResponse(user));
  } catch (err) {
    next(err);
    return;
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    const id = req.params.id;
    users[users.indexOf(users.find(item => item.id === id))] = new User(
      req.body
    );
    res.json(users.map(User.toResponse));
  } catch (err) {
    next(err);
    return;
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    const tasks = await tasksService.getAllTasks();
    const id = req.params.id;
    const index = users.indexOf(users.find(item => item.id === id));
    const newTasks = tasks.map(item => {
      if (item.userId === users[index].id) item.userId = null;
      return item;
    });
    users.splice(index, 1);
    tasks.splice(0, tasks.length, ...newTasks);
    res.json(tasks);
  } catch (err) {
    next(err);
    return;
  }
});

module.exports = router;
