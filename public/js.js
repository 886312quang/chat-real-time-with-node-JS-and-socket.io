
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
    data.forEach(function (i) {
        $('#listContent').append('<div class="user">' + i + "</div>");

    });
});
$(document).ready(function () {
    $('#createUser').show();
    $('#chatForm').hide();
    $('#create').click(function () {
        socket.emit('createUser', $('#username').val());
    });
    $('#exit').click(function(){
        socket.emit('logout');
    })
})
