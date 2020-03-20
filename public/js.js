
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
socket.on('serverSendRoom', function (data) {
    $('#roomContent').html('');
    data.map(function (r) {
        $('#roomContent').append('<div class="room">' + r + "</div>");

    });
});
socket.on('serverSendMessages', function (data) {
    $('#messages').append('<div class="card-block ms">'
        + data.userName + ': ' + data.content + '</div>');
});
socket.on('active', function (data) {
    $('#activeMessages').html(data);
});
socket.on('roomNow', function (data) {
    $('#currentRoom').html(data);
});
$(document).ready(function () {
    $('#createUser').show();
    $('#chatForm').hide();

    $('#textarea').focusin(function () {
        socket.emit('writing');
    })
    $('#textarea').focusout(function () {
        socket.emit('stop-writing');
    })
    $('#create').click(function () {
        socket.emit('createUser', $('#username').val());
    });
    $('#createRoom').click(function () {
        socket.emit('createRoom', $('#roomName').val());
    });
    $('#exit').click(function () {
        socket.emit('logout');
        $('#createUser').show();
        $('#chatForm').hide();
    })
    textarea.addEventListener('keydown', function (event) {
        if (event.which === 13 && event.shiftKey == false) {
            // Emit to server input
            socket.emit('sendMessages', $('#textarea').val());
           $('#textarea').val(" ");
            event.preventDefault();
        }
    })
    $('#sendMessages').click(function () {
        socket.emit('sendMessages', $('#textarea').val());

    });
    //Xuli jq
    $('#checkMenu').click(function () {
        $('#menu').toggleClass('hide');
        $('#right').toggleClass('next');
    })
})
