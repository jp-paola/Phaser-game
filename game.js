export class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'game' });
    }

    preload() {
        this.load.image('background', 'assets/background.png');

    }
    create() {

        this.add.image(400, 300, 'background');

        this.texto = this.add.text(400, 300, "Hola Phaser", {
            fontSize: '32px',
            color: '#ffffff'
        })

        this.velocidad = 2; 

    }

    update() {

        this.texto.x += this.velocidad; 
                if (this.texto.x > 800) {
            this.texto.x = -this.texto.width;
        }


    }
}
