var door = new Phaser.Math.Vector2();
class Zombie {
  constructor(scene, house, speed, size, health, color) {
    this.atHouse = false;
    this.movingToDoor = true;
    this.scene = scene;
    this.house = house;
    this.health = health;
    this.speed = speed;
    this.size = size;
    door.x = 400;
    door.y = 400 - (30*this.size);

    const xPos = Math.floor(Math.random() * 1200) - 120;
    const yPos = -Math.floor(Math.random() * 300) - 25;
    this.zombie = this.scene.add.circle(xPos, yPos, 20, color).setScale(size);
    this.scene.physics.add.existing(this.zombie);

    for (let index = 1; index < this.house.house.length; index++) {
      this.scene.physics.add.collider(this.house.house[index], this.zombie);
    }

    

    this.scene.physics.add.collider(this.house.house[0], this.zombie, () => {
      this.atHouse = true;
      this.zombie.body.setVelocity(0, 0);
    });
    this.dead = false;
  }
  update() {
    if (this.dead) return;


    if (this.movingToDoor) {
      this.scene.physics.moveToObject(
        this.zombie,
        door,
        this.speed
      );
      if (Math.abs((this.zombie.body.x + (30 * this.size)) - door.x) < 30) {
        this.movingToDoor = false;
      }
    }
    else if (!this.atHouse) {
      this.scene.physics.moveToObject(
        this.zombie,
        this.house.house[0],
        this.speed
      );
    } else {
      // Damage House
      this.house.takeDamage(1);
    }
  }
  die() {
    if (this.dead) return;
    this.scene.zombiesLeft--;
    this.zombie.destroy();
    this.dead = true;
  }
  takeDamage(damage) {
    if (this.atHouse) this.zombie.body.setVelocity(0, 0);
    this.health -= damage;
    if (this.health <= 0) {
      this.scene.score += 100;
      this.die();
    }
  }
}

export default Zombie;
