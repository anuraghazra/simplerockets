// Client Side Player State
function Player(pack) {
  this.pos = pack.pos;
  this.angle = pack.angle;

  this.id = pack.id;
  this.hp = pack.hp;
  this.maxhp = pack.maxhp;
  this.score = pack.score;
  this.thrusting = pack.thrusting;
}

Player.prototype.draw = function() {
  c.push();
  c.stroke('black')
  c.translate(this.pos.x, this.pos.y);
  c.rotate(this.angle);
  c.begin();
  c.from(10, 0);
  c.to(-10, -7);
  c.to(-10, 7);
  c.to(10, 0);
  if (this.thrusting) {
    c.from(-10, 0);
    c.to(-18, 0);
  }
  c.close();
  c.stroke()
  c.pop();
}

Player.prototype.drawHp = function() {
  c.fill('crimson');
  c.noStroke();
  c.rect(this.pos.x - 15, this.pos.y - 25, this.hp * 30 / this.maxhp, 4);
}
Player.List = {};