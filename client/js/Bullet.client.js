// Client Side Bullet State
function Bullet(pack) {
  this.pos = pack.pos;
  this.id = pack.id;
  this.parent = pack.parent;
  this.index = 0;
  this.isDead = pack.isDead;
}

Bullet.prototype.draw = function() {
  c.fill('black');
  c.circle(this.pos.x, this.pos.y, 2);
}

// Bullet.List = [];