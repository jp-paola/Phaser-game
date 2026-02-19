export class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'menu' })
    }

    preload() {
        this.load.image('backgroundM', 'assets/MenuS.png');
        this.load.image('buttonPlay', 'assets/PLAY.png');

    }

    create() {

        this.add.image(400, 300, 'backgroundM');
        
        //Boton de Jugar

        this.buttonPlay = this.add.image(400,350, 'buttonPlay');

        this.buttonPlay.setInteractive({useHandCursor: true});

        this.buttonPlay.on ('pointerdown', ()=>{
            this.scene.start('game');
        });





    }





}