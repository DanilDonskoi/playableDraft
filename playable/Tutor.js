class Tutor {
    display;
    hand;
    timeline;

    firstObject;
    secondObject;

    constructor(object) {     
        this.firstObject = object.firstObject;
        this.secondObject = object.secondObject;

        this.initDisplay();
    }

    initDisplay() {
        this.display = new PIXI.Container();
        this.display.visible = false;

        this.hand = new PIXI.Sprite( assets.textures.pixi.hand );
        this.display.addChild( this.hand );
        this.hand.anchor.set(0.5, 0.5);
        this.hand.scale.set(0.55); 
        this.hand.hitArea = new PIXI.Rectangle(0, 0, 0, 0); 
    }

    show = () => {
        this.display.visible = true;
        gsap.from( this.display, 0.5, { alpha: 0 });
        this.timeline.play();
    }

    hide = () => {        
        this.timeline.pause(0);
        gsap.to( this.display, 0.5, { alpha: 0, onComplete: ()=> this.display.visible = false });
    }

}