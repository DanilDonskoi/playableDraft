class FightScreen extends Screen {
    selectedObjects = {};
    
    constructor() {
        super();
        this.initScreen();
        app.resizes.add( this.onResize );        
    }

    initScreen() {
        this.display = new PIXI.Container();
        
        this.initSpine();
        this.initScene();
    }

    initScene() {
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

        this.initCharacters();
    }  

    initSpine() {
        this.initSpineRita();
        this.initSpineGhoul();
        this.initSpinePlayer();        
    }

    initSpineRita() {
        let rawSkeletonData = JSON.parse(jsonRitaData);
        let rawAtlasData = atlasRita;

        let spineAtlas = new PIXI.spine.TextureAtlas(rawAtlasData, function(line, callback) {
            callback( assets.textures.pixi.imagesRita.baseTexture)
        });

        let spineAtlasLoader = new PIXI.spine.AtlasAttachmentLoader(spineAtlas)
        let spineJsonParser = new PIXI.spine.SkeletonJson(spineAtlasLoader);
        this.spineData = spineJsonParser.readSkeletonData(rawSkeletonData);
        
        this.spineRita = new PIXI.spine.Spine(this.spineData);
        this.spineRita.autoUpdate = true;
    }

    initSpineGhoul() {
        let rawSkeletonData = JSON.parse(jsonGhoulData);
        let rawAtlasData = atlasGhoul;

        let spineAtlas = new PIXI.spine.TextureAtlas(rawAtlasData, function(line, callback) {
            callback( assets.textures.pixi.imagesGhoul.baseTexture)
        });

        let spineAtlasLoader = new PIXI.spine.AtlasAttachmentLoader(spineAtlas)
        let spineJsonParser = new PIXI.spine.SkeletonJson(spineAtlasLoader);
        this.spineData = spineJsonParser.readSkeletonData(rawSkeletonData);
        
        this.spineGhoul = new PIXI.spine.Spine(this.spineData);
        this.spineGhoul.autoUpdate = true;    
    }

    initSpinePlayer() {
        let rawSkeletonData = JSON.parse(jsonRangerData);
        let rawAtlasData = atlasRanger;

        let spineAtlas = new PIXI.spine.TextureAtlas(rawAtlasData, function(line, callback) {
            callback( assets.textures.pixi.imagesRanger.baseTexture)
        });

        let spineAtlasLoader = new PIXI.spine.AtlasAttachmentLoader(spineAtlas)
        let spineJsonParser = new PIXI.spine.SkeletonJson(spineAtlasLoader);
        this.spineData = spineJsonParser.readSkeletonData(rawSkeletonData);
        
        this.spineRanger = new PIXI.spine.Spine(this.spineData);
        this.spineRanger.autoUpdate = true; 
    }

    initCharacters() {        
        this.display.addChild(this.spineRanger);
        this.spineRanger.visible = true;
                
        this.display.addChild(this.spineRita);
        this.spineRita.visible = false;

        this.display.addChild(this.spineGhoul);
        this.spineGhoul.visible = false;
    }
    
    enter( object ) {
        //console.log('enter from fight screen');

        this.spineRanger.visible = true;
        gsap.from( this.spineRanger.scale, 0.7, {x:0.7, y:0.7, ease: "power1.out"} ); 
       
        switch (object.enemyName ) {
            case 'Rita':
                this.spineRita.visible = true;
                gsap.from( this.background, 0.8, {alpha: 0} );
                gsap.from( this.spineRita.scale, 0.7, {x:0.7, y:0.7, ease: "power1.out"} );
                break;

            case 'Ghoul':
                this.spineGhoul.visible = true; 
                gsap.from( this.background, 0.8, {alpha: 0} );
                gsap.from( this.spineGhoul.scale, 0.7, {x:0.7, y:0.7, ease: "power1.out"} );             
                break;
        }

        switch (object.arenaName ) {
            case 'city':
                this.bckgrndCity.visible = true;
                this.selectedObjects.arenaName = object.arenaName;
                gsap.from( this.bckgrndCity, 0.4, {alpha: 0} );
                break;

            case 'highSchool':
                this.bckgrndHighSchool.visible = true;
                this.selectedObjects.arenaName = object.arenaName;
                gsap.from( this.bckgrndCity, 0.4, {alpha: 0} );
                break;
                
            case 'desert':
                this.bckgrndDesert.visible = true;
                this.selectedObjects.arenaName = object.arenaName;
                gsap.from( this.bckgrndCity, 0.4, {alpha: 0} );
                break;

            case 'cave':
                this.bckgrndCave.visible = true;
                this.selectedObjects.arenaName = object.arenaName;
                gsap.from( this.bckgrndCity, 0.4, {alpha: 0} );
                break;
        }
        gsap.delayedCall( 2.5, () => {
            app.screenManager.set( FinishScreen, this.selectedObjects, true );             
        })
    }

    exit() {
       //console.log('exit from fight screen')
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
            
            this.spineRanger.position.set(-170, 500);
            this.spineRanger.scale.set(0.14, 0.14);
            
            this.spineRita.position.set(170, 500);
            this.spineRita.scale.set(-0.14, 0.14);
            
            this.spineGhoul.position.set(170, 500);
            this.spineGhoul.scale.set(-0.14, 0.14);
        } else {            
            this.bckgrndCity.width = rightUI - leftUI;
            this.bckgrndCity.height = 780 * this.bckgrndCity.width/720;
            this.bckgrndCanyonCity.height = rightUI - leftUI;
            this.bckgrndCanyonCity.width = 780 * this.bckgrndCanyonCity.width/720;
            this.bckgrndDesert.height = rightUI - leftUI;
            this.bckgrndDesert.width = 780 * this.bckgrndDesert.width/720;
            this.bckgrndCave.height = rightUI - leftUI;
            this.bckgrndCave.width = 780 * this.bckgrndCave.width/720;
            
            this.spineRanger.position.set(-250, 500);
            this.spineRanger.scale.set(0.14, 0.14);
            
            this.spineRita.position.set(250, 500);
            this.spineRita.scale.set(-0.14, 0.14);

            this.spineGhoul.position.set(250, 500);
            this.spineGhoul.scale.set(-0.14, 0.14);
        }
    }   

}



