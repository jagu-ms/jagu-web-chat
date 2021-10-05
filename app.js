require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const createError = require('http-errors');
const cors = require('cors');

const corsOptions ={
    origin:'http://localhost:3001', 
    credentials:true, //access-control-allow-credentials:true
    optionSuccessStatus:200
}

require('./socket-handler');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/auth', require('./routes/auth'));
app.use('/api/account', require('./routes/account'));

// error middlewares
app.use((err, req, res, next) => {
    if(err.name === 'MongoError' || err.name === 'ValidationError' || err.name === 'CastError'){
        // that means there are some data errors
        err.status = 422;
    }
    if(req.get('accept').includes('json')){
        res.status(err.status || 500).json({message: err.message || "we have some errors eccured."});
    } else {
        res.status(err.status || 500).sendFile(path.join(__dirname, 'public', 'index.html'));
    }
});

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true } , (err) => {
    if(err) throw err;
    console.log('elhmdlh connected successfully');
});

module.exports = app;
