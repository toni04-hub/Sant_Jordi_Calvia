class TitleScene extends Phaser.Scene {
    constructor(){
        super('Title');
    }

    preload(){
        this.load.image('fondo', 'assets/fito.png');
    }
    create(){
        this.fondo = this.add.image(0,0,'fondo');
        this.fondo.setOrigin(0)
        this.fondo.setScale(1);

        //crete title text
        this.titleText = this.add.text(this.scale.width / 2  , this.scale.height * 0.3, "Sant Jordi 2021", {
            fontSize: '64px',
            fill: '#000'
        });
        this.titleText.setOrigin(0.5,0.5);

        //create the Play game button
        this.startStJordi = new UiButton(this, this.scale.width / 2,  this.scale.height * 0.5, 'button1', 'button2','St Jordi', this.startScene.bind(this,'Game',false));
        this.startPrincesa = new UiButton(this, this.scale.width / 2,  this.scale.height * 0.7, 'button1', 'button2','Princesa', this.startScene.bind(this,'Game',true));
        console.log('tilte scene');

    } 

    startScene(targetScene, char){
    
        this.scene.start(targetScene, { isPrinces: char});

    }
    
}