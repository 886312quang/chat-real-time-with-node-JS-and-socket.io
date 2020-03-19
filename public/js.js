
var socket = io('http://localhost:5500');

socket.on('Server-send-data', function (data) {
    $('#content').append(data + " ");
});
socket.on('server-fail', function () {
    alert('Create fail');
})
socket.on('server-success', function (data) {
    alert('Create success');
    $('#currentUser').html(data);
    $('#createUser').hide(1000);
    $('#chatForm').show(2000);
})
socket.on('serverSendListUser', function (data) {
    $('#listContent').html('');
    data.forEach(function (i) {
        $('#listContent').append('<div class="user">' + i + "</div>");

    });
});
socket.on('serverSendMessages',function(data){
    $('#messages').append('<div class="card-block ms">'
                    +data.userName+': '+data.content+'</div>');
});
socket.on('active',function(data){
    $('#activeMessages').html(data);
});
$(document).ready(function () {
    $('#createUser').show();
    $('#chatForm').hide();

    $('#textarea').focusin(function(){
        socket.emit('writing');
    })
    $('#textarea').focusout(function(){
        socket.emit('stop-writing');
    })
    $('#create').click(function () {
        socket.emit('createUser', $('#username').val());
    });
    $('#exit').click(function(){
        socket.emit('logout');
        $('#createUser').show();
        $('#chatForm').hide();
    })
    $('#sendMessages').click(function(){
        socket.emit('sendMessages',$('#textarea').val());
      
    })
})
