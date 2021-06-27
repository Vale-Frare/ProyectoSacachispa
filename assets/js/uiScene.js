let fade;
class UiScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene', active: true });
    }
    preload() {
        this.load.image('loadingBar', 'assets/loadingBar.png');
        this.load.spritesheet('heartsHud', 'assets/heartsHud.png', {frameWidth: 39, frameHeight: 8});
    }

    create() {
        fade = this.add.sprite(0, 0, 'fade').setOrigin(0,0);
        fade.alpha = 0;
        uiElements.scoreText = this.add.text(10, 10, 'Score: 0', { fontFamily: 'tinyUnicode', fontSize: '80px' }).setVisible(false);
        uiElements.timerText = this.add.text(1700, 10, 'Timer: 100', { fontFamily: 'tinyUnicode', fontSize: '80px', align: 'right'}).setVisible(false);
        uiElements.lifesText = this.add.sprite(960, 30, 'heartsHud').setScale(5).setVisible(false);
        
    }
    update() {   
        uiElements.scoreText.text = `Score: ${stadistics.score}`;
        uiElements.lifesText.setFrame(stadistics.lifes);
        uiElements.timerText.text = `Timer: ${Math.floor(stadistics.timer)}`;
    }
    
    fadeIn() {
        fade.alpha = 0;
        this.tweens.add({
            targets: fade,
            alpha: 1,
            duration: 300,
            ease: 'Power2'
          }, this);
    }

    fadeOut() {
        fade.alpha = 1;
        this.tweens.add({
            targets: fade,
            alpha: 0,
            duration: 300,
            ease: 'Power2'
          }, this);
    }

    secret() {
        let secret = this.add.sprite(920, 200, 'secret').setScale(3);
        Phaser.Display.Align.In.Center(secret, this.add.zone(1920/2, 1080/2 - 450, 1920, 1080));
        this.tweens.add({
            targets: secret,
            alpha: 0,
            duration: 6300,
            ease: 'Power2'
          }, this);
    }

}