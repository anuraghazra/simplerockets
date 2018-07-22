function Game(socket) {
  this.socket = socket;
  this.self = null;

  this.players = {};
  this.bullets = {};
}

Game.prototype.sendUserInput = function () {
  window.addEventListener('keydown', function (e) {
    // e.preventDefault();
    if (e.key === 'a') socket.emit('keypress', { key: 'a', state: true, id: socket.id })
    if (e.key === 'd') socket.emit('keypress', { key: 'd', state: true, id: socket.id })
    if (e.key === 'w') socket.emit('keypress', { key: 'w', state: true, id: socket.id })
    if (e.key === 's') socket.emit('keypress', { key: 's', state: true, id: socket.id })
    if (e.key === ' ') socket.emit('keypress', { key: ' ', state: true, id: socket.id })
  })
  window.addEventListener('keyup', function (e) {
    if (e.key === 'a') socket.emit('keypress', { key: 'a', state: false, id: socket.id })
    if (e.key === 'd') socket.emit('keypress', { key: 'd', state: false, id: socket.id })
    if (e.key === 'w') socket.emit('keypress', { key: 'w', state: false, id: socket.id })
    if (e.key === 's') socket.emit('keypress', { key: 's', state: false, id: socket.id })
    if (e.key === ' ') socket.emit('keypress', { key: ' ', state: false, id: socket.id })
  })
}

Game.prototype.getServerData = function (serverdata) {
  for (let i = 0; i < serverdata.players.length; i++) {
    let p = serverdata.players[i];
    this.players[p.id] = new Player(p);
  }

  if (serverdata.bullets.length > 0) {
    for (let i = 0; i < serverdata.bullets.length; i++) {
      let b = serverdata.bullets[i];
      this.bullets[b.id] = new Bullet(b);
      if(this.bullets[b.id] === true) {
        delete this.bullets[b.id];
      }
    }
  } else {
    this.bullets = {};
  }
}

Game.prototype.update = function () {
  for (const i in this.players) {
    this.players[i].draw();
    this.players[i].drawHp();
  }
  for (const i in this.bullets) {
    if (this.bullets[i].isDead === true) {
      delete this.bullets[i];
    } else {
      this.bullets[i].draw();
    }
  }
}