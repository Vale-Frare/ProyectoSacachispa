let uiManager;
let soundManager;
let spaceKey;
let ZKey;
let loadingBar;
let mainMenu;
let spritesReptil = [];
let reptilPicked = localStorage.getItem('reptil');
let levelLoaded = 0;
let stadistics = {
    timer: 100,
    score: 0,
    lifes: 3,
}
let uiElements = {
    scoreText: null,
    lifesText: null,
    timerText: null
}
let levelsData = [
    {// Nivel 1
        spawn : { x: 0, y: 0},
        pickups : [],
        enemies: [],
        loadingProgress: 0,
    },
    {// Nivel 2
        spawn : { x: 0, y: 0},
        pickups : [],
        enemies: [],
        loadingProgress: 0,
    }
]
let boss = {
    colliders : [],
    timerAttack: 0,
    damage : {
        head: 0,
        leftHand: 0,
        rightHand: 0
    },
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
        broken: {left: false, right: false},
        enabled : false,
        side : 'left',
        target : {x: 0, y: 0}
    }
};
let timer = 0;
let timerEnemy1 = 0;
let enemy1RateOfFire = 4.5;
let timerEnemy2 = 0;
let enemy2RateOfFire = 4.5;
let timerEnemy3 = 0;
let enemy3RateOfFire = 4.5;
let camera1;
let layer;
let layerDoor;
let map;
let rockets = [];
let playerWeapons = {
    quantity: 3,
    equipped: 'pistol',
    side: 5,
    pistol: {
        textureKey: 'pistol',
        obj: null,
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
        points: [],
        damage: 5,
        ammo: -1,
        spread: 6,
        bulletsPerShot: 1, //Test
        rateOfFire: 1
    },
    shotgun: {
        textureKey: 'shotgun',
        obj: null,
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
        ],
        damage: 15,
        ammo: 20,
        ammoComplete: 20,
        spread: 12,
        bulletsPerShot: 5,
        rateOfFire: 2
    },
    uzi: {
        textureKey: 'uzi',
        obj: null,
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
        ],
        damage: 2,
        ammo: 150,
        ammoComplete: 150,
        spread: 12,
        bulletsPerShot: 1, //Test
        rateOfFire: 0.2
    }
};
let playerLoadedWeapons = [];
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
        audio: {
            disableWebAudio: true
        },
        pixelArt: true,
        scene: [Inicio, Cutscene1, Scene1, Scene2, Cutscene2, Fin, UiScene, SoundScene]
    };

    game = new Phaser.Game(config);
    window.focus();
    resizeGame();
    window.addEventListener('resize', resizeGame());
};