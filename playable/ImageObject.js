class ImageObj { 
    imagePath;

    constructor( imagePath ) {   
        this.imagePath = imagePath;
        this.initDisplay();
    }

    initDisplay() {
        this.display = new PIXI.Container();
        this.initImage();
    }

    initImage() {
        let image = new PIXI.Sprite(this.imagePath);
        image.anchor.set( 0.5 );
        this.display.addChild( image );
    }

	hide() {
		gsap.to( this.display, 0.5, {alpha: 0, visible: false} );
	}

	show() {
		this.display.visible = true;
		gsap.to( this.display, 0.5, {alpha: 1} );
	}

}

