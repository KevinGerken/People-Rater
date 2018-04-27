const express = require(`express`),
      router = express.Router({mergeParams: true}),
      User = require(`../models/user`),
      Human = require(`../models/human`),
      Comment = require(`../models/comment`),
      mid = require(`../middleware`);

router.get(`/`, (req,res) => {
    const perPage = 6,
        pageQuery = Number(req.query.page),
        pageNumber = pageQuery ? pageQuery : 1;
  Human.find({}).skip((perPage * pageNumber) - perPage).limit(perPage).exec((err, humans) => {
    Human.count().exec((err, count) =>{
      if(err) {
        req.flash(`error`, err.message)
      } else {
        console.log(Math.ceil(count/perPage));
        res.render(`index`, {
          humans: humans,
          current: pageNumber,
          pages: Math.ceil(count/perPage)
        }); 
      }
    });
  });  
});

router.get(`/new`, mid.isLoggedIn, (req, res) => {
  res.render(`humans/new`);
});

router.post(`/`, mid.isLoggedIn, (req, res) => {
  req.body.addedBy = req.user;
  Human.create(req.body.human, (err, human) => {
    if(err) {
      req.flash(`error`, err.message);
      res.redirect(`/new`);
    } else {
      human.addedBy.id = req.user._id;
      human.save();
      Comment.create(req.body.comment, (err, comment) => {
        if(err) {
          mid.errHandler(err, req, res, `back`);
        } else {
          User.findById(req.user._id, (err, user) =>{
            if(err){
              mid.errHandler(err, req, res, `back`);
            } else {
              comment.author.id = req.user._id;
              comment.author.username = req.user.username;
              comment.author.image = req.user.image;
              comment.author.imageAlt = req.user.imageAlt;
              comment.author.humanAccount = req.user.humanAccount.id;
              comment.forHuman = human._id;
              comment.save();
              human.comments.push(comment);
              human.ratingsCount = 1;
              human.averageStars = req.body.comment.stars;
              human.save();
              user.commentsMade.push(comment);
              user.save();
              req.flash(`success`, `Human successfully added.`);
              res.redirect(`/humans`); 
            }
          });
        }
      });
    } 
  });
});

router.get(`/:id`, (req, res) => {
  Human.findById(req.params.id)
    .populate(`comments`)
    .exec((err, human) => {
    if(err) {
      req.flash(`err`, `Human not found.`);
      res.redirect(`/humans`);
    } else {
      res.render(`humans/show`, {human: human});
    }
  });
});

router.get(`/:id/edit`, mid.checkHumanCreator, (req, res) => {
  Human.findById(req.params.id, (err, human) =>{
    if(err) {
      req.flash(`error`, `Human not found.`);
      res.redirect(`/humans`);
    } else {
      res.render(`humans/edit`, {human: human});
    }
  });
});

router.put(`/:id`, mid.checkHumanCreator, (req, res) => {
  Human.findByIdAndUpdate(req.params.id, req.body.human, (err, human) => {
    if(err) {
      req.flash(`error`, err.message);
      res.redirect(`/humans/${req.params.id}`);
    } else {
      req.flash(`success`, `Human successfully updated.`);
      res.redirect(`/humans/${req.params.id}`);
    }
  });
});

router.delete(`/:id`, mid.checkHumanCreator, (req, res) => {
  Human.findById(req.params.id, (err, human) => {
    if(err){
      mid.errHandler(err, req, res, `back`);
    } else {
      for(let comment of human.comments){
        Comment.findByIdAndRemove(comment, (err) => {
          if(err) {
            mid.errHandler(err, req, res, `back`);
          }
        });
      }
      human.remove((err) => {
        if(err) {
          mid.errHandler(err, req, res, `back`);
        } else {
          req.flash(`success`, `You deleted a human.  Harsh!`);
          res.redirect(`/humans`);
        }
      });
    }
  });
});

module.exports = router;