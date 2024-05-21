class ArenaScreen extends Screen {
    selectedObjects = {};   

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
        this.background = new PIXI.Sprite(assets.textures.pixi.openingStage);
        this.background.anchor.set( 0.5, 0.5 );
        this.display.addChild( this.background ); 
        
        this.initChoiceArena();       
    }

    initChoiceArena() {
        // let filterOutlineMain = new PIXI.filters.OutlineFilter( 3, 0xffffff);
        // filterOutlineMain.padding = 10;

        let filterOutlineSub = new PIXI.filters.OutlineFilter( 3, 0x009D91);
        filterOutlineSub.padding = 3;

        this.choiceArena = new PIXI.Container();
        this.display.addChild( this.choiceArena );

        let arenaBackground = new PIXI.Sprite( assets.textures.pixi.arenaBackground ); 
        arenaBackground.anchor.set( 0.5, 0.5 );
        arenaBackground.width = 660;
        arenaBackground.height = 480;
        
        //this.choiceArena.filters = [filterOutlineMain];        
        this.choiceArena.addChild( arenaBackground );

        this.firstArena = new PIXI.Sprite( assets.textures.pixi.city );
        this.firstArena.anchor.set( 0.5, 0.5 );
        this.firstArena.filters = [filterOutlineSub];
        this.firstArena.position.set(-152, -115);   
        this.firstArena.scale.set( 0.3 );
        this.firstArena.width = 285;
        this.firstArena.name = 'city';
        this.firstArena.interactive = true;
        this.firstArena.on( 'pointertap', this.onArenaTap );        

        this.secondArena = new PIXI.Sprite( assets.textures.pixi.commandCenter );
        this.secondArena.anchor.set( 0.5, 0.5 );
        this.secondArena.filters = [filterOutlineSub];
        this.secondArena.position.set(152, -115);   
        this.secondArena.scale.set( 0.3 );
        this.secondArena.width = 285;
        this.secondArena.name = 'commandCenter';
        this.secondArena.interactive = true;
        this.secondArena.on( 'pointertap', this.onArenaTap );

        this.choiceArena.addChild( this.firstArena, this.secondArena );

        this.thirdArena = new PIXI.Sprite( assets.textures.pixi.desert );
        this.thirdArena.anchor.set( 0.5, 0.5 );
        this.thirdArena.filters = [filterOutlineSub];
        this.thirdArena.position.set(-152, 115);   
        this.thirdArena.scale.set( 0.3 );
        this.thirdArena.width = 285;
        this.thirdArena.name = 'desert';
        this.thirdArena.interactive = true;
        this.thirdArena.on( 'pointertap', this.onArenaTap );

        this.fourArena = new PIXI.Sprite( assets.textures.pixi.cave );
        this.fourArena.anchor.set( 0.5, 0.5 );
        this.fourArena.filters = [filterOutlineSub];
        this.fourArena.position.set(152, 115);   
        this.fourArena.scale.set( 0.3 );
        this.fourArena.width = 285;
        this.fourArena.name = 'cave';
        this.fourArena.interactive = true;
        this.fourArena.on( 'pointertap', this.onArenaTap );

        this.choiceArena.addChild( this.thirdArena, this.fourArena );

        this.caption = new PIXI.Container();
        this.display.addChild( this.caption ); 
        this.caption.x = 0;     
        this.caption.y = 0;

        this.captionPortraite = new PIXI.Sprite( assets.textures.pixi.locationPortraite );
        this.captionPortraite.visible = false;
        this.captionPortraite.anchor.set( 0.5 );
        this.captionPortraite.scale.set( 1 );

        this.captionLandscape = new PIXI.Sprite( assets.textures.pixi.locationLandscape );
        this.captionLandscape.visible = false;
        this.captionLandscape.anchor.set( 0.5 );
        this.captionLandscape.scale.set( 1 );

        this.caption.addChild( this.captionPortraite, this.captionLandscape );
    }

    enter(object) {
        //console.log('enter from Arena screen');
        this.selectedObjects.enemyName = object.enemyName;

        gsap.from( this.choiceArena, 0.6, {alpha: 0} );
        gsap.from( this.caption, 0.5, {alpha: 0, repeat: -1, yoyo: true, ease: 'sine.inOut'} );
        //gsap.from( this.caption, 0.4, {x: 1.1, y: 1.1, repeat: -1, yoyo: true, ease: 'sine.inOut'} );
        gsap.from( this.choiceArena.scale, 0.7, {x:0.7, y:0.7, ease: "power1.out"} );
    }

    exit() {
       console.log('exit from Select screen')
    }

    onArenaTap = (event) => {
        let filterOutline = new PIXI.filters.OutlineFilter(5, 0xFF0000);
        filterOutline.padding = 10;

        switch( event.currentTarget.name ) {
            case 'city':
                this.selectedObjects.arenaName = event.currentTarget.name;
                this.firstArena.filters = [filterOutline];
                gsap.to( this.secondArena, 0.5, { alpha: 0 });
                gsap.to( this.thirdArena, 0.5, { alpha: 0 });
                gsap.to( this.fourArena, 0.5, { alpha: 0 });
                gsap.to( this.firstArena, 0.6, {x: 0, y: 0, ease: 'sine.inOut', onComplete: () => {
                    gsap.to( this.firstArena.scale, 0.4, {x: 0.5, y: 0.5, ease: 'sine.inOut'});
                    gsap.to( this.firstArena, 0.6, { alpha: 0 , delay: 0.4, repeat: -1, yoyo: true, ease: 'sine.inOut'});
                    //
                }});
                gsap.delayedCall( 2.5, () => {
                    app.screenManager.set( FightScreen, this.selectedObjects, true );             
                });
                this.firstArena.off( 'pointertap', this.onArenaTap );
                this.firstArena.interactive = false;
                break;

                case 'commandCenter':
                this.selectedObjects.arenaName = event.currentTarget.name;
                this.secondArena.filters = [filterOutline];
                gsap.to( this.firstArena, 0.5, { alpha: 0 });
                gsap.to( this.thirdArena, 0.5, { alpha: 0 });
                gsap.to( this.fourArena, 0.5, { alpha: 0 });
                gsap.to( this.secondArena, 0.6, {x: 0, y: 0, ease: 'sine.inOut', onComplete: () => {
                    gsap.to( this.secondArena.scale, 0.4, {x: 0.5, y: 0.5, ease: 'sine.inOut'});
                    gsap.to( this.secondArena, 0.6, { alpha: 0 , delay: 0.4, repeat: -1, yoyo: true, ease: 'sine.inOut'});
                    //
                }});
                gsap.delayedCall( 2.5, () => {
                    app.screenManager.set( FightScreen, this.selectedObjects, true );             
                });
                this.secondArena.off( 'pointertap', this.onArenaTap );
                this.secondArena.interactive = false;
                break;

                case 'desert':
                this.selectedObjects.arenaName = event.currentTarget.name;
                this.thirdArena.filters = [filterOutline];
                gsap.to( this.firstArena, 0.5, { alpha: 0 });
                gsap.to( this.secondArena, 0.5, { alpha: 0 });
                gsap.to( this.fourArena, 0.5, { alpha: 0 });
                gsap.to( this.thirdArena, 0.6, {x: 0, y: 0, ease: 'sine.inOut', onComplete: () => {
                    gsap.to( this.thirdArena.scale, 0.4, {x: 0.5, y: 0.5, ease: 'sine.inOut'});
                    gsap.to( this.thirdArena, 0.6, { alpha: 0 , delay: 0.4, repeat: -1, yoyo: true, ease: 'sine.inOut'});
                    //
                }});
                gsap.delayedCall( 2.5, () => {
                    app.screenManager.set( FightScreen, this.selectedObjects, true );             
                });
                this.thirdArena.off( 'pointertap', this.onArenaTap );
                this.thirdArena.interactive = false;
                break;

                case 'cave':
                this.selectedObjects.arenaName = event.currentTarget.name;
                this.fourArena.filters = [filterOutline];
                gsap.to( this.firstArena, 0.5, { alpha: 0 });
                gsap.to( this.secondArena, 0.5, { alpha: 0 });
                gsap.to( this.thirdArena, 0.5, { alpha: 0 });
                gsap.to( this.fourArena, 0.6, {x: 0, y: 0, ease: 'sine.inOut', onComplete: () => {
                    gsap.to( this.fourArena.scale, 0.4, {x: 0.5, y: 0.5, ease: 'sine.inOut'});
                    gsap.to( this.fourArena, 0.6, { alpha: 0 , delay: 0.4, repeat: -1, yoyo: true, ease: 'sine.inOut'});
                }});
                gsap.delayedCall( 2.5, () => {
                    app.screenManager.set( FightScreen, this.selectedObjects, true );             
                });
                this.fourArena.off( 'pointertap', this.onArenaTap );
                this.fourArena.interactive = false;
                break;
        }
    }
    
    onResize = ({ isPortraite, leftUI, rightUI, upUI, downUI }) => {               
        if (isPortraite) {
            this.background.height = downUI - upUI;
            this.background.width = 720 * this.background.height/1280;

            this.choiceArena.scale.set( 1 ); 
            this.choiceArena.position.set( 0, -80 );             
            
            this.captionPortraite.visible = true;
            this.captionLandscape.visible = false;
            this.caption.position.set(0, -470);
            this.caption.scale.set(0.7);

        } else {            
            this.background.width = rightUI - leftUI;
            this.background.height = 1280 * this.background.width/720;

            this.choiceArena.scale.set( 1.15 );  
            this.choiceArena.position.set( 0, 50 );

            this.captionLandscape.visible = true;
            this.captionPortraite.visible = false;
            this.caption.position.set(0, -280);
            this.caption.scale.set(0.65);
        }
    }
}

