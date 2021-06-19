class Juego extends Phaser.Scene {
    createGround() {
        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup();

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        platforms.create(3400, 568, 'ground').setScale(2).refreshBody();
    }

    loadMap() {
        map = this.make.tilemap({ key: 'level1', tileWidth: 32, tileHeight:8 });
        var tileset = map.addTilesetImage('atlas1');
        var tilesetBackground = map.addTilesetImage('mapafondo');
        var layerBack = map.createLayer("background", tilesetBackground);
        layer = map.createLayer("platforms", tileset);

        var spritesSpawn = map.createFromObjects("objects", {
            name: 'spawn'
        });
        var spritesJefes = map.createFromObjects("objects", {
            name: 'jefe'
        });
        spritesSpawn[0].visible = false;
        levelsData[0].spawn = {x: spritesSpawn[0].x, y: spritesSpawn[0].y};
        spritesJefes[0].visible = false;
        boss.spawn = {x: spritesJefes[0].x, y: spritesJefes[0].y};

        layer.setCollisionByProperty({ collides: true });
    }

    createPlayer() {
        // The player and its settings
        player = this.add.container(100, 450);
        playerLegs = this.add.sprite(0, 0, 'playerlegs');
        playerTorso = this.add.sprite(0,0,'playerTorso');
        playerWeapon = this.add.sprite(0, 0, 'pistol', 5);
        player.add(playerLegs);
        player.add(playerTorso);
        player.add(playerWeapon);
        player.setSize(17, 32);
        this.physics.world.enable(player);

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.setCollideWorldBounds(true);
    }

    createBoss() {
        boss.body = this.physics.add.sprite(boss.spawn.x, boss.spawn.y, 'robotoTorso').setScale(5);
        boss.body.anims.play('robotoTorso', true);

        //  Conectores
        connectors.push(this.add.sprite(0, 0, 'robotoConnector').setOrigin(0,0.5));
        connectors.push(this.add.sprite(0, 0, 'robotoConnector').setOrigin(0,0.5));
        connectors.push(this.add.sprite(0, 0, 'robotoConnector').setOrigin(0,0.5));
        connectors.push(this.add.sprite(0, 0, 'robotoConnector').setOrigin(0,0.5));

        //  Brazo izquierdo
        boss.leftArm = {
            shoulder: this.physics.add.sprite(boss.body.x - 85, boss.body.y - (80 + boss.shoulderOffsetY), 'robotoShoulderL').setScale(2),
            elbow: this.physics.add.sprite(boss.body.x - 185, boss.body.y - (70 + boss.elbowOffsetY), 'robotoElbowL').setScale(2),
            hand: this.physics.add.sprite(boss.body.x - (285 + boss.handOffsetX), boss.body.y + (40 + boss.handOffsetY), 'robotoHandL').setScale(2)
        }

        //  Brazo derecho
        boss.rightArm = {
            shoulder: this.physics.add.sprite(boss.body.x + 85, boss.body.y - (80 + boss.shoulderOffsetY), 'robotoShoulderR').setScale(2),
            elbow: this.physics.add.sprite(boss.body.x + 185, boss.body.y - (70 + boss.elbowOffsetY), 'robotoElbowR').setScale(2),
            hand: this.physics.add.sprite(boss.body.x + (285 + boss.handOffsetX), boss.body.y + (40 + boss.handOffsetY), 'robotoHandR').setScale(2)
        }

        boss.head = this.physics.add.sprite(boss.body.x, boss.body.y - 110, 'robotoHead').setScale(3);
        boss.head.anims.play('robotoHead', true);
    }

    initColisiones() {
        //  Collide the player with the platforms
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(player, layer);
        this.physics.add.collider(player, boss.body);
        this.physics.add.collider(boss.rightArm.hand, platforms, this.hitFloor, null, this);
        this.physics.add.collider(boss.leftArm.hand, platforms, this.hitFloor, null, this);
        
    }

    initInputs() {
        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();
        spaceKey = this.input.keyboard.addKey('SPACE');
        var FKey = this.input.keyboard.addKey('F');
        FKey.on('down', function () {
            if (this.scale.isFullscreen)
            {
                this.scale.stopFullscreen();
            }
            else
            {
                this.scale.startFullscreen();
            }
        }, this);

        var ZKey = this.input.keyboard.addKey('Z');
        ZKey.on('down', function () {
            var bala = this.add.sprite(player.x - playerWeapons.pistol.points[playerWeapons.side].x, player.y - playerWeapons.pistol.points[playerWeapons.side].y , 'cohete');
        }, this);

        //  Prueba de colisiones
        var BKey = this.input.keyboard.addKey('B');
        BKey.on('down', function () {
            this.initColisiones();
        }, this);

        //  Prueba de ataque
        var CKey = this.input.keyboard.addKey('C');
        CKey.on('down', function () {
            this.bossAttack(0);
        }, this);

        //  Prueba de cohetes
        var VKey = this.input.keyboard.addKey('V');
        VKey.on('down', function () {
            this.evaluateAttackSide();
            if (boss.punching.side == 'left') {
                var rocket = {
                    obj : this.physics.add.sprite(boss.leftArm.shoulder.x, boss.leftArm.shoulder.y-20, 'cohete'),
                    particles : this.add.particles('spark'),
                    get emitter() {
                        this.particles.createEmitter({
                            follow: this.obj,
                            radial: false,
                            x: 100,
                            y: { start: 0, end: 560, steps: 256 },
                            lifespan: 2000,
                            quantity: 4,
                            gravityY: -50,
                            scale: { start: 2, end: 0, ease: 'Power3' },
                            blendMode: 'ADD'
                        })
                    }
                }
                rocket.emitter;
                rocket.obj.setGravity(0, -300);
                rocket.obj.setRotation(-1.57);
                rocket.obj.anims.play('misiles');
                rockets.push(rocket);
                this.physics.add.collider(player, rocket.obj, this.rocketHitPlayer, null, this);
                this.physics.add.collider(layer, rocket.obj, this.rocketHitPlatform, null, this);
            }else {
                var rocket = {
                    obj : this.physics.add.sprite(boss.rightArm.shoulder.x, boss.rightArm.shoulder.y-20, 'cohete'),
                    particles : this.add.particles('spark'),
                    get emitter() {
                        this.particles.createEmitter({
                            follow: this.obj,
                            radial: false,
                            x: 100,
                            y: { start: 0, end: 560, steps: 256 },
                            lifespan: 2000,
                            quantity: 4,
                            gravityY: -50,
                            scale: { start: 2, end: 0, ease: 'Power3' },
                            blendMode: 'ADD'
                        })
                    }
                }
                rocket.emitter;
                rocket.obj.setGravity(0, -300);
                rocket.obj.setRotation(-1.57);
                rocket.obj.anims.play('misiles');
                rockets.push(rocket);
                this.physics.add.collider(player, rocket.obj, this.rocketHitPlayer, null, this);
                this.physics.add.collider(layer, rocket.obj, this.rocketHitPlatform, null, this);
            }
        }, this);

        //  Mandar roboto a target
        this.input.on('pointerup', function (pointer) {
            if (pointer.leftButtonReleased()) {
                Juego.prototype.setTarget(
                    Phaser.Math.FloorTo(game.input.mousePointer.x),
                    Phaser.Math.FloorTo(game.input.mousePointer.y));
            }
        });

    }

    setTarget(targetX, targetY) {
        boss.target.x = targetX;
        boss.target.y = targetY;
    }

    moveToTarget(obj, target, speed, margin = 15, ret = false, marginY = 0) {
        var CONDITIONS = 0;

        if (Math.abs(obj.x - target.x) > margin) {
            if (obj.x < target.x) {
                obj.setVelocityX(speed);
            }
            if (obj.x > target.x) {
                obj.setVelocityX(-speed);
            }
        }else {
            obj.setVelocityX(0);
            if (ret) {
                CONDITIONS += 1;
            }
        }

        if (Math.abs(obj.y - target.y) > (margin - marginY)) {
            if (obj.y < target.y) {
                obj.setVelocityY(speed);
            }
            if (obj.y > target.y) {
                obj.setVelocityY(-speed);
            }
        }else {
            obj.setVelocityY(0);
            if (ret) {
                CONDITIONS += 1;
            }
        }

        if (CONDITIONS == 2) {
            return true;
        }
    }

    rocketToTarget(rocket, target) {
        //  Busca angulo de cohete a jugador
        var angle = Phaser.Math.Angle.BetweenPoints(rocket.obj, target);
        //  Redondeado para suavizar rotación
        if (Math.floor(angle*10) != Math.floor(rocket.obj.rotation*10)) {
            if (angle > rocket.obj.rotation) {
                //  Gira derecha
                rocket.obj.rotation += .05;
            }else {
                //  Gira izquierda
                rocket.obj.rotation -= .05;
            }
        }
        //  Avanza hacia el jugador
        this.physics.velocityFromRotation(rocket.obj.rotation, 200, rocket.obj.body.velocity);
    }

    evaluateAttackSide() {
        if (boss.body.x > player.body.x) {
            boss.punching.side = 'left';
            boss.leftArm.hand.rotation = Phaser.Math.Angle.BetweenPoints(boss.leftArm.hand, player.body) + -1.57;
        }else {
            boss.punching.side = 'right';
            boss.rightArm.hand.rotation = Phaser.Math.Angle.BetweenPoints(boss.rightArm.hand, player.body) + -1.57;
        }
    }

    //  Argumentos
    connectObjects(obj1, obj2, connector) {
        connector.x = obj1.x;
        connector.y = obj1.y;
        connector.rotation = Phaser.Math.Angle.BetweenPoints(obj1, obj2);
        connector.setScale((Phaser.Math.Distance.Between(obj1.x, obj1.y, obj2.x, obj2.y)+16)*.03, 1);
    }

    hitFloor() {
        boss.punching.enabled = false;
    }

    bossAttack(type) {
        switch (type) {
            case 0:
                //  Evalua lado a atacar
                this.evaluateAttackSide();
                //  Selecciona jugador
                boss.punching.target = {
                    x : player.body.x,
                    y: player.body.y 
                };
                //  Ataca
                boss.punching.enabled = true;
                break;
        
            default:
                break;
        }
    }

    rocketHitPlayer(player, rocket) {
        var explosion = this.add.sprite(rocket.x, rocket.y, 'explosion');
        explosion.anims.play('explosion', true);
        console.log("Golpe al jugador");
        rockets.forEach(function(rckt) {
            if (rckt.obj == rocket) {
                rockets.splice(rockets.indexOf(rckt), 1);
                rckt.obj.destroy();
                rckt.particles.destroy();
            }
        });
    }

    rocketHitPlatform(rocket, platform) {
        var explosion = this.add.sprite(rocket.x, rocket.y, 'explosion');
        explosion.anims.play('explosion', true);
        rockets.forEach(function(rckt) {
            if (rckt.obj == rocket) {
                rockets.splice(rockets.indexOf(rckt), 1);
                rckt.obj.destroy();
                rckt.particles.destroy();
            }
        });
    }

    initCamera() {
        camera1 = this.cameras.add(0, 0, 400, 300).setZoom(0.5);

        camera1.startFollow(player, false, 0.5, 0);

        camera1.width = 1920;
        camera1.height = 1080;
        camera1.scrollX = -100;
        camera1.scrollY = 360;
        //  435
        camera1.zoom = 3;
        camera1.setBackgroundColor('rgba(0, 0, 0, 1)');
    }

    initWeapons() {
       
    }

    loadLevelData(lvl) {
        player.x = levelsData[lvl-1].spawn.x;
        player.y = levelsData[lvl-1].spawn.y;
    }

}