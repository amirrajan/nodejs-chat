var express = require('express');
var _ = require('underscore');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var nodes = { };
var usernames = {};
server.listen(process.env.PORT || 3000);

app.set('view engine', 'ejs');
app.set('view options', { layout: false });
app.use(express.methodOverride());
app.use(express.bodyParser());  
app.use(app.router);
app.use('/public', express.static('public'));

app.get('/', function (req, res) {
  res.render('index');
});

io.sockets.on('connection', function(socket) {
  // when the client emits 'sendchat', this listens and executes
	socket.on('sendchat', function (data) {
		// we tell the client to execute 'updatechat' with 2 parameters
		io.sockets.emit('updatechat', socket.username, data);
	});

	// when the client emits 'adduser', this listens and executes
	socket.on('adduser', function(username) {
		// we store the username in the socket session for this client
		socket.username = username;
		// add the client's username to the global list
		usernames[username] = username;
		// echo to client they've connected
		socket.emit('updatechat', 'server', 'you have connected');
		// echo globally (all clients) that a person has connected
		socket.broadcast.emit('updatechat', 'server', username + ' has connected');
		// update the list of users in chat, client-side
		io.sockets.emit('updateusers', usernames);
	});

	// when the user disconnects.. perform this
	socket.on('disconnect', function(){
		// remove the username from global usernames list
		delete usernames[socket.username];
		// update list of users in chat, client-side
		io.sockets.emit('updateusers', usernames);
		// echo globally that this client has left
		socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
	});
});
