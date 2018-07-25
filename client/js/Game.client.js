/**
 * @class Game
 * @param {socket} socket
 * @author Anurag Hazra <hazru.anurag@gmail.com>
 */
function Game(socket) {
  this.socket = socket;
  this.self = null;

  this.players = {};
  this.bullets = [];
}

Game.prototype.sendUserInput = function () {
  Key.onDown(function (key, states) {
    socket.emit('keypress', { key: key, state: true, id: socket.id });
  });
  Key.onUp(function (key, states) {
    socket.emit('keypress', { key: key, state: false, id: socket.id });
  });
}


// get all the players initial information 
Game.prototype.getServerData = function (serverdata) {
  for (let i = 0; i < serverdata.players.length; i++) {
    let p = serverdata.players[i];
    this.players[p.id] = new Player(p);
  }

  for (let i = 0; i < serverdata.bullets.length; i++) {
    let b = serverdata.bullets[i];
    this.bullets.length = serverdata.bullets.length;
    this.bullets[i] = new Bullet(b);
  }
}


// Update all entities
Game.prototype.updateClientData = function (serverdata) {
  for (let i = 0; i < serverdata.players.length; i++) {
    let p = serverdata.players[i];
    this.players[p.id].pos = p.pos;
    this.players[p.id].hp = p.hp;
    this.players[p.id].maxhp = p.maxhp;
    this.players[p.id].thrusting = p.thrusting;
    this.players[p.id].shooting = p.shooting;
    this.players[p.id].angle = p.angle;
    this.players[p.id].id = p.id;
    this.players[p.id].score = p.score;
  }
  for (let i = 0; i < serverdata.bullets.length; i++) {
    let b = serverdata.bullets[i];
    this.bullets.length = serverdata.bullets.length;
    this.bullets[i] = new Bullet(b);
  }
}


Game.prototype.draw = function () {
  for (const i in this.players) {
    this.players[i].draw();
    this.players[i].drawHp();
  }
  for (let i = 0; i < this.bullets.length; i++) {
    this.bullets[i].draw();
  }
}