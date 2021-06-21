class Scene1 extends Juego {
    constructor() {
        super("Scene1");
    }
    create() {
        //this.initLoadingBar();
        this.createGround();
        this.loadMap();
        this.createPlayer();
        this.createBoss();

        this.initColisiones();
        this.initInputs();
        this.initCamera();

        this.loadLevelData(1);
        this.scene.stop('UIScene');

        boss.target = levelsData[0].spawn
    }
    update(time, delta) {   
        if (gameOver) {
            return;
        }

        if (spaceKey.isDown) {
            if (player.body.onFloor()) {
                player.body.setVelocityY(-180);
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

        if (boss.moving) {
            this.moveToTarget(boss.body, boss.target, 80, 250, false, 240);
            this.moveToTarget(boss.leftArm.shoulder, {
                x: boss.body.x - 85, 
                y: boss.body.y - (80 + boss.shoulderOffsetY)
            }, 80, 5)
            this.moveToTarget(boss.leftArm.elbow, {
                x: boss.body.x - 185, 
                y: boss.body.y - (70 + boss.elbowOffsetY)
            }, 80, 5)
            this.moveToTarget(boss.rightArm.shoulder, {
                x: boss.body.x + 85, 
                y: boss.body.y - (80 + boss.shoulderOffsetY)
            }, 80, 5)
            this.moveToTarget(boss.rightArm.elbow, {
                x: boss.body.x + 185, 
                y: boss.body.y - (70 + boss.elbowOffsetY)
            }, 80, 5)
            this.moveToTarget(boss.head, {
                x: boss.body.x, 
                y: boss.body.y - 110
            }, 80, 5)
        }

        if (!boss.punching.enabled) {
            this.moveToTarget(boss.rightArm.hand, {
                x: boss.body.x + (285 + boss.handOffsetX), 
                y: boss.body.y + (40 + boss.handOffsetY)
            }, 80, 15)
            boss.rightArm.hand.rotation = 0;
            this.moveToTarget(boss.leftArm.hand, {
                x: boss.body.x - (285 + boss.handOffsetX), 
                y: boss.body.y + (40 + boss.handOffsetY)
            }, 80, 15)
            boss.leftArm.hand.rotation = 0;
        }else {
            if (boss.punching.side == 'left') {
                this.moveToTarget(boss.rightArm.hand, {
                    x: boss.body.x + 285, 
                    y: boss.body.y + 40
                }, 40, 5)
                if (this.moveToTarget(boss.leftArm.hand, {
                    x: boss.punching.target.x, 
                    y: boss.punching.target.y
                }, 490, 15, true)) { this.hitFloor(); }
            }else {
                if (this.moveToTarget(boss.rightArm.hand, {
                    x: boss.punching.target.x, 
                    y: boss.punching.target.ys
                }, 490, 15, true)) { this.hitFloor(); }
                this.moveToTarget(boss.leftArm.hand, {
                    x: boss.body.x - 285, 
                    y: boss.body.y + 40
                }, 40, 5)
            }
        }
        //player.rotation = Phaser.Math.Angle.BetweenPoints(player, boss.body)
        this.connectObjects(boss.rightArm.shoulder, boss.rightArm.elbow, connectors[0]);
        this.connectObjects(boss.rightArm.elbow, boss.rightArm.hand, connectors[1]);

        this.connectObjects(boss.leftArm.shoulder, boss.leftArm.elbow, connectors[2]);
        this.connectObjects(boss.leftArm.elbow, boss.leftArm.hand, connectors[3]);

        //  Enemies AI
        levelsData[0].enemies.forEach(enemy => {
            if (enemy.texture.key == 'enemy1') {
                if (Math.abs(enemy.body.x - player.body.x) > 100) {
                    if(enemy.body.x > player.body.x) {
                        enemy.body.setVelocityX(-50);
                        enemy.anims.play('enemy1Left', true);
                    }else if(enemy.body.x < player.body.x) {
                        enemy.body.setVelocityX(50);
                        enemy.anims.play('enemy1Right', true);
                    }
                }else {
                    enemy.body.setVelocityX(0);
                    enemy.anims.stop();
                }
            } 
        });

        rockets.forEach(rocket => this.rocketToTarget(rocket, player));

        boss.target = {x:player.body.x, y: 830};
        playerLoadedWeapons.forEach(function(weapon) {
            weapon.obj.setFrame(playerWeapons.side);
            if (playerWeapons.equipped == weapon.textureKey) {
                weapon.obj.setVisible(true);
            }else {
                weapon.obj.setVisible(false);
            }
        });
        timer = Phaser.Math.Clamp(timer + delta/200, 0, 5);
        if (ZKey.isDown) {
            this.shotWeapon();
        }
    }
}