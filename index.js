var express = require('express');
var app = express();
app.use(express.static("./public"));
app.set('view engine', 'ejs');
app.set('views', './views');
var sever = require('http').Server(app);
var io = require('socket.io')(sever);
sever.listen(5500);

var arrayUser = [""];

io.on('connection', function (socket) {
    console.log(socket.id + ' connected');
    socket.on('disconnect', function () {
        console.log(socket.id + ' disconenct')
    });
    socket.on('createUser', function (data) {
        if (arrayUser.indexOf(data) >= 0) {
            socket.emit('server-fail');
        } else {
            arrayUser.push(data);
            socket.Username = data;
            socket.emit('server-success', data);
            io.sockets.emit('serverSendListUser', arrayUser);
        }
    });
    socket.on('logout', function () {
        arrayUser.splice(
            arrayUser.indexOf(socket.Username), 1
        );
        socket.broadcast.emit('serverSendListUser', arrayUser);
    });
});

app.get('/', function (req, res) {
    res.render('home');
});