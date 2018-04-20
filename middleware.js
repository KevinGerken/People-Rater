const middleware = {},
      Comment = require(`./models/comment`),
      User = require(`./models/user`),
      Human = require(`./models/human`);

middleware.errHandler = function (err, req, res, redirect) {
  req.flash(`error`, err.message);
  res.redirect(redirect);
}

middleware.isLoggedIn = function (req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    loginRequired(req, res);
  } 
}

middleware.checkHumanCreator = function (req, res, next) {
  if(req.isAuthenticated()) {
    Human.findById(req.params.id, (err, human) => {
      if(err) {
        middlware.errHandler(err, req, res, `back`);
      } else if(human.addedBy.id.equals(req.user._id)) {
        next();
      } else {
        req.flash(`error`, `You can only alter people you added.`);
        res.render(`back`);
      }
    })
  } else {
    loginRequired(req, res);
  }
}

middleware.checkCommentOwner = function (req, res, next) {
  if(req.isAuthenticated()) {
    Comment.findById(req.params.cid, (err, comment) => {
      if(comment.author.id.equals(req.user._id)) {
        next();
      } else {
        req.flash(`error`, `You can only alter your own comments`);
        res.redirect(`back`);
      }
    });
  } else {
    loginRequired(req, res);
  }
}

middleware.isUser = function(req, res, next) {
  if(req.isAuthenticated()) {
    User.findById(req.params.id, (err, user)=>{
      if(err) {
        middleware.errHandler(err, req, res, `back`);
      } else {
        if(user._id.equals(req.user._id)) {
        next();
        } else {
          req.flash(`error`, `You can only alter your own account`);
          res.redirect(`/humans`);
        }
      }
    });
  } else {
    loginRequired(req, res);
  }
}

function loginRequired(req, res) {
  req.flash(`error`, `You must be logged in to do that.`);
  res.redirect(`/login`);
}

module.exports = middleware;