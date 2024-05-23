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
        this.initTutor();
        
    }

    initScene() {        
        this.mainScene = new PIXI.Container();
        this.display.addChild( this.mainScene );
        
        this.enemyRita = new PIXI.Sprite(assets.textures.pixi.enemyRita);
        this.enemyRita.anchor.set( 0.5, 0.5 );
        this.enemyRita.scale.set( 0.5 );        
        this.enemyRita.name = 'Rita';
        this.enemyRita.interactive = true;
        this.enemyRita.on( 'pointertap', this.onEnemyTap );

        this.enemyGhoul =  new PIXI.Sprite(assets.textures.pixi.enemyGhoul);
        this.enemyGhoul.anchor.set( 0.5, 0.5 );
        this.enemyGhoul.scale.set( 0.5 );        
        this.enemyGhoul.name = 'Ghoul';
        this.enemyGhoul.interactive = true;
        this.enemyGhoul.on( 'pointertap', this.onEnemyTap );
        //
        this.mainScene.addChild( this.enemyRita, this.enemyGhoul );

        this.caption = new PIXI.Container();
        this.display.addChild( this.caption );

        this.captionPortraite = new PIXI.Sprite( assets.textures.pixi.choicePortraite );
        this.captionPortraite.visible = false;
        this.captionPortraite.anchor.set( 0.5 );
        this.captionPortraite.scale.set( 1 );

        this.captionLandscape = new PIXI.Sprite( assets.textures.pixi.choiceLandscape );
        this.captionLandscape.visible = false;
        this.captionLandscape.anchor.set( 0.5 );
        this.captionLandscape.scale.set( 1 );

        this.caption.addChild( this.captionPortraite, this.captionLandscape ); 
    }
    
    initTutor() {      
        this.tutorEnemy.firstObject = this.enemyRita;
        this.tutorEnemy.secondObject = this.enemyGhoul;

        this.tutorSelect = new Tutor( this.tutorEnemy );
        this.display.addChild( this.tutorSelect.display );                     
        
        this.tutorSelect.timeline = gsap.timeline({repeat: -1, repeatDelay: 1, paused: true, delay: 0.5});
        this.tutorSelect.timeline.from( this.tutorSelect.hand, 0.4, {x: -200, alpha: 0, ease: 'sine.out'});
        this.tutorSelect.timeline.to( this.tutorSelect.hand.scale, 0.4, {x: 0.45, y: 0.45, repeat: 1, yoyo: true, ease: 'sine.inOut' });	
        this.tutorSelect.timeline.to( this.tutorSelect.firstObject.scale, 0.4, {x: 0.55, y: 0.55, delay: -0.4, repeat: 1, yoyo: true, ease: 'sine.inOut' });	

        this.tutorSelect.timeline.to( this.tutorSelect.hand, 0.6, {x: 220, ease: 'sine.inOut'});
        this.tutorSelect.timeline.to( this.tutorSelect.hand.scale, 0.4, {x: 0.45, y: 0.45, repeat: 1, yoyo: true, ease: 'sine.inOut' });	
        this.tutorSelect.timeline.to( this.tutorSelect.secondObject.scale, 0.4, {x: 0.55, y: 0.55, delay: -0.4, repeat: 1, yoyo: true, ease: 'sine.inOut' });	
        this.tutorSelect.timeline.to( this.tutorSelect.hand, 0.5, {x: 340, alpha: 0});
        //this.tutorSelect.show(); 
    }
    enter() {
        //console.log('enter from Select screen');
        gsap.from( this.caption, 0.5, {alpha: 0} );
        gsap.from( this.enemyRita.scale, 0.7, {x:0.7, y:0.7, ease: "power1.out"} );
        gsap.from( this.enemyGhoul.scale, 0.7, {x:0.7, y:0.7, ease: "power1.out"} );
        gsap.from( this.captionPortraite.scale, 0.4, {x: 1.1, y: 1.1, repeat: -1, yoyo: true, ease: 'sine.inOut'} );
        gsap.from( this.captionLandscape.scale, 0.4, {x: 1.1, y: 1.1, repeat: -1, yoyo: true, ease: 'sine.inOut'} );

        setTimeout( this.tutorSelect.show, 1500 );
    }

    exit() {
       //console.log('exit from Select screen')
    }

    onEnemyTap = (event)=> {        
        let filterOutline = new PIXI.filters.OutlineFilter(3, 0xffffff);
        filterOutline.padding = 8;

        switch( event.currentTarget.name ) {
            case 'Rita':
                this.tutorSelect.hide();
                this.selectedEnemy.enemyName = event.currentTarget.name;
                this.enemyRita.filters = [filterOutline];
                gsap.to( this.enemyGhoul, 0.5, { alpha: 0 });
                gsap.to( this.enemyRita.scale, 0.4, {x: 0.58, y: 0.58, ease: 'sine.inOut', onComplete: () => {
                    gsap.to( this.enemyRita, 0.6, {x: 50, y: -80, ease: 'sine.inOut'});
                }});
                gsap.delayedCall( 2.5, () => {
                    app.screenManager.set( ArenaScreen, this.selectedEnemy, true );             
                });
                this.enemyRita.off( 'pointertap', this.onCardTap );
                break;

            case 'Ghoul':
                this.tutorSelect.hide();
                this.selectedEnemy.enemyName = event.currentTarget.name;
                this.enemyGhoul.filters = [filterOutline];
                gsap.to( this.enemyRita, 0.5, { alpha: 0 });
                gsap.to( this.enemyGhoul.scale, 0.4, {x: 0.58, y: 0.58, ease: 'sine.inOut', onComplete: () => {
                    gsap.to( this.enemyGhoul, 0.6, {x: 50, y: -80, ease: 'sine.inOut'});
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
            this.background.width = 720 * this.background.height/1280;
  
            this.mainScene.position.set(-50, 200);
            this.enemyRita.position.set(-120, -80);
            this.enemyGhoul.position.set(220, -80);
             
            this.captionPortraite.visible = true;
            this.captionLandscape.visible = false;
            this.caption.position.set(0, -420);
            this.caption.scale.set(0.72); 
            
            this.tutorSelect.hand.position.set(-120, 60);
            this.tutorSelect.hand.scale.set(0.55); 
        } else {            
            this.background.width = rightUI - leftUI;
            this.background.height = 1280 * this.background.width/720;

            this.mainScene.position.set(0, 280);
            this.enemyRita.position.set(-150, -80);
            this.enemyGhoul.position.set(250, -80);

            this.captionLandscape.visible = true;
            this.captionPortraite.visible = false;
            this.caption.position.set(50, -220);
            this.caption.scale.set(0.72);  
            
            this.tutorSelect.hand.position.set(-120, 100);
            this.tutorSelect.hand.scale.set(0.55); 
        }
    }
}

