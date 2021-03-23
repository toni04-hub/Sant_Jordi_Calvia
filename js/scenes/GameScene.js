class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        })
    }
    init(data) {
        console.log(data)
        this.isPrinces = data.isPrinces;
        this.STJORDI = 'player';
        this.PRINCESA = 'princesa';
        if(this.isPrinces){
            this.STJORDI = 'princesa';
            this.PRINCESA = 'player';
        }
        this.velocity = 160;
        this.canLove = true
        this.canBurn = false;
        this.isBurning = false;
        this.isBurned = false;
        this.coinScore = 0;
        this.visitats = 0;

    }
    preload() {
        this.load.scenePlugin('AnimatedTiles', 'https://raw.githubusercontent.com/nkholski/phaser-animated-tiles/master/dist/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
        this.load.spritesheet(this.STJORDI, 'assets/sant_jordi.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        
        this.load.spritesheet(this.PRINCESA, 'assets/princesa.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        
        
    }

    create() {
        this.createAudio();
        this.createAnimations();
        //Effecto de camara al iniciar la escena
        this.cameras.main.fadeFrom(2000, Phaser.Math.Between(50, 255), Phaser.Math.Between(50, 255), Phaser.Math.Between(50, 255));

        //Crea el mapa 
        this.createMap();

        //Create stars
        this.createStars();

        //Create the coins
        this.createCoins();

        //Create Ovejas
        this.createOvejas();

        this.createLinksZones();

        //Create Drac
        this.createDrac();

        //Create Foc
        this.createFoc();

        this.createPrincesa();

        this.createCorazon();

        this.createPlayer();

        this.createScoreText();

        this.createCamera();

        this.createInput();

        this.createJoysticK();

        this.addColliders();

     
            this.addZonesColliders(this.player);
       

        this.time.addEvent({
            delay: 4000,
            callback: () => {
                this.foc.anims.play('crema');
                this.canBurn = true;
            },
            callbackScope: (this),
            loop: true
        });

        this.foc.on('animationcomplete', () => {
            //this.player.body.moves = true;
            this.canburn = false;
        });

        this.player.on('animationcomplete', (anim, frame) => {

            this.player.body.moves = true;
            this.player.setFrame(9);
            //unlock burn
            this.time.addEvent({
                delay: 100, // ms
                callback: () => {
                    this.isBurning = false;
                    //ponemos el puntos a 0
                    // this.coinScore = 0; // increment the score 
                    // this.textPunts.setText(`Punts: ${this.coinScore}x`); // set the text to show the current score
                },
                //args: [],
                callbackScope: (this),
                loop: false
            });


        });

        this.corazon.on('animationcomplete', () => {
            
            this.princesa.body.moves = true;
            this.princesa.anims.play('princesa_walk');
            
            this.corazon.setFrame(0);
            this.canLove = true;

        })

        this.events.on('resume', (scene, data) => {
            console.log('resume event')
          
                this.player.y = this.player.y + 40;
        
        });




    }
    createMap() {
        this.map = this.make.tilemap({
            key: "map"
        });

        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        this.tileset_base = this.map.addTilesetImage("grass", "_grass", 32, 32, 1, 2);
        this.tileset_water = this.map.addTilesetImage("water", "_water");
        this.tileset_grass = this.map.addTilesetImage("base2", "_base");
        this.tileset_iglesia = this.map.addTilesetImage("iglesia", "_iglesia")
        this.tileset_cruz = this.map.addTilesetImage("cruz", "_cruz")
        this.tileset_montana = this.map.addTilesetImage("montana", "_montana")
        this.tileset_arbol = this.map.addTilesetImage("arbol", "_arbol")
        this.tileset_rosa = this.map.addTilesetImage("rosa", "_rosa")
        this.tileset_carpas = this.map.addTilesetImage("carpa", "_carpa")

        //To use multiple tilesets we need to make an array and pass it to the creteLayer Method
        this.allLayers = [
            this.tileset_grass,
            this.tileset_water,
            this.tileset_base,
            this.tileset_iglesia,
            this.tileset_cruz,
            this.tileset_montana,
            this.tileset_arbol,
            this.tileset_rosa,
            this.tileset_carpas,
        ];

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        this.bgLayer = this.map.createLayer("background", this.allLayers, 0, 0);
        this.seaLayer = this.map.createLayer("sea", this.allLayers, 0, 0);
        this.creuLayer = this.map.createDynamicLayer("creu", this.allLayers, 0, 0);
        this.creuTopLayer = this.map.createDynamicLayer("creu_top", this.allLayers, 0, 0);
        this.esglesiaLayer = this.map.createDynamicLayer("esglesia", this.allLayers, 0, 0);
        this.esglesiaTopLayer = this.map.createDynamicLayer("esglesia_top", this.allLayers, 0, 0);
        this.galatzoLayer = this.map.createLayer("galatzo", this.allLayers, 0, 0);
        this.galatzoTopLayer = this.map.createLayer("galatzo_top", this.allLayers, 0, 0);
        this.treesLayer = this.map.createLayer("trees", this.allLayers, 0, 0);
        this.carpasLayer = this.map.createLayer("carpas", this.allLayers, 0, 0);
        this.carpasTopLayer = this.map.createDynamicLayer("carpas_top", this.allLayers, 0, 0);

        this.carpasTopLayer.setDepth(200);
        this.galatzoTopLayer.setDepth(200);
        this.esglesiaTopLayer.setDepth(200);
        this.creuTopLayer.setDepth(200);

        this.seaLayer.setCollisionByProperty({
            collides: true
        });
        this.galatzoLayer.setCollisionByProperty({
            collides: true
        });
        this.esglesiaLayer.setCollisionByProperty({
            collides: true
        });
        this.creuLayer.setCollisionByProperty({
            collides: true
        });
        this.treesLayer.setCollisionByProperty({
            collides: true
        });
        this.carpasTopLayer.setCollisionByProperty({
            collides: true
        });

        //run the animation of the animated layers. The animated layers must be dinamicLayer
        this.animatedTiles.init(this.map);
    }
    createInput() {
        this.cursors = this.input.keyboard.createCursorKeys();

        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    createJoysticK() {

        this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
            x: 1100,
            y: 540,
            radius: 100,
            base: this.add.circle(0, 0, 100, 0x888888),
            thumb: this.add.circle(0, 0, 50, 0xcccccc),

        }).on('update', function () {

        }, this);

        this.joyStick.base.alpha = 0.5;
        this.joyStick.thumb.alpha = 0.5;
        this.joyStick.thumb.setDepth(200);
        this.joyStick.visible = false;


        this.input.on('pointerdown', (pointer) => {

            this.joyStick.visible = true
            this.joyStick.x = pointer.x
            this.joyStick.y = pointer.y

        });

        this.input.on('pointerup', (pointer) => {

            this.joyStick.visible = false;

        });
    }

    createAudio() {
        this.coinPickupAudio = this.sound.add('coinSound', {
            loop: false,
            volume: 0.5
        });
        this.starPickupAudio = this.sound.add('starSound', {
            loop: false,
            volume: 0.5
        });
        this.burnAudio = this.sound.add('burnSound', {
            loop: false,
            volume: 0.5
        });
    }

    createScoreText() {
        //score
        this.textPunts = this.add.text(20, 40, `Punts: ${this.coinScore}x`, {
            fontSize: '30px',
            fill: '#ffffff'
        });
        this.textPunts.setScrollFactor(0);
        this.textPunts.setDepth(400);

        //visitats
        this.textVisitats = this.add.text(20, 10, `Visitats: ${this.visitats}/12`, {
            fontSize: '30px',
            fill: '#ffffff'
        });
        this.textVisitats.setScrollFactor(0);
        this.textVisitats.setDepth(400);
    }

    createOvejas() {
        this.ovejasLayer = this.map.getObjectLayer('ovejas')['objects'];
        this.ovejas = this.physics.add.group();
        this.ovejasLayer.forEach(object => {
            let obj = this.ovejas.create(object.x, object.y, 'oveja');
            obj.anims.play('eat');
            obj.setCollideWorldBounds(true);
            obj.body.setAllowDrag(true)
            obj.body.setDrag(1000, 1000)
            obj.body.setFriction(1, 1)
        });
    }

    createCoins() {
        this.coinsLayer = this.map.getObjectLayer('coins')['objects'];
        this.coins = this.physics.add.staticGroup()
        this.coinsLayer.forEach(object => {
            let obj = this.coins.create(object.x, object.y, 'coin');
        });
    }

    createStars() {
        this.starsLayer = this.map.getObjectLayer('big_stars')['objects'];
        this.stars = this.physics.add.staticGroup()
        this.starsLayer.forEach(object => {
            let obj = this.stars.create(object.x, object.y, 'star');
        });
        this.stars.setDepth(300);
    }

    createDrac() {
        const spawnDrac = this.map.findObject("links", obj => obj.name === "drac");
        this.drac = this.physics.add.sprite(spawnDrac.x, spawnDrac.y, 'drac', 0);
        this.drac.anims.play('fly')
        this.drac.setCollideWorldBounds(true);
        this.drac.body.velocity.x = 0;
        this.drac.body.velocity.y = 0;
        this.drac.body.bounce.set(0.8);
        this.drac.setDepth(201);

        //attack timer
        this.time.addEvent({
            delay: 4000, // ms
            callback: () => {
                var vel = Phaser.Math.Between(80, 140);
                this.physics.moveToObject(this.drac, this.player, vel);
            },
            //args: [],
            callbackScope: this,
            loop: true
        });
    }

    createFoc() {
        this.foc = this.physics.add.sprite(this.drac.x, this.drac.y, 'foc', 0);
    }

    createPrincesa() {
        
            this.princesa = this.physics.add.sprite(1300, 680, 'princesa', 0);
            this.princesa.body.setSize(54, 54, false);
            this.princesa.body.setOffset(50, 54);
            this.princesa.setCollideWorldBounds(true);
            this.princesa.setImmovable(true);
            this.princesa.body.allowGravity = false;
            this.princesa.anims.play('princesa_walk');
            this.princesa.flipX = true;
            this.princesa.setVelocityX(-60);
        
    }

    createCorazon() {
        this.corazon = this.add.sprite(this.princesa.x, this.princesa.y, 'corazon', 0);
        this.corazon.setDepth(300)
    }

    createPlayer() {
        
            const spawnPlayer = this.map.findObject("links", obj => obj.name === "player");
            this.player = this.physics.add.sprite(spawnPlayer.x, spawnPlayer.y, 'player', 0);
            this.player.body.setSize(50, 54, false);
            this.player.body.setOffset(50, 56);
            this.player.setCollideWorldBounds(true);
        
    }

    createCamera() {
        this.camera = this.cameras.main;
        this.camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.camera.roundPixels = true;
        
            this.camera.startFollow(this.player);

    }


    createLinksZones() {
        
        const link1 = this.map.findObject("links", obj => obj.name === "link1");
        
        this.zone1 = this.add.zone(link1.x, link1.y, link1.width, 1);
        this.zone1.setOrigin(0);
        this.physics.world.enable(this.zone1, 1); // (0) DYNAMIC (1) STATIC

        const link2 = this.map.findObject("links", obj => obj.name === "link2");
        this.zone2 = this.add.zone(link2.x, link2.y, link2.width, 1);
        this.zone2.setOrigin(0);
        this.physics.world.enable(this.zone2, 1); // (0) DYNAMIC (1) STATIC

        const link3 = this.map.findObject("links", obj => obj.name === "link3");
        this.zone3 = this.add.zone(link3.x, link3.y, link3.width, 1);
        this.zone3.setOrigin(0);
        this.physics.world.enable(this.zone3, 1); // (0) DYNAMIC (1) STATIC

        const link4 = this.map.findObject("links", obj => obj.name === "link4");
        this.zone4 = this.add.zone(link4.x, link4.y, link4.width, 1);
        this.zone4.setOrigin(0);
        this.physics.world.enable(this.zone4, 1); // (0) DYNAMIC (1) STATIC

        const link5 = this.map.findObject("links", obj => obj.name === "link5");
        this.zone5 = this.add.zone(link5.x, link5.y, link5.width, 1);
        this.zone5.setOrigin(0);
        this.physics.world.enable(this.zone5, 1); // (0) DYNAMIC (1) STATIC

        const link6 = this.map.findObject("links", obj => obj.name === "link6");
        this.zone6 = this.add.zone(link6.x, link6.y, link6.width, 1);
        this.zone6.setOrigin(0);
        this.physics.world.enable(this.zone6, 1); // (0) DYNAMIC (1) STATIC

        const link7 = this.map.findObject("links", obj => obj.name === "link7");
        this.zone7 = this.add.zone(link7.x, link7.y, link7.width, 1);
        this.zone7.setOrigin(0);
        this.physics.world.enable(this.zone7, 1); // (0) DYNAMIC (1) STATIC


        const link8 = this.map.findObject("links", obj => obj.name === "link8");
        this.zone8 = this.add.zone(link8.x, link8.y, link8.width, 1);
        this.zone8.setOrigin(0);
        this.physics.world.enable(this.zone8, 1); // (0) DYNAMIC (1) STATIC

        const link9 = this.map.findObject("links", obj => obj.name === "link9");
        this.zone9 = this.add.zone(link9.x, link9.y, link9.width, 1);
        this.zone9.setOrigin(0);
        this.physics.world.enable(this.zone9, 1); // (0) DYNAMIC (1) STATIC

        const link10 = this.map.findObject("links", obj => obj.name === "link10");
        this.zone10 = this.add.zone(link10.x, link10.y, link10.width, 1);
        this.zone10.setOrigin(0);
        this.physics.world.enable(this.zone10, 1); // (0) DYNAMIC (1) STATIC



    }

    addColliders() {
        this.physics.add.collider(this.player, this.seaLayer);
        this.physics.add.collider(this.player, this.treesLayer);
        this.physics.add.collider(this.player, this.carpasTopLayer);
        this.physics.add.collider(this.player, this.galatzoLayer);
        this.physics.add.collider(this.player, this.esglesiaLayer);
        this.physics.add.collider(this.player, this.creuLayer);

        this.physics.add.collider(this.princesa, this.seaLayer);
        this.physics.add.collider(this.princesa, this.treesLayer);
        this.physics.add.collider(this.princesa, this.carpasTopLayer);
        this.physics.add.collider(this.princesa, this.galatzoLayer);
        this.physics.add.collider(this.princesa, this.esglesiaLayer);
        this.physics.add.collider(this.princesa, this.creuLayer);

        this.physics.add.collider(this.ovejas, this.player);
        this.physics.add.collider(this.ovejas, this.princesa);
        this.physics.add.collider(this.ovejas, this.seaLayer);
        this.physics.add.collider(this.ovejas, this.treesLayer);
        this.physics.add.collider(this.ovejas, this.carpasTopLayer);
        this.physics.add.collider(this.ovejas, this.galatzoLayer);
        this.physics.add.collider(this.ovejas, this.esglesiaLayer);
        this.physics.add.collider(this.ovejas, this.creuLayer);

        this.physics.add.collider(this.player, this.princesa, () => {
            if (this.canLove) {
                this.corazon.anims.play('love');
    
                    this.princesa.anims.stop('princesa_walk');
                    this.princesa.body.moves = false;

                this.canLove = false;
            }

        });

        
            this.physics.add.overlap(this.player, this.stars, (player, star) => {
                this.starPickupAudio.play();
                star.destroy();
                this.visitats++; // increment the score
                this.textVisitats.setText(`Visitats: ${this.visitats}/12`); // set the text to show the current score

            }, null, this);

            this.physics.add.overlap(this.player, this.coins, (player, coin) => {
                this.coinPickupAudio.play();
                coin.destroy();
                this.coinScore++; // increment the score
                this.textPunts.setText(`Punts: ${this.coinScore}x`); // set the text to show the current score
            }, null, this);

        

        this.physics.add.overlap(this.player, this.foc, () => {
            if (this.canBurn && !this.isBurning) {
                console.log('burn');
              
                    this.burnAudio.play();
                
                this.player.body.moves = false;
                this.player.anims.stop('walk');
                this.player.anims.play('player_burn');
                this.player.body.setVelocity(0);
                this.isBurning = true;
                this.canBurn = false;

            }

        })
    }
    addZonesColliders(char) {
        this.physics.add.overlap(char, this.zone1, () => {
            console.log('open link 1');

            this.scene.pause();
            this.joyStick.visible = false;
            this.scene.launch('Ui', {
                url: "12345"
            })
            this.scene.bringToTop('Ui');


        });

        this.physics.add.overlap(char, this.zone2, () => {
            console.log('open link 2');

            this.scene.pause();
            this.joyStick.visible = false;
            this.scene.launch('Ui', {
                url: "12345"
            })
            this.scene.bringToTop('Ui');

        });

        this.physics.add.overlap(char, this.zone3, () => {
            console.log('open link 3');

            this.scene.pause();
            this.joyStick.visible = false;
            this.scene.launch('Ui', {
                url: "12345"
            })
            this.scene.bringToTop('Ui');

        });

        this.physics.add.overlap(char, this.zone4, () => {
            console.log('open link 4');

            this.scene.pause();
            this.joyStick.visible = false;
            this.scene.launch('Ui', {
                url: "12345"
            })
            this.scene.bringToTop('Ui');

        });

        this.physics.add.overlap(char, this.zone5, () => {
            console.log('open link 5');

            this.scene.pause();
            this.joyStick.visible = false;
            this.scene.launch('Ui', {
                url: "12345"
            })
            this.scene.bringToTop('Ui');

        });

        this.physics.add.overlap(char, this.zone6, () => {
            console.log('open link 6');

            this.scene.pause();
            this.joyStick.visible = false;
            this.scene.launch('Ui', {
                url: "12345"
            })
            this.scene.bringToTop('Ui');

        });

        this.physics.add.overlap(char, this.zone7, () => {
            console.log('open link 7');

            this.scene.pause();
            this.joyStick.visible = false;
            this.scene.launch('Ui', {
                url: "12345"
            })
            this.scene.bringToTop('Ui');

        });

        this.physics.add.overlap(char, this.zone8, () => {
            console.log('open link 8');

            this.scene.pause();
            this.joyStick.visible = false;
            this.scene.launch('Ui', {
                url: "12345"
            })
            this.scene.bringToTop('Ui');

        });

        this.physics.add.overlap(char, this.zone9, () => {
            console.log('open link 9');

            this.scene.pause();
            this.joyStick.visible = false;
            this.scene.launch('Ui', {
                url: "12345"
            })
            this.scene.bringToTop('Ui');

        });

        this.physics.add.overlap(char, this.zone10, () => {
            console.log('open link 10');

            this.scene.pause();
            this.joyStick.visible = false;
            this.scene.launch('Ui', {
                url: "12345"
            })
            this.scene.bringToTop('Ui');

        });
    }
    updatePrincesa() {
        this.corazon.x = this.princesa.x + 20;
        this.corazon.y = this.princesa.y - 50;
        // move princes
   

            // reverse movement if reached the edges

            if (this.princesa.x > 1300) {
                this.princesa.setVelocityX(-60);
            }
            if (this.princesa.x < 900) {
                this.princesa.setVelocityX(60);
            }
            if (this.princesa.body.velocity.x > 0) {
                this.princesa.flipX = false;
            } else {
                this.princesa.flipX = true;
            }

        
    }
    update() {
        this.updatePrincesa();

        this.foc.y = this.drac.y;
        if (this.drac.body.velocity.x > 0) {
            this.foc.x = this.drac.x + 100;
            this.foc.flipX = true;
            this.drac.flipX = true;
        } else {
            this.foc.x = this.drac.x - 100;
            this.foc.flipX = false;
            this.drac.flipX = false;
        }

      
            //move player
            if (!this.isBurning) {

                this.player.body.setVelocity(0);

                if (this.cursors.left.isDown) {


                    this.player.body.setVelocityX(-this.velocity);
                } else if (this.cursors.right.isDown) {

                    this.player.body.setVelocityX(this.velocity);
                }

                if (this.cursors.up.isDown) {
                    this.player.body.setVelocityY(-this.velocity);
                } else if (this.cursors.down.isDown) {
                    this.player.body.setVelocityY(this.velocity);
                }

                if (this.joyStick.left) {
                    this.player.body.setVelocityX(-this.velocity);
                } else if (this.joyStick.right) {
                    this.player.body.setVelocityX(this.velocity);
                }
                if (this.joyStick.up) {
                    this.player.body.setVelocityY(-this.velocity);
                } else if (this.joyStick.down) {
                    this.player.body.setVelocityY(this.velocity);
                }
                // Normalize and scale the velocity so that player can't move faster along a diagonal
                this.player.body.velocity.normalize().scale(this.velocity);



                // Update the animation last and give left/right animations precedence over up/down animations
                if (this.cursors.left.isDown || this.joyStick.left) {
                    this.player.flipX = true;

                    this.player.anims.play("walk", true);
                } else if (this.cursors.right.isDown || this.joyStick.right) {
                    this.player.flipX = false;

                    this.player.anims.play("walk", true);
                } else if (this.cursors.up.isDown || this.joyStick.up) {
                    this.player.anims.play("walk", true);
                } else if (this.cursors.down.isDown || this.joyStick.down) {
                    this.player.anims.play("walk", true);
                } else {
                    this.player.anims.stop();
                    this.player.setFrame(0);
                }
            }
      
        if (this.spaceBar.isDown) {
            console.log(this.sys.scale.scaleMode = 5)
        }

    }
    createAnimations(){
        this.anims.create({
            key: 'princesa_walk',
            frames: this.anims.generateFrameNumbers('princesa', {
                start: 0,
                end: 1
            }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'eat',
            frames: this.anims.generateFrameNumbers('oveja', {
                start: 0,
                end: 1
            }),
            frameRate: 0.5,
            repeat: -1
        });
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('drac', {
                start: 0,
                end: 1
            }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'crema',
            frames: this.anims.generateFrameNumbers('foc', {
                start: 0,
                end: 2
            }),
            frameRate: 4,
            repeat: 1,
            yoyo: true

        })
        this.anims.create({
            key: 'love',
            frames: this.anims.generateFrameNumbers('corazon', {
                start: 0,
                end: 4
            }),
            frameRate: 2,
            repeat: 1
        });

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 1
            }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'player_burn',
            frames: this.anims.generateFrameNumbers('player', {
                start: 2,
                end: 9
            }),
            frameRate: 4,
            repeat: 0
        });
    }

}