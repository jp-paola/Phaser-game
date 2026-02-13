export class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'game' });
    }

    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.spritesheet('idle', 'assets/dragon/idle_verde.png', {
            frameWidth: 32,
            frameHeight: 32

        });
        this.load.spritesheet('walk', 'assets/dragon/walk_verde.png', {
            frameWidth: 32,
            frameHeight: 32

        });

    }
    create() {

        this.add.image(400, 300, 'background');
        this.player = this.physics.add.sprite(400, 300, 'idle');
        this.player.setCollideWorldBounds(true);



        //animaciones
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('idle', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1


        });


        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('walk', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.player.play('idle');

        this.cursors = this.input.keyboard.createCursorKeys();

    }

    update() {

        const speed = 150;

        this.player.setVelocityX(0);
        //this.player.x +=5;

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-speed);

            this.player.setFlipX(true);

            if (this.player.anims.currentAnim.key !== 'walk') {
                this.player.play('walk');
            }


        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(speed);

            this.player.setFlipX(false);

            if (this.player.anims.currentAnim.key !== 'walk') {
                this.player.play('walk');
            }
        }

        else {
            if (this.player.anims.currentAnim.key !=='idle'){
                this.player.play('idle');
            }

        }





    }
}
