const express = require(`express`),
      router = express.Router({mergeParams: true}),
      Human = require(`../models/human`),
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
  Human.create(req.body.human, (err, humans) => {
    if(err) {
      req.flash(`error`, err.message);
      res.redirect(`/new`);
    } else {
      req.flash(`success`, `Human successfully added.`);
      res.redirect(`/humans`); 
    } 
  });
});

router.get(`/:id`, (req, res) => {
  Human.findById(req.params.id)
    .populate(`comments`)
    .exec((err, human) => {
    console.log(human.comments);
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
  Human.findByIdAndRemove(req.params.id, (err) => {
    if(err){
      req.flash(`error`, err.message);
      res.redirect(`/humans`);
    } else {
      req.flash(`success`, `You deleted a human.  Harsh!`);
      res.redirect(`/humans`);
    }
  });
});

module.exports = router;