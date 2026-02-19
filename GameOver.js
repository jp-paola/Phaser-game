export class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'gameOver' });
    }

    preload() {
        this.load.image('GameBg', 'assets/GameOver.png');

    }
    create() {

        this.add.image(400, 300, 'GameBg');

        const restartBtn = this.add.text(400, 400, 'Volver a jugar', {
            fontSize: '28px',
            backgroundColor: '#000000',

        });
        restartBtn.setInteractive();
        restartBtn.on('pointerdown', () => {
            this.scene.start('game');
        });

    }
    update() {

    }
}