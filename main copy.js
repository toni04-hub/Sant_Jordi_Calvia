class Escena extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        })
    }
    init() {
        this.velocity = 140;
        this.isOverlap = false;
        this.startOverlap = true;
    }
    preload() {
        var url;
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
        this.load.plugin('rexvirtualjoystickplugin', url, true);


        this.load.image("_base", "assets/mapa_calvia/base2.png");
        this.load.image("_water", "assets/mapa_calvia/water.png");
        this.load.image("_grass", "assets/mapa_calvia/grass.png");
        this.load.image("_iglesia", "assets/mapa_calvia/iglesia.png");
        this.load.image("_cruz", "assets/mapa_calvia/cruz.png");
        this.load.image("_montana", "assets/mapa_calvia/montana.png");
        this.load.image("_arbol", "assets/mapa_calvia/arbol.png");
        this.load.image("_rosa", "assets/mapa_calvia/rosa.png");
        this.load.image("_carpa", "assets/mapa_calvia/carpa.png");

        this.load.tilemapTiledJSON("map", "assets/mapa_calvia/mapa.json");


        this.load.spritesheet('player', 'assets/santjordi.png', {
            frameWidth: 42,
            frameHeight: 54
        });
        this.load.image("lanza", "assets/lanza.png");

        this.load.spritesheet('princesa', 'assets/princesa.png', {
            frameWidth: 38,
            frameHeight: 64
        });
        this.load.spritesheet('drac', 'assets/drac.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('carpaS', 'assets/mapa_calvia/carpa.png', {
            frameWidth: 128,
            frameHeight: 128
        });
    }

    create() {
        this.map = this.make.tilemap({
            key: "map"
        });
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        this.tileset_base = this.map.addTilesetImage("grass", "_grass");
        this.tileset_water = this.map.addTilesetImage("water", "_water");
        this.tileset_grass = this.map.addTilesetImage("base2", "_base");
        this.tileset_iglesia = this.map.addTilesetImage("iglesia", "_iglesia")
        this.tileset_cruz = this.map.addTilesetImage("cruz", "_cruz")
        this.tileset_montana = this.map.addTilesetImage("montana", "_montana")
        this.tileset_arbol = this.map.addTilesetImage("arbol", "_arbol")
        this.tileset_rosa = this.map.addTilesetImage("rosa", "_rosa")
        this.tileset_carpas = this.map.addTilesetImage("carpa", "_carpa")

        this.allLayers = [
            this.tileset_grass,
            this.tileset_water,
            this.tileset_base,
            this.tileset_iglesia,
            this.tileset_cruz,
            this.tileset_montana,
            this.tileset_arbol,
            this.tileset_rosa,
            this.tileset_carpas
        ];
        // Parameters: layer name (or index) from Tiled, tileset, x, y
        this.bgLayer = this.map.createLayer("background", this.allLayers, 0, 0);
        this.seaLayer = this.map.createLayer("sea", this.allLayers, 0, 0);
        this.treesLayer = this.map.createLayer("trees", this.allLayers, 0, 0);
        this.carpasLayer = this.map.createLayer("carpas", this.allLayers, 0, 0);
        // this.bgLayer.setScale(0.75)
        // this.seaLayer.setScale(0.75)
        // this.treesLayer.setScale(0.75)
        this.seaLayer.setCollisionByProperty({
            collide: true
        });
        this.treesLayer.setCollisionByProperty({
            collides: true
        });
        // Object layers in Tiled let you embed extra info into a map - like a spawn point or custom
        // collision shapes. In the tmx file, there's an object layer with a point named "Spawn Point"
        const spawnPoint = this.map.findObject("links", obj => obj.name === "carpa1");
        console.log(spawnPoint)
        this.carpa1 = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'carpaS', 0);
        this.anims.create({
            key: 'vent',
            frames: this.anims.generateFrameNumbers('carpaS', {
                start: 0,
                end: 1
            }),
            frameRate: 8,
            repeat: -1
        });
        this.carpa1.anims.play('vent');
        this.carpa1.body.setSize(100, 16, false);
        // By default, everything gets depth sorted on the screen in the order we created things. Here, we
        // want the "Above Player" layer to sit on top of the player, so we explicitly give it a depth.
        // Higher depths will sit on top of lower depth objects.
        //this.aboveLayer.setDepth(10);


        this.drac = this.physics.add.sprite(400, 100, 'drac', 0);
        this.drac.setScale(1);
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('drac', {
                start: 0,
                end: 1
            }),
            frameRate: 8,
            repeat: -1
        });
        this.drac.anims.play('fly')
        this.drac.speed = 0.5;
        this.drac.speedY = -1;
        this.drac.setDepth(20)


        this.princesa = this.physics.add.sprite(1200, 420, 'princesa', 0);
        this.princesa.setCollideWorldBounds(true);
        this.princesa.setImmovable(true);
        this.princesa.body.allowGravity = false;
        //this.physics.add.collider(this.princesa, this.treesLayer);
        this.anims.create({
            key: 'princes_walk',
            frames: this.anims.generateFrameNumbers('princesa', {
                start: 0,
                end: 1
            }),
            frameRate: 6,
            repeat: -1
        });
        this.princesa.anims.play('princes_walk');
        this.princesa.flipX = true;
        this.princesa.setVelocityX(-60);


        this.player = this.physics.add.sprite(300, 160, 'player', 1);
        this.lanza = this.physics.add.image(this.player.x ,this.player.y, 'lanza')
        this.player.setScale(1);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 1
            }),
            frameRate: 8,
            repeat: -1
        });

        this.camera = this.cameras.main;
        this.camera.startFollow(this.player, true, 0.09, 0.09);
        this.cameras.main.setZoom(1);
        this.camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.camera.roundPixels = true;

        this.physics.add.collider(this.player, this.seaLayer);
        this.physics.add.collider(this.player, this.treesLayer);
        this.physics.add.collider(this.player, this.princesa);


        this.createInput();
        //this.showColliders()
        this.createJoysticK();
    }

    createInput() {
        this.cursors = this.input.keyboard.createCursorKeys();

    }

    createJoysticK() {

        this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
            x: 1100,
            y: 540,
            radius: 100,
            base: this.add.circle(0, 0, 100, 0x888888),
            thumb: this.add.circle(0, 0, 50, 0xcccccc),

            // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
            // forceMin: 16,
            // enable: true
        }).on('update', function () {

        }, this);

        this.joyStick.base.alpha = 0.5;
        this.joyStick.thumb.alpha = 0.5;
        this.joyStick.thumb.setDepth(200);
        this.joyStick.visible = false;


        this.input.on('pointerdown', (pointer) => {
            console.log(this.joyStick, pointer);
            this.joyStick.visible = true
            this.joyStick.x = pointer.x
            this.joyStick.y = pointer.y
        });

        this.input.on('pointerup', (pointer) => {

            this.joyStick.visible = false;

        });
    }

    update() {
        this.lanza.x = this.player.x;
        this.lanza.y = this.player.y;
        // move princes

        // reverse movement if reached the edges

        if (this.princesa.x > 1300) {
            this.princesa.setVelocityX(-60);


        }
        if (this.princesa.x < 1000) {
            this.princesa.setVelocityX(60);


        }
        if (this.princesa.body.velocity.x > 0) {
            this.princesa.flipX = false;
        } else {
            this.princesa.flipX = true;
        }

        // move drac
        this.drac.y += this.drac.speed;
        this.drac.x += this.drac.speedY;

        // reverse movement if reached the edges
        if (this.drac.y > 300 && this.drac.speed > 0) {
            this.drac.speed *= -1;

        } else if (this.drac.y < 100 && this.drac.speed < 0) {
            this.drac.speed *= -1;

        }

        if (this.drac.x > 600 && this.drac.speedY > 0) {
            this.drac.speedY *= -1;
            this.drac.flipX = !this.drac.flipX;

        } else if (this.drac.x < 100 && this.drac.speedY < 0) {
            this.drac.speedY *= -1;
            this.drac.flipX = !this.drac.flipX;

        }

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

}


var config = {
    type: Phaser.AUTO,
    width: 768,
    height: 432,
    parent: 'phaser-game',
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,

    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                y: 0,
            }
        }
    },
    scene: Escena,
    pixelArt: true,
    roundPixels: true,


}

var game = new Phaser.Game(config);