import {Game} from './game.js';
import { MenuScene } from './MenuScene.js';
import { GameOver } from './GameOver.js';




const config={
    type:Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#a5d2e4',
    scene:[Game, MenuScene,GameOver],
    physics:{
        default: 'arcade',
        arcade:{
            gravity:{y:800},
            debug: false
        }
    }
}

var game = new Phaser.Game(config);