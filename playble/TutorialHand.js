class Tutorial {

    constructor() {;
        this.initDisplay();

        app.update.add( this.onUpdate );
    }

    initDisplay() {
        this.display = new PIXI.Container();

        let handSprite = new PIXI.Sprite( assets.textures.pixi['hand'] );
        handSprite.pivot.set(9, 8);
        handSprite.scale.set(0.5);
        handSprite.hitArea = new PIXI.Rectangle(0, 0, 0, 0); 
        
        

        this.display.addChild( handSprite );
        
        this.timeline = gsap.timeline({repeat: -1, repeatDelay: 1, paused: true, delay: 0.5});
        this.timeline.from( handSprite, 0.4, {x: -60, alpha: 0, ease: 'sine.out'});
        this.timeline.to( handSprite.scale, 0.4, {x: 0.45, y: 0.45, repeat: 1, yoyo: true, ease: 'sine.inOut' });	
        this.timeline.to( handSprite, 0.5, {x: 60, alpha: 0});
    }

    stageDownHandler = () => {        
        app.scene2d.off('pointerdown', this.stageDownHandler);
        this.hide(); 
    }

    onUpdate = () => {

    }

    onResize( {leftUI, rightUI, upUI, downUI, orientation} ) {
        if ( orientation === 'portraite' ) {
        } 

        if ( orientation === 'landscape' ) {
        }
    }

    show() {
        app.scene2d.on('pointerdown', this.stageDownHandler);
        this.display.visible = true;
        gsap.to( this.display, 0.5, {alpha: 1} );
        this.timeline.play();
    }

    hide() {        
        gsap.to( this.display, 0.1, {alpha: 0, visible: false} );
        this.handTutor.visible = false;
        this.timeline.pause(0);
    }
}
