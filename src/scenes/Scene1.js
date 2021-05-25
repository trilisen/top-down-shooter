import Phaser from 'phaser';
import Zombie from './zombie';
import Bullet from './bullet';
import House from './house';
import Gun from './gun';
let house;
let currentWave = 0;
let lastWaveAmount = 4;
class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: 'Scene1' });
  }

  preload() {
    this.load.image('ground', 'assets/Ground_01.png');
    this.load.image('background', 'assets/Grass_03.png');
    this.load.image('house', 'assets/crate0_diffuse.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('wall', 'assets/wall.jpg');
    this.load.image('floor', 'assets/floor.jpg');
    this.load.image('basicGun', 'assets/small_gun.png');
    this.load.image('shotgun', 'assets/Shotgun.png');
    this.load.image('rifle', 'assets/rifle.png');
  }

  create() {
    this.score = 0;

    this.gameOver = false;
    this.speed = 250;

    this.add.tileSprite(400, 300, 800 * 2, 600 * 2, 'background').setScale(0.5);

    house = new House(this, 'floor', 'wall');

    this.player = this.add.circle(200, 200, 20, 0x000);
    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);

    this.physics.add.collider(house.house, this.player);

    this.guns = this.add.group();

    this.basicGun = new Gun(this, 1, 400, 1000, 1, 270, 430, 'basicGun', 40, 0);
    this.shotgun = new Gun(this, 0.15, 400, 100, 3, 270, 500, 'shotgun', 20, 3000);
    this.rifle = new Gun(this, .7, 400, 1000, 3, 505, 430, 'rifle', 10, 8000);

    this.currentGun = this.basicGun;

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
    this.endScoreText = this.add
      .text(250, 300)
      .setScale(1.75)
      .setVisible(false);
    this.scoreText = this.add.text(0, 0).setScale(1.75);
  }
  update(delta) {
    if (this.gameOver) {
      this.player.body.setVelocity(0, 0);

      this.gameOverText.setVisible(true);
      this.endScoreText.setVisible(true);
      this.endScoreText.text = `You made it to Wave: ${currentWave}`;
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

    if (this.currentGun.currentTimeBetweenAttacks > 0) {
      this.currentGun.currentTimeBetweenAttacks -= 1;
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
        size *= 2.5;
        health *= 5;
      }

      this.newZombie = new Zombie(this, house, speed, size, health, color);
      this.zombies.push(this.newZombie);
    }
    this.zombiesLeft = wave;
    lastWaveAmount = waveAmount;
  }

shootBullet(pointer) {
  if (this.currentGun.currentTimeBetweenAttacks > 0) 
    return;

  this.currentGun.currentTimeBetweenAttacks = this.currentGun.timeBetweenAttacks;
  this.bullet = new Bullet(
    this,
    pointer,
    this.player.rotation,
    house.house,
    this.zombies,
    this.currentGun
  );
  // setTimeout(() => {
  //   this.bullet.die();
  // }, this.currentGun.range);
  console
  }
}

export default Scene1;
