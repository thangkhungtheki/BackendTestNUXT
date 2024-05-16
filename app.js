const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session')

const mongoose = require('mongoose');
const passport = require('./passport/passport');


require('./passport/passport').default
require('dotenv').config()
const app = express();
const router = require('./router/router.app')


app.use(session({
    secret: 'thangkhungtheki',
    resave: false,
    saveUninitialized: false,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize())
app.use(passport.session());







mongoose.connect(process.env.DATABASE_URL);
app.use('/', router)

module.exports = app;