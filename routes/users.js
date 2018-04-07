const express = require(`express`),
      router = express.Router({mergeParams: true}),
      User = require(`../models/user`),
      Human = require(`../models/human`)
      passport = require(`passport`),
      mid = require(`../middleware`);

router.get(`/`, (req, res) => {
  User.find({}, (err, users) => {
    res.render(`users/index`, {users: users});
  });
});

router.get(`/new`, (req, res) => {
  res.render(`users/new`);
});

router.post(`/`, (req, res) => {
  req.body.user.username = req.body.username;
  User.register(new User(req.body.user),  req.body.password, (err, user) => {
    if(err) {
      console.log(err);
      mid.errHandler(err, req, res, `back`);
    } else {
      let newHuman = {
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        city: req.body.user.city,
        state: req.body.user.state,
        image: req.body.user.image,
        imageAlt: req.body.user.imageAlt,
        addedBy: {
          id: user._id
        }
      }
      Human.create(newHuman, (err, human) => {
        if(err) {
          req.flash(`error`, err.message);
          res.redirect(`/new`);
        } else {
          passport.authenticate(`local`)(req, res, () => {
            req.flash(`success`, `Account created successfully.  Hurrah!`);
            res.redirect(`/humans`);  
          });
        } 
      });     
    }
  });
});

router.get(`/:id`, (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if(err) {
      mid.errHandler(err, req, res, `back`);
    } else {
      res.render(`users/show`, {user: user});
    }
  });
});

router.get(`/:id/edit`, mid.isUser, (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if(err) {
      mid.errHandler(err, req, res, `back`);
    } else {
      res.render(`users/edit`, {user: user});
    }
  });
});

router.put(`/:id`, mid.isUser, (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body.user, (err, user) => {
    if(err) {
      mid.errHandler(err, req, res, `back`);
    } else {
      req.flash(`success`, `User successfully updated.`);
      res.redirect(`/users/${user._id}`);
    }
  });
});

router.delete(`/:id`, mid.isUser, (req, res) => {
  User.findByIdAndRemove(req.params.id, (err) => {
    if(err) {
      mid.errHandler(err, req, res, `back`);
    } else {
      req.flash(`success`, `Your account has been deleted.`);
      res.redirect(`/humans`);
    }
  });
});


module.exports = router;