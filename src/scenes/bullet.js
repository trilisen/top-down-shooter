class Bullet extends Phaser.GameObjects.Sprite {
  constructor(scene, pointer, rotation, house, zombies) {
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

    zombies.forEach((zombie) => {
      scene.physics.add.collider(this.bullet, zombie.zombie, () => {
        this.bullet.destroy();
        zombie.takeDamage(1);
      });
    });
  }

  update() {
    if (this.bullet.y < 0 || this.bullet.y > 600 ) {
      this.bullet.destroy();
    }
  }
}

export default Bullet;
