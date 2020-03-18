var express = require('express');
var app = express();
app.use(express.static("./public"));
app.set('view engine', 'ejs');
app.set('views', './views');
var sever = require('http').Server(app);
var io = require('socket.io')(sever);
sever.listen(5500);

io.on('connection', function (socket) {
    console.log(socket.id + ' connected');
    socket.on('disconnect', function () {
        console.log(socket.id + ' disconenct')
    });
});

app.get('/', function (req, res) {
    res.render('hom');
});