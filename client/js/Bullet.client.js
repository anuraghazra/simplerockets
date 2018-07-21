// Client Side Bullet State
function Bullet(pack) {
  this.pos = pack.pos;
  this.id = pack.id;
  this.owner = pack.owner;
  this.index = 0;
  this.isDead = false;
}

Bullet.prototype.draw = function() {
  c.fill('black');
  c.circle(this.pos.x, this.pos.y, 2);
}

Bullet.List = [];