const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const errorController = require('./controllers/error');
const User = require('./models/user');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const MONGODB_URI = 'mongodb+srv://Ram:uw3U2Wql4UEskPfo@cluster0.rjgiw.mongodb.net/shop?retryWrites=true&w=majority';

const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'UserSessions',
});

const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'AbijotGupta',
  resave: false,
  saveUninitialized: false,
  store: store,
}));

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if(! req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

//These fields are available to each and every render func
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect( MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(result => {
    app.listen(5700);
  })
  .catch(err => console.log(err));
  