class Inicio extends Phaser.Scene {
    constructor() {
        super('inicio');
    }

    preload() {
        this.load.image('logo', 'assets/logo.png');
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('spark', 'assets/spark.png');

        this.load.image('bossBody', 'assets/torso.png');
        this.load.image('node', 'assets/nodo.png');
        this.load.image('parte', 'assets/parte.png');
        this.load.image('cabeza', 'assets/cabeza.png');
        this.load.spritesheet('cohete', 'assets/Misiles.png', {frameWidth: 32, frameHeight: 11});

        //  Player
        this.load.spritesheet('playerTorso', 'assets/TorsoSpriteSheet.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('playerLegs', 'assets/piernasSpriteSheet.png', {frameWidth: 32, frameHeight: 32});

        //  Roboto
        this.load.spritesheet('robotoTorso', 'assets/Torso Roboto.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('robotoHead', 'assets/Cabeza Roboto.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('robotoShoulderL', 'assets/Hombros Roboto-L.png');
        this.load.image('robotoShoulderR', 'assets/Hombros Roboto-R.png');
        this.load.image('robotoElbowL', 'assets/Codos Roboto-L.png');
        this.load.image('robotoElbowR', 'assets/Codos Roboto-R.png');
        this.load.image('robotoHandL', 'assets/Puños Roboto-L.png');
        this.load.image('robotoHandR', 'assets/Puños Roboto-R.png');
        this.load.image('robotoConnector', 'assets/Conectores Roboto.png');
        this.load.spritesheet('explosion', 'assets/Explosion.png', {frameWidth: 32, frameHeight: 32});

        this.load.image('atlas1', './assets/maps/atlas1.png');
        this.load.image('mapafondo', './assets/maps/mapafondo.png');
        this.load.tilemapTiledJSON('level1', './assets/maps/level1.json');
    }

    create() {
        //  Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('playerLegs', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'playerLegs', frame: 7 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'jump',
            frames: [{ key: 'playerLegs', frame: 7 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('playerLegs', { start: 8, end: 14 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'leftTorso',
            frames: this.anims.generateFrameNumbers('playerTorso', { start: 13, end: 18 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idleTorso',
            frames: [{ key: 'playerTorso', frame: 21 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'rightTorso',
            frames: this.anims.generateFrameNumbers('playerTorso', { start: 20, end: 25 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'upLeftTorso',
            frames: this.anims.generateFrameNumbers('playerTorso', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'upTorso',
            frames: [{ key: 'playerTorso', frame: 6 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'upRightTorso',
            frames: this.anims.generateFrameNumbers('playerTorso', { start: 7, end: 12 }),
            frameRate: 10,
            repeat: -1
        });


        this.anims.create({
            key: 'downLeftTorso',
            frames: this.anims.generateFrameNumbers('playerTorso', { start: 26, end: 31 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'downTorso',
            frames: [{ key: 'playerTorso', frame: 32 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'downRightTorso',
            frames: this.anims.generateFrameNumbers('playerTorso', { start: 33, end: 38 }),
            frameRate: 10,
            repeat: -1
        });

        //  Roboto anims
        this.anims.create({
            key: 'robotoHead',
            frames: this.anims.generateFrameNumbers('robotoHead', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'robotoTorso',
            frames: this.anims.generateFrameNumbers('robotoTorso', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'misiles',
            frames: this.anims.generateFrameNumbers('cohete', { start: 0, end: 2 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'explosion',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 5 }),
            frameRate: 15,
            repeat: 0
        });

        this.scene.start('Scene1')

        var logo = this.add.image(400, 300, 'logo').setScale(0.26)
        logo.setInteractive()
        logo.on('pointerdown', () => this.scene.start('juego'));
    }
}