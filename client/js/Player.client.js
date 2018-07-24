// Client Side Player State
function Player(pack) {
  this.pos = pack.pos;
  this.name = pack.name;
  this.id = pack.id;
  this.hp = pack.hp;
  this.angle = pack.angle;
  this.maxhp = pack.maxhp;
  this.score = pack.score;
  this.thrusting = pack.thrusting;
  this.shooting = pack.shooting;
  this.sprite = new Sprite({
    img: rocketImage,
    x: 0, y: 0,
    cols: 17,
    ticksPerFrame: 2,
    resizeBy: 3
  });

  this.timer = null;

  this.sprite.update();

  this.particleSystem = new ParticleSystem(this.pos.x, this.pos.y, smokeImage);

}

Player.prototype.draw = function () {
  let self = this;
  if (this.shooting) {
    if (self.timer == null) {
      self.timer = window.setInterval(function () {
        self.sprite.update();
        if (self.sprite.frameIndex >= self.sprite.cols - 1) {
          clearInterval(self.timer);
          self.timer = null;
          self.sprite.tickCount = 2;
        }
      }, 20);
    }
  }
  c.push();
  c.translate(this.pos.x, this.pos.y);
  c.rotate(this.angle);
  c.image(
    this.sprite.img,
    this.sprite.sx, this.sprite.sy,
    this.sprite.sw, this.sprite.sh,
    -this.sprite.dw/2, -this.sprite.dh/2, //x, y
    this.sprite.dw, this.sprite.dh
  )
  c.pop();

  this.particleSystem.origin.x = this.pos.x;
  this.particleSystem.origin.y = this.pos.y;
  for (let i = 0; i < 1; i++) {
    this.particleSystem.addParticle();
  }
  this.particleSystem.update(this.angle);
}

Player.prototype.drawHp = function () {
  c.fill('crimson');
  c.noStroke();
  c.rect(this.pos.x - 15, this.pos.y - 40, this.hp * 30 / this.maxhp, 4);
  
  // draw player names
  c.textSize(10);
  c.textAlign(CENTER);
  c.text(this.name, this.pos.x, this.pos.y - 45);
}