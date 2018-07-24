const express = require('express');
let app = express();
const server = require('http').Server(app);

const Game = require('./server/Game');
const io = require('socket.io')(server, {});


app.set('port', 5000);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/index.html');
})

app.use('/', express.static(__dirname + '/client'));

server.listen(5000);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const FRAMERATE = 1000 / 24;
let game = new Game();

let removePack = {};

let sock = null;
io.sockets.on('connection', function (socket) {
  
  sock = socket;
  // add new player
  socket.on('new-player', function (data) {
    game.addPlayer(data.name, socket);
    for (const i in game.clients) {
      game.sendInitPack(game.clients[i]);
    }
  });

  // remove player
  socket.on('disconnect', function () {
    game.removePlayer(socket);
    removePack = {id : socket.id};
  });

  socket.on('keypress', function (data) {
    if(game.players[data.id]) {
      game.players[data.id].updateInput(data);
      if(data.key === ' ') {
        game.bullets.push(game.players[data.id].shoot());
      }
    }
  });
})


// loop
setInterval(loop, FRAMERATE);

function loop() {
  game.update(sock);
  for (const i in game.clients) {
    game.sendUpdatePack(game.clients[i]);
    game.clients[i].emit('remove-player', removePack);
  }
}