class UiScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene', active: true });
    }
    preload() {
        this.load.image('loadingBar', 'assets/loadingBar.png');
    }

    create() {
        console.log("Cargo");
        this.initLoadingBar();
        let info = this.add.text(724, 791, 'CARGANDO', { font: '48px Arial', fill: '#000000' });
    }
    update() {   
        
    }
    
    initLoadingBar() {
        loadingBar = this.add.sprite(0, 0, 'loadingBar').setOrigin(0,0);
    }
}