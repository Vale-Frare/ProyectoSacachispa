class Fin extends Phaser.Scene {
    constructor() {
        super('fin');
    }

    preload() {

    }

    create() {
        this.add.sprite(0, 0, 'sky').setOrigin(0,0);

        let puntajefinal = this.add.text(920, 200, 'Score: ' + stadistics.score,  { fontFamily: 'tinyUnicode', fontSize: 100, color: '#000000' });

        let restartButton = this.add.text(920, 500, 'Restart', { fontFamily: 'tinyUnicode', fontSize: 70, color: '#000000' })
        .setInteractive()
        .on('pointerdown', () => this.scene.start('juego') );
    }

    update() {

    }
}