class Zombie{
    constructor(_scene, house) {
        this.atHouse = false;
        this.scene = _scene;
        this.house = house;
        const xPos = Math.floor(Math.random() * 1200)-120; 
        const yPos = -Math.floor(Math.random() * 300)-25; 
        this.zombie = this.scene.add.circle(xPos, yPos, 20, 0x06401e);
        this.scene.physics.add.existing(this.zombie);
        this.scene.physics.add.collider(this.house, this.zombie);
        this.dead = false;
    }
    update() {
        if (!this.atHouse) {
            this.scene.physics.moveToObject(this.zombie, this.house, 35);

            this.isColliding = this.zombie.body.touching;
            if (this.isColliding.down || this.isColliding.right || this.isColliding.left || this.isColliding.up) {
                this.atHouse = true;
                this.zombie.body.setVelocity(0,0);
            }
        }
        else {
           // Damage House

           this.die(); // Remove later!
        }
    }
    die() {
        if (this.dead)
            return;
        this.scene.zombiesLeft--;
        this.zombie.destroy();
        this.dead = true;
    }
}

export default Zombie;