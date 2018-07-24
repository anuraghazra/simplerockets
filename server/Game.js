const Player = require('./Player');
// const Bullet = require('./Bullet');
// const utils = require('./utils');

function Game() {
  this.clients = {};
  this.players = {};

  this.bullets = [];

  this.gameAlerts = [];
}
Game.prototype.addPlayer = function (name, socket) {
  this.clients[socket.id] = socket;
  this.players[socket.id] = Player.createNewPlayer(name, socket.id);
  if(this.players[socket.id]) {
    let stat = this.players[socket.id].name + ' joined the game.';
    this.gameAlerts.push(stat);
    console.log(stat);
  }
}

Game.prototype.removePlayer = function (socket) {
  if(this.players[socket.id]) {
    let stat = this.players[socket.id].name + ' leave the game.';
    this.gameAlerts.push(stat);
    console.log(stat);
  }
  delete this.clients[socket.id];
  delete this.players[socket.id];
};

Game.prototype.update = function (socket) {
  for (const i in this.players) {
    this.players[i].update();
    if (this.players[i].dead === true) {
      this.players[i].respawn();
    }
  }

  for (let i = 0; i < this.bullets.length; i++) {
    this.bullets[i].update(this.players, this.gameAlerts, socket);
    if (this.bullets[i].isDead) {
      this.bullets.splice(i, 1);
    }
  }
  
}

// Send A Package to the all clients
Game.prototype.sendUpdatePack = function (socket) {
  let packPlayer = [];
  for (const i in this.players) {
    let player = this.players[i];
    packPlayer.push({
      pos: player.pos,
      thrusting: player.thrusting,
      shooting: player.shooting,
      angle: player.angle,
      hp: player.hp,
      maxhp: player.maxhp,
      id: player.id,
      score: player.score,
      name: player.name
    })
  }

  
  let packBullets = [];
  for (let i = 0; i < this.bullets.length; i++) {
    let bullet = this.bullets[i];
    packBullets.push({
      pos: bullet.pos,
      angle: bullet.angle,
      parent: bullet.parent,
      isDead: bullet.isDead
    })
  }
  // return pack;
  socket.emit('game-alerts', this.gameAlerts);
  socket.emit('update', { players: packPlayer, bullets: packBullets });
}



// Send A Package to the all clients
Game.prototype.sendInitPack = function (socket) {
  let packPlayer = [];
  for (const i in this.players) {
    let player = this.players[i];
    packPlayer.push({
      pos: player.pos,
      thrusting: player.thrusting,
      shooting: player.shooting,
      angle: player.angle,
      hp: player.hp,
      maxhp: player.maxhp,
      id: player.id,
      score: player.score,
      name: player.name
    })
  }

  
  let packBullets = [];
  for (let i = 0; i < this.bullets.length; i++) {
    let bullet = this.bullets[i];
    packBullets.push({
      pos: bullet.pos,
      angle: bullet.angle,
      parent: bullet.parent,
      isDead: bullet.isDead
    })
  }
  // return pack;
  socket.emit('game-alerts', this.gameAlerts);
  socket.emit('init-players', { players: packPlayer, bullets: packBullets });
}

module.exports = Game;