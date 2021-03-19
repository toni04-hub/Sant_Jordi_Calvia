class UiButton extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key, hoverKey, text, targetCallback) {
        super(scene, x, y);
        this.scene = scene; //the scene this container will be added to
        this.x = x;
        this.y = y;
        this.key = key;
        this.hoverKey = hoverKey;
        this.text = text;
        this.targetCallback = targetCallback;

        //create our ui  button
        this.createButton();
        this.scene.add.existing(this); //Add this container to our Phaser scene
    }
    createButton() {
        
        //create play game button
        this.button = this.scene.add.image(0, 0, 'button1');
        //make the button interactive
        this.button.setInteractive();
        //scale  the button
        this.button.setScale(1);
        //create the button text
        this.buttonText = this.scene.add.text(0, 0, this.text, {
            fontSize: '26px',
            fill: '#fff'
        });
        //center button text inside ui button
        Phaser.Display.Align.In.Center(this.buttonText, this.button)

        // add the two objects to our container
        this.add(this.button);
        this.add(this.buttonText);

        //liaten for events;
        this.button.on('pointerdown', () => {
            this.targetCallback();
          
        })
        this.button.on('pointerover', () => {
            this.button.setTexture(this.hoverKey);
        })
        this.button.on('pointerout', () => {
            this.button.setTexture(this.key);
        })


    }

}