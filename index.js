var express = require('express');
var app = express();
app.use(express.static("./public"));
app.set('view engine', 'ejs');
app.set('views', './views');
var sever = require('http').Server(app);
var io = require('socket.io')(sever);
sever.listen(5500);

var arrayUser = [""];
var arrayRoom = [""];

io.on('connection', function (socket) {
    console.log(socket.id + ' connected');
    io.sockets.emit('serverSendListUser', arrayUser);
    io.sockets.emit('serverSendRoom',arrayRoom);
 
    socket.on('createUser', function (data) {
        if (arrayUser.indexOf(data) >= 0) {
            socket.emit('server-fail');
        } else {
            arrayUser.push(data);
            console.log(arrayUser);
            socket.Username = data;
            socket.emit('server-success', data);
            io.sockets.emit('serverSendListUser', arrayUser);
        }
    });
    socket.on('disconnect', function () {
        console.log(socket.id + ' disconenct');
        arrayUser.splice(arrayUser.indexOf(socket.Username), 1);
        socket.broadcast.emit('serverSendListUser', arrayUser);
        socket.on('logout', function () {
            arrayUser.splice(arrayUser.indexOf(socket.Username), 1);
            socket.broadcast.emit('serverSendListUser', arrayUser);
        });
    });
    socket.on('writing',function(){
        io.sockets.emit('active',socket.Username +"writing");
    })
    socket.on('stop-writing',function(){
        io.sockets.emit('active',"");
    })
    socket.on('createRoom',function(data){
        socket.join(data);
        socket.room = data;
        if (arrayRoom.indexOf(data) >= 0){
            socket.emit('room-succes');
        }else{
            arrayRoom.push(data);
        }
        console.log(arrayRoom)
        io.sockets.emit('serverSendRoom',arrayRoom);
        socket.emit('roomNow','Now'+ data);
    });
    socket.on('sendMessages', function (data) {
        io.sockets.in(socket.room).emit('serverSendMessages',{userName:socket.Username , content:data})
    });
});

app.get('/', function (req, res) {
    res.render('home');
});