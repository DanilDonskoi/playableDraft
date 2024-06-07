class OpeningScreen extends Screen { 

    constructor() {
        super();
        this.initScreen();    

        app.resizes.add( this.onResize );        
    }

    initScreen() {
        this.display = new PIXI.Container();
        this.initScene();
    }

    initScene() {
        let filterOutline = new PIXI.filters.OutlineFilter(3, 0xffffff);
        filterOutline.padding = 8;
        
        this.background = new PIXI.Sprite(assets.textures.pixi.openingStage);
        this.background.anchor.set( 0.5, 0.5 );
        this.display.addChild( this.background );
        
        this.character = new PIXI.Container();
        this.display.addChild( this.character );
        
        this.playerImg =  new PIXI.Sprite(assets.textures.pixi.playerImg);
        this.playerImg.anchor.set( 0.5, 0.5 );
        this.playerImg.scale.set( 0.6 );
        this.playerImg.filters = [filterOutline];
        this.character.addChild( this.playerImg );

        this.speechCaption = new PIXI.Container();
        this.character.addChild( this.speechCaption );
        this.speechCaption.visible = false; 
        this.speechCaption.x = 80;     
        this.speechCaption.y = -360;     
        
        let speechBaloon = new PIXI.Sprite( assets.textures.pixi.speechBlnOpen );
        speechBaloon.anchor.set( 0.5, 1 );
        speechBaloon.scale.set( 0.4, 0.4 );
        speechBaloon.visible = true; 
        
        let speech = new PIXI.Sprite( assets.textures.pixi.speechOpen );
        speech.anchor.set( 0.5, 1 );
        speech.scale.set( 0.4, 0.4 );
        speech.visible = true;

        this.speechCaption.addChild( speechBaloon, speech );  
    }

    enter() {
        gsap.from( this.playerImg, 0.3, {alpha: 0} );
        this.playerImg.x = -200;
        gsap.to( this.playerImg, 0.7, {x:0, y:0, ease: "power1.out"} );
        gsap.from( this.speechCaption, 0.5, {alpha: 0, ease: "back.out"});
        gsap.delayedCall( 0.2, () => {
            this.speechCaption.visible = true;
            gsap.from( this.speechCaption.scale, 0.7, {x:0, y:0, ease: "power1.out"} );
        } );
        gsap.delayedCall( 2.5, () => {
            app.screenManager.set( EnemyScreen, undefined, true );             
        })
    }

    exit() {
       //console.log('exit from opening screen')
    }
    
    onResize = ({ isPortraite, leftUI, rightUI, upUI, downUI }) => {               
        if (isPortraite) {
            this.background.height = downUI - upUI;
            this.background.width = 720 * this.background.height/1080;

            this.character.position.set(-50, 200 );         
        } else {            
            this.background.width = rightUI - leftUI;
            this.background.height = 1080 * this.background.width/720;

            this.character.position.set(0, 80);
            this.character.scale.set(0.68);
        }
    }
}

