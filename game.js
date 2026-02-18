export class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'game' });
    }

    preload() {

        //live-server

        this.load.image('background', 'assets/background.png');
        this.load.spritesheet('idle', 'assets/dragon/idle_verde.png', {
            frameWidth: 32,
            frameHeight: 32

        });
        this.load.spritesheet('walk', 'assets/dragon/walk_verde.png', {
            frameWidth: 32,
            frameHeight: 32

        });

        this.load.spritesheet('jump', 'assets/dragon/jump_verde.png',{
            frameWidth: 32,
            frameHeight:32
        });

        this.load.image('p1', 'assets/tilemap/Plataforma1.png');
        this.load.image('p2', 'assets/tilemap/Plataforma2.png');

        //monedas
        this.load.image('coin', 'assets/coin.png');

    }



    create() {

        this.add.image(400, 300, 'background');

        //creación del sprite PLAYER
        this.player = this.physics.add.sprite(100, 300, 'idle');

        this.player.setBounce(0.4);//rebote
        this.player.setCollideWorldBounds(true);
        this.player.setSize(24, 26);
        this.player.setOffset(4, 6);


        //Botones
        this.botonMenu = this.add.text(650, 20, 'Menu',{
            fontSize: '24px',
            fill:"#ffff",
            backgroundColor: '#000000'
        });

        this.botonMenu.setInteractive();

        this.botonMenu.on('pointerdown', () =>{
            this.scene.start('menu');
        });


        //PLATAFORMAS 

        this.plataforms = this.physics.add.staticGroup();

        this.plataforms.create(200, 590, 'p2');
        //this.plataforms.create(600, 590, 'p2');


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

        //colision de jugador y monedas
        this.physics.add.overlap(
            this.player,
            this.coins,
            this.collectionCoin,
            null,
            this
        );








        //animaciones
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('idle', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1


        });


        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('walk', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });



        


        this.anims.create({
            key:'jump',
            frames: this.anims.generateFrameNumbers('jump', {start:0, end:3}),
            frameRate: 10,
            repeat:0


        });


        this.player.play('idle');

        this.cursors = this.input.keyboard.createCursorKeys();

    }







    update() {

        const speed = 150;

        this.player.setVelocityX(0);
        //this.player.x +=5;

        //izquierda
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-speed);

            this.player.setFlipX(true);
            this.player.anims.play('walk',true);



        //derecha
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(speed);

            this.player.setFlipX(false);
            this.player.anims.play('walk',true);


        }

        else if (this.cursors.up.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-300);
            this.player.anims.play('jump', true);
        }


        //estatico
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




}
