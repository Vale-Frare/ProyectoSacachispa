console.log('carga');
let test = 0;
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
    body : null,
    head : null,
    leftArm : {
        shoulder : null,
        elbow : null,
        hand : null,
    },
    rigtArm : {
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
let player, playerTorso, playerLegs, platforms, cursors, score = 0, gameOver = false, scoreText, game, config,
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
        scene: [Inicio, Juego, Fin]
    };

    game = new Phaser.Game(config);
    window.focus();
    resizeGame();
    window.addEventListener('resize', resizeGame());
};