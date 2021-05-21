class Zombie {
  constructor(scene, house, speed, size, health, color) {
    this.atHouse = false;
    this.scene = scene;
    this.house = house;
    this.health = health;
    this.speed = speed;

    const xPos = Math.floor(Math.random() * 1200) - 120;
    const yPos = -Math.floor(Math.random() * 300) - 25;
    this.zombie = this.scene.add.circle(xPos, yPos, 20, color).setScale(size);
    this.scene.physics.add.existing(this.zombie);
    this.scene.physics.add.collider(this.house, this.zombie, () => {
      this.atHouse = true;
      this.zombie.body.setVelocity(0,0);
    });
    this.dead = false;
  }
  update() {
    if (this.dead)
      return;
    if (!this.atHouse) {
      this.scene.physics.moveToObject(this.zombie, this.house, this.speed);
    } else {
      // Damage House

    }
  }
  die() {
    if (this.dead) return;
    this.scene.zombiesLeft--;
    this.zombie.destroy();
    this.dead = true;
  }
  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 0)
      this.die();
  }
}

export default Zombie;
