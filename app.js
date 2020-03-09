const express = require('express'),
  session = require('express-session'),
  FileStore = require('session-file-store')(session),
  es6Renderer = require('express-es6-template-engine'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan');

const indexRouter = require('./routes/index'),
  parkRouter = require('./routes/parks');
usersRouter = require('./routes/users');

const app = express();

app.engine('html', es6Renderer);
app.set('views', './views');
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    store: new FileStore(),
    secret: 'get rad',
    resave: false,
    saveUninitialized: false,
    is_logged_in: false
  })
);

app.use('/', indexRouter);
app.use('/parks', parkRouter);
app.use('/users', usersRouter);

module.exports = app;
