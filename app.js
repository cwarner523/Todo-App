// import npms from dependencies
const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport')

// initialize the app
const app = express();
// add our dotenc files
require('dotenv').config();

//middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

//views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set the port, either from an environment varaiable or manually
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// index route
app.get('/', (req, res) => {
    res.render('index', {
        message: 'Welcome to My To Do App!',
        currentPage: 'home',
        documentTitle: 'To Do List!',
        subTitle: 'Check out my to do list!',
    });
});

const listRoutes = require('./routes/todo-routes');
app.use('/todos', listRoutes);

const authRoutes = require('./routes/auth-routes');
app.use('/auth', authRoutes);
const userRoutes = require('./routes/user-routes');
app.use('/user', userRoutes);

app.get('*', (req, res) => {
    const err = new Error('not found!');
    res.status(404).send(err);
});