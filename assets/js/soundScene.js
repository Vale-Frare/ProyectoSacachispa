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
        this.sound.get(sound).stop();
    }

    stopAll() {
        this.sound.stopAll();
    }
}