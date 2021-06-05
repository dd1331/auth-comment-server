const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'error',
        user
      })
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      // const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
      const token = jwt.sign(user.toJSON(), 'randomString');

      return res.json(((user, token)))
    });
  })(req, res);
})

router.post('/signup', async (req, res) => {
  const { id, password } = req.body;
  const createdUser = await User.create({ user_id: id, password });
  res.status(201).send(createdUser);
});
// router.get('/test', passport.authenticate('jwt', { session: false }),
//   async (req, res, next) => {
//     res.send()
//   }
// )

module.exports = router;
