export class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'menu' })
    }

    preload() {

    }

    create() {
        this.add.text(250, 200, 'MI NUEVO JUEGO', {
            fontSize: '40px',
            fill: '#ffffff'
        });



        //Boton de Jugar

        const boton = this.add.text(300, 320, 'PLAY', {
            fontSize: '32px',
            fill: '#ffff',
            backgroundColor: '#000000'

        });
        boton.setInteractive();

        boton.on('pointerdown', () => {
            this.scene.start('game');



        })



    }





}