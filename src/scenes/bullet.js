class Bullet extends Phaser.GameObjects.Sprite {
  constructor(scene, pointer, rotation, house) {
    let x = scene.player.x;
    let y = scene.player.y;
    super(scene, x, y, 'bullet');
    this.bullet = scene.physics.add.sprite(x, y, 'bullet');
    this.bullet.rotation = rotation;
    
    scene.physics.add.collider(this.bullet, house, () => {
      this.bullet.destroy();
    });
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
