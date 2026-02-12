import {Game} from './game.js';



const config={
    type:Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    scene:[Game],
    physics:{
        default: 'arcade',
        arcade:{
            gravity:{y:800},
            debug: false
        }
    }
}

var game = new Phaser.Game(config);