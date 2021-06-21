class UiScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene', active: true });
    }
    preload() {
        this.load.image('loadingBar', 'assets/loadingBar.png');
        this.load.spritesheet('heartsHud', 'assets/heartsHud.png', {frameWidth: 39, frameHeight: 8});
    }

    create() {
        console.log("Cargo");
        uiElements.scoreText = this.add.text(10, 10, 'Score: 0', { fontFamily: 'tinyUnicode', fontSize: '80px' });
        uiElements.timerText = this.add.text(1700, 10, 'Timer: 100', { fontFamily: 'tinyUnicode', fontSize: '80px', align: 'right'});
        uiElements.lifesText = this.add.sprite(920, 30, 'heartsHud').setScale(5);
        this.initLoadingBar();
    }
    update() {   
        uiElements.scoreText.text = `Score: ${stadistics.score}`;
        uiElements.lifesText.setFrame(stadistics.lifes);
        uiElements.timerText.text = `Timer: ${Math.floor(stadistics.timer)}`;
    }
    
    initLoadingBar() {
        loadingBar = this.add.sprite(0, 0, 'loadingBar').setOrigin(0,0);
    }
}