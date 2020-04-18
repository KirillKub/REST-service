const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const createError = require('../../middleware/error');

router.route('/').get(async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  } catch (err) {
    next(err);
    return;
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await usersService.getById(id);
    if (!user) throw createError({ statusCode: 404, message: 'Not found' });
    res.json(User.toResponse(user));
  } catch (err) {
    next(err);
    return;
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const user = new User(req.body);
    const newUser = await usersService.addUser(user);
    res.json(User.toResponse(newUser));
  } catch (err) {
    next(err);
    return;
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await usersService.updateUser({ id, ...req.body });
    if (!user.n) {
      throw createError({ statusCode: 404, message: 'Not found' });
    }
    res.json(User.toResponse(user));
  } catch (err) {
    next(err);
    return;
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await usersService.deleteUser(id);
    if (!user) {
      throw createError({ statusCode: 404, message: 'Not found' });
    }
    res.json(User.toResponse(user));
  } catch (err) {
    next(err);
    return;
  }
});

module.exports = router;
