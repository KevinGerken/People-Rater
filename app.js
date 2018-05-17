const express = require(`express`),
      app = express(),
      ejs = require(`ejs`),
      mongoose = require(`mongoose`),
      bodyParser = require(`body-parser`),
      passport = require(`passport`),
      passportLocal = require(`passport-local`),
      flash = require(`connect-flash`),
      methodOverride = require(`method-override`),
      expressSession = require(`express-session`),
      User = require(`./models/user`),
      humansRoute = require(`./routes/humans`),
      usersRoute = require(`./routes/users`),
      commentsRoute = require(`./routes/comments`),
      mid = require(`./middleware`),
      moment = require(`moment`),
      compression = require(`compression`);

mongoose.connect(`mongodb://localhost:27017/help`);
//mongoose.connect(process.env.DATABASEURL);
app.set(`view engine`, `ejs`);
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride(`_method`));
app.use(flash());
app.use(compression());
app.locals.moment = moment;

app.use(expressSession({
  secret: `It's a secret don't tell anyone.`,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate())); 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash(`error`);
  res.locals.success = req.flash(`success`);
  next();
});

app.get(`/`, (req, res) => {
  res.render(`splash`);
});

app.get(`/login`, (req, res) => {
  res.render(`users/login`);
});
 
app.post(`/login`, passport.authenticate(`local`, {
    successRedirect:`back`,
    failureRedirect: `/users/login`
  }), (req, res) => { 
  });

app.get(`/logout`, (req, res) => {
  req.logout();
  res.redirect(`/humans`);
});

app.get(`/reset`, mid.isLoggedIn, (req, res) => {
  res.render(`users/reset`);
})

app.post(`/reset/:id`, mid.isUser, (req, res) => {
  if(req.body.newPass === req.body.newPassConfirm) {
      User.findById(req.params.id)
      .then( (user) => {
        user.setPassword(req.body.newPassConfirm, () => {
          user.save();
          req.flash(`success`, `Password changed.`);
          res.redirect(`/users/${user._id}`);
        }
        )})
      .catch((err)=> {
        mid.errHandler(err, req, res, `back`)
      });
    } else {
    req.flash(`error`, `Passwords must match!`);
    res.redirect(`/reset`);
  }
});

app.use(`/humans`, humansRoute);
app.use(`/users`, usersRoute);
app.use(`/humans/:id/comments`, commentsRoute);

app.listen(3000);
//app.listen(process.env.PORT, process.env.IP);