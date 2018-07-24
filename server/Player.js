let Vector = require('./Vector');
const utils = require('./utils');
const Bullet = require('./Bullet');

function Player(name, id) {
  this.pos = new Vector(utils.random(500), utils.random(500));
  this.vel = new Vector(0, 0);
  this.thrust = new Vector(0, 0);
  this.thrusting = false;
  this.angle = 0;
  this.index = 0;
  this.id = id;
  this.maxSpeed = 10;

  this.hp = 100;
  this.maxhp = 100;
  this.dead = false;
  this.score = 0;

  this.name = name;

  this.key = {
    up: false,
    left: false,
    right: false,
    space: false,
  };
}

Player.prototype.applyForce = function (f) {
  this.vel.add(f);
}

Player.prototype.update = function () {
  this.thrust = Vector.fromAngle(this.angle);
  if (this.thrusting) {
    this.thrust.setMag(0.5);
  } else {
    this.thrust.setMag(0);
  }

  this.applyForce(this.thrust);

  this.vel.mult(0.98)
  this.vel.limit(this.maxSpeed);
  this.pos.add(this.vel);

  if (this.key.right) this.angle += 0.1;
  if (this.key.left) this.angle -= 0.1;

  if (this.key.up) {
    this.thrusting = true;
  } else {
    this.thrusting = false
  }

  if (this.hp <= 0) this.dead = true;

  this.handleEdges();
}

Player.prototype.handleEdges = function () {
  if (this.pos.x > 650) { this.pos.x = 0 }
  if (this.pos.x < 0) { this.pos.x = 650 }
  if (this.pos.y > 500) { this.pos.y = 0 }
  if (this.pos.y < 0) { this.pos.y = 500 }
}

Player.prototype.respawn = function () {
  this.pos.x = utils.randomInt(500);
  this.pos.y = utils.randomInt(500);
  this.hp = 100;
  this.dead = false;
}
Player.prototype.shoot = function () {
  let bullet = new Bullet(this.pos, this.angle, this.index, this.id);
  this.index++;
  return bullet;
}

Player.prototype.updateInput = function (data) {
  if (data.key === 'A') this.key.left = data.state;
  if (data.key === 'D') this.key.right = data.state;
  if (data.key === 'W') this.key.up = data.state;
  if (data.key === 'S') this.key.down = data.state;
  if (data.key === ' ') this.key.space = data.state;
}

Player.createNewPlayer = function (name, id) {
  return new Player(name, id);
}


module.exports = Player;