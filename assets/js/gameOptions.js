console.log('carga');
let spaceKey;
let levelsData = [
    {// Nivel 1
        spawn : { x: 0, y: 0},
        objects : [],
        enemies: [],
    },
    {// Nivel 2
        spawn : { x: 0, y: 0},
        objects : []
    }
]
let boss = {
    spawn : {x: 0, y: 0},
    body : null,
    head : null,
    shoulderOffsetY: 0,
    elbowOffsetY: -30,
    handOffsetY: 0,
    handOffsetX: -80,
    leftArm : {
        shoulder : null,
        elbow : null,
        hand : null,
    },
    rightArm : {
        shoulder : null,
        elbow : null,
        hand : null,
    },
    target : {x: 400, y: 200},
    moving : true,
    punching: {
        enabled : false,
        side : 'left',
        target : {x: 0, y: 0}
    }
};
let camera1;
let layer;
let map;
let rockets = [];
let playerWeapons = {
    side: 5,
    pistol: {
        textureKey: 'pistol',
        rotation: [
            1.57,
            -1.57,
            2.356,
            0.785,
            3.141,
            0,
            -2.35,
            -0.78
        ],
        points: [
            {x: 25, y: 39},
            {x: 25, y: 2},
            {x: 3, y: 34},
            {x: 45, y: 34},
            {x: 5, y: 16},
            {x: 41, y: 16},
            {x: 5, y: 3},
            {x: 42, y: 3}
        ],
        damage: 5,
        ammo: -1,
        rateOfFire: 1
    },
    shotgun: {
        textureKey: 'shotgun',
        rotation: 0,
        point: {x: 0, y: 0},
        damage: 15,
        ammo: 20,
        rateOfFire: 2
    },
    uzi: {
        textureKey: 'uzi',
        rotation: 0,
        point: {x: 0, y: 0},
        damage: 2,
        ammo: 150,
        rateOfFire: 0.1
    }
};
let player, playerTorso, playerLegs, playerWeapon, platforms, cursors, score = 0, gameOver = false, scoreText, game, config,
    sounds = {}, resizeGame = function () {
        let canvas = document.querySelector('canvas');
        const {innerWidth, innerHeight} = window; //object destructuring
        //const innerWidth = window.innerWidth;
        //const innerHeight = window.innerHeight;

        const ratio = innerWidth / innerHeight;

        const gameRatio = game.config.width / game.config.height;

        if (ratio < gameRatio) {
            canvas.style.width = innerWidth + 'px';
            canvas.style.height = innerWidth / gameRatio + 'px';
        } else {
            canvas.style.width = innerHeight * gameRatio + 'px';
            canvas.style.height = innerHeight + 'px';
        }
    }, playSound = function (sound) {
        sound.play("");
    }, stopSound = function (sound) {
        sound.stop();
    };

let connectors = [];

window.onload = function () {
    console.log('onload');
    config = {
        type: Phaser.AUTO,
        width: 1920,
        height: 1080,
        soundOn: true,
        scale: {
            mode: Phaser.Scale.FIT,
            parent: 'phaser-example',
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 1920,
            height: 1080
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        pixelArt: true,
        scene: [Inicio, Scene1, Fin]
    };

    game = new Phaser.Game(config);
    window.focus();
    resizeGame();
    window.addEventListener('resize', resizeGame());
};