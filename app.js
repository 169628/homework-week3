var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');

var app = express();

//連接資料庫
require("./connections")

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

//404錯誤
// .status要寫在.send的前面
app.use((req, res) => {
    res.status(404).send({
        status: "error",
        message: "無此路由"
    })
})

//express錯誤處理
//一定要有參數next
app.use((err, req, res, next) => {
    if (err.name === "post err") {
        res.status(err.statusCode).send({
            status: "false",
            method: req.method,
            message: err.message
        })

    } else {
        res.status(500).send({
            status: "error",
            method: req.method,
            message: "系統錯誤，請洽管理員"
        })
    }

})

module.exports = app;


