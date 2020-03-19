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
        console.log(socket.id + ' disconenct');
        arrayUser.splice(arrayUser.indexOf(socket.Username), 1);
        socket.broadcast.emit('serverSendListUser', arrayUser);
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
        arrayUser.splice(arrayUser.indexOf(socket.Username), 1);
        socket.broadcast.emit('serverSendListUser', arrayUser);
    });
    socket.on('sendMessages', function (data) {
        io.sockets.emit('serverSendMessages',{userName:socket.Username , content:data})
    });
    socket.on('writing',function(){
        io.sockets.emit('active',socket.Username +"writing");
    })
    socket.on('stop-writing',function(){
        io.sockets.emit('active',"");
    })
});

app.get('/', function (req, res) {
    res.render('home');
});