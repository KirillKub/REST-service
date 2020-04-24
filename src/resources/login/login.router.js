const router = require('express').Router();
const loginService = require('./login.service');
const createError = require('../../middleware/error');

router.route('/').post(async (req, res, next) => {
  try {
    const token = await loginService.getToken({ ...req.body });
    if (!token) {
      throw createError({ statusCode: 403, message: 'Not Forbidden' });
    }
    res.status(200).json({ token });
  } catch (err) {
    next(err);
    return;
  }
});

module.exports = router;
