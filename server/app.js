// npm i express socket.io @types/socket.io --save

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const md5 = require('md5');

const defaultAvatar = 'https://www.gravatar.com/avatar/';
const users = [];

let gravatar = mail => 'https://www.gravatar.com/avatar/' + md5(mail);

io.on('connection', socket => {
    console.log('New connection');

    socket.on('login', user => {
        console.log('Login', user);
        user = {
            username: user.username,
            mail: user.mail,
            avatar: gravatar(user.mail)
        };
        users.push(user);
        socket.user = user;
        socket.emit('newLogin', user);
        io.emit('users', users);
    });

    socket.on('message', content => {
        let date = new Date();

        io.emit('message', {
            date: date.getHours() + ':' + date.getMinutes(),
            content: content,
            user: socket.user
        });
    });
});

http.listen(4444);
