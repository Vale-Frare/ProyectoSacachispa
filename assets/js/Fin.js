class Fin extends Juego {
    constructor() {
        super('fin');
    }

    preload() {

    }

    create() {
        uiManager.fadeOut();
        soundManager.stopAll();
        this.add.sprite(0, 0, 'sky').setOrigin(0,0);

        let puntajefinal = this.add.text(920, 200, 'Score: ' + stadistics.score,  { fontFamily: 'tinyUnicode', fontSize: 100, color: '#000000' });

        let restartButton = this.add.text(920, 500, 'Restart', { fontFamily: 'tinyUnicode', fontSize: 70, color: '#000000' })
        .setInteractive()
        .on('pointerdown', () => {
            stadistics.lifes = 3;
            soundManager.stopAll();
            uiManager.fadeIn();
            this.scene.start('inicio');
        } );

        Phaser.Display.Align.In.Center(puntajefinal, this.add.zone(1920/2, 1080/2 - 250, 1920, 1080));
        Phaser.Display.Align.In.Center(restartButton, this.add.zone(1920/2, 1080/2, 1920, 1080));
    }

    update() {

    }
}