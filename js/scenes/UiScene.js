class UiScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Ui'
        })
    }
    init(data) {
        console.log(data);
        this.data = data;

    }
    preload() {

    }
    create() {

        //create the Play game button
        this.entrarButton = new UiButton(this, this.scale.width / 2, this.scale.height * 0.4, 'button1', 'button2', 'Entrar', this.openLink.bind(this));
        this.tornarButton = new UiButton(this, this.scale.width / 2, this.scale.height * 0.6, 'button1', 'button2', 'Tornar', this.resumeGame.bind(this));


        console.log("Start Ui")
        this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.5)');

    }

    openLink(){
        window.open(this.data.url);
    }

    resumeGame(){
        this.scene.resume('Game');
        this.scene.stop();
    }

}