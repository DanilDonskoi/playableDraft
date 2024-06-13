class FightScreen extends Screen {
    selectedObjects = {};
    tutorObjects = {};
    
    healthRanger = 100;
    healthEnemy = 100;  
    battleProgress = 0;

    constructor() {
        super();
        this.initScreen();
        app.resizes.add(this.onResize);        
    }

    initScreen() {
        this.display = new PIXI.Container();
        this.initSpine();
        this.initScene();
    }  

    initSpine() {
        this.initSpineTrickster();
        this.initSpineGhoul();
        this.initSpinePlayer();   
    }

    initSpineTrickster() {
        let rawSkeletonData = JSON.parse(jsonTricksterData);
        let rawAtlasData = atlasTrickster;

        let spineAtlas = new PIXI.spine.TextureAtlas(rawAtlasData, function(line, callback) {
            callback( assets.textures.pixi.imagesTrickster.baseTexture)
        });

        let spineAtlasLoader = new PIXI.spine.AtlasAttachmentLoader(spineAtlas)
        let spineJsonParser = new PIXI.spine.SkeletonJson(spineAtlasLoader);
        let spineData = spineJsonParser.readSkeletonData(rawSkeletonData);
        
        this.spineTrickster = new PIXI.spine.Spine(spineData);
        this.spineTrickster.autoUpdate = true;
    }

    initSpineGhoul() {
        let rawSkeletonData = JSON.parse(jsonGhoulData);
        let rawAtlasData = atlasGhoul;

        let spineAtlas = new PIXI.spine.TextureAtlas(rawAtlasData, function(line, callback) {
            callback( assets.textures.pixi.imagesGhoul.baseTexture)
        });

        let spineAtlasLoader = new PIXI.spine.AtlasAttachmentLoader(spineAtlas)
        let spineJsonParser = new PIXI.spine.SkeletonJson(spineAtlasLoader);
        let spineData = spineJsonParser.readSkeletonData(rawSkeletonData);
        
        this.spineGhoul = new PIXI.spine.Spine(spineData);
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
        let spineData = spineJsonParser.readSkeletonData(rawSkeletonData);
        
        this.spineRanger = new PIXI.spine.Spine(spineData);
        this.spineRanger.autoUpdate = true; 
    }

    initScene() {
        this.bckgrndPark = new PIXI.Sprite(assets.textures.pixi.park);        
        this.bckgrndPark.anchor.set(0.5);
        this.bckgrndPark.visible = false;

        this.bckgrndCanyonCity = new PIXI.Sprite(assets.textures.pixi.canyonCity);        
        this.bckgrndCanyonCity.anchor.set(0.5);
        this.bckgrndCanyonCity.visible = true;

        this.bckgrndDesert = new PIXI.Sprite(assets.textures.pixi.desert);        
        this.bckgrndDesert.anchor.set(0.5);
        this.bckgrndDesert.visible = false;

        this.bckgrndCave = new PIXI.Sprite(assets.textures.pixi.cave);        
        this.bckgrndCave.anchor.set(0.5);
        this.bckgrndCave.visible = false;

        this.display.addChild(this.bckgrndPark, this.bckgrndCanyonCity, this.bckgrndDesert, this.bckgrndCave);

        this.initCharacters();
        this.initEffectsAnim();
        this.initUI();
    }

    initCharacters() {
        this.characters = new PIXI.Container();
        this.display.addChild(this.characters);

        this.shadowCharacter = new PIXI.Sprite(assets.textures.pixi.shadow);        
        this.shadowCharacter.anchor.set(0.5);
        this.shadowCharacter.scale.set(0.42, 0.32);
        this.shadowCharacter.alpha = 0.5;
        this.shadowCharacter.position.set(-120, 500);
        this.characters.addChild(this.shadowCharacter);

        this.shadowEnemy = new PIXI.Sprite(assets.textures.pixi.shadow);        
        this.shadowEnemy.anchor.set(0.5);
        this.shadowEnemy.scale.set(0.58, 0.45);
        this.shadowEnemy.alpha = 0.5;
        this.shadowEnemy.position.set(120, 500);
        this.characters.addChild(this.shadowEnemy);

        this.spineGhoul.visible = false;
        this.spineGhoul.scale.set(-0.11, 0.11);
        this.spineGhoul.position.set(130, 500);
        this.characters.addChild(this.spineGhoul);
        
        this.spineTrickster.visible = false;
        this.spineTrickster.scale.set(-0.105, 0.105);
        this.spineTrickster.position.set(130, 500);
        this.characters.addChild(this.spineTrickster);       
                        
        this.spineRanger.visible = false;
        this.spineRanger.scale.set(0.11);        
        this.spineRanger.position.set(-120, 500);
        this.characters.addChild(this.spineRanger);
    }    

    initEffectsAnim() {
        this.attackEffect = new PIXI.Container();
        this.characters.addChild( this.attackEffect );

        this.effectCircle = createAnimSprite( assets.textures.pixi['effectCircle'], effectCircleSheetData, 'effectCircle' );	
	    this.effectCircle.anchor.set(0.5, 0.5);
        this.effectCircle.scale.set(1.8);
        this.attackEffect.addChild( this.effectCircle );
        
        this.attackEffect.position.set(40, 200);
        this.effectCircle.visible = false;        
        this.effectCircle.hitArea = new PIXI.Rectangle(0, 0, 0, 0); 
        //this.effectCircle.play();  

        this.effectDown = createAnimSprite( assets.textures.pixi['effectDown'], effectDownSheetData, 'effectDown' );	
	    this.effectDown.anchor.set(0.5);
        this.effectDown.scale.set(1);
        this.effectDown.rotation = 90;
        this.attackEffect.addChild( this.effectDown );
        
        this.effectDown.position.set(100, 0);
        this.effectDown.visible = false;        
        this.effectDown.hitArea = new PIXI.Rectangle(0, 0, 0, 0); 
        //this.effectDown.play();
        
        this.effectRight = createAnimSprite( assets.textures.pixi['effectRight'], effectRightSheetData, 'effectRight' );	
	    this.effectRight.anchor.set(0.5);
        this.effectRight.scale.set(1);
        this.attackEffect.addChild( this.effectRight );
        
        this.effectRight.position.set(150, -50);
        this.effectRight.visible = false;    
        this.effectRight.rotation = 6;    
        this.effectRight.hitArea = new PIXI.Rectangle(0, 0, 0, 0); 
        //this.effectRight.play();
    }

    initUI() {
        this.initRangerProgressBar();
        this.initEnemyProgressBar(); 
        this.initSecondaryScreen();

        this.initTutorBlaster();
        this.initTutorSuperPunch();     
    }

    initSecondaryScreen() {
        this.battleProgressBar = new PIXI.Container();
        this.display.addChild( this.battleProgressBar );

        let iconBlaster = new PIXI.Sprite(assets.textures.pixi.iconBlaster);
        iconBlaster.anchor.set(0.5, 0.5);
        iconBlaster.scale.set(0.3); 
        iconBlaster.position.set(-40, 25); 

        let iconSuperPunch = new PIXI.Sprite(assets.textures.pixi.iconSuperPunch);
        iconSuperPunch.anchor.set(0.5, 0.5);
        iconSuperPunch.scale.set(0.3);
        iconSuperPunch.position.set(240, 25);  

        let textureMain = new PIXI.Texture(assets.textures.pixi.placeholderRed);
        this.progressBarMainBattle = new PIXI.NineSlicePlane(textureMain, 10, 10, 10, 10);

        let textureBack = new PIXI.Texture(assets.textures.pixi.placeholderWhite);
        let progressBarBack = new PIXI.NineSlicePlane(textureBack, 10, 10, 10, 10);
        
        this.progressBarMainBattle.width = 0;
        this.progressBarMainBattle.height = 45;
        this.progressBarMainBattle.position.set(-250, 0);

        progressBarBack.width = 500;
        progressBarBack.height = 45;
        progressBarBack.position.set(-250, 0);

        this.darkScreen = new PIXI.Graphics();
        this.darkScreen.beginFill(0x000000, 0.7);
        this.darkScreen.drawRect(-window.innerWidth, -window.innerHeight, window.innerWidth*2, window.innerHeight*2);
        this.darkScreen.endFill();
        this.darkScreen.visible = false;

        this.blasterBox = new PIXI.Container();
        this.blasterBox.visible = false;
        this.blasterBox.interactive = true;
        this.blasterBox.on('pointertap', this.onBlasterBoxTap);

        this.superPunchBox = new PIXI.Container();
        this.superPunchBox.visible = false;
        this.superPunchBox.interactive = true;
        this.superPunchBox.on('pointertap', this.onSuperPunchBoxTap);

        let activeBlaster = new PIXI.Sprite(assets.textures.pixi.activeBlaster);
        activeBlaster.anchor.set(0.5);
        activeBlaster.scale.set(0.5); 
        activeBlaster.position.set(0, 0); 

        this.burstRayBlaster = new PIXI.Sprite(assets.textures.pixi.burstRayBlaster);
        this.burstRayBlaster.anchor.set(0.5);
        this.burstRayBlaster.scale.set(0.6); 
        this.burstRayBlaster.position.set(0, 0); 

        let activeSuperPunch = new PIXI.Sprite(assets.textures.pixi.activeSuperPunch);
        activeSuperPunch.anchor.set(0.5);
        activeSuperPunch.scale.set(0.5); 
        activeSuperPunch.position.set(0, 0); 

        this.burstRaySuperPunch = new PIXI.Sprite(assets.textures.pixi.burstRaySuperPunch);
        this.burstRaySuperPunch.anchor.set(0.5);
        this.burstRaySuperPunch.scale.set(0.6); 
        this.burstRaySuperPunch.position.set(0, 0);

        this.blasterBox.addChild(this.burstRayBlaster, activeBlaster );
        this.superPunchBox.addChild(this.burstRaySuperPunch, activeSuperPunch );

        this.battleProgressBar.addChild(progressBarBack, this.progressBarMainBattle, iconBlaster, iconSuperPunch); 
        this.display.addChild(this.darkScreen, this.blasterBox, this.superPunchBox);
    }

    initRangerProgressBar() {        
        this.rangerProgressBar = new PIXI.Container();
        this.display.addChild( this.rangerProgressBar );

        let textureMain = new PIXI.Texture(assets.textures.pixi.placeholderGreen);
        this.progressBarMainRanger = new PIXI.NineSlicePlane(textureMain, 10, 10, 10, 10);        

        let textureBack = new PIXI.Texture(assets.textures.pixi.placeholderWhite);
        let progressBarBack = new PIXI.NineSlicePlane(textureBack, 10, 10, 10, 10);        

        this.progressBarMainRanger.width = 150;
        this.progressBarMainRanger.height = 25;
        this.progressBarMainRanger.position.set(0, 0);

        progressBarBack.width = 150;
        progressBarBack.height = 25;
        progressBarBack.position.set(0, 0);

        this.rangerProgressBar.addChild(progressBarBack, this.progressBarMainRanger);
    }

    initEnemyProgressBar() {        
        this.enemyProgressBar = new PIXI.Container();
        this.display.addChild(this.enemyProgressBar);

        let textureMain = new PIXI.Texture(assets.textures.pixi.placeholderGreen);
        this.progressBarMainEnemy = new PIXI.NineSlicePlane(textureMain, 10, 10, 10, 10);        

        let textureBack = new PIXI.Texture(assets.textures.pixi.placeholderWhite);
        let progressBarBack = new PIXI.NineSlicePlane(textureBack, 10, 10, 10, 10);        

        this.progressBarMainEnemy.width = 150;
        this.progressBarMainEnemy.height = 25;
        this.progressBarMainEnemy.position.set(0, 0);

        progressBarBack.width = 150;
        progressBarBack.height = 25;
        progressBarBack.position.set(0, 0);

        this.enemyProgressBar.addChild(progressBarBack, this.progressBarMainEnemy)
    }

    initTutorBlaster() {      
        this.tutorObjects.firstObject = this.blasterBox;
        this.tutorObjects.secondObject = this.superPunchBox;

        this.tutorBlaster = new Tutor(this.tutorObjects);
        this.blasterBox.addChild(this.tutorBlaster.display); 
        this.tutorBlaster.hand.position.set(35, 50);

        this.tutorBlaster.timeline = gsap.timeline({repeat: -1, repeatDelay: 1, paused: true, delay: 0.5});
        this.tutorBlaster.timeline.from(this.tutorBlaster.hand, 0.4, {x: 0, alpha: 0, ease: 'sine.out'});
        this.tutorBlaster.timeline.to(this.tutorBlaster.hand.scale, 0.4, {x: 0.45, y: 0.45, repeat: 1, yoyo: true, ease: 'sine.inOut'});	
        this.tutorBlaster.timeline.to(this.tutorBlaster.firstObject, 0.6, {alpha: 0.4, delay: -0.4, repeat: 1, yoyo: true, ease: 'sine.inOut'});	
        this.tutorBlaster.timeline.to(this.tutorBlaster.hand, 0.5, {x: 120, alpha: 0});
    }

    initTutorSuperPunch() {
        this.tutorObjects.firstObject = this.blasterBox;
        this.tutorObjects.secondObject = this.superPunchBox;

        this.tutorSuperPunch = new Tutor(this.tutorObjects);
        this.superPunchBox.addChild(this.tutorSuperPunch.display);
        this.tutorSuperPunch.hand.position.set(35, 50);
                       
        this.tutorSuperPunch.timeline = gsap.timeline({repeat: -1, repeatDelay: 1, paused: true, delay: 0.5});
        this.tutorSuperPunch.timeline.from(this.tutorSuperPunch.hand, 0.4, {x: 0, alpha: 0, ease: 'sine.out'});
        this.tutorSuperPunch.timeline.to(this.tutorSuperPunch.hand.scale, 0.4, {x: 0.45, y: 0.45, repeat: 1, yoyo: true, ease: 'sine.inOut'});	
        this.tutorSuperPunch.timeline.to(this.tutorSuperPunch.secondObject, 0.6, {alpha: 0.4, delay: -0.4, repeat: 1, yoyo: true, ease: 'sine.inOut'});	
        this.tutorSuperPunch.timeline.to(this.tutorSuperPunch.hand, 0.5, {x: 120, alpha: 0});
    }

    updateHealthBar(bar, health, maxHealth) {
        const newWidth = (health / maxHealth) * 150;
        gsap.to(bar, 0.2, { width: newWidth, ease: 'sine.out' });
    }    

    updateBattleProgressBar(bar, progress, maxProgress) {
        const newWidth = (progress / maxProgress) * 100;
        gsap.to(bar, { duration: 0.2, width: newWidth, ease: 'sine.out' });
    }

    initBattle() {
        this.spineRanger.state.addListener({
            complete: (entry) => {
                if (entry.animation.name === "Fighter_Attack_01") {
                    this.healthEnemy -= 5;
                    this.updateHealthBar(this.progressBarMainEnemy, this.healthEnemy, 100);
                    this.battleProgress += 50;
                    this.updateBattleProgressBar(this.progressBarMainBattle, this.battleProgress, 100);
                    playSound('damage', false, 0.4);
                } else if (entry.animation.name === "Fighter_Attack_02") {
                    this.healthEnemy -= 5;
                    this.updateHealthBar(this.progressBarMainEnemy, this.healthEnemy, 100);
                    this.battleProgress += 50;
                    this.updateBattleProgressBar(this.progressBarMainBattle, this.battleProgress, 100);
                    playSound('damage', false, 0.4);
                }
            }
        });
        this.spineRanger.state.addAnimation(0, "Idle_02", true, 0.4);
        this.spineRanger.state.addAnimation(0, "Fighter_Attack_01", false, 1);        
        this.spineRanger.state.addAnimation(0, "Fighter_Attack_02", false, 1);       
        this.spineRanger.state.addAnimation(0, "Hit", false, 1.4);  
        this.spineRanger.state.addAnimation(0, "Idle_02", true, 0.4);      
        this.spineRanger.state.addAnimation(0, "Fighter_Attack_01", false, 1.2);
        this.spineRanger.state.addAnimation(0, "Fighter_Attack_02", false, 1.2);
        this.spineRanger.state.addAnimation(0, "Idle_02", false, 1); 
        
        this.spineGhoul.state.addListener({
            dispose: (entry) => {
                if (entry.animation.name === "Fighter_Attack_02") {
                    this.healthRanger -= 10;
                    this.updateHealthBar(this.progressBarMainRanger, this.healthRanger, 100);
                    playSound('grunt', false, 0.4);
                }
            },
        }); 
        this.spineGhoul.state.addAnimation(0, "Fighter_Hit", false, 1.65);
        this.spineGhoul.state.addAnimation(0, "Fighter_Idle_01", true, 0.5);
        this.spineGhoul.state.addAnimation(0, "Fighter_Hit", false, 0.8);
        this.spineGhoul.state.addAnimation(0, "Fighter_Attack_02", false, 0.6);
        this.spineGhoul.state.addAnimation(0, "Fighter_Idle_01", true, 0.5); 
        this.spineGhoul.state.addAnimation(0, "Fighter_Hit", false, 1.65);
        this.spineGhoul.state.addAnimation(0, "Fighter_Idle_01", true, 0.5);
        this.spineGhoul.state.addAnimation(0, "Fighter_Hit", false, 0.8);
        this.spineGhoul.state.addAnimation(0, "Fighter_Idle_01", false, 0.5);

        this.spineTrickster.state.addListener({
            dispose: (entry) => {
                if (entry.animation.name === "Fighter_Attack_02") {
                    this.healthRanger -= 10;
                    this.updateHealthBar(this.progressBarMainRanger, this.healthRanger, 100);
                    playSound('grunt', false, 0.4);
                }
            },
        }); 
        this.spineTrickster.state.addAnimation(0, "Fighter_Hit", false, 1.65);
        this.spineTrickster.state.addAnimation(0, "Fighter_Idle_01", true, 0.5);
        this.spineTrickster.state.addAnimation(0, "Fighter_Hit", false, 0.8);
        this.spineTrickster.state.addAnimation(0, "Fighter_Attack_02", false, 0.6);
        this.spineTrickster.state.addAnimation(0, "Fighter_Idle_01", true, 0.5); 
        this.spineTrickster.state.addAnimation(0, "Fighter_Hit", false, 1.65);
        this.spineTrickster.state.addAnimation(0, "Fighter_Idle_01", true, 0.5);
        this.spineTrickster.state.addAnimation(0, "Fighter_Hit", false, 0.8);
        this.spineTrickster.state.addAnimation(0, "Fighter_Idle_01", false, 0.5);

        gsap.delayedCall( 8.4, () => {
            this.darkScreen.visible = true;    
            this.blasterBox.visible = true; 
            gsap.to(this.darkScreen, 0.8, { alpha: 1, ease: "sine.out" }); 
            gsap.to(this.blasterBox, 0.4, { alpha: 1 } );
            gsap.to(this.blasterBox.scale, 0.4, {x:1.1, y:1.1, ease: "sine.out"}); 

            gsap.from(this.burstRayBlaster, 0.5, {alpha: 0, delay: 0.1});
            gsap.to(this.burstRayBlaster, 12, {angle: 360, repeat: -1, ease:'none'}); 
            setTimeout(this.tutorBlaster.show, 800);                   
        });
    }
    
    onBlasterBoxTap = () => {
        this.tutorBlaster.hide();        
        this.darkScreen.visible = false;    
        this.blasterBox.visible = false;
        this.initShooting();
        this.blasterBox.off( 'pointertap', this.onBlasterBoxTap );
        gsap.delayedCall( 0.2, () => {
            playSound('blaster', false, 0.4);
        });
    }
    
    onSuperPunchBoxTap = () => {
        this.tutorSuperPunch.hide();        
        this.darkScreen.visible = false;    
        this.superPunchBox.visible = false;
        this.initSuperPunchAnim();
        this.superPunchBox.off( 'pointertap', this.onSuperPunchBoxTap );
        gsap.delayedCall( 0.5, () => {
            playSound('damage', false, 0.4);
        });
        gsap.delayedCall( 0.7, () => {
            playSound('damage', false, 0.4);
        });
        gsap.delayedCall( 1.2, () => {
            this.healthEnemy -= 15;
            this.updateHealthBar(this.progressBarMainEnemy, this.healthEnemy, 100);
            playSound('whScream', false, 0.3);
        });
        
    }

    initShooting() { 
        this.spineRanger.state.setAnimation(0, "Shot_VFX", false);
        this.spineRanger.state.addAnimation(0, "Idle_02", true, 2);
        this.spineRanger.state.addAnimation(0, "Hit", false, 0.4);
        this.spineRanger.state.addAnimation(0, "Idle_02", true, 0.2); 
        this.spineRanger.state.addAnimation(0, "Fighter_Attack_01", false, 1);        
        this.spineRanger.state.addAnimation(0, "Fighter_Attack_02", false, 1);
        this.spineRanger.state.addAnimation(0, "Hit", false, 1.4);  
        this.spineRanger.state.addAnimation(0, "Idle_02", true, 0.4);      
        this.spineRanger.state.addAnimation(0, "Fighter_Attack_01", false, 1.2);
        this.spineRanger.state.addAnimation(0, "Fighter_Attack_02", false, 1.2); 
        this.spineRanger.state.addListener({
            complete: (entry) => {
                if (entry.animation.name === "Shot_VFX") {
                    this.battleProgress += 100;
                    this.updateBattleProgressBar(this.progressBarMainBattle, this.battleProgress, 100);
                    //playSound('damage', false, 0.5);
                }
            }
        });

        this.spineGhoul.state.setAnimation(0, "Fighter_Idle_01", false, 0.3);
        this.spineGhoul.state.addAnimation(0, "Fighter_Hit", true, 0.4);
        this.spineGhoul.state.addAnimation(0, "Fighter_Idle_01", true, 1.1);
        this.spineGhoul.state.addAnimation(0, "Fighter_Attack_02", false, 0.6);        
        this.spineGhoul.state.addAnimation(0, "Fighter_Idle_01", true, 0.5); 
        this.spineGhoul.state.addAnimation(0, "Fighter_Hit", false, 1.6);
        this.spineGhoul.state.addAnimation(0, "Fighter_Idle_01", true, 0.5);
        this.spineGhoul.state.addAnimation(0, "Fighter_Hit", false, 0.5);
        this.spineGhoul.state.addAnimation(0, "Fighter_Attack_02", false, 0.6);
        this.spineGhoul.state.addAnimation(0, "Fighter_Idle_01", true, 0.5);
        this.spineGhoul.state.addAnimation(0, "Fighter_Hit", false, 1.6);
        this.spineGhoul.state.addAnimation(0, "Fighter_Idle_01", true, 0.5);
        this.spineGhoul.state.addAnimation(0, "Fighter_Hit", false, 1.1);
        this.spineGhoul.state.addAnimation(0, "Fighter_Idle_01", false, 0.5);

        this.spineTrickster.state.setAnimation(0, "Fighter_Idle_01", false, 0.3);
        this.spineTrickster.state.addAnimation(0, "Fighter_Hit", true, 0.4);
        this.spineTrickster.state.addAnimation(0, "Fighter_Idle_01", true, 1.1);
        this.spineTrickster.state.addAnimation(0, "Fighter_Attack_02", false, 0.6);        
        this.spineTrickster.state.addAnimation(0, "Fighter_Idle_01", true, 0.5); 
        this.spineTrickster.state.addAnimation(0, "Fighter_Hit", false, 1.6);
        this.spineTrickster.state.addAnimation(0, "Fighter_Idle_01", true, 0.5);
        this.spineTrickster.state.addAnimation(0, "Fighter_Hit", false, 0.5);
        this.spineTrickster.state.addAnimation(0, "Fighter_Attack_02", false, 0.6);
        this.spineTrickster.state.addAnimation(0, "Fighter_Idle_01", true, 0.5);
        this.spineTrickster.state.addAnimation(0, "Fighter_Hit", false, 1.6);
        this.spineTrickster.state.addAnimation(0, "Fighter_Idle_01", true, 0.5);
        this.spineTrickster.state.addAnimation(0, "Fighter_Hit", false, 1.1);
        this.spineTrickster.state.addAnimation(0, "Fighter_Idle_01", false, 0.5);

        gsap.delayedCall( 10.7, () => {
            this.darkScreen.visible = true;    
            this.superPunchBox.visible = true; 
            gsap.to(this.darkScreen, 0.8, { alpha: 1, ease: "sine.out" }); 
            gsap.to(this.superPunchBox, 0.4, { alpha: 1 });
            gsap.to(this.superPunchBox.scale, 0.4, {x:1.1, y:1.1, ease: "sine.out"}); 
            gsap.from(this.burstRaySuperPunch, 0.5, {alpha: 0, delay: 0.1});
            gsap.to(this.burstRaySuperPunch, 12, {angle: 360, repeat: -1, ease:'none'});
            setTimeout(this.tutorSuperPunch.show, 800)                     
        });
    }

    initSuperPunchAnim() {
        this.spineRanger.state.setAnimation(0, "Fighter_Attack_04", false);
        gsap.delayedCall( 0.3, () => {
            this.effectDown.visible = true;
            this.effectDown.play();            
        });
        gsap.delayedCall( 0.6, () => {
            this.effectRight.visible = true;
            this.effectRight.play();            
        });
        gsap.delayedCall( 1.3, () => {
            this.effectCircle.visible = true;
            this.effectCircle.play();        
        });
        this.spineRanger.state.addListener({
            complete: (entry) => {
                if (entry.animation.name === "Fighter_Attack_04") {
                    this.healthEnemy -= 45;
                    this.updateHealthBar(this.progressBarMainEnemy, this.healthEnemy, 100);
                    gsap.delayedCall( 0.3, () => {
                        app.screenManager.set(FinishScreen, this.selectedObjects, true);             
                    });
                }
            }
        });

        this.spineGhoul.state.setAnimation(0, "Fighter_Idle_01", false, 0.3);
        this.spineGhoul.state.addAnimation(0, "Fighter_Hit", true, 0.4);
        this.spineGhoul.state.addAnimation(0, "Fighter_Idle_01", true, 0.6);
        this.spineGhoul.state.addAnimation(0, "Fighter_Hit", false, 0.4);

        this.spineTrickster.state.setAnimation(0, "Fighter_Idle_01", false, 0.3);
        this.spineTrickster.state.addAnimation(0, "Fighter_Hit", true, 0.4);
        this.spineTrickster.state.addAnimation(0, "Fighter_Idle_01", true, 0.6);
        this.spineTrickster.state.addAnimation(0, "Fighter_Hit", false, 0.4);
    }
    
    enter( object ) {
        //console.log('enter from fight screen');
        // this.spineTrickster.visible = true;
        // this.spineTrickster.skeleton.setSkinByName('Trickster');
        // this.spineTrickster.state.setAnimation(0, "Fighter_Idle_01", true); 
        // this.initBattle();

        stopSound('bg');  
        playSound('battle', true, 0.3); 
        fadeSound('battle', 0, 0.2, 1000);

        this.spineRanger.visible = true;
        gsap.from( this.spineRanger.scale, 0.3, {x:0.13, y:0.13, ease: "power1.out"} );
        this.spineRanger.state.setAnimation(0, "Idle_02", true);

        switch (object.enemyName) {
            case 'Trickster':
                this.spineTrickster.visible = true;
                gsap.from( this.background, 0.8, {alpha: 0} );                
                gsap.from( this.spineTrickster.scale, 0.3, {x:-0.13, y:0.13, ease: "power1.out"} );
                this.spineTrickster.skeleton.setSkinByName('Trickster');
                this.spineTrickster.state.setAnimation(0, "Fighter_Idle_01", true);
                this.initBattle(); 
                break;

            case 'Ghoul':
                this.spineGhoul.visible = true; 
                gsap.from( this.background, 0.8, {alpha: 0} );
                gsap.from( this.spineGhoul.scale, 0.3, {x:-0.13, y:0.13, ease: "power1.out"} );
                this.spineGhoul.state.setAnimation(0, "Fighter_Idle_01", true);
                this.initBattle();              
                break;
        }

        switch (object.arenaName ) {
            case 'park':
                this.bckgrndPark.visible = true;
                this.selectedObjects.arenaName = object.arenaName;
                gsap.from( this.bckgrndPark, 0.4, {alpha: 0} );
                break;

            case 'canyonCity':
                this.bckgrndCanyonCity.visible = true;
                this.selectedObjects.arenaName = object.arenaName;
                gsap.from( this.bckgrndCanyonCity, 0.4, {alpha: 0} );
                break;
                
            case 'desert':
                this.bckgrndDesert.visible = true;
                this.selectedObjects.arenaName = object.arenaName;
                gsap.from( this.bckgrndDesert, 0.4, {alpha: 0} );
                break;

            case 'cave':
                this.bckgrndCave.visible = true;
                this.selectedObjects.arenaName = object.arenaName;
                gsap.from( this.bckgrndCave, 0.4, {alpha: 0} );
                break;
        }
    }

    exit() {
       //console.log('exit from fight screen')
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

            this.characters.scale.set(1);
            
            this.battleProgressBar.position.set(0, -580);
            this.rangerProgressBar.position.set(-210, -30); 
            this.enemyProgressBar.position.set(60, -30);

            this.blasterBox.position.set(-40, -555);
            this.superPunchBox.position.set(240, -555);
            
            this.darkScreen.height = downUI - upUI;
            this.darkScreen.width = 720 * this.darkScreen.height/1080;            
        } else {            
            this.bckgrndPark.width = rightUI - leftUI;
            this.bckgrndPark.height = 780 * this.bckgrndPark.width/720;
            this.bckgrndCanyonCity.height = rightUI - leftUI;
            this.bckgrndCanyonCity.width = 780 * this.bckgrndCanyonCity.width/720;
            this.bckgrndDesert.height = rightUI - leftUI;
            this.bckgrndDesert.width = 780 * this.bckgrndDesert.width/720;
            this.bckgrndCave.height = rightUI - leftUI;
            this.bckgrndCave.width = 780 * this.bckgrndCave.width/720;

            this.characters.scale.set(0.88);
            this.characters.position.set(0, -100);

            this.battleProgressBar.position.set(0, -300);
            this.rangerProgressBar.position.set(-200, -130); 
            this.enemyProgressBar.position.set(40, -130);

            this.blasterBox.position.set(-35, -270);
            this.superPunchBox.position.set(235, -270);

            this.darkScreen.width = rightUI - leftUI;
            this.darkScreen.height = 1080 * this.darkScreen.width/720;
        }
    }   

}



