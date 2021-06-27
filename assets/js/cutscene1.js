class Cutscene1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Cutscene1' });
    }
    preload() {

    }

    create() {
        soundManager.playSound('transicion');
        uiManager.fadeOut();
        var scene = this.add.sprite(0, 0, 'cinematica1').setOrigin(0,0).setInteractive().on('pointerdown', () => {
            uiElements.scoreText.visible = true;
            uiElements.lifesText.visible = true;
            uiElements.timerText.visible = true; 
            soundManager.stopSound('transicion');
            uiManager.fadeIn();
            this.scene.start('Scene1');  
            }
        );;
    }

    update() {   

    }
}