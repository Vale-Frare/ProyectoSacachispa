class Scene1 extends Juego {
    constructor() {
        super("Scene1");
    }
    create() {
        uiManager.fadeOut();
        soundManager.stopAll();
        this.resetEverything();
        soundManager.playSound('nivel1', true);

        this.createGround();
        this.loadMap();
        this.createPlayer();
        this.regenPickups();
        //this.createBoss();

        this.initColisiones();
        this.initInputs();
        this.initCamera(320,0,0,1920,1080);

        this.loadLevelData(1);
    }
    update(time, delta) {   
        if (stadistics.timer <= 0) {playerTorso.anims.play('playerMuerte', true);gameOver=true};
        if (!gameOver) {
            playerLoadedWeapons.forEach(weapon => {
                if (weapon.ammo <= 0 && weapon.ammo != -1) {
                    weapon.ammo = playerWeapons[weapon.textureKey].ammoComplete;
                    playerWeapons.equipped = 'pistol';
                }
            });
            stadistics.timer -= delta/1200;
            if (spaceKey.isDown) {
                if (player.body.onFloor()) {
                    player.body.setVelocityY(-180);
                    soundManager.playSound('jump');
                }
            }

            if (cursors.left.isDown) {
                player.body.setVelocityX(-160);
            }
            else {
                if (cursors.right.isDown) {
                    player.body.setVelocityX(160);
                }   
                else {
                    player.body.setVelocityX(0);
                }
            }

            if (player.body.onFloor()) {
                if (cursors.left.isDown) {
                    playerLegs.anims.play('left', true); 
                }
                else {
                    if (cursors.right.isDown) {
                        playerLegs.anims.play('right', true);
                    }   
                    else {
                        playerLegs.anims.play('turn');
                        playerTorso.anims.stop();
                    }
                }
            }else {
                playerLegs.anims.stop();
            }

            if (cursors.up.isDown) {
                if (player.body.onFloor()) {
                    if (cursors.left.isDown) {
                        playerTorso.anims.play('upLeftTorso', true);
                        playerWeapons.side = 6;
                    }else if (cursors.right.isDown) {
                        playerTorso.anims.play('upRightTorso', true);
                        playerWeapons.side = 7;
                    }else {
                        playerTorso.anims.play('upTorso', true);
                        playerWeapons.side = 1;
                    }
                }else {
                    if (cursors.left.isDown) {
                        playerTorso.anims.play('upLeftTorsoIdle', true);
                        playerWeapons.side = 6;
                    }else if (cursors.right.isDown) {
                        playerTorso.anims.play('upRightTorsoIdle', true);
                        playerWeapons.side = 7;
                    }else {
                        playerTorso.anims.play('upTorso', true);
                        playerWeapons.side = 1;
                    }
                }
            }else {
                if (cursors.down.isDown) {
                    if (player.body.onFloor()) {
                        if (cursors.left.isDown) {
                            playerTorso.anims.play('downLeftTorso', true);
                            playerWeapons.side = 2;
                        }else if (cursors.right.isDown) {
                            playerTorso.anims.play('downRightTorso', true);
                            playerWeapons.side = 3;
                        }else {
                            playerTorso.anims.play('downTorso', true);
                            playerWeapons.side = 0;
                        }
                    }else {
                        if (cursors.left.isDown) {
                            playerTorso.anims.play('downLeftTorsoIdle', true);
                            playerWeapons.side = 2;
                        }else if (cursors.right.isDown) {
                            playerTorso.anims.play('downRightTorsoIdle', true);
                            playerWeapons.side = 3;
                        }else {
                            playerTorso.anims.play('downTorso', true);
                            playerWeapons.side = 0;
                        }
                    }
                }
                else {
                    if (player.body.onFloor()) {
                        if (cursors.left.isDown) {
                            playerTorso.anims.play('leftTorso', true);
                            playerWeapons.side = 4;
                        }
                        else if (cursors.right.isDown) {
                            playerTorso.anims.play('rightTorso', true);
                            playerWeapons.side = 5;
                        }
                    }else {
                        if (cursors.left.isDown) {
                            playerTorso.anims.play('leftTorsoIdle', true);
                            playerWeapons.side = 4;
                        }
                        else if (cursors.right.isDown) {
                            playerTorso.anims.play('rightTorsoIdle', true);
                            playerWeapons.side = 5;
                        }
                    }
                }
            }
            if (ZKey.isDown) {
                this.shotWeapon();
            }
        }else {
            player.body.setVelocityX(0);
            playerLoadedWeapons.forEach(weapon => {
                weapon.obj.x = 2000;
            });
            playerLegs.anims.play('turn', true);
            playerLegs.anims.stop();
            if (playerTorso.anims.getProgress() == 1) {
                soundManager.playSound('death');
                soundManager.stopSound('nivel1');
                uiManager.fadeIn();
                if (stadistics.lifes <= 0) {
                    this.scene.start('fin');
                }else {
                    this.scene.restart();
                }
            }
        }

        //  Enemies AI
        if (!gameOver) {
            levelsData[0].enemies.forEach(enemy => {
                if (enemy.texture.key === 'enemy1') {
                    if (Math.abs(enemy.body.x - player.body.x) > 100) {
                        if(enemy.body.x > player.body.x) {
                            enemy.body.setVelocityX(-50);
                            enemy.anims.play('enemy1Left', true);
                        }else if(enemy.body.x < player.body.x) {
                            enemy.body.setVelocityX(50);
                            enemy.anims.play('enemy1Right', true);
                        }
                    }else {
                        if(enemy.body.x > player.body.x) {
                            this.shotEnemy(enemy, 3.141, -11, -10, 0);
                            enemy.anims.play('enemy1Left', true);
                        }else if(enemy.body.x < player.body.x) {
                            this.shotEnemy(enemy, 0, 11, -10, 0);
                            enemy.anims.play('enemy1Right', true);
                        }
                        enemy.body.setVelocityX(0);
                        enemy.anims.stop();
                    }
                }else if (enemy.texture.key === 'enemy2') {
                    if (Math.abs(enemy.body.x - player.body.x) < 30) {
                        this.shotEnemy(enemy, 1.570, 0, 5, 1);
                        enemy.anims.play('enemy2', true);
                    }
                }else if (enemy.texture.key === 'enemy3') {
                    if (Math.abs(enemy.body.x - player.body.x) < 100) {
                        if(enemy.body.x > player.body.x) {
                            this.shotEnemy(enemy, 3.141, -11, -2, 2);
                            enemy.anims.play('enemy3', true);
                        }
                    }
                }
            });
        }else {
            levelsData[0].enemies.forEach(enemy => {
                enemy.body.setVelocityX(0);
                enemy.anims.stop();
            });
        }
        
        playerLoadedWeapons.forEach(function(weapon) {
            weapon.obj.setFrame(playerWeapons.side);
            if (playerWeapons.equipped == weapon.textureKey) {
                weapon.obj.setVisible(true);
            }else {
                weapon.obj.setVisible(false);
            }
        });
        timer = Phaser.Math.Clamp(timer + delta/200, 0, 5);
        timerEnemy1 = Phaser.Math.Clamp(timerEnemy1 + delta/200, 0, 200);
        timerEnemy2 = Phaser.Math.Clamp(timerEnemy2 + delta/200, 0, 200);
        timerEnemy3 = Phaser.Math.Clamp(timerEnemy3 + delta/200, 0, 200);
    }
}