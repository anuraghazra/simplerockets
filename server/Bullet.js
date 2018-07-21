let Vector = require('./Vector');
const utils = require('./utils');

function Bullet(pos, angle, id, parent) {
  this.pos = new Vector(pos.x, pos.y);
  this.vel = Vector.fromAngle(angle);
  this.vel.mult(10.0)
  this.angle = angle;
  this.isDead = false;
  this.timer = 0;
  this.id = id;
  this.parent = parent;
}

Bullet.prototype.update = function(players) {
  this.pos.add(this.vel);

  this.timer++;

  // handle collision between bullet and player
  for (const i in players) {
    let p = players[i];
    if (this.getDistance(p.pos) < 20 && p.id !== this.parent) {
      p.hp -= 10;
      p.hp = utils.clamp(p.hp, 0, p.maxhp);
      this.isDead = true;
    }
    if (p.hp <= 0 && this.isDead) {
      console.log('i am dead', players[this.parent].score, this.parent)
      players[this.parent].score++;
    }
  }


  if (this.timer > 100) {
    this.isDead = true;
    this.timer = 0;
  }
}

Bullet.prototype.getDistance = function(v) {
  return Math.sqrt(Math.pow(this.pos.x - v.x, 2) + Math.pow(this.pos.y - v.y, 2))
}

module.exports = Bullet;