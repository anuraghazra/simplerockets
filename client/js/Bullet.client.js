// Client Side Bullet State
function Bullet(pack) {
  this.pos = pack.pos;
  this.angle = pack.angle;
  this.id = pack.id;
  this.parent = pack.parent;
  this.index = 0;
  this.isDead = pack.isDead;
}

Bullet.prototype.draw = function() {
  c.push();
  c.translate(this.pos.x, this.pos.y);
  c.rotate(this.angle);
  c.image(bulletImage, -5, -5, 10, 5)
  c.pop();
}