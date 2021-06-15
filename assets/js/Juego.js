class Juego extends Phaser.Scene {
    constructor() {
        super('juego');
    }

    preload() {
        this.load.image('atlas1', './assets/maps/atlas1.png');
        this.load.image('mapafondo', './assets/maps/mapafondo.png');
        this.load.tilemapTiledJSON('level1', './assets/maps/level1.json');
    }

    create() {
        //  A simple background for our game
        //this.add.image(400, 300, 'sky');

        this.createGround();
        this.loadMap();
        this.createPlayer();
        this.createBoss();

        this.initColisiones();
        this.initInputs();
        this.initCamera();

        this.loadLevelData(1);

        boss.target = levelsData[0].spawn
    }

    update(time, delta) {   
        if (gameOver) {
            return;
        }

        if(cursors.left.isUp || cursors.right.isUp){
        }

        if (cursors.left.isDown) {
            player.body.setVelocityX(-160);
            playerLegs.anims.play('left', true);
        }
        else {
            if (cursors.right.isDown) {
                player.body.setVelocityX(160);
                playerLegs.anims.play('right', true);
            }   
            else {
                player.body.setVelocityX(0);
                playerLegs.anims.play('turn');
                playerTorso.anims.stop();
            }
        }

        if (cursors.up.isDown) {
            if (player.body.onFloor()) {
                player.body.setVelocityY(-180);
                playerLegs.anims.play('jump');
                if (cursors.left.isDown) {
                    playerTorso.anims.play('upLeftTorso', true);
                }else if (cursors.right.isDown) {
                    playerTorso.anims.play('upRightTorso', true);
                }else {
                    playerTorso.anims.play('upTorso', true);
                }
            }
        }else {
            if (cursors.down.isDown) {
                if (cursors.left.isDown) {
                    playerTorso.anims.play('downLeftTorso', true);
                }else if (cursors.right.isDown) {
                    playerTorso.anims.play('downRightTorso', true);
                }else {
                    playerTorso.anims.play('downTorso', true);
                }
            }
            else {
                if (cursors.left.isDown) {
                    playerTorso.anims.play('leftTorso', true);
                }
                else if (cursors.right.isDown) {
                    playerTorso.anims.play('rightTorso', true);
                }
            }
        }

        if (boss.moving) {
            this.moveToTarget(boss.body, boss.target, 80, 250, false, 240);
            this.moveToTarget(boss.leftArm.shoulder, {
                x: boss.body.x - 85, 
                y: boss.body.y - 130
            }, 80, 5)
            this.moveToTarget(boss.leftArm.elbow, {
                x: boss.body.x - 185, 
                y: boss.body.y - 70
            }, 80, 5)
            this.moveToTarget(boss.rigtArm.shoulder, {
                x: boss.body.x + 85, 
                y: boss.body.y - 130
            }, 80, 5)
            this.moveToTarget(boss.rigtArm.elbow, {
                x: boss.body.x + 185, 
                y: boss.body.y - 70
            }, 80, 5)
            this.moveToTarget(boss.head, {
                x: boss.body.x, 
                y: boss.body.y - 150
            }, 80, 5)
        }

        if (!boss.punching.enabled) {
            this.moveToTarget(boss.rigtArm.hand, {
                x: boss.body.x + 285, 
                y: boss.body.y + 40
            }, 40, 5)
            this.moveToTarget(boss.leftArm.hand, {
                x: boss.body.x - 285, 
                y: boss.body.y + 40
            }, 40, 5)
        }else {
            if (boss.punching.side == 'left') {
                this.moveToTarget(boss.rigtArm.hand, {
                    x: boss.body.x + 285, 
                    y: boss.body.y + 40
                }, 40, 5)
                if (this.moveToTarget(boss.leftArm.hand, {
                    x: boss.punching.target.x, 
                    y: boss.punching.target.y
                }, 490, 15, true)) { this.hitFloor(); }
            }else {
                if (this.moveToTarget(boss.rigtArm.hand, {
                    x: boss.punching.target.x, 
                    y: boss.punching.target.y
                }, 490, 15, true)) { this.hitFloor(); }
                this.moveToTarget(boss.leftArm.hand, {
                    x: boss.body.x - 285, 
                    y: boss.body.y + 40
                }, 40, 5)
            }
        }

        //player.rotation = Phaser.Math.Angle.BetweenPoints(player, boss.body)
        this.connectObjects(boss.rigtArm.shoulder, boss.rigtArm.elbow, connectors[0]);
        this.connectObjects(boss.rigtArm.elbow, boss.rigtArm.hand, connectors[1]);

        this.connectObjects(boss.leftArm.shoulder, boss.leftArm.elbow, connectors[2]);
        this.connectObjects(boss.leftArm.elbow, boss.leftArm.hand, connectors[3]);

        rockets.forEach(rocket => this.rocketToTarget(rocket, player));

        boss.target = {x:player.x, y:player.y - 200}
    }

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

        var sprites = map.createFromObjects("objects", {
            name: 'spawn'
        });
        sprites[0].visible = false;
        levelsData[0].spawn = {x: sprites[0].x, y: sprites[0].y};

        layer.setCollisionByProperty({ collides: true });
    }

    createPlayer() {
        // The player and its settings
        player = this.add.container(100, 450);
        playerLegs = this.add.sprite(0, 0, 'playerlegs');
        playerTorso = this.add.sprite(0,0,'playerTorso');
        player.add(playerTorso);
        player.add(playerLegs);
        player.setSize(17, 32);
        this.physics.world.enable(player);

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.setBounce(0.2);
        player.body.setCollideWorldBounds(true);
    }

    createBoss() {
        var rocket = this.physics.add.sprite(100, 0, 'cohete');
        rocket.setGravity(0, -300);
        rockets.push(rocket);
        var rocket = this.physics.add.sprite(200, 0, 'cohete');
        rocket.setGravity(0, -300);
        rockets.push(rocket);
        var rocket = this.physics.add.sprite(300, 0, 'cohete');
        rocket.setGravity(0, -300);
        rockets.push(rocket);
        var rocket = this.physics.add.sprite(400, 0, 'cohete');
        rocket.setGravity(0, -300);
        rockets.push(rocket);
        var rocket = this.physics.add.sprite(500, 0, 'cohete');
        rocket.setGravity(0, -300);
        rockets.push(rocket);

        boss.body = this.physics.add.sprite(400, 0, 'bossBody');

        //  Conectores
        connectors.push(this.add.sprite(0, 0, 'parte').setOrigin(0,0.5));
        connectors.push(this.add.sprite(0, 0, 'parte').setOrigin(0,0.5));
        connectors.push(this.add.sprite(0, 0, 'parte').setOrigin(0,0.5));
        connectors.push(this.add.sprite(0, 0, 'parte').setOrigin(0,0.5));

        //  Brazo izquierdo
        boss.leftArm = {
            shoulder: this.physics.add.sprite(boss.body.x, boss.body.y, 'node').setScale(2),
            elbow: this.physics.add.sprite(boss.body.x, boss.body.y, 'node').setScale(2),
            hand: this.physics.add.sprite(boss.body.x, boss.body.y, 'node').setScale(2)
        }

        //  Brazo derecho
        boss.rigtArm = {
            shoulder: this.physics.add.sprite(boss.body.x, boss.body.y, 'node').setScale(2),
            elbow: this.physics.add.sprite(boss.body.x, boss.body.y, 'node').setScale(2),
            hand: this.physics.add.sprite(boss.body.x, boss.body.y, 'node').setScale(2)
        }

        boss.head = this.physics.add.sprite(boss.body.x, boss.body.y, 'cabeza').setScale(3);
    }

    initColisiones() {
        //  Collide the player with the platforms
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(player, layer);
        this.physics.add.collider(player, boss.body);
        this.physics.add.collider(boss.rigtArm.hand, platforms, this.hitFloor, null, this);
        this.physics.add.collider(boss.leftArm.hand, platforms, this.hitFloor, null, this);
        this.physics.add.collider(player, rockets, this.rocketHitPlayer, null, this);
        this.physics.add.collider(platforms, rockets, this.rocketHitPlatform, null, this);
    }

    initInputs() {
        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();
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
            var rocket = this.physics.add.sprite(Phaser.Math.Between(100, 500), 0, 'cohete');
            rocket.setGravity(0, -300);
            rockets.push(rocket);
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
        var angle = Phaser.Math.Angle.BetweenPoints(rocket, target);
        //  Redondeado para suavizar rotación
        if (Math.floor(angle*10) != Math.floor(rocket.rotation*10)) {
            if (angle > rocket.rotation) {
                //  Gira derecha
                rocket.rotation += .05;
            }else {
                //  Gira izquierda
                rocket.rotation -= .05;
            }
        }
        //  Avanza hacia el jugador
        this.physics.velocityFromRotation(rocket.rotation, 100, rocket.body.velocity);
    }

    evaluateAttackSide() {
        if (boss.body.x > player.body.x) {
            boss.punching.side = 'left';
        }else {
            boss.punching.side = 'right';
        }
    }

    //  Argumentos
    connectObjects(obj1, obj2, connector) {
        connector.x = obj1.x;
        connector.y = obj1.y;
        connector.rotation = Phaser.Math.Angle.BetweenPoints(obj1, obj2);
        connector.setScale((Phaser.Math.Distance.Between(obj1.x, obj1.y, obj2.x, obj2.y)+32)*.03, 1);
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
        rockets.splice(rockets.indexOf(rocket), 1);
        rocket.destroy();
    }

    rocketHitPlatform(rocket, platform) {
        rockets.splice(rockets.indexOf(rocket), 1);
        rocket.destroy();
    }

    initCamera() {
        camera1 = this.cameras.add(0, 0, 400, 300).setZoom(0.5);

        camera1.startFollow(player, false, 0.5, 0);

        camera1.width = 1920;
        camera1.height = 1080;
        camera1.scrollX = -100;
        camera1.scrollY = 435;
        camera1.zoom = 3;
        camera1.setBackgroundColor('rgba(0, 0, 0, 1)');
    }

    loadLevelData(level) {
        player.body.x = levelsData[level-1].spawn.x;
        player.body.y = levelsData[level-1].spawn.y;
    }

}