class Bullet extends Phaser.GameObjects.Sprite {
  constructor(scene, pointer, rotation, house, zombies, currentGun) {
    let x = scene.player.x;
    let y = scene.player.y;
    super(scene, x, y, 'bullet');
    this.currentGun = currentGun;
    this.pointer = pointer;
    this.bullet = scene.physics.add.sprite(x, y, 'bullet');
    this.bullet.rotation = rotation;

    scene.physics.add.collider(this.bullet, house, () => {
      this.bullet.destroy();
    });
    scene.bullets.add(this);
    scene.physics.moveToObject(this.bullet, this.pointer, currentGun.speed);

    zombies.forEach((zombie) => {
      scene.physics.add.collider(this.bullet, zombie.zombie, () => {
        this.bullet.destroy();
        zombie.takeDamage(currentGun.damage);
      });
    });

    // Find a way to make a range for weapons
  }

  update() {
    if (this.bullet.y < 0 || this.bullet.y > 600) {
      this.bullet.destroy();
    }
  }

  die() {
    this.bullet.destroy();
  }
}

export default Bullet;
