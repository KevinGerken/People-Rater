const express = require(`express`),
      router = express.Router({mergeParams: true}),
      Comment = require(`../models/comment`),
      Human = require(`../models/human`),
      mid = require(`../middleware`);

router.get(`/new`, (req, res) => {
  res.render(`comments/new`, {humanId: req.params.id});
});

router.post(`/new`, (req, res) => {
  req.body.comment.author = req.user.username;
  Comment.create(req.body.comment, (err, comment) => {
    if(err){
      mid.errHandler(err, req, res, `back`);
    } else {
      Human.findById(req.params.id, (err, human) => {
        comment.author.id = req.user._id;
        comment.author.username = req.user.username;
        comment.author.image = req.user.image;
        comment.author.imageAlt = req.user.imageAlt;
        comment.save();
        human.comments.push(comment);
        human.save();
        res.redirect(`/humans/${human._id}`);
      });
    }
  });
});

router.get(`/:cid/edit`, (req, res) => {
  Comment.findById(req.params.cid, (err, comment) => {
    if(err) {
      errHandler(err, req, res, `back`);
    } else {
      res.render(`comments/edit`, {humanId: req.params.id, comment: comment});  
    }
  });
});

router.put(`/:cid`, (req, res) => {
  Comment.findByIdAndUpdate(req.params.cid, req.body.comment, (err, comment) => {
    if(err) {
      errHandler(err, req, res, `back`);
    } else {
      res.redirect(`/humans/${req.params.id}`);
    }
  });
});

router.delete(`/:cid`, (req, res) => {
  Comment.findByIdAndRemove(req.params.cid, (err) => {
    if(err){
      errHandler(err, req, res, `back`);
    } else {
      req.flash(`success`, `Comment deleted!`);
      res.redirect(`/humans/${req.params.id}`);
    }
  });
});

module.exports = router;