class BootScene extends Phaser.Scene {
  constructor() {
      super({
          key: 'Boot'
      })
  }
  preload = function() {
    this.load.image('logo', 'assets/mapa_calvia/oveja_.png');
  };
  
  create = function() {
    this.scene.start('Load');
  };
}