const express = require(`express`),
      router = express.Router({mergeParams: true}),
      User = require(`../models/user`),
      Human = require(`../models/human`),
      Comment = require(`../models/comment`),
      passport = require(`passport`),
      mid = require(`../middleware`);

router.get(`/`, (req, res) => {
  User.find({})
    .then((users) => {
    res.render(`users/index`, {users: users});
  });
});

router.get(`/new`, (req, res) => {
  res.render(`users/new`);
});

router.post(`/`, (req, res) => {
  req.body.user.username = req.body.username;
  User.register(new User(req.body.user),  req.body.password)
  .then((user) => {
    let newHuman = {
      firstName: req.body.user.firstName,
      lastName: req.body.user.lastName,
      city: req.body.user.city,
      state: req.body.user.state,
      image: req.body.user.image,
      imageAlt: req.body.user.imageAlt,
      description: req.body.description,
      addedBy: {
        id: user._id
      }
    }
      Human.create(newHuman)
      .then((human) => {
      user.humanAccount.id = human._id;
      user.save();
      passport.authenticate(`local`)(req, res, () => {
        req.flash(`success`, `Account created successfully.  Hurrah!`);
        res.redirect(`/humans`); 
      });
      }) 
  })
    .catch((err)=> {
      mid.errHandler(err, req, res, `back`);
  });
});

router.get(`/:id`, (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
    res.render(`users/show`, {user: user});
    })
    .catch((err)=> {
      mid.errHandler(err, req, res, `back`);
    });
});

router.get(`/:id/edit`, mid.isUser, (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
    res.render(`users/edit`, {user: user});
  })
    .catch((err)=> {
    mid.errHandler(err, req, res, `back`);
  });
});

router.put(`/:id`, mid.isUser, (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body.user)
    .then((user) => {
    req.flash(`success`, `User successfully updated.`);
    res.redirect(`/users/${user._id}`);
  })
    .catch((err)=> {
    mid.errHandler(err, req, res, `back`);
  });
});

router.delete(`/:id`, mid.isUser, (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((user) => {
    for(let com of user.commentsMade) {
      Comment.findByIdAndRemove(com)
        .then((comm) =>{
        Human.findById(comm.forHuman)
          .populate({
          path: `human.comments`,
          model: `Comment`
        })
          .exec()
          .then((human) => {
          for(let com of human.comments) {
            if(com.equals(comm._id)){
              human.comments.remove(com);
              let starTotal = 0;
              for(let comment of human.comments) {
                starTotal += comment.stars;
              }
              human.averageStars = (Number(starTotal) / human.comments.length || 0).toFixed(1);
              human.save(); 
            }
          }
        });
      });
      }
  })
    .then(()=>{
    req.flash(`success`, `Your account has been deleted.`);
    res.redirect(`/humans`);
  })
    .catch((err)=> {
    mid.errHandler(err, req, res, `back`);
  });
});

module.exports = router;