import { Scene } from 'phaser';
import Scene1 from './Scene1';
class House {
    constructor(scene, image) {
        this.house = scene.add.image(400, 600, image).setScale(0.7);
        scene.physics.add.existing(this.house);
        this.scene = scene;
        
        this.health = 10;

        this.house.body.setImmovable(true);

        
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health <= 0)
            this.scene.gameOver = true;
    }
}

export default House;