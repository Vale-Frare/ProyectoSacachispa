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

        //  Pickups
        this.load.image('heart', 'assets/vida.png');
        this.load.image('points1', 'assets/puntos1.png');
        this.load.image('points2', 'assets/puntos2.png');
        this.load.image('uziPickup', 'assets/uziPickup.png');
        this.load.image('shotgunPickup', 'assets/shotgunPickup.png');

        //  Bullets
        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('bulletEnemy', 'assets/bulletEnemy.png');

        this.load.image('bossBody', 'assets/torso.png');
        this.load.image('node', 'assets/nodo.png');
        this.load.image('parte', 'assets/parte.png');
        this.load.image('cabeza', 'assets/cabeza.png');
        this.load.spritesheet('cohete', 'assets/Misiles.png', {frameWidth: 32, frameHeight: 11});

        //  Player
        this.load.spritesheet('playerTorso', 'assets/TorsoSpriteSheet.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('playerLegs', 'assets/piernasSpriteSheet.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('playerMuerte', 'assets/muerte.png', {frameWidth: 32, frameHeight: 32});

        //  Weapons
        this.load.spritesheet('pistol', 'assets/pistol.png', {frameWidth: 65, frameHeight: 65});
        this.load.spritesheet('shotgun', 'assets/shotgun.png', {frameWidth: 65, frameHeight: 65});
        this.load.spritesheet('uzi', 'assets/uzi.png', {frameWidth: 65, frameHeight: 65});
        this.load.image('bullet', 'assets/bullete.png');

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

        //  Enemies
        this.load.spritesheet('enemy1', 'assets/enemy1.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('enemy2', 'assets/enemy2.png', {frameWidth: 12, frameHeight: 22});
        this.load.spritesheet('enemy3', 'assets/enemy3.png', {frameWidth: 17, frameHeight: 20});

        this.load.image('atlas1', './assets/maps/atlas1.png');
        this.load.image('mapafondo', './assets/maps/mapafondo.png');
        this.load.tilemapTiledJSON('level1', './assets/maps/level1.json');
    }

    create() {
        //  Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('playerLegs', { start: 0, end: 6 }),
            frameRate: 15,
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
            frameRate: 15
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('playerLegs', { start: 8, end: 14 }),
            frameRate: 15,
            repeat: -1
        });

        // Torso Center
        this.anims.create({
            key: 'leftTorso',
            frames: this.anims.generateFrameNumbers('playerTorso', { start: 13, end: 18 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'leftTorsoIdle',
            frames: [{ key: 'playerTorso', frame: 13 }],
            frameRate: 10
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
            key: 'rightTorsoIdle',
            frames: [{ key: 'playerTorso', frame: 20 }],
            frameRate: 20
        });

        //  Up Left Torso
        this.anims.create({
            key: 'upLeftTorso',
            frames: this.anims.generateFrameNumbers('playerTorso', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'upLeftTorsoIdle',
            frames: [{ key: 'playerTorso', frame: 0 }],
            frameRate: 20,
        });

        //  Up Torso
        this.anims.create({
            key: 'upTorso',
            frames: [{ key: 'playerTorso', frame: 6 }],
            frameRate: 20
        });

        //  Up Right Torso
        this.anims.create({
            key: 'upRightTorso',
            frames: this.anims.generateFrameNumbers('playerTorso', { start: 7, end: 12 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'upRightTorsoIdle',
            frames: [{ key: 'playerTorso', frame: 7 }],
            frameRate: 20,
        });

        // Down Left Torso
        this.anims.create({
            key: 'downLeftTorso',
            frames: this.anims.generateFrameNumbers('playerTorso', { start: 26, end: 31 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'downLeftTorsoIdle',
            frames: [{ key: 'playerTorso', frame: 26 }],
            frameRate: 20,
        });

        //  Down Torso
        this.anims.create({
            key: 'downTorso',
            frames: [{ key: 'playerTorso', frame: 32 }],
            frameRate: 20
        });

        //  Down Right Torso
        this.anims.create({
            key: 'downRightTorso',
            frames: this.anims.generateFrameNumbers('playerTorso', { start: 33, end: 38 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'downRightTorsoIdle',
            frames: [{ key: 'playerTorso', frame: 33 }],
            frameRate: 20,
        });

        //  Muerte anim
        this.anims.create({
            key: 'playerMuerte',
            frames: this.anims.generateFrameNumbers('playerMuerte', { start: 0, end: 5 }),
            frameRate: 20,
            repeat: 0
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

        //  Enemies anims
        this.anims.create({
            key: 'enemy1Left',
            frames: this.anims.generateFrameNumbers('enemy1', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'enemy1Right',
            frames: this.anims.generateFrameNumbers('enemy1', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'enemy2',
            frames: this.anims.generateFrameNumbers('enemy2', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'enemy3',
            frames: this.anims.generateFrameNumbers('enemy3', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.start('Scene1');
        levelLoaded = 0;

        var logo = this.add.image(400, 300, 'logo').setScale(0.26)
        logo.setInteractive()
        logo.on('pointerdown', () => this.scene.start('juego'));
    }
}