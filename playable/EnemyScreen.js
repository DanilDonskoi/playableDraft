class EnemyScreen extends Screen {
    tutorEnemy = {};
    selectedEnemy = {};

    constructor() {
        super();
        this.initScreen();
        app.resizes.add( this.onResize );        
    }

    initScreen() {
        this.display = new PIXI.Container();
        
        this.background = new PIXI.Sprite(assets.textures.pixi.openingStage);
        this.background.anchor.set( 0.5, 0.5 );
        this.display.addChild( this.background );

        this.initScene();
        this.initPortraiteTutor();        
        this.initLandscapeTutor();        
    }

    initScene() {        
        this.characters = new PIXI.Container();
        this.display.addChild( this.characters );
        
        this.enemyTrickster = new PIXI.Sprite(assets.textures.pixi.enemyTrickster);
        this.enemyTrickster.anchor.set(0.5, 0.5); 
        this.enemyTrickster.scale.set( 0.46 );
        this.enemyTrickster.position.set(-170, -80);
        this.enemyTrickster.name = 'Trickster';
        this.enemyTrickster.interactive = true;
        this.enemyTrickster.on( 'pointertap', this.onEnemyTap );

        this.enemyGhoul =  new PIXI.Sprite(assets.textures.pixi.enemyGhoul);
        this.enemyGhoul.anchor.set(0.5, 0.5);  
        this.enemyGhoul.scale.set( 0.5 ); 
        this.enemyGhoul.position.set(170, -80);  
        this.enemyGhoul.name = 'Ghoul';
        this.enemyGhoul.interactive = true;
        this.enemyGhoul.on( 'pointertap', this.onEnemyTap );

        this.characters.addChild( this.enemyTrickster, this.enemyGhoul );

        this.caption = new PIXI.Container();
        this.display.addChild( this.caption );

        this.captionPortraite = new PIXI.Sprite( assets.textures.pixi.choicePortraite );
        this.captionPortraite.visible = false;
        this.captionPortraite.anchor.set(0.5);
        //this.captionPortraite.scale.set(1);

        this.captionLandscape = new PIXI.Sprite( assets.textures.pixi.choiceLandscape );
        this.captionLandscape.visible = false;
        this.captionLandscape.anchor.set(0.5);
        //this.captionLandscape.scale.set(1);

        this.caption.addChild( this.captionPortraite, this.captionLandscape ); 
    }
    
    initPortraiteTutor() {      
        this.tutorEnemy.firstObject = this.enemyTrickster;
        this.tutorEnemy.secondObject = this.enemyGhoul;

        this.tutorSelectPortraite = new Tutor( this.tutorEnemy );
        this.display.addChild( this.tutorSelectPortraite.display );   
        
        this.tutorSelectPortraite.hand.position.set(-120, 60);
        this.tutorSelectPortraite.hand.scale.set(0.55);
        
        this.tutorSelectPortraite.timeline = gsap.timeline({repeat: -1, repeatDelay: 1, paused: true, delay: 0.5});
        this.tutorSelectPortraite.timeline.from( this.tutorSelectPortraite.hand, 0.4, {x: -200, alpha: 0, ease: 'sine.out'});
        this.tutorSelectPortraite.timeline.to( this.tutorSelectPortraite.hand.scale, 0.4, {x: 0.45, y: 0.45, repeat: 1, yoyo: true, ease: 'sine.inOut' });	
        this.tutorSelectPortraite.timeline.to( this.tutorSelectPortraite.firstObject.scale, 0.4, {x: 0.52, y: 0.52, delay: -0.4, repeat: 1, yoyo: true, ease: 'sine.inOut' });	

        this.tutorSelectPortraite.timeline.to( this.tutorSelectPortraite.hand, 0.6, {x: 220, ease: 'sine.inOut'});
        this.tutorSelectPortraite.timeline.to( this.tutorSelectPortraite.hand.scale, 0.4, {x: 0.45, y: 0.45, repeat: 1, yoyo: true, ease: 'sine.inOut' });	
        this.tutorSelectPortraite.timeline.to( this.tutorSelectPortraite.secondObject.scale, 0.4, {x: 0.55, y: 0.55, delay: -0.4, repeat: 1, yoyo: true, ease: 'sine.inOut' });	
        this.tutorSelectPortraite.timeline.to( this.tutorSelectPortraite.hand, 0.5, {x: 340, alpha: 0});
        //this.tutorSelectPortraite.show(); 
    }
    
    initLandscapeTutor() {      
        this.tutorEnemy.firstObject = this.enemyTrickster;
        this.tutorEnemy.secondObject = this.enemyGhoul;

        this.tutorSelectLandscape = new Tutor( this.tutorEnemy );
        this.display.addChild( this.tutorSelectLandscape.display );   
        
        this.tutorSelectLandscape.hand.position.set(-60, 50);
        this.tutorSelectLandscape.hand.scale.set(0.55); 
        
        this.tutorSelectLandscape.timeline = gsap.timeline({repeat: -1, repeatDelay: 1, paused: true, delay: 0.5});
        this.tutorSelectLandscape.timeline.from( this.tutorSelectLandscape.hand, 0.4, {x: -200, alpha: 0, ease: 'sine.out'});
        this.tutorSelectLandscape.timeline.to( this.tutorSelectLandscape.hand.scale, 0.4, {x: 0.45, y: 0.45, repeat: 1, yoyo: true, ease: 'sine.inOut' });	
        this.tutorSelectLandscape.timeline.to( this.tutorSelectLandscape.firstObject.scale, 0.4, {x: 0.49, y: 0.49, delay: -0.4, repeat: 1, yoyo: true, ease: 'sine.inOut' });	

        this.tutorSelectLandscape.timeline.to( this.tutorSelectLandscape.hand, 0.6, {x: 270, ease: 'sine.inOut'});
        this.tutorSelectLandscape.timeline.to( this.tutorSelectLandscape.hand.scale, 0.4, {x: 0.45, y: 0.45, repeat: 1, yoyo: true, ease: 'sine.inOut' });	
        this.tutorSelectLandscape.timeline.to( this.tutorSelectLandscape.secondObject.scale, 0.4, {x: 0.52, y: 0.52, delay: -0.4, repeat: 1, yoyo: true, ease: 'sine.inOut' });	
        this.tutorSelectLandscape.timeline.to( this.tutorSelectLandscape.hand, 0.5, {x: 340, alpha: 0});
        //this.tutorSelectLandscape.show(); 
    }

    enter() {
        //console.log('enter from Select screen');
        gsap.from( this.caption, 0.5, {alpha: 0} );
        //gsap.from( this.enemyTrickster.scale, 0.7, {x:0.7, y:0.7, ease: "power1.out"} );
        //gsap.from( this.enemyGhoul.scale, 0.7, {x:0.7, y:0.7, ease: "power1.out"} );
        gsap.from( this.captionPortraite.scale, 0.4, {x: 1.1, y: 1.1, repeat: -1, yoyo: true, ease: 'sine.inOut'} );
        gsap.from( this.captionLandscape.scale, 0.4, {x: 1.1, y: 1.1, repeat: -1, yoyo: true, ease: 'sine.inOut'} );

        //setTimeout( this.tutorSelectPortraite.show, 1500 );
    }

    exit() {
       //console.log('exit from Select screen')
    }

    onEnemyTap = (event)=> {        
        let filterOutline = new PIXI.filters.OutlineFilter(3, 0xffffff);
        filterOutline.padding = 8;

        switch( event.currentTarget.name ) {
            case 'Trickster':
                this.tutorSelectPortraite.hide();
                this.tutorSelectLandscape.hide();
                this.selectedEnemy.enemyName = event.currentTarget.name;
                this.enemyTrickster.filters = [filterOutline];
                gsap.to( this.enemyGhoul, 0.5, { alpha: 0 });
                gsap.to( this.enemyTrickster.scale, 0.4, {x: 0.53, y: 0.53, ease: 'sine.inOut', onComplete: () => {
                    gsap.to( this.enemyTrickster, 0.6, {x: 0, ease: 'sine.inOut'});
                }});
                gsap.delayedCall( 2.5, () => {
                    app.screenManager.set( ArenaScreen, this.selectedEnemy, true );             
                });
                this.enemyTrickster.off( 'pointertap', this.onCardTap );
                break;

            case 'Ghoul':
                this.tutorSelectPortraite.hide();
                this.tutorSelectLandscape.hide();
                this.selectedEnemy.enemyName = event.currentTarget.name;
                this.enemyGhoul.filters = [filterOutline];
                gsap.to( this.enemyTrickster, 0.5, { alpha: 0 });
                gsap.to( this.enemyGhoul.scale, 0.4, {x: 0.58, y: 0.58, ease: 'sine.inOut', onComplete: () => {
                    gsap.to( this.enemyGhoul, 0.6, {x: 0, ease: 'sine.inOut'});
                }});
                gsap.delayedCall( 2.5, () => {
                    app.screenManager.set( ArenaScreen, this.selectedEnemy, true );             
                });
                this.enemyGhoul.off( 'pointertap', this.onCardTap );
                break;
        }
    }
     
    onResize = ({ isPortraite, leftUI, rightUI, upUI, downUI }) => {               
        if (isPortraite) {
            this.background.height = downUI - upUI;
            this.background.width = 720 * this.background.height/1080;
  
            this.characters.position.set(0, 200);
            this.characters.scale.set(1);   
            
            setTimeout( this.tutorSelectPortraite.show, 2500 )
            this.tutorSelectLandscape.timeline.pause(0); 
             
            this.captionPortraite.visible = true;
            this.captionLandscape.visible = false;
            this.caption.position.set(0, -430);
            this.caption.scale.set(0.72); 

        } else {            
            this.background.width = rightUI - leftUI;
            this.background.height = 1080 * this.background.width/720;

            this.characters.position.set(0, 130);
            this.characters.scale.set(0.85); 

            setTimeout( this.tutorSelectLandscape.show, 2500 )
            this.tutorSelectPortraite.timeline.pause(0); 
            
            this.captionLandscape.visible = true;
            this.captionPortraite.visible = false;
            this.caption.position.set(0, -240);
            this.caption.scale.set(0.72);  
        }
    }
}

