class FinishScreen extends Screen {
    
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
        filterOutline.padding = 10;

        this.bckgrndCity = new PIXI.Sprite(assets.textures.pixi.bigCity);        
        this.bckgrndCity.anchor.set( 0.5, 0.5 );
        this.bckgrndCity.visible = false;

        this.bckgrndCanyonCity = new PIXI.Sprite(assets.textures.pixi.canyonCity);        
        this.bckgrndCanyonCity.anchor.set( 0.5, 0.5 );
        this.bckgrndCanyonCity.visible = true;

        this.bckgrndDesert = new PIXI.Sprite(assets.textures.pixi.bigDesert);        
        this.bckgrndDesert.anchor.set( 0.5, 0.5 );
        this.bckgrndDesert.visible = false;

        this.bckgrndCave = new PIXI.Sprite(assets.textures.pixi.bigCave);        
        this.bckgrndCave.anchor.set( 0.5, 0.5 );
        this.bckgrndCave.visible = false;

        this.display.addChild( this.bckgrndCity, this.bckgrndCanyonCity, this.bckgrndDesert, this.bckgrndCave );

        this.caption = new PIXI.Container();
        this.display.addChild( this.caption );
        this.caption.filters = [filterOutline];

        this.captionPortraite = new PIXI.Sprite( assets.textures.pixi.awardPortraite );
        this.captionPortraite.visible = false;
        this.captionPortraite.anchor.set( 0.5 );
        this.captionPortraite.scale.set( 1 );

        this.captionLandscape = new PIXI.Sprite( assets.textures.pixi.awardLandscape );
        this.captionLandscape.visible = false;
        this.captionLandscape.anchor.set( 0.5 );
        this.captionLandscape.scale.set( 1 );

        this.caption.addChild( this.captionPortraite, this.captionLandscape );
        this.initAward();
    }

    initAward() {
        this.award = new PIXI.Container();
        this.display.addChild( this.award );

        this.boxLid = new PIXI.Sprite(assets.textures.pixi.boxLid);
        this.boxLid.anchor.set(0.5);        

        let glowMask = new PIXI.Sprite(assets.textures.pixi.glowMask);
        glowMask.anchor.set(0.5);

        let boxBase = new PIXI.Sprite(assets.textures.pixi.boxBase);
        boxBase.anchor.set(0.5);

        let mask = new PIXI.Sprite(assets.textures.pixi.glow);
        mask.anchor.set(0.5);

        let glow = new PIXI.Sprite(assets.textures.pixi.glow);
        glow.anchor.set(0.5);

        glowMask.mask = mask

        this.award.addChild(  glow, mask, boxBase, glowMask, this.boxLid );
    }

    enter( object ) {
        gsap.from( this.caption, 0.5, {alpha: 0, onComplete: () => {
            gsap.to(this.boxLid, 1, {y: -50, ease: "power1.out"} )
        }});
        
        gsap.from( this.captionPortraite.scale, 0.4, {x: 1.1, y: 1.1, repeat: -1, yoyo: true, ease: 'sine.inOut'} );
        gsap.from( this.captionLandscape.scale, 0.4, {x: 1.1, y: 1.1, repeat: -1, yoyo: true, ease: 'sine.inOut'} );
        
        switch (object.arenaName ) {
            case 'city':
                this.bckgrndCity.visible = true;
                gsap.from( this.bckgrndCity, 0.4, {alpha: 0} );
                break;

            case 'commandCenter':
                this.bckgrndCanyonCity.visible = true;
                gsap.from( this.bckgrndCity, 0.4, {alpha: 0} );
                break;
                
            case 'desert':
                this.bckgrndDesert.visible = true;
                gsap.from( this.bckgrndCity, 0.4, {alpha: 0} );
                break;

            case 'cave':
                this.bckgrndCave.visible = true;
                gsap.from( this.bckgrndCity, 0.4, {alpha: 0} );
                break;
        }
    }

    exit() {
       //console.log('exit from finish screen')
    }
    
    onResize = ({ isPortraite, leftUI, rightUI, upUI, downUI }) => {               
        if (isPortraite) {
            this.bckgrndCity.height = downUI - upUI;
            this.bckgrndCity.width = 720 * this.bckgrndCity.height/780;
            this.bckgrndCanyonCity.height = downUI - upUI;
            this.bckgrndCanyonCity.width = 720 * this.bckgrndCanyonCity.height/780;
            this.bckgrndDesert.height = downUI - upUI;
            this.bckgrndDesert.width = 720 * this.bckgrndDesert.height/780;
            this.bckgrndCave.height = downUI - upUI;
            this.bckgrndCave.width = 720 * this.bckgrndCave.height/780;           
                        
            this.captionPortraite.visible = true;
            this.captionLandscape.visible = false;
            this.caption.position.set(0, -360);
            this.caption.scale.set(0.9);

            this.award.position.set(0, 50)
        } else {            
            this.bckgrndCity.width = rightUI - leftUI;
            this.bckgrndCity.height = 780 * this.bckgrndCity.width/720;
            this.bckgrndCanyonCity.height = rightUI - leftUI;
            this.bckgrndCanyonCity.width = 780 * this.bckgrndCanyonCity.width/720;
            this.bckgrndDesert.height = rightUI - leftUI;
            this.bckgrndDesert.width = 780 * this.bckgrndDesert.width/720;
            this.bckgrndCave.height = rightUI - leftUI;
            this.bckgrndCave.width = 780 * this.bckgrndCave.width/720;

            this.captionLandscape.visible = true;
            this.captionPortraite.visible = false;
            this.caption.position.set(0, -220);
            this.caption.scale.set(0.9);
            
            this.award.position.set(0, 80)
        }
    }
}

