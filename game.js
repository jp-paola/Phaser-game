export class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'game' });
    }

    preload() {

        //live-server

        this.load.image('background', 'assets/background.png');

        this.load.image('menuBtn', 'assets/MenuB.png');




        //Player
        this.load.spritesheet('idleS', 'assets/dragon/idle_verde.png', {
            frameWidth: 32,
            frameHeight: 32

        });
        this.load.spritesheet('walkS', 'assets/dragon/walk_verde.png', {
            frameWidth: 32,
            frameHeight: 32

        });

        this.load.spritesheet('jumpS', 'assets/dragon/jump_verde.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        //Villano

        this.load.spritesheet('idleVillan', 'assets/enemigo/idle_rojo.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('walkVillan', 'assets/enemigo/walk_rojo.png', {
            frameWidth: 32,
            frameHeight: 32
        });


        //Plataformas
        this.load.image('p1', 'assets/tilemap/Plataforma2.png');
        this.load.image('p2', 'assets/tilemap/Plataforma3.png');
        this.load.image('p3', 'assets/tilemap/Plataforma4.png');
        this.load.image('p4', 'assets/tilemap/P5.png');
        this.load.image('p5', 'assets/tilemap/p6.png');

        //monedas
        this.load.image('coin', 'assets/coin.png');

    }



    create() {

        this.add.image(400, 300, 'background');

        //creación del sprite PLAYER
        this.player = this.physics.add.sprite(100, 300, 'idleS');

        this.player.setBounce(0.4);//rebote
        this.player.setCollideWorldBounds(true);
        this.player.setSize(24, 26);
        this.player.setOffset(4, 6);

        //enemigo
        this.villan = this.physics.add.sprite(600, 300, 'walkVillan');

        this.villan.setCollideWorldBounds(true);
        this.villan.setSize(24, 26);
        this.villan.setOffset(4, 6);
        this.villan.setBounce(0.2);
        this.villan.setVelocityX(150);


        //Botones

        this.menuBtn = this.add.image(730, 30, 'menuBtn');
        this.menuBtn.setScrollFactor(0);
        this.menuBtn.setInteractive({ useHandCursor: true });


        this.botonMenu = this.add.text(700, 20, 'Menu', {
            fontSize: '24px',
            fill: "#ffff"

        });

        this.botonMenu.setInteractive();

        this.botonMenu.on('pointerdown', () => {
            this.scene.start('menu');
        });


        //PLATAFORMAS 

        this.plataforms = this.physics.add.staticGroup();

        this.plataforms.create(100, 585, 'p1');
        this.plataforms.create(700, 585, 'p1');
        this.plataforms.create(100, 200, 'p2');
        this.plataforms.create(400, 500, 'p3');
        this.plataforms.create(200, 555, 'p2');
        this.plataforms.create(600, 450, 'p4');
        this.plataforms.create(550, 425, 'p5');
        this.plataforms.create(700, 500, 'p3');
        this.plataforms.create(700, 355, 'p2');
        this.plataforms.create(740, 300, 'p5');
        this.plataforms.create(645, 250, 'p3');
        this.plataforms.create(450, 250, 'p2');



        //Creacion de grupo de monedas
        this.coins = this.physics.add.group({
            key: 'coin',
            repeat: 2,
            setXY: {
                x: 150,
                y: 0,
                stepX: 200
            }

        });

        // Recorro cada moneda del grupo
        this.coins.children.iterate((child) => {

            // Le agrego un pequeño rebote vertical
            child.setBounceY(0.2);

            // Evito que se salga de los límites del mundo
            child.setCollideWorldBounds(true);

        });


        //Score

        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '25px', fill: '#ffffff' });









        //COLISIONES       
        this.physics.add.collider(this.player, this.plataforms);
        this.physics.add.collider(this.coins, this.plataforms);

        this.physics.add.collider(this.villan, this.plataforms);

        this.physics.add.collider(
            this.player,
            this.villan,
            this.hitEnemy,
            null,
            this
        );

        //colision de jugador y monedas
        this.physics.add.overlap(
            this.player,
            this.coins,
            this.collectionCoin,
            null,
            this
        );








        //animaciones Player
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('idleS', { start: 0, end: 2 }),
            frameRate: 5,
            repeat: -1


        });


        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('walkS', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });






        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('jumpS', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 0


        });


        this.player.play('idle');



        //animaciones Villano

        this.anims.create({
            key: 'idleV',
            frames: this.anims.generateFrameNumbers('idleVillan', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'walkV',
            frames: this.anims.generateFrameNumbers('walkVillan', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });

        this.villan.play('walkV');

        this.cursors = this.input.keyboard.createCursorKeys();

    }







    update() {

        const speed = 150;

        this.player.setVelocityX(0);

        // MOVIMIENTO HORIZONTAL
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-speed);
            this.player.setFlipX(true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(speed);
            this.player.setFlipX(false);
        }

        // SALTO
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-400);
        }

        //SISTEMA DE ANIMACIONES (ORDEN DE PRIORIDAD)

        //  Aire tiene máxima prioridad
        if (!this.player.body.touching.down) {
            if (this.player.anims.currentAnim?.key !== 'jump') {
                this.player.anims.play('jump');
            }
        }

        //Movimiento en suelo
        else if (this.player.body.velocity.x !== 0) {
            this.player.anims.play('walk', true);
        }

        //Quieto
        else {
            this.player.anims.play('idle', true);
        }
    }








    //metodo de recoleccion de monedas
    collectionCoin(player, coins) {

        coins.disableBody(true, true);
        this.score += 10;

        this.scoreText.setText('Puntos:' + this.score);


    }


    //metodo de jugador toca a enemigo

    hitEnemy(player, villan){
        this.scene.restart();
    }




}
