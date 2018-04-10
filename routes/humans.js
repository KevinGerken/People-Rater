const express = require(`express`),
      router = express.Router({mergeParams: true}),
      Human = require(`../models/human`),
      Comment = require(`../models/comment`),
      mid = require(`../middleware`);

router.get(`/`, (req,res) => {
  Human.find({}, (err, humans) => {
    if(err) {
      req.flash(`error`, err.message)
    } else {
      res.render(`index`, {humans: humans}); 
    }
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
      req.flash(`success`, `Human successfully added.`);
      res.redirect(`/humans`); 
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