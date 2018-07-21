let socket = io();

const c = new Candy();
c.createCanvas(650, 500);
let canvas = c.canvas;

let addBtn = document.getElementById('submit');
let playerName = document.getElementById('player-name');

// add new player
addBtn.onclick = function (e) {
  e.preventDefault();
  socket.emit('new-player', { name: playerName.value });
}

let game = new Game(socket);
console.log(socket)

game.updateInput();

// draw loop
socket.on('update', function (data) {
  draw(data);
});

socket.on('remove-player', function (data) {
  delete Player.List[data.id];
})

function draw(data) {
  c.clear();


  for (let i = 0; i < data.players.length; i++) {
    let p = data.players[i];
    Player.List[p.id] = new Player(p);
    Player.List[p.id].draw();
    Player.List[p.id].drawHp();

    // player names
    c.textSize(10);
    c.textAlign(CENTER);
    c.text(p.name, Player.List[p.id].pos.x, Player.List[p.id].pos.y - 30);
  }
  for (let i = 0; i < data.bullets.length; i++) {
    let b = data.bullets[i];
    Bullet.List[i] = new Bullet(b);
    Bullet.List[i].draw();
  }
  for (let i = 0; i < Bullet.List.length; i++) {
    Bullet.List[i].index++;
    if (Bullet.List[i].index > 100) {
      Bullet.List.splice(i, 1);
    }
  }
  console.log(Bullet.List)

  c.fill('black');
  c.textSize(15);
  c.textAlign('left')
  c.text('score : ' + Player.List[socket.id].score, 15, 25);
}
