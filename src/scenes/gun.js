class Gun extends Phaser.GameObjects.Sprite {
  constructor(
    scene,
    size,
    speed,
    range,
    damage,
    x,
    y,
    name,
    timeBetweenAttacks,
    cost
  ) {
    super(scene, x, y, name);
    this.speed = speed;
    this.range = range;
    this.damage = damage;
    this.timeBetweenAttacks = timeBetweenAttacks;
    scene.guns.add(this);
    this.gun = scene.physics.add.sprite(x, y, name).setScale(size);
    scene.add.text(x - 20, y + 15, `${name}: ${cost}`).setScale(0.8);

    scene.physics.add.overlap(this.gun, scene.player, () => {
      if (scene.score >= cost && scene.currentGun != name) {
        scene.score -= cost;
        scene.currentGun = this;
        console.log(scene.currentGun);
      }
    });
  }
}

export default Gun;
