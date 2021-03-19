var type;
var title;
console.log(  );
if(window.screen.width < 640 || window.screen.height < 640){
    type = Phaser.Scale.RESIZE;
    title = TitleSceneMobile;
}else{
    type = Phaser.Scale.FIT;
    title = TitleScene;
}
//type = Phaser.Scale.FIT;
var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: 'phaser-game',
    scale: {
        mode: type,
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
    scene: [
        BootScene,
        LoadScene,
        UiScene,
        GameScene,
        title

    ],
    pixelArt: false,
    roundPixels: true,


}

var game = new Phaser.Game(config);