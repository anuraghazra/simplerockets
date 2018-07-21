const Player = require('./Player');
// const Bullet = require('./Bullet');
// const utils = require('./utils');

function Game() {
  this.clients = {};
  this.players = {};

  this.bullets = [];
}

Game.prototype.addPlayer = function (name, socket) {
  this.clients[socket.id] = socket;
  this.players[socket.id] = Player.createNewPlayer(name, socket.id);
  console.log('player added');
}

Game.prototype.removePlayer = function (id) {
  delete this.clients[id];
  delete this.players[id]
  console.log('player removed');
};

Game.prototype.update = function () {
  for (const i in this.players) {
    this.players[i].update();
    if (this.players[i].dead === true) {
      this.players[i].respawn();
    }
  }

  for (let i = 0; i < this.bullets.length; i++) {
    this.bullets[i].update(this.players);
    if(this.bullets[i].isDead === true) {
      this.bullets.splice(i, 1)
    }
  }
}

// Send A Package to the all clients
Game.prototype.sendPack = function (socket) {
  let packPlayer = [];
  for (const i in this.players) {
    let player = this.players[i];
    packPlayer.push({
      pos: player.pos,
      thrusting: player.thrusting,
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
      id: bullet.id,
      parent: bullet.parent,
      isDead : bullet.isDead
    })
  }
  // return pack;
  socket.emit('update', { players: packPlayer, bullets : packBullets });
}

module.exports = Game;