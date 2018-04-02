const express = require(`express`),
      router = express.Router(),
      User = require(`../models/user`);

router.get(`/`, (req, res) => {
  User.find({}, (err, users) => {
    res.render(`users/index`, {users: users});
  });
});

router.get(`/new`, (req, res) => {
  res.render(`users/new`);
});

router.post(`/`, (req, res) => {
  User.create(req.body.user, (err, user) => {
    if(err) {
      console.log(`fart`);
      errHandler(err, req, res, `back`);
    } else {
      req.flash(`success`, `Account created successfully.  Hurrah!`);
      res.redirect(`/humans`);
    }
  });
});

router.get(`/:id`, (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if(err) {
      errHandler(err, req, res, `back`);
    } else {
      res.render(`users/show`, {user: user});
    }
  });
});

router.get(`/:id/edit`, (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if(err) {
      errHandler(err, req, res, `back`);
    } else {
      res.render(`users/edit`, {user: user});
    }
  });
});

router.put(`/:id`, (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body.user, (err, user) => {
    if(err) {
      errHandler(err, req, res, `back`);
    } else {
      req.flash(`success`, `User successfully updated.`);
      res.redirect(`/users/${user._id}`);
    }
  });
});

router.delete(`/:id`, (req, res) => {
  User.findByIdAndRemove(req.params.id, (err) => {
    if(err) {
      errHandler(err, req, res, `back`);
    } else {
      req.flash(`success`, `Your account has been deleted.`);
      res.redirect(`/humans`);
    }
  });
});

function errHandler(err, req, res, redirect) {
  req.flash(`error`, err.message);
  res.redirect(redirect);
}

module.exports = router;