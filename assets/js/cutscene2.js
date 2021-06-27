class Cutscene2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Cutscene2' });
    }
    preload() {

    }

    create() {
        soundManager.stopAll();
        soundManager.playSound('transicion');
        uiElements.scoreText.visible = false;
        uiElements.lifesText.visible = false;
        uiElements.timerText.visible = false; 
        var scene = this.add.sprite(0, 0, 'cinematica2').setOrigin(0,0).setInteractive().on('pointerdown', () => {
            soundManager.stopSound('transicion');
            this.scene.start('inicio');  
            }
        );;
    }

    update() {   

    }
}