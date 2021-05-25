class House {
  constructor(scene, floor, wall) {
    // this.house = scene.add.image(400, 600, image).setScale(0.7);

    let wall1 = scene.add.tileSprite(400, 590, 342, 20, wall);
    let wall2 = scene.add.tileSprite(581, 500, 20, 200, wall);
    let wall3 = scene.add.tileSprite(219, 500, 20, 200, wall);
    let wall4 = scene.add.tileSprite(276, 390, 135, 20, wall);
    let wall5 = scene.add.tileSprite(524, 390, 135, 20, wall);

    this.house = [wall1, wall2, wall3, wall4, wall5];
    scene.add.tileSprite(400, 490, 342, 180, floor);

    this.house.forEach((h) => {
      scene.physics.add.existing(h);
      h.body.setImmovable(true);
    });

    this.scene = scene;

    this.health = 100;
  }

  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 0) this.scene.gameOver = true;
  }
}

export default House;
