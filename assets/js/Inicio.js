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

        this.load.image('bossBody', 'assets/torso.png');
        this.load.image('node', 'assets/nodo.png');
        this.load.image('parte', 'assets/parte.png');
        this.load.image('cabeza', 'assets/cabeza.png');
        this.load.image('cohete', 'assets/cohete.png');

        //  Player
        this.load.spritesheet('playerTorso', 'assets/TorsoSpriteSheet.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('playerLegs', 'assets/piernasSpriteSheet.png', {frameWidth: 32, frameHeight: 32});
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

        this.scene.start('juego')

        var logo = this.add.image(400, 300, 'logo').setScale(0.26)
        logo.setInteractive()
        logo.on('pointerdown', () => this.scene.start('juego'));
    }
}