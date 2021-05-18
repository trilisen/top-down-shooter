import Phaser from 'phaser';
import Zombie from './zombie';
import Bullet from './bullet';
let house;
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
    this.speed = 250;
    this.add.tileSprite(400, 300, 800 * 2, 600 * 2, 'background').setScale(0.5);

    house = this.physics.add.image(400, 600, 'house').setScale(0.7);
    house.setImmovable(true);

    this.player = this.add.circle(200, 200, 20, 0x000);
    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);

    this.physics.add.collider(house, this.player);

    this.bullets = this.add.group();
    // this.zombies = this.add.group();

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

    console.log(this.zombies);
    console.log(this.bullets);
    // this.physics.add.collider(this.bullets, this.zombies, (bullet, zombie) => {
    //   console.log('hej');
    //   bullet.destroy();
    //   zombie.die();
    // });
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
    // for (let i = 0; i < this.zombies.getChildren().length; i++) {
    //   let zombie = this.zombies.getChildren()[i];
    //   zombie.update();
    // }

    for (let i = 0; i < this.bullets.getChildren().length; i++) {
      let bullet = this.bullets.getChildren()[i];
      bullet.update();
    }
  }

  spawnNewWave() {
    this.zombies = [];
    for (let i = 0; i < 30; i++) {
      this.newZombie = new Zombie(this, house, this.bullets);
      console.log(this.newZombie);
      this.zombies.push(this.newZombie);
      // this.zombies.add(this.newZombie);
    }
    this.zombiesLeft = 30;
  }

  shootBullet(pointer) {
    this.bullet = new Bullet(this, pointer);
  }
}

export default Scene1;
