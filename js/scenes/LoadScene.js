class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Load'
        })
    }
    preload() {
        //show logo
        let logo = this.add.sprite(this.sys.game.config.width / 2, 250, 'logo', 0);
        logo.setScale(4);

        // progress bar background
        let bgBar = this.add.graphics();

        let barW = 150;
        let barH = 30;

        bgBar.setPosition(this.sys.game.config.width / 2 - barW / 2, this.sys.game.config.height / 2 - barH / 2);
        bgBar.fillStyle(0xF5F5F5, 1);
        bgBar.fillRect(0, 0, barW, barH);

        // progress bar
        let progressBar = this.add.graphics();
        progressBar.setPosition(this.sys.game.config.width / 2 - barW / 2, this.sys.game.config.height / 2 - barH / 2);

        // listen to the "progress" event
        this.load.on('progress', function (value) {
            // clearing progress bar (so we can draw it again)
            progressBar.clear();

            // set style
            progressBar.fillStyle(0x9AD98D, 1);

            // draw rectangle
            progressBar.fillRect(0, 0, value * barW, barH);

        }, this);

        let url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
        this.load.plugin('rexvirtualjoystickplugin', url, true);

        this.load.image('button1', "assets/ui/blue_button01.png");
        this.load.image('button2', "assets/ui/blue_button02.png");

        this.load.image("_base", "assets/mapa_calvia/base2.png");
        this.load.image("_water", "assets/mapa_calvia/water.png");
        this.load.image("_grass", "assets/mapa_calvia/grass.png");
        this.load.image("_iglesia", "assets/mapa_calvia/iglesia.png");
        this.load.image("_cruz", "assets/mapa_calvia/cruz.png");
        this.load.image("_montana", "assets/mapa_calvia/montana.png");
        this.load.image("_arbol", "assets/mapa_calvia/arbol.png");
        this.load.image("_rosa", "assets/mapa_calvia/rosa.png");
        this.load.image("_carpa", "assets/mapa_calvia/carpa.png");


        //this.load.image("_carpa_top", "assets/mapa_calvia/carpa_top.png");
        //this.load.image("_carpa_bottom", "assets/mapa_calvia/carpa_bottom.png");
        this.load.image('star', "assets/star.png");
        this.load.image('coin', "assets/coin.png");

        this.load.tilemapTiledJSON("map", "assets/mapa_calvia/mapa.json");


        this.load.spritesheet('player', 'assets/sant_jordi.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.image("lanza", "assets/lanza.png");

        this.load.spritesheet('princesa', 'assets/princesa.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('drac', 'assets/drac.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet('foc', 'assets/foc.png', {
            frameWidth: 76,
            frameHeight: 28
        });

        this.load.spritesheet('corazon', 'assets/corazon.png', {
            frameWidth: 64,
            frameHeight: 64
        })
        this.load.spritesheet("oveja", "assets/mapa_calvia/oveja.png", {
                frameWidth: 64,
                frameHeight: 64
            }

        );

        this.load.audio('coinSound', ['assets/audio/Pickup.wav']);
        this.load.audio('starSound', ['assets/audio/Treasure.wav']);
        this.load.audio('burnSound', ['assets/audio/Burn.wav']);
        
        
       
          // TESTING - to see the progress bar in action!
  // for(let i = 0; i < 200; i++) {
  //   this.load.image('test' + i, 'assets/images/candy.png');
  // }
    }

    create() {
        console.log("start Bootscene");
        this.createAnimations();
        this.scene.start('Title')
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