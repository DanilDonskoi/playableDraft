class ArenaScreen extends Screen {
    selectedObjects = {};
    tutorObjects = {};  

    constructor() {
        super();
        this.initScreen();
        app.resizes.add( this.onResize );        
    }

    initScreen() {
        this.display = new PIXI.Container();
        this.initScene();
        this.initTutor();
    }

    initScene() {
        this.background = new PIXI.Sprite(assets.textures.pixi.openingStage);
        this.background.anchor.set( 0.5, 0.5 );
        this.display.addChild( this.background ); 
        
        this.initChoiceArena();       
    }

    initChoiceArena() {
        let filterOutlineSub = new PIXI.filters.OutlineFilter( 3, 0x009D91);
        filterOutlineSub.padding = 3;

        this.choiceArena = new PIXI.Container();
        this.display.addChild( this.choiceArena );

        this.firstArena = new PIXI.Sprite( assets.textures.pixi.park );
        this.firstArena.anchor.set( 0.5, 0.5 );
        this.firstArena.filters = [filterOutlineSub];
        this.firstArena.position.set(-152, -115);   
        this.firstArena.scale.set( 0.2 );
        this.firstArena.width = 285;
        this.firstArena.height = 215;
        this.firstArena.name = 'park';
        this.firstArena.interactive = true;
        this.firstArena.on( 'pointertap', this.onArenaTap );        

        this.secondArena = new PIXI.Sprite( assets.textures.pixi.canyonCity );
        this.secondArena.anchor.set( 0.5, 0.5 );
        this.secondArena.filters = [filterOutlineSub];
        this.secondArena.position.set(152, -115);   
        this.secondArena.scale.set( 0.2 );
        this.secondArena.width = 285;
        this.secondArena.height = 215;
        this.secondArena.name = 'canyonCity';
        this.secondArena.interactive = true;
        this.secondArena.on( 'pointertap', this.onArenaTap );

        this.choiceArena.addChild( this.firstArena, this.secondArena );

        this.thirdArena = new PIXI.Sprite( assets.textures.pixi.desert );
        this.thirdArena.anchor.set( 0.5, 0.5 );
        this.thirdArena.filters = [filterOutlineSub];
        this.thirdArena.position.set(-152, 115);   
        this.thirdArena.scale.set( 0.2 );
        this.thirdArena.width = 285;
        this.thirdArena.height = 215;
        this.thirdArena.name = 'desert';
        this.thirdArena.interactive = true;
        this.thirdArena.on( 'pointertap', this.onArenaTap );

        this.fourArena = new PIXI.Sprite( assets.textures.pixi.cave );
        this.fourArena.anchor.set( 0.5, 0.5 );
        this.fourArena.filters = [filterOutlineSub];
        this.fourArena.position.set(152, 115);   
        this.fourArena.scale.set( 0.2 );
        this.fourArena.width = 285;
        this.fourArena.height = 215;
        this.fourArena.name = 'cave';
        this.fourArena.interactive = true;
        this.fourArena.on( 'pointertap', this.onArenaTap );

        this.choiceArena.addChild( this.thirdArena, this.fourArena );

        this.caption = new PIXI.Container();
        this.display.addChild( this.caption );

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
    
    initTutor() {      
        this.tutorObjects.firstObject = this.firstArena;
        this.tutorObjects.secondObject = this.secondArena;

        this.tutorSelect = new Tutor( this.tutorObjects );
        this.display.addChild( this.tutorSelect.display ); 

        this.tutorSelect.hand.position.set(-110, -20);       
               
        this.tutorSelect.timeline = gsap.timeline({repeat: -1, repeatDelay: 1, paused: true, delay: 0.5});
        this.tutorSelect.timeline.from( this.tutorSelect.hand, 0.4, {x: -200, alpha: 0, ease: 'sine.out'});
        this.tutorSelect.timeline.to( this.tutorSelect.hand.scale, 0.4, {x: 0.45, y: 0.45, repeat: 1, yoyo: true, ease: 'sine.inOut' });	
        this.tutorSelect.timeline.to( this.tutorSelect.firstObject, 0.4, {alpha: 0, delay: -0.4, repeat: 1, yoyo: true, ease: 'sine.inOut' });	

        this.tutorSelect.timeline.to( this.tutorSelect.hand, 0.6, {x: 210, ease: 'sine.inOut'});
        this.tutorSelect.timeline.to( this.tutorSelect.hand.scale, 0.4, {x: 0.45, y: 0.45, repeat: 1, yoyo: true, ease: 'sine.inOut' });	
        this.tutorSelect.timeline.to( this.tutorSelect.secondObject, 0.4, {alpha: 0, delay: -0.4, repeat: 1, yoyo: true, ease: 'sine.inOut' });	
        this.tutorSelect.timeline.to( this.tutorSelect.hand, 0.5, {x: 340, alpha: 0});
        //this.tutorSelect.show(); 
    }

    enter(object) {
        //console.log('enter from Arena screen');
        this.selectedObjects.enemyName = object.enemyName;

        gsap.from( this.choiceArena, 0.6, {alpha: 0} );
        gsap.from( this.caption, 0.5, {alpha: 0, repeat: -1, yoyo: true, ease: 'sine.inOut'} );
        gsap.from( this.choiceArena.scale, 0.7, {x:0.7, y:0.7, ease: "power1.out"} );
        
        setTimeout( this.tutorSelect.show, 1500 );
    }

    exit() {
       //console.log('exit from Arena screen')
    }

    onArenaTap = (event) => {
        let filterOutline = new PIXI.filters.OutlineFilter(5, 0xFF0000);
        filterOutline.padding = 10;

        switch( event.currentTarget.name ) {
            case 'park':
                this.selectedObjects.arenaName = event.currentTarget.name;
                this.firstArena.filters = [filterOutline];
                this.tutorSelect.hide();
                gsap.to( this.secondArena, 0.5, { alpha: 0 });
                gsap.to( this.thirdArena, 0.5, { alpha: 0 });
                gsap.to( this.fourArena, 0.5, { alpha: 0 });
                gsap.to( this.firstArena, 0.6, {x: 0, y: 0, ease: 'sine.inOut', onComplete: () => {
                    gsap.to( this.firstArena.scale, 0.4, {x: 0.47, y: 0.62, ease: 'sine.inOut'});
                    gsap.to( this.firstArena, 0.6, { alpha: 0 , delay: 0.4, repeat: -1, yoyo: true, ease: 'sine.inOut'});
                    //
                }});
                gsap.delayedCall( 2.5, () => {
                    app.screenManager.set( FightScreen, this.selectedObjects, true );             
                });
                this.firstArena.off( 'pointertap', this.onArenaTap );
                this.firstArena.interactive = false;
                break;

                case 'canyonCity':
                this.selectedObjects.arenaName = event.currentTarget.name;
                this.secondArena.filters = [filterOutline];
                this.tutorSelect.hide();
                gsap.to( this.firstArena, 0.5, { alpha: 0 });
                gsap.to( this.thirdArena, 0.5, { alpha: 0 });
                gsap.to( this.fourArena, 0.5, { alpha: 0 });
                gsap.to( this.secondArena, 0.6, {x: 0, y: 0, ease: 'sine.inOut', onComplete: () => {
                    gsap.to( this.secondArena.scale, 0.4, {x: 0.47, y: 0.62, ease: 'sine.inOut'});
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
                this.tutorSelect.hide();
                gsap.to( this.firstArena, 0.5, { alpha: 0 });
                gsap.to( this.secondArena, 0.5, { alpha: 0 });
                gsap.to( this.fourArena, 0.5, { alpha: 0 });
                gsap.to( this.thirdArena, 0.6, {x: 0, y: 0, ease: 'sine.inOut', onComplete: () => {
                    gsap.to( this.thirdArena.scale, 0.4, {x: 0.47, y: 0.62, ease: 'sine.inOut'});
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
                this.tutorSelect.hide();
                gsap.to( this.firstArena, 0.5, { alpha: 0 });
                gsap.to( this.secondArena, 0.5, { alpha: 0 });
                gsap.to( this.thirdArena, 0.5, { alpha: 0 });
                gsap.to( this.fourArena, 0.6, {x: 0, y: 0, ease: 'sine.inOut', onComplete: () => {
                    gsap.to( this.fourArena.scale, 0.4, {x: 0.47, y: 0.62, ease: 'sine.inOut'});
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
            this.choiceArena.position.set( 0, 30 );             
            
            this.captionPortraite.visible = true;
            this.captionLandscape.visible = false;
            this.caption.position.set(10, -420);
            this.caption.scale.set(0.7);
            
            this.tutorSelect.hand.scale.set(0.55);

        } else {            
            this.background.width = rightUI - leftUI;
            this.background.height = 1280 * this.background.width/720;

            this.choiceArena.scale.set( 1.15 );  
            this.choiceArena.position.set( 0, 50 );

            this.captionLandscape.visible = true;
            this.captionPortraite.visible = false;
            this.caption.position.set(0, -280);
            this.caption.scale.set(0.65);

            this.tutorSelect.hand.position.set(-130, -20);
            this.tutorSelect.hand.scale.set(0.55);
        }
    }
}

