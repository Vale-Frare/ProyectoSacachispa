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
        var spritesPickups = map.createFromObjects("objects", {
            name: 'pickup',
            visible: false
        });
        spritesPickups.forEach(spr => {spr.visible = false});
        levelsData[levelLoaded].pickups = spritesPickups;
        var spritesEnemies1 = map.createFromObjects("objects", {
            name: 'enemy1',
            key: 'enemy1',
            width: 32,
            height: 32
        });
        spritesEnemies1.forEach(element => {
            this.physics.world.enable(element);
            this.physics.add.collider(element, layer);
            levelsData[levelLoaded].enemies.push(element);
        });
        var spritesEnemies2 = map.createFromObjects("objects", {
            name: 'enemy2',
            key: 'enemy2'
        });
        spritesEnemies2.forEach(element => {
            this.physics.world.enable(element);
            element.body.immovable = true;
            element.body.allowGravity = false;
            this.physics.add.collider(element, layer);
            levelsData[levelLoaded].enemies.push(element);
        });
        var spritesEnemies3 = map.createFromObjects("objects", {
            name: 'enemy3',
            key: 'enemy3'
        });
        spritesEnemies3.forEach(element => {
            this.physics.world.enable(element);
            element.body.immovable = true;
            element.body.allowGravity = false;
            this.physics.add.collider(element, layer);
            levelsData[levelLoaded].enemies.push(element);
        });

        spritesSpawn[0].visible = false;
        levelsData[levelLoaded].spawn = {x: spritesSpawn[0].x, y: spritesSpawn[0].y};
        spritesJefes[0].visible = false;
        boss.spawn = {x: spritesJefes[0].x, y: spritesJefes[0].y};

        layer.setCollisionByProperty({ collides: true });
    }

    initWeapons(container) {
        Object.values(playerWeapons).forEach(function (value) {
            if (value != playerWeapons.quantity && value != playerWeapons.equipped && value != playerWeapons.side) {
                playerLoadedWeapons.push(value);
                for (var i = 0; i < 8; i++) {
                    for (var x = 0; x < 65; x++) {
                        for (var y = 0; y < 65; y++) {
                            var color = this.textures.getPixel(x, y, playerLoadedWeapons[playerLoadedWeapons.length-1].textureKey, i);
                            if (color != null) {
                                if (color._rgba == "rgba(48,50,48,1)") {
                                    console.log(color._rgba);
                                    playerLoadedWeapons[playerLoadedWeapons.length-1].points.push({x: x, y: y});
                                    x = 65;
                                    y = 65;
                                }
                            }
                        }
                    }
                }
                console.log(playerLoadedWeapons[playerLoadedWeapons.length-1]);
                playerLoadedWeapons[playerLoadedWeapons.length-1].obj = this.add.sprite(0, 0, playerLoadedWeapons[playerLoadedWeapons.length-1].textureKey, 5); 
                container.add(playerLoadedWeapons[playerLoadedWeapons.length-1].obj);
            }
        }, this);
    }

    createPlayer() {
        // The player and its settings
        player = this.add.container(100, 450);
        playerLegs = this.add.sprite(0, 0, 'playerlegs');
        playerTorso = this.add.sprite(0,0,'playerTorso');
        playerTorso.setFrame(20);
        player.add(playerLegs);
        this.initWeapons(player);
        player.add(playerTorso);
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
        this.physics.add.collider(player, levelsData[levelLoaded].enemies);
        this.physics.add.collider(boss.rightArm.hand, platforms, this.hitFloor, null, this);
        this.physics.add.collider(boss.leftArm.hand, platforms, this.hitFloor, null, this);
        this.physics.add.collider(boss.rightArm.hand, player, this.hitPlayer, null, this);
        this.physics.add.collider(boss.leftArm.hand, player, this.hitPlayer, null, this);
        
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

        ZKey = this.input.keyboard.addKey('Z');

        //  Prueba de colisiones
        var OneKey = this.input.keyboard.addKey('Q');
        OneKey.on('down', function () {
            if (playerWeapons.equipped == 'uzi') {
                this.switchWeapon('pistol');
            }else
            if (playerWeapons.equipped == 'pistol') {
                this.switchWeapon('shotgun');
            }else
            if (playerWeapons.equipped == 'shotgun') {
                this.switchWeapon('uzi');
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

    bulletHitEnemy(bullet, hitted) {
        console.log(hitted);
        var explosion = this.add.sprite(hitted.x, hitted.y, 'explosion');
        explosion.anims.play('explosion', true);
        levelsData[levelLoaded].enemies.splice(levelsData[levelLoaded].enemies.indexOf(hitted), 1);
        hitted.destroy();
        bullet.destroy();
    }

    bulletHit(bullet, hitted) {
        var ang = -Phaser.Math.Angle.BetweenPoints(bullet, hitted);
        var x = (3.141/2) - Math.abs(ang);
        var y = (1.570/2) - Math.abs(ang);
        hitted.x += x;
        hitted.y += y;
        this.tweens.add({
            targets: hitted,
            tint: 0xFF0000,
            ease: 'Linear',  
            duration: 60,
            repeat: 1,
            yoyo: true  
          });
        if(hitted == boss.leftArm.hand) {
            boss.damage.leftHand += playerWeapons[playerWeapons.equipped].damage;
        }else if(hitted == boss.rightArm.hand) {
            boss.damage.rightHand += playerWeapons[playerWeapons.equipped].damage;
        }else if(hitted == boss.head) {
            boss.damage.head += playerWeapons[playerWeapons.equipped].damage;
        }

        bullet.destroy();
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

    hitPlayer(hand, player) {
        if(gameOver) {return;}
        var explosion = this.add.sprite(player.x, player.y, 'explosion');
        explosion.anims.play('explosion', true);
        playerTorso.anims.play('playerMuerte', true);
        stadistics.lifes -= 1;
        gameOver = true;
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
        playerTorso.anims.play('playerMuerte', true);
        stadistics.lifes -= 1;
        gameOver = true;
    }

    bulletHitPlayer(player, bullet) {
        var explosion = this.add.sprite(bullet.x, bullet.y, 'explosion');
        explosion.anims.play('explosion', true);
        bullet.destroy();
        playerTorso.anims.play('playerMuerte', true);
        stadistics.lifes -= 1;
        player.body.setVelocityX(0);
        gameOver = true;
    }

    bulletHitFloor(bullet) {
        var explosion = this.add.sprite(bullet.x, bullet.y, 'explosion').setScale(0.2);
        explosion.anims.play('explosion', true);
        bullet.destroy();
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

    regenPickups() {
        levelsData[levelLoaded].pickups.forEach(pickup => {
            var pkup = null;
            switch (Phaser.Math.Between(0, 4)) {
                case 0:
                    pkup = this.add.sprite(pickup.x, pickup.y, 'heart');
                    this.physics.world.enable(pkup);
                    this.physics.add.collider(pkup, player, this.pickupLife, null, this);
                    this.physics.add.collider(pkup, layer);
                    break;
                case 1:
                    pkup = this.add.sprite(pickup.x, pickup.y, 'points1');
                    this.physics.world.enable(pkup);
                    this.physics.add.collider(pkup, player, this.pickupTenPoints, null, this);
                    this.physics.add.collider(pkup, layer);
                    break;
                case 2:
                    pkup = this.add.sprite(pickup.x, pickup.y, 'points2');
                    this.physics.world.enable(pkup);
                    this.physics.add.collider(pkup, player, this.pickupTwentyPoints, null, this);
                    this.physics.add.collider(pkup, layer);
                    break;
                case 3:
                    pkup = this.add.sprite(pickup.x, pickup.y, 'uziPickup');
                    this.physics.world.enable(pkup);
                    this.physics.add.collider(pkup, player, this.pickupUzi, null, this);
                    this.physics.add.collider(pkup, layer);
                    break;
                case 4:
                    pkup = this.add.sprite(pickup.x, pickup.y, 'shotgunPickup');
                    this.physics.world.enable(pkup);
                    this.physics.add.collider(pkup, player, this.pickupShotgun, null, this);
                    this.physics.add.collider(pkup, layer);
                    break;
            
                default:
                    break;
            }
        });
    }

    pickupLife(pickup) {
        if (stadistics.life == 3) {pickup.destroy();return;}
        stadistics.lifes += 1;
        pickup.destroy();
    }

    pickupTenPoints(pickup) {
        stadistics.score += 10;
        pickup.destroy();
    }

    pickupTwentyPoints(pickup) {
        stadistics.score += 20;
        pickup.destroy();
    }

    pickupUzi(pickup) {
        this.switchWeapon('uzi');
        pickup.destroy();
    }

    pickupShotgun(pickup) {
        this.switchWeapon('shotgun');
        pickup.destroy();
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

    loadLevelData(lvl) {
        player.x = levelsData[lvl-1].spawn.x;
        player.y = levelsData[lvl-1].spawn.y;
    }

    switchWeapon(weaponId) {
        playerWeapons.equipped = weaponId;
        timer = 5;
    }

    spawnEnemy(type, x, y) {
        if (type == 0) {
            levelsData[levelLoaded].enemies.push(
                {
                    obj: this.physics.add.sprite(x, y, `enemy${type+1}`),
                    type: type,
                    pos: {x: x, y: y}
                }
            );
        }else {
            levelsData[levelLoaded].enemies.push(
                {
                    obj: this.add.sprite(x, y, `enemy${type+1}`),
                    type: type,
                    pos: {x: x, y: y}
                }
            );
        }
    }

    resetEverything() {
        loadingBar.setVisible(true);
        gameOver = false;
        levelsData[levelLoaded] = {// Nivel 1
            spawn : { x: 0, y: 0},
            pickups : [],
            enemies: [],
            loadingProgress: 0,
        };
        connectors = [];
        boss = {
            damage : {
                head: 0,
                leftHand: 0,
                rightHand: 0
            },
            spawn : {x: 0, y: 0},
            body : null,
            head : null,
            shoulderOffsetY: 0,
            elbowOffsetY: -30,
            handOffsetY: 0,
            handOffsetX: -80,
            leftArm : {
                shoulder : null,
                elbow : null,
                hand : null,
            },
            rightArm : {
                shoulder : null,
                elbow : null,
                hand : null,
            },
            target : {x: 400, y: 200},
            moving : true,
            punching: {
                enabled : false,
                side : 'left',
                target : {x: 0, y: 0}
            }
        };
        stadistics = {
            timer: 100,
            score: 0,
            lifes: 3,
        };
    }

    shotWeapon() {
        if (timer > playerWeapons[playerWeapons.equipped].rateOfFire) {
            for (var i = 0; i < playerWeapons[playerWeapons.equipped].bulletsPerShot; i++) {
                var bala = this.physics.add.sprite(player.x + (playerWeapons[playerWeapons.equipped].points[playerWeapons.side].x - (65/2)), player.y + (playerWeapons[playerWeapons.equipped].points[playerWeapons.side].y - (65/2)), 'bullet').setOrigin(0, 0.5);
                bala.setGravityY(-300);
                bala.rotation = playerWeapons.pistol.rotation[playerWeapons.side] + Phaser.Math.FloatBetween(-.01 * playerWeapons[playerWeapons.equipped].spread, .01 * playerWeapons[playerWeapons.equipped].spread);
                this.physics.velocityFromRotation(bala.rotation, 500, bala.body.velocity);
                this.physics.add.collider(bala, boss.rightArm.hand, this.bulletHit, null, this);
                this.physics.add.collider(bala, boss.leftArm.hand, this.bulletHit, null, this);
                this.physics.add.collider(bala, boss.head, this.bulletHit, null, this);
                this.physics.add.collider(bala, levelsData[levelLoaded].enemies, this.bulletHitEnemy, null, this);
                this.physics.add.collider(bala, layer, this.bulletHitFloor, null, this);
            }
            timer = 0;
            playerLoadedWeapons.forEach(weapon => {
                if (weapon.textureKey == playerWeapons[playerWeapons.equipped].textureKey) {
                    playerLoadedWeapons[playerLoadedWeapons.indexOf(weapon)].ammo -= 1;
                }
            });
        }
    }

    shotEnemy(enemy, rotation, x, y, timer) {
        if ([timerEnemy1,timerEnemy2,timerEnemy3][timer] > enemy1RateOfFire) {
            var bala = this.physics.add.sprite(enemy.x + x, enemy.y + y, 'bulletEnemy').setOrigin(0, 0.5);
            bala.setGravityY(-300);
            bala.rotation = rotation;
            this.physics.velocityFromRotation(bala.rotation, 200, bala.body.velocity);
            this.physics.add.collider(player, bala, this.bulletHitPlayer, null, this);
            switch (timer) {
                case 0:
                    timerEnemy1 = 0;
                    break;
                case 1:
                    timerEnemy2 = 0;
                    break;
                case 2:
                    timerEnemy3 = 0;
                    break;
                default:
                    break;
            }
        }
    }

}