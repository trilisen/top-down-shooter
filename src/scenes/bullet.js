class Bullet extends Phaser.GameObjects.Sprite {
  constructor(scene, pointer) {
    let x = scene.player.x;
    let y = scene.player.y;
    super(scene, x, y, 'bullet');
    this.bullet = scene.physics.add.sprite(x, y, 'bullet');
    // this.bullet.body.velocity.y = -250;
    // this.bullet.boddy.velocity.x = -250;
    scene.bullets.add(this);
    scene.physics.moveToObject(this.bullet, pointer, 400);
  }

  update() {
    if (this.y < 32) {
      this.destroy();
    }
  }
}

export default Bullet;
