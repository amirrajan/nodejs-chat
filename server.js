import express from 'express';
import http from 'http';
import socketio from 'socket.io';

var app = express();
var server = http.createServer(app);
var io = socketio.listen(server);
var nodes = { };
var usernames = { };

server.listen(process.env.PORT || 3000);

app.set('view engine', 'ejs');
app.set('view options', { layout: false });
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

io.sockets.on('connection', socket => {
	socket.on('sendchat', data => {
		io.sockets.emit('updatechat', socket.username, data);
	});

	socket.on('adduser', username => {
		socket.username = username;

		usernames[username] = username;

		socket.emit('servernotification', { connected: true, to_self: true, username: username });

		socket.broadcast.emit('servernotification', { connected: true, username: username });

		io.sockets.emit('updateusers', usernames);
	});

	socket.on('disconnect', () => {

		delete usernames[socket.username];

		io.sockets.emit('updateusers', usernames);

		socket.broadcast.emit('servernotification', { username: socket.username });
	});
});
