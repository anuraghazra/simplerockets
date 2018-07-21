function Game(socket) {
  this.socket = socket;
  this.self = null;

  this.players = {};
  this.bullets = [];
}

Game.prototype.receiveGameState = function (state) {
  this.players = state['players'];
  this.bullets = state['bullets'];
  // this.self = state['self']
}

Game.prototype.updateInput = function () {
  // if (this.self) {
  //   return;
  // }

  window.addEventListener('keydown', function (e) {
    // e.preventDefault();
    if (e.key === 'a') socket.emit('keypress', { key: 'a', state: true, id : socket.id })
    if (e.key === 'd') socket.emit('keypress', { key: 'd', state: true, id : socket.id })
    if (e.key === 'w') socket.emit('keypress', { key: 'w', state: true, id : socket.id })
    if (e.key === 's') socket.emit('keypress', { key: 's', state: true, id : socket.id })
    if (e.key === ' ') socket.emit('keypress', { key: ' ', state: true, id : socket.id })
  })
  window.addEventListener('keyup', function (e) {
    if (e.key === 'a') socket.emit('keypress', { key: 'a', state: false, id : socket.id })
    if (e.key === 'd') socket.emit('keypress', { key: 'd', state: false, id : socket.id })
    if (e.key === 'w') socket.emit('keypress', { key: 'w', state: false, id : socket.id })
    if (e.key === 's') socket.emit('keypress', { key: 's', state: false, id : socket.id })
    if (e.key === ' ') socket.emit('keypress', { key: ' ', state: false, id : socket.id })
  })
}