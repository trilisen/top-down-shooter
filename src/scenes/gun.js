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
    this.name = name;
    this.timeBetweenAttacks = timeBetweenAttacks;
    this.currentTimeBetweenAttacks = 0;
    this.unlocked = false;
    scene.guns.add(this);
    this.gun = scene.physics.add.sprite(x, y, name).setScale(size);
    this.priceText = scene.add
      .text(x - 20, y + 15, `${name}: ${cost}`)
      .setScale(0.8);
    console.log(this.unlocked);
    scene.physics.add.overlap(this.gun, scene.player, () => {
      if (scene.currentGun.name != this.name) {
        if (this.unlocked === false && scene.score >= cost) {
          scene.score -= cost;
          this.unlocked = true;
          this.priceText.text = 'Unlocked';
          scene.currentGun = this;
        } else if (this.unlocked === true) {
          scene.currentGun = this;
        }
      }
    });
  }
}

export default Gun;
