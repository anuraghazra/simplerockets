let socket = io();

const c = new Candy();
c.createCanvas(650, 500);
let canvas = c.canvas;

let addBtn = document.getElementById('submit');
let playerName = document.getElementById('player-name');

// add new player
addBtn.addEventListener('click', function (e) {
  e.preventDefault();
  socket.emit('new-player', { name: playerName.value });
})

let game = new Game(socket);
game.sendUserInput();

// draw loop
socket.on('update', data => draw(data));
socket.on('remove-player', data => delete game.players[data.id]);

function draw(data) {
  c.clear();

  game.getServerData(data);
  game.update();

  console.log(game.bullets);

  c.fill('black');
  c.textSize(15);
  c.textAlign('left')
  c.text('score : ' + game.players[socket.id].score, 15, 25);
}
