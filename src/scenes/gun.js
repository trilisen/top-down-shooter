class Gun extends Phaser.GameObjects.Sprite {
  constructor(scene, size, speed, range, x, y, name) {
    super(scene, x, y, name);
    this.speed = speed;
    this.range = range;
    scene.guns.add(this);
    this.gun = scene.physics.add.sprite(x, y, name).setScale(size);

    scene.physics.add.overlap(this.gun, scene.player, () => {
      scene.currentGun = this;
    });
  }
}

export default Gun;
