import Phaser from 'phaser';
import Zombie from './zombie';
import Bullet from './bullet';
import House from './house';
let house;
let currentWave = 0;
let lastWaveAmount = 4;
class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: 'Scene1' });
  }

  preload() {
    this.load.image('ground', '/src/assets/Ground_01.png');
    this.load.image('background', '/src/assets/Grass_03.png');
    this.load.image('house', '/src/assets/crate0_diffuse.png');
    this.load.image('bullet', '/src/assets/bullet.png');
  }

  create() {
    this.score = 0;

    this.gameOver = false;
    this.speed = 250;
    this.add.tileSprite(400, 300, 800 * 2, 600 * 2, 'background').setScale(0.5);

    // house = this.physics.add.image(400, 600, 'house').setScale(0.7);
    //

    house = new House(this, 'house', this.player);

    this.player = this.add.circle(200, 200, 20, 0x000);
    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);

    this.physics.add.collider(house.house, this.player);

    this.bullets = this.add.group();

    this.input.on(
      'pointerdown',
      (pointer) => {
        this.shootBullet(pointer);
      },
      this
    );

    this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.key_K = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
    this.spawnNewWave();
    this.waveText = this.add.text(0, 575, 'Wave: 1').setScale(2);

    this.gameOverText = this.add
      .text(250, 250, 'GAME OVER')
      .setScale(4)
      .setVisible(false);
    this.scoreText = this.add
      .text(250, 300, '')
      .setScale(1.75)
      .setVisible(false);
  }
  update(delta) {
    if (this.gameOver) {
      this.player.body.setVelocity(0, 0);

      this.gameOverText.setVisible(true);
      this.scoreText.setVisible(true);
      this.scoreText.text = `You made it to Wave: ${currentWave}`;
      return;
    }
    this.waveText.text = `Wave: ${currentWave}`;
    this.scoreText.text = `Money: ${this.score}`;

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
    if (yVelocity !== 0 && xVelocity !== 0) {
      yVelocity /= 1.33;
      xVelocity /= 1.33;
    }

    // Adds velocity to player
    this.player.body.setVelocity(
      xVelocity * this.speed,
      yVelocity * this.speed
    );

    this.input.on(
      'pointermove',
      function (pointer) {
        let cursor = pointer;
        let angle = Phaser.Math.Angle.Between(
          this.player.x,
          this.player.y,
          cursor.x + this.cameras.main.scrollX,
          cursor.y + this.cameras.main.scrollY
        );
        this.player.rotation = angle;
      },
      this
    );

    if (this.zombiesLeft <= 0) this.spawnNewWave();

    this.zombies.forEach((zombie) => {
      zombie.update();
    });

    for (let i = 0; i < this.bullets.getChildren().length; i++) {
      let bullet = this.bullets.getChildren()[i];
      bullet.update();
    }
  }

  spawnNewWave() {
    currentWave++;

    let waveAmount = lastWaveAmount * 1.2;
    let wave = Math.floor(waveAmount);

    this.zombies = [];
    for (let i = 0; i < wave; i++) {
      let color = 0x17611a;
      let size = 1;
      let health = 3;
      let speed = 35;

      // Different types of zombies
      if (Number.isInteger(i / 5) && i !== 0) {
        color = 0x104212;
        size *= 2;
        health *= 2;
        speed *= 0.75;
      } else if (Number.isInteger(i / 8) && i !== 0) {
        color = 0x1d7821;
        speed *= 5;
        health *= 0.5;
      } else if (Number.isInteger(i / 14) && i !== 0) {
        color = 0x1d7821;
        size *= 3;
        health *= 5;
      }

      this.newZombie = new Zombie(this, house, speed, size, health, color);
      this.zombies.push(this.newZombie);
    }
    this.zombiesLeft = wave;
    lastWaveAmount = waveAmount;
  }

  shootBullet(pointer) {
    this.bullet = new Bullet(
      this,
      pointer,
      this.player.rotation,
      house.house,
      this.zombies
    );
  }
}

export default Scene1;
