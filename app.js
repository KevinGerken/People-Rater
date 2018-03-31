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
      port = 3000;

mongoose.connect(`mongod://localHost:27017/help`);

app.set(`view engine`, `ejs`);
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride(`_method`));
app.use(flash());

app.get(`/`, (req, res) => {
  res.render(`splash`);
});

app.listen(port);