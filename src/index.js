import Phaser from 'phaser';
import Scene1 from './scenes/Scene1';

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  scene: [Scene1],
};

var game = new Phaser.Game(config);
