const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

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
  // await createdUser.save()
  res.status(201).send(createdUser);
});
router.get('/test', passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    res.send()
  }
)
router.post('/post', passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const { title, content } = req.body
    const payload = { title, content, poster: req.user.id}
    const post = await Post.create(payload)
    if (post) {
      // await post.save()
      res.status(201).send(post)
    }
    else res.status(404).send()
  }
)

router.post('/comment', passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const { comment, postId } = req.body;
    const payload = { comment, commenter: req.user.id, postId};
    console.log(payload)
    const createdComment = await Comment.create(payload);
    // await createdComment.save()
    res.status(201).send(createdComment);
  }
)
router.patch('/comment', passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const { commentId, comment } = req.body
    const updatedComment = await Comment.update({ comment }, { where: { id:commentId }})

    if (updatedComment) {
      res.status(204).send()
    } else {
      res.status(404).send()
    }
  }
)
router.delete('/comment/:commentId', passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const { commentId } = req.params
    const deletedComment = await Comment.destroy({ where: { id: commentId }})
    if (deletedComment) {
      res.status(204).send()
    } else {
      res.status(404).send()
    }
  }
)
router.post('/like', passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const { commentId, isLike } = req.body
    const user = req.user
    const like = await Like.findOne({ where: { commentId }})
    const target = await Comment.findOne({ where: { id: commentId }})

    if (!like) {
      const payload = {
        isLike 
      }
      const createdLike = await Like.create(payload)
      if (createdLike) {
        if (isLike) {
          await target.update({likeCount: 1})
        } else {
          await target.update({dislikeCount: 1})
        }
        res.status(201).send(isLike)
      } else {
        res.status(500).send(isLike)
      }
      return
    }
    if (like) {
      if (like.isLike === isLike) {
        res.status(304).send(isLike);
        return
      } else {
        await Like.update({ isLike }, { where: { commentId }})
        if (isLike) {
          await target.update({likeCount: target.likeCount + 1})
        } else {
          await target.update({likeCount: target.dislikeCount + 1})
          
        }
        res.status(204).send(isLike);
      }
    }
    console.log(like)
    res.status(200).send()
  }
)

module.exports = router;
