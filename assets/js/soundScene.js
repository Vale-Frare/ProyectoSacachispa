class SoundScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SoundScene' });
    }
    preload() {

    }

    create() {
        this.sound.volume = 0.1;
    }

    update() {   

    }

    playSound(sound, looped = false) {
        this.sound.play(sound, {loop: looped});
    }

    stopSound(sound) {
        if (this.sound.get(sound).length > 0) {this.sound.get(sound).stop()}
    }

    stopAll() {
        this.sound.stopAll();
    }
}
