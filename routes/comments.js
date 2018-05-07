const express = require(`express`),
      router = express.Router({mergeParams: true}),
      Comment = require(`../models/comment`),
      Human = require(`../models/human`),
      User = require(`../models/user`),
      mid = require(`../middleware`);

router.get(`/new`, mid.isLoggedIn, (req, res) => {
  res.render(`comments/new`, {humanId: req.params.id});
});

router.post(`/new`, mid.isLoggedIn, (req, res) => {
  req.body.comment.author = req.user.username;
  Comment.create(req.body.comment)
    .then((comment) => {
    User.findById(req.user._id)
      .then((user)=> {
      Human.findById(req.params.id)
        .populate(`comments`)
        .exec()
        .then((human) => {
        comment.author.id = req.user._id;
        comment.author.username = req.user.username;
        comment.author.image = req.user.image;
        comment.author.imageAlt = req.user.imageAlt;
        comment.author.humanAccount = req.user.humanAccount.id;
        comment.forHuman = human._id;
        comment.save();
        human.comments.push(comment);
        user.commentsMade.push(comment);
        user.save();
        let starTotal = 0;
        for(let comment of human.comments) {
          starTotal += comment.stars;
        }
        human.ratingsCount = human.comments.length;
        human.averageStars = (Number(starTotal) / human.comments.length).toFixed(1);
        human.save();
        res.redirect(`/humans/${human._id}`);
      });
      })
  }).catch((err)=>{
    mid.errHandler(err, req, res, `back`);
  })
});

router.get(`/:cid/edit`, mid.checkCommentOwner, (req, res) => {
  Comment.findById(req.params.cid)
    .then((comment) => {
    res.render(`comments/edit`, {humanId: req.params.id, comment: comment}); 
  })
    .catch((err)=> {
    mid.errHandler(err, req, res, `back`);
  });
});

router.put(`/:cid`, mid.checkCommentOwner, (req, res) => {
  Comment.findByIdAndUpdate(req.params.cid, req.body.comment)
    .then((comment) => {
    req.flash(`success`, `Review Edited.`)
    avgStarsUpdater(req, res);
  })
    .catch((err)=> {
      mid.errHandler(err, req, res, `back`);
  });
});

router.delete(`/:cid`, mid.checkCommentOwner, (req, res) => {
  Comment.findByIdAndRemove(req.params.cid)
    .then((comment) => {
    Human.findById(req.params.id)
      .then((human) => {
      for(let com of human.comments) {
        if(com.equals(comment._id)){
          human.comments.remove(com);
          human.save();
        }
      }
      req.flash(`success`, `Comment deleted!`);
      avgStarsUpdater(req, res);
    });
  })
    .catch((err)=> {
    mid.errHandler(err, req, res, `back`);
  });
});

function avgStarsUpdater(req, res){
  Human.findById(req.params.id)
  .populate(`comments`)
  .exec((err, human) => {
    let starTotal = 0;
    for(let comment of human.comments) {
      starTotal += comment.stars;
    }
    human.averageStars = (Number(starTotal) / human.comments.length || 0).toFixed(1);
    human.save();
    res.redirect(`/humans/${req.params.id}`);
  });
}

module.exports = router;