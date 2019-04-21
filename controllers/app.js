var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	//var io = require('socket.io')(http);

	io = require('socket.io').listen(server), 
	nicknames = [];

server.listen(3000, function(){
  console.log('listening on *:3000');
});

app.get('/',function(req,res){
	res.sendFile(__dirname + '/lobby.html');
})

io.on('connection', function(socket){




	//socket events

	socket.on('new user', function(){
		 io.emit('new message', ' *1 user connected*');		
	})

	socket.on('send message', function(data){
		//io.emit('new message', {msg:data, nick:socket.nickname});
		io.emit('new message', data);
	});

	socket.on('disconnect', function(){
		//if (!socket.nickname) return;
	    io.emit('new message', ' *disconnected*');
	    //nicknames.splice(nicknames.indexOf(socket.nickname),1);
	    //updateNicknames();
  	});
});