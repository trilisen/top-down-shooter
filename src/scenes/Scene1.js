import Phaser from 'phaser';
let house;
class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: 'Scene1' });
  }

  preload() {
    this.load.image('ground', '/src/assets/Ground_01.png');
    this.load.image('background', '/src/assets/Grass_03.png');
    this.load.image('house', '/src/assets/crate0_diffuse.png');
  }

  create() {
    this.speed = 250;
    this.add.tileSprite(400, 300, 800 * 2, 600 * 2, 'background').setScale(0.5);

    house = this.physics.add.image(400, 600, 'house').setScale(0.7);

    house.setImmovable(true);
    
    // this.player = this.add.rectangle(200,200,20,20, 0x000);
    this.player = this.add.circle(200, 200, 20, 0x000);
    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);

    this.physics.add.collider(house, this.player);

    this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  }

  update(delta) {
    let xVelocity = 0;
    let yVelocity = 0;

    if (this.key_D.isDown) {
    xVelocity += 1;
    }
    if (this.key_A.isDown) {
      xVelocity += -1;
    }
    if (this.key_W.isDown) {
      yVelocity += -1;
    }
    if (this.key_S.isDown) {
      yVelocity += 1;
    }

    // Adds velocity to player
    this.player.body.setVelocity(xVelocity*this.speed, yVelocity*this.speed);

    this.input.on('pointermove', function (pointer) {
      let cursor = pointer;
      let angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, cursor.x + this.cameras.main.scrollX, cursor.y + this.cameras.main.scrollY)
      this.player.rotation = angle;
    }, this);
  }
}

export default Scene1;
