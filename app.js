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
      port = 3000,
      User = require(`./models/user`),
      humansRoute = require(`./routes/humans`);

mongoose.connect(`mongodb://localHost:27017/help`);

app.set(`view engine`, `ejs`);
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride(`_method`));
app.use(flash());

app.use(expressSession({
  secret: `It's a secret don't tell anyone.`,
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  res.locals.error = req.flash(`error`);
  res.locals.success = req.flash(`success`);
  next();
});

app.get(`/`, (req, res) => {
  res.render(`splash`);
});

app.use(`/humans`, humansRoute);

app.listen(port);