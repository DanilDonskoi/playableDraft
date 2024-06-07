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

        this.bckgrndPark = new PIXI.Sprite(assets.textures.pixi.park);        
        this.bckgrndPark.anchor.set(0.5, 0.5);
        this.bckgrndPark.visible = false;

        this.bckgrndCanyonCity = new PIXI.Sprite(assets.textures.pixi.canyonCity);        
        this.bckgrndCanyonCity.anchor.set(0.5, 0.5);
        this.bckgrndCanyonCity.visible = false;

        this.bckgrndDesert = new PIXI.Sprite(assets.textures.pixi.desert);        
        this.bckgrndDesert.anchor.set(0.5, 0.5);
        this.bckgrndDesert.visible = false;

        this.bckgrndCave = new PIXI.Sprite(assets.textures.pixi.cave);        
        this.bckgrndCave.anchor.set(0.5, 0.5);
        this.bckgrndCave.visible = false;

        this.display.addChild(this.bckgrndPark, this.bckgrndCanyonCity, this.bckgrndDesert, this.bckgrndCave);

        this.caption = new PIXI.Container();
        this.display.addChild( this.caption );
        this.caption.filters = [filterOutline];

        this.captionPortraite = new PIXI.Sprite(assets.textures.pixi.awardPortraite);
        this.captionPortraite.visible = false;
        this.captionPortraite.anchor.set(0.5);
        this.captionPortraite.scale.set(1);

        this.captionLandscape = new PIXI.Sprite(assets.textures.pixi.awardLandscape);
        this.captionLandscape.visible = false;
        this.captionLandscape.anchor.set(0.5);
        this.captionLandscape.scale.set(1);

        this.downloadBtn = new PIXI.Sprite(assets.textures.pixi.downloadBtn);
        this.downloadBtn.visible = true;
        this.downloadBtn.anchor.set(0.5);

        this.display.addChild(this.downloadBtn);

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

        let yellow = new PIXI.Sprite( assets.textures.pixi.yellow)
        yellow.anchor.set(0.5);

        glowMask.mask = mask;
        yellow.y = 100;

        //this.award.addChild(  glow, mask, boxBase, glowMask, this.boxLid, );
        this.award.addChild(  glow, boxBase, mask, glowMask, this.boxLid )
    }

    enter( object ) {        
        gsap.from( this.caption, 0.5, {alpha: 0, onComplete: () => {
            gsap.to(this.boxLid, 1, {y: -50, ease: "power1.out"} )
        }});
        
        appEndGame();
        // gsap.from( this.captionPortraite.scale, 0.4, {x: 1.1, y: 1.1, repeat: -1, yoyo: true, ease: 'sine.inOut'} );
        // gsap.from( this.captionLandscape.scale, 0.4, {x: 1.1, y: 1.1, repeat: -1, yoyo: true, ease: 'sine.inOut'} );
        
        switch (object.arenaName ) {
            case 'park':
                this.bckgrndPark.visible = true;
                gsap.from( this.bckgrndPark, 0.4, {alpha: 0} );
                break;

            case 'canyonCity':
                this.bckgrndCanyonCity.visible = true;
                gsap.from( this.bckgrndPark, 0.4, {alpha: 0} );
                break;
                
            case 'desert':
                this.bckgrndDesert.visible = true;
                gsap.from( this.bckgrndPark, 0.4, {alpha: 0} );
                break;

            case 'cave':
                this.bckgrndCave.visible = true;
                gsap.from( this.bckgrndPark, 0.4, {alpha: 0} );
                break;
        }
    }

    exit() {
       //console.log('exit from finish screen')
    }
    
    onResize = ({ isPortraite, leftUI, rightUI, upUI, downUI }) => {               
        if (isPortraite) {
            this.bckgrndPark.height = downUI - upUI;
            this.bckgrndPark.width = 720 * this.bckgrndPark.height/1080;
            this.bckgrndCanyonCity.height = downUI - upUI;
            this.bckgrndCanyonCity.width = 720 * this.bckgrndCanyonCity.height/1080;
            this.bckgrndDesert.height = downUI - upUI;
            this.bckgrndDesert.width = 720 * this.bckgrndDesert.height/1080;
            this.bckgrndCave.height = downUI - upUI;
            this.bckgrndCave.width = 720 * this.bckgrndCave.height/1080;           
                        
            this.captionPortraite.visible = true;
            this.captionLandscape.visible = false;
            this.caption.position.set(0, -360);
            this.caption.scale.set(0.9);

            this.award.position.set(0, 50);
            this.downloadBtn.position.set(0, 450);
            this.downloadBtn.scale.set(1.3);
        } else {            
            this.bckgrndPark.width = rightUI - leftUI;
            this.bckgrndPark.height = 1080 * this.bckgrndPark.width/720;
            this.bckgrndCanyonCity.height = rightUI - leftUI;
            this.bckgrndCanyonCity.width = 1080 * this.bckgrndCanyonCity.width/720;
            this.bckgrndDesert.height = rightUI - leftUI;
            this.bckgrndDesert.width = 1080 * this.bckgrndDesert.width/720;
            this.bckgrndCave.height = rightUI - leftUI;
            this.bckgrndCave.width = 1080 * this.bckgrndCave.width/720;

            this.captionLandscape.visible = true;
            this.captionPortraite.visible = false;
            this.caption.position.set(0, -270);
            this.caption.scale.set(0.9);
            
            this.award.position.set(0, -20);
            this.downloadBtn.position.set(400, 260);
            this.downloadBtn.scale.set(1.1);
        }
    }
}

