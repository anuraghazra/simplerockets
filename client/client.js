let socket = io();

const c = new Candy();
c.createCanvas(650, 500);
let canvas = c.canvas;

let addBtn = document.getElementById('submit');
let playerName = document.getElementById('player-name');

let rocketImage = c.loadImage('./images/Rockets.png');
let bulletImage = c.loadImage('./images/bullet.png');
let smokeImage = c.loadImage('./images/emitter1.png');

function preload() {
  init();
}

function init() {

  // game-alert box
  let div = document.getElementById('game-alerts');
  let scrolling = false;
  div.onmouseover = function () { scrolling = true; }
  div.onmouseout = function () { scrolling = false; }
  socket.on('game-alerts', function (data) {
    div.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
      if (!scrolling) {
        div.scrollBy(0, div.offsetHeight * 10);
      }
      div.innerHTML += '<p>' + data[i] + '</p>';
    }
  });

  // CLIENT SIDE GAME LOGIC

  // NEW PLAYER
  addBtn.addEventListener('click', function (e) {
    e.preventDefault();
    socket.emit('new-player', { name: playerName.value });
  })

  let game = new Game(socket);
  game.sendUserInput();


  // draw loop
  socket.on('update', data => draw(data));
  socket.on('remove-player', data => delete game.players[data.id]);
  // get data for the first time
  socket.on('init-players', data => game.getServerData(data));


  function draw(data) {
    c.clear();

    // update client data every frame
    game.updateClientData(data);

    game.draw();

    // console.log(game.bullets);

    c.fill('black');
    c.textSize(15);
    c.textAlign('left')
    c.text('score : ' + game.players[socket.id].score, 15, 25);
  }


}