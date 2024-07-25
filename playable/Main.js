class Main { 

    constructor() {
        this.initScreen();    

        app.resizes.add( this.onResize );        
    }

    initScreen() {
        this.display = new PIXI.Container();
        this.initScene();
    }

    initScene() {
        this.background = new PIXI.Container();
        this.display.addChild(this.background);
        this.background.position.set(-640, 970); // start -640, 970   factory 220, -320    dairy 330, 1120
        
        this.initWorldMap();
        this.background.addChild( this.worldMap );

        this.background.scale.set(0.9)

        this.initStartLayer();
        this.initWalkingCow();
        this.initDairy();
        this.initFactory();
        this.initUILayer();
        this.initScenario();
    }

    initWorldMap() {
        this.worldMap = new PIXI.Container();
    
        let imageWidth = 1037;
        let imageHeight = 1056;
    
        let columns = 6;
        let rows = 4;
    
        let imageNames = [
            'mapFinal1', 'mapFinal2', 'mapFinal3', 'mapFinal4', 'mapFinal5', 'mapFinal6',
            'mapFinal7', 'mapFinal8', 'mapFinal9', 'mapFinal10', 'mapFinal11', 'mapFinal12',
            'mapFinal13', 'mapFinal14', 'mapFinal15', 'mapFinal16', 'mapFinal17', 'mapFinal18',
            'mapFinal19', 'mapFinal20', 'mapFinal21', 'mapFinal22', 'mapFinal23', 'mapFinal24'
        ];
    
        let totalWidth = columns * imageWidth;
        let totalHeight = rows * imageHeight;
    
        imageNames.forEach((imageName, index) => {
            let backImage = new PIXI.Sprite(assets.textures.pixi[imageName]);
            backImage.anchor.set(0.5);
            backImage.visible = true;
    
            let col = index % columns;
            let row = Math.floor(index / columns);
    
            backImage.x = col * imageWidth + imageWidth / 2 - totalWidth / 2;
            backImage.y = row * imageHeight + imageHeight / 2 - totalHeight / 2;
    
            this.worldMap.addChild(backImage);
        });
    
    }

    initStartLayer() {
        this.startScreen = new PIXI.Container();
        this.display.addChild( this.startScreen );
        this.startScreen.visible = false;

        let background = new PIXI.Graphics();
        background.beginFill(0x000000, 1);
        background.alpha = 0.8;
        background.drawRect(-window.innerWidth, -window.innerHeight, window.innerWidth*2, window.innerHeight*2);
        background.endFill();
        background.scale.set(2);
        this.startScreen.addChild( background );

        let imageCharacter = assets.textures.pixi.milkManager;
        this.character = new ImageObj(imageCharacter);
        this.character.display.alpha = 0.85;
        this.startScreen.addChild( this.character.display );

        this.speechCaption = new PIXI.Container();
        this.startScreen.addChild( this.speechCaption );

        this.speechCaptionPortraite = new PIXI.Container();
        this.speechCaptionPortraite.scale.set(0.5)
        this.speechCaptionPortraite.visible = true;   
        this.speechCaption.addChild( this.speechCaptionPortraite );

        let speechBalPortraite = new PIXI.Sprite( assets.textures.pixi.speechBalPortraite );
        speechBalPortraite.anchor.set( 0.5, 1 );
        speechBalPortraite.visible = true; 
        
        let speechPortraite = new PIXI.Sprite( assets.textures.pixi.speechPortraite );
        speechPortraite.anchor.set( 0.5, 1);
        speechPortraite.visible = true;
        this.speechCaptionPortraite.addChild( speechBalPortraite, speechPortraite );

        this.speechCaptionLandscape = new PIXI.Container();
        this.speechCaptionLandscape.scale.set(0.5)
        this.speechCaptionLandscape.visible = true;   
        this.speechCaption.addChild( this.speechCaptionLandscape );

        let speechBalLandscape = new PIXI.Sprite( assets.textures.pixi.speechBalLandscape );
        speechBalLandscape.anchor.set( 0.5, 1 );
        speechBalLandscape.visible = true; 
        
        let speechLandscape = new PIXI.Sprite( assets.textures.pixi.speechLandscape );
        speechLandscape.anchor.set( 0.5, 1);
        speechLandscape.visible = true;
        this.speechCaptionLandscape.addChild( speechBalLandscape, speechLandscape );
    }

    initScenario() {
        this.director = {
            scripts: {
                intro: new TaskManager(),
                dairy: new TaskManager(),
            }
        }

        this.director.scripts.intro.add(FuncTask, { func: () => {
            this.showStartScreen();
        }});
        this.director.scripts.intro.add(WaitTask, 1);
        this.director.scripts.intro.add(FuncTask, { func: () => {
            this.hideStartScreen();
        }});
        this.director.scripts.intro.add(WaitTask, 0.2);
        this.director.scripts.intro.add(FuncTask, { func: () => {
            gsap.to( this.background.position, 1, {x: 1720, y: 520, ease: 'sine.inOut'}); //  330, 1220
        }});
        this.director.scripts.intro.add(WaitTask, 1);
        this.director.scripts.intro.add(FuncTask, { func: () => {
            this.moneyCounterBox.visible = true;
            gsap.from( this.moneyCounterBox, 0.5, {alpha: 0} );
            gsap.delayedCall(0.7, () => {
                this.moneyAnim.visible = true;
                this.moneyAnim.play();
                playSound('flyingCash', false, 0.5);
                this.animateMoneyCounter(10, 300, 2600); 
            });
        }});
        this.director.scripts.intro.add(WaitTask, 3.3);
        this.director.scripts.intro.add(FuncTask, { func: () => {
            this.btnCowBox.visible = true; 
            gsap.from( this.btnCowBox, 0.5, {alpha: 0} );
            this.cowCounterBox.visible = true;
            gsap.from( this.cowCounterBox, 0.5, {alpha: 0} );
            this.moneyAnim.visible = false;
            this.moneyAnim.stop();
            this.showBtnCowTutor();
        }});
        this.director.scripts.intro.start();
    }

    initDairy() {
        this.stalls = [];
        this.milkers = [];
        for (let i = 0; i < 4; i++) {
            this.stalls.push(false);  
            this.milkers.push(false); 
        }

        this.dairy = new PIXI.Container();
        this.background.addChild( this.dairy );
        this.dairy.visible = true;

        this.dairy.position.set(-320, -1275);

        this.stallsImage = new PIXI.Container();
        this.dairy.addChild( this.stallsImage );
        this.stallsImage.visible = true;

        let stallFirst = new ImageObj(assets.textures.pixi.stallFirst);
        stallFirst.display.visible = false;
        let stallSecond = new ImageObj(assets.textures.pixi.stallSecond);
        stallSecond.display.visible = false;
        let stallThird = new ImageObj(assets.textures.pixi.stallThird);
        stallThird.display.visible = false;
        let stallFour = new ImageObj(assets.textures.pixi.stallFour);
        stallFour.display.visible = false;
        this.stallsImage.addChild( 
            stallFirst.display,
            stallSecond.display,
            stallThird.display,
            stallFour.display
        );

        this.cowsImage = new PIXI.Container();
        this.dairy.addChild( this.cowsImage );
        this.cowsImage.visible = true;

        let cowFirst = new ImageObj(assets.textures.pixi.cowFirst);
        cowFirst.display.visible = false;
        let cowSecond = new ImageObj(assets.textures.pixi.cowSecond);
        cowSecond.display.visible = false;
        let cowThird = new ImageObj(assets.textures.pixi.cowThird);
        cowThird.display.visible = false;
        let cowFour = new ImageObj(assets.textures.pixi.cowFour);
        cowFour.display.visible = false;
        this.cowsImage.addChild( 
            cowFirst.display,
            cowSecond.display,
            cowThird.display,
            cowFour.display
        );

        this.initDairyWorkers();
    }

    initDairyWorkers() {
        this.availableMilkerIndices = [0, 1, 2, 3];
    
        let positions = [
            { x: 135, y: -175 },
            { x: -20, y: -82 },
            { x: -173, y: 6 },
            { x: -334, y: 100 },
        ];
    
        this.milkersImage = new PIXI.Container();
        this.dairy.addChild(this.milkersImage);
        this.milkersImage.visible = true;
        this.milkersImage.position.set(0, 0);
        this.milkersImage.scale.set(-0.9, 0.9);
    
        for (let i = 0; i < 4; i++) {
            let milker = createAnimSprite(assets.textures.pixi["milkerWalk"], milkerWalkSheetData, 'walkFrames');
            milker.position.set(positions[i].x, positions[i].y);
            milker.loop = true;
            milker.visible = false;
            this.milkersImage.addChild(milker);
    
            let milkerIdle = createAnimSprite(assets.textures.pixi["milkerIdle"], milkerIdleSheetData, 'idleFrames');
            milkerIdle.position.set(positions[i].x, positions[i].y);
            milkerIdle.scale.set(0.86);
            milkerIdle.loop = true;
            milkerIdle.visible = false;
            milkerIdle.animationSpeed = 0.13;
            this.milkersImage.addChild(milkerIdle);
    
            this.milkers[i] = { walk: milker, idle: milkerIdle };
        }
    }
    
    initFactory() {
        this.btnFactoryClickCount = 0;

        this.butterMachine = new PIXI.Container(); // 220, -320
        this.butterImage = new PIXI.Sprite( assets.textures.pixi.butterMachine );
        this.butterImage.anchor.set( 0.5 );
        this.butterImage.alpha = 0.3
        this.butterMachine.addChild( this.butterImage );
        this.butterMachine.position.set(-240, 345);
        this.background.addChild( this.butterMachine );
        this.butterMachine.visible = true;
        
        this.buildAnimButter = createAnimSprite(assets.textures.pixi["upgrade"], upgradeSheetData, 'upgrade' );
        this.buildAnimButter.animationSpeed = 0.20;
        this.butterMachine.addChild( this.buildAnimButter );
        this.buildAnimButter.position.set(-260, -450);
        this.buildAnimButter.scale.set(1.3);
        this.buildAnimButter.loop = false;
        this.buildAnimButter.visible = false;
        //this.buildAnimButter.play();

        this.moneyAnimButter = createAnimSprite(assets.textures.pixi["moneyNew"], moneyNewSheetData, 'moneyNew' );
        this.butterMachine.addChild( this.moneyAnimButter );
        this.moneyAnimButter.position.set(0, -100);
        this.moneyAnimButter.scale.set(0.8);
        this.moneyAnimButter.loop = false;
        this.moneyAnimButter.visible = false;
        //this.moneyAnimButter.play();

        this.prodButter = new PIXI.Sprite( assets.textures.pixi.prodButter );
        this.butterMachine.addChild( this.prodButter );
        this.prodButter.anchor.set(0.5);
        this.prodButter.position.set(10, -50);
        this.prodButter.scale.set(0.7);
        this.prodButter.visible = false;

        this.coffeeMachine = new PIXI.Container(); // -210, -120
        this.coffeeImage = new PIXI.Sprite( assets.textures.pixi.coffeeMachine );
        this.coffeeImage.anchor.set(0.5);
        this.coffeeImage.alpha = 0.3;
        this.coffeeMachine.addChild( this.coffeeImage );
        this.coffeeMachine.position.set(258, 63);
        this.background.addChild( this.coffeeMachine );
        this.coffeeMachine.visible = true;
        
        this.buildAnimCoffee = createAnimSprite(assets.textures.pixi["upgrade"], upgradeSheetData, 'upgrade' );
        this.buildAnimCoffee.animationSpeed = 0.15;
        this.coffeeMachine.addChild( this.buildAnimCoffee );
        this.buildAnimCoffee.position.set(-260, -450);
        this.buildAnimCoffee.scale.set(1.3);
        this.buildAnimCoffee.loop = false;
        this.buildAnimCoffee.visible = false;
        //this.buildAnimCoffee.play();

        this.moneyAnimCoffee = createAnimSprite(assets.textures.pixi["moneyNew"], moneyNewSheetData, 'moneyNew' );
        this.coffeeMachine.addChild( this.moneyAnimCoffee );
        this.moneyAnimCoffee.position.set(0, -100);
        this.moneyAnimCoffee.scale.set(0.8);
        this.moneyAnimCoffee.loop = false;
        this.moneyAnimCoffee.visible = false;
        //this.moneyAnimCoffee.play();

        this.prodCoffee = new PIXI.Sprite( assets.textures.pixi.prodCoffee );
        this.coffeeMachine.addChild( this.prodCoffee );
        this.prodCoffee.anchor.set(0.5);
        this.prodCoffee.position.set(15, -50);
        this.prodCoffee.scale.set(0.7);
        this.prodCoffee.visible = false;

        this.custardMachine = new PIXI.Container(); // -600, -270
        this.custardImage = new PIXI.Sprite( assets.textures.pixi.custardMachine );
        this.custardImage.anchor.set( 0.5 );
        this.custardImage.alpha = 0.3;
        this.custardMachine.addChild( this.custardImage );
        this.custardMachine.position.set(670, 305);
        this.background.addChild( this.custardMachine );
        this.custardMachine.visible = true;
        
        this.buildAnimCustard = createAnimSprite(assets.textures.pixi["upgrade"], upgradeSheetData, 'upgrade' );
        this.buildAnimCustard.animationSpeed = 0.15;
        this.custardMachine.addChild( this.buildAnimCustard );
        this.buildAnimCustard.position.set(-260, -450);
        this.buildAnimCustard.scale.set(1.3);
        this.buildAnimCustard.loop = false;
        this.buildAnimCustard.visible = false;
        //this.buildAnimCurtard.play();

        this.moneyAnimCustard  = createAnimSprite(assets.textures.pixi["moneyNew"], moneyNewSheetData, 'moneyNew' );
        this.custardMachine.addChild( this.moneyAnimCustard );
        this.moneyAnimCustard.position.set(0, -100);
        this.moneyAnimCustard.scale.set(0.8);
        this.moneyAnimCustard.loop = false;
        this.moneyAnimCustard.visible = false;
        //this.moneyAnimCurtard.play();

        this.prodCustard = new PIXI.Sprite( assets.textures.pixi.prodCustard );
        this.custardMachine.addChild( this.prodCustard );
        this.prodCustard.anchor.set(0.5);
        this.prodCustard.position.set(30, -50);
        this.prodCustard.scale.set(0.7);
        this.prodCustard.visible = false;

        this.yogourtMachine = new PIXI.Container(); // -650, -70
        this.yogourtImage = new PIXI.Sprite( assets.textures.pixi.yogourtMachine );
        this.yogourtImage.anchor.set( 0.5 );
        this.yogourtImage.alpha = 0.3;
        this.yogourtMachine.addChild( this.yogourtImage );
        this.yogourtMachine.position.set(746, -236);
        this.background.addChild( this.yogourtMachine );
        this.yogourtMachine.visible = true;
        
        this.buildAnimYogourt = createAnimSprite(assets.textures.pixi["upgrade"], upgradeSheetData, 'upgrade' );
        this.buildAnimYogourt.animationSpeed = 0.15;
        this.yogourtMachine.addChild( this.buildAnimYogourt );
        this.buildAnimYogourt.position.set(-260, -420);
        this.buildAnimYogourt.scale.set(1.3);
        this.buildAnimYogourt.loop = false;
        this.buildAnimYogourt.visible = false;
        //this.buildAnimYogurt.play(); 

        this.moneyAnimYogurt  = createAnimSprite(assets.textures.pixi["moneyNew"], moneyNewSheetData, 'moneyNew' );
        this.yogourtMachine.addChild( this.moneyAnimYogurt );
        this.moneyAnimYogurt.position.set(0, -100);
        this.moneyAnimYogurt.scale.set(0.8);
        this.moneyAnimYogurt.loop = false;
        this.moneyAnimYogurt.visible = false;
        //this.moneyAnimYogurt.play();

        this.prodYogourt = new PIXI.Sprite( assets.textures.pixi.prodYogourt );
        this.yogourtMachine.addChild( this.prodYogourt );
        this.prodYogourt.anchor.set(0.5);
        this.prodYogourt.position.set(10, -50);
        this.prodYogourt.scale.set(0.7);
        this.prodYogourt.visible = false;
    }

    initUILayer() {
        this.initMoneyCounter();
        this.initCowCounter();
        this.initBtnCowBox();
        this.initBtnBoxDairy();
        this.initBtnBoxFactory();
    }

    initWalkingCow() {
        this.cowsBase = [];
        this.availableCowIndices = [0, 1, 2, 3, 4];
        
        this.cowBox = new PIXI.Container();
        this.background.addChild(this.cowBox);
        this.cowBox.position.set(-1820, -490);
        this.cowBox.scale.set( -0.5, 0.5 );

        let positions = [
            { x: 400, y: -110 },
            { x: 220, y:-10 },
            { x: 50, y: 90 },
            { x: -140, y: 200 },
            { x: -330, y: 310 }
        ];

        for (let i = 0; i < 5; i++) {
            let walkingCow = createAnimSprite(assets.textures.pixi["walk"], cowSheetData, 'animation');
            walkingCow.position.set(positions[i].x, positions[i].y);
            walkingCow.loop = true;
            walkingCow.visible = false;
            this.cowBox.addChild(walkingCow);
            this.cowsBase.push(walkingCow);
        }
    }

    showRandomCow() {
        let randomIndex = Math.floor(Math.random() * this.availableCowIndices.length);
        let cowIndex = this.availableCowIndices[randomIndex];
    
        let cow = this.cowsBase[cowIndex];
        cow.visible = true;
        gsap.from(cow, 0.5, {alpha: 0});
        cow.play();
        playSound('moo', false, 0.5);
        gsap.delayedCall(0.3, () => {
            gsap.to(cow, 80, {x: 1030, y: 1030, ease: 'none'});
        });
        this.availableCowIndices.splice(randomIndex, 1);
    }

    initMoneyCounter() {
        this.moneyCounterBox = new PIXI.Container();
        this.display.addChild(this.moneyCounterBox);
        this.moneyCounterBox.visible = false;

        this.moneyAnim = createAnimSprite(assets.textures.pixi["money"], moneySheetData, 'money' );
        this.moneyCounterBox.addChild( this.moneyAnim );
        this.moneyAnim.scale.set(-0.5, 0.5);
        this.moneyAnim.x = -20
        this.moneyAnim.loop = true;
        this.moneyAnim.visible = false;

        let moneyBox = new ImageObj(assets.textures.pixi.moneyBox);
        this.moneyCounterBox.addChild( moneyBox.display );
        moneyBox.display.scale.set( 0.5 );

        this.textCounter = PIXIText('10', {
            fontFamily: "font_baloo",
            fontSize: 46,
            color: 0xffffff,
            align: "center",
            valign: "center",
            letterSpacing: -2           
        });
        this.textCounter.x = 45;
        this.textCounter.y = 3;
        this.moneyCounterBox.addChild( this.textCounter );
    }

    animateMoneyCounter(start, end, duration) {
        let counter = { value: start };
    
        gsap.to(counter, {
            value: end,
            duration: duration / 1000,
            ease: "steps(29)",
            onUpdate: () => {
                this.textCounter.setText(Math.floor(counter.value).toString());
            }
        });
    }

    decreaseMoneyCounter(amount) {
        if (isNaN(this.currentMoney)) {
            this.currentMoney = 300;
        }
        let newMoney = this.currentMoney - amount;
        if (newMoney < 0) {
            newMoney = 0;
        }
        this.animateMoneyCounter(this.currentMoney, newMoney, 300);
        this.currentMoney = newMoney;
        playSound('coin', false, 0.5);
    }

    initCowCounter() {
        this.cowCounterBox = new PIXI.Container();
        this.display.addChild(this.cowCounterBox);
        this.cowCounterBox.visible = false;

        let cowCounter = new PIXI.Sprite( assets.textures.pixi.cowCounter );
        cowCounter.anchor.set( 0.5 );
        cowCounter.scale.set( 0.5 );
        this.cowCounterBox.addChild(cowCounter);
        cowCounter.visible = true; 

        this.textCowCounter = PIXIText('0', {
            fontFamily: "font_baloo",
            fontSize: 46,
            color: 0xffffff,
            align: "center",
            valign: "center",
            letterSpacing: -2           
        });
        this.textCowCounter.x = 7;
        this.textCowCounter.y = 3;
        this.cowCounterBox.addChild( this.textCowCounter );

        this.currentCowCount = 0;
    }

    updateCowCounter() {
        let startValue = this.currentCowCount;
        let endValue = startValue + 1;
    
        gsap.to(this, {
            currentCowCount: endValue,
            duration: 0.2,
            ease: "sine.in",
            onUpdate: () => {
                this.textCowCounter.setText(Math.floor(this.currentCowCount.toString()));
            }
        });
    }

    initBtnCowBox() {
        this.btnCowBox = new PIXI.Container();
        this.display.addChild(this.btnCowBox);
        this.btnCowBox.visible = false; 

        let btnAction = new ImageObj(assets.textures.pixi.btnBlue);
        this.btnCowBox.addChild( btnAction.display );

        let btnText = new ImageObj(assets.textures.pixi.btnTextCow);
        this.btnCowBox.addChild( btnText.display );

        this.initBtnCowTutor();
        this.btnCowBox.scale.set( 0.85 );
        this.btnCowBox.interactive = true;
        this.btnCowBox.on( 'pointertap', this.onBtnTap );  
    }

    initBtnCowTutor() {
        this.btnCowTutor = new PIXI.Container();
        this.btnCowBox.addChild(this.btnCowTutor);
        this.btnCowTutor.visible = false;

        let handSprite = new PIXI.Sprite( assets.textures.pixi['hand'] );
        handSprite.pivot.set(330, 0);
        handSprite.scale.set(0.35)
        handSprite.hitArea = new PIXI.Rectangle(0, 0, 0, 0); 
        this.btnCowTutor.addChild(handSprite);
        
        this.timelineBtnCow = gsap.timeline({repeat: -1, repeatDelay: 1, paused: true, delay: 0.5});
        this.timelineBtnCow.from( handSprite, 0.4, {x: -65, alpha: 0, ease: 'sine.out'});
        this.timelineBtnCow.to( handSprite.scale, 0.3, {x: 0.28, y: 0.28, repeat: 1, yoyo: true, ease: 'sine.inOut' });	
		this.timelineBtnCow.to( handSprite, 0.5, {x: 60, alpha: 0});
        //this.timelineBtnCow.play();
	}

    showBtnCowTutor() {
        this.btnCowTutor.visible = true;
        gsap.from( this.btnCowTutor, 0.5, { alpha: 0 });
        this.timelineBtnCow.play();
    }

    hideBtnCowTutor() {        
        this.timelineBtnCow.pause(0);
        gsap.to( this.btnCowTutor, 0.5, { alpha: 0, visible: false});
    }

    initBtnBoxDairy() {
        this.btnBoxDairy = new PIXI.Container();
        this.display.addChild(this.btnBoxDairy);
        this.btnBoxDairy.visible = false; 
        this.btnBoxDairy.scale.set( 0.85 );

        this.btnActionBlue = new PIXI.Container();
        this.btnActionBlue.position.set( -175, 0 );
        this.btnBoxDairy.addChild(this.btnActionBlue);
        this.btnActionBlue.on('pointertap', this.onBtnActionBlueTap);  

        let btnBlue = new ImageObj(assets.textures.pixi.btnBlue);
        this.btnActionBlue.addChild(btnBlue.display);

        let btnTextMilker = new ImageObj(assets.textures.pixi.btnTextMilker);
        this.btnActionBlue.addChild( btnTextMilker.display );

        this.btnActionGreen = new PIXI.Container();
        this.btnActionGreen.position.set( 175, 0 );
        this.btnBoxDairy.addChild( this.btnActionGreen );
        this.btnActionGreen.on('pointertap', this.onBtnActionGreenTap);  

        let btnGreen = new ImageObj(assets.textures.pixi.btnGreen);
        this.btnActionGreen.addChild(btnGreen.display);

        let btnTextStall = new ImageObj(assets.textures.pixi.btnTextStall);
        this.btnActionGreen.addChild(btnTextStall.display);

        this.initBtnDairyTutor();
    }

    initBtnDairyTutor() {
        this.btnDairyTutor = new PIXI.Container();
        this.btnActionBlue.addChild(this.btnDairyTutor);
        this.btnDairyTutor.visible = false;

        let handSprite = new PIXI.Sprite( assets.textures.pixi['hand'] );
        handSprite.pivot.set(330, 0);
        handSprite.scale.set(0.35)
        handSprite.hitArea = new PIXI.Rectangle(0, 0, 0, 0); 
        this.btnDairyTutor.addChild(handSprite);
        
        this.timelineBtnDairy = gsap.timeline({repeat: -1, repeatDelay: 1, paused: true, delay: 0.5});
        this.timelineBtnDairy.from( handSprite, 0.4, {x: -65, alpha: 0, ease: 'sine.out'});
        this.timelineBtnDairy.to( handSprite.scale, 0.3, {x: 0.28, y: 0.28, repeat: 1, yoyo: true, ease: 'sine.inOut' });	
		this.timelineBtnDairy.to( handSprite, 0.5, {x: 60, alpha: 0});
        //this.timelineBtnDairy.play();
	}

    showBtnDairyTutor() {
        this.btnDairyTutor.visible = true;
        gsap.from( this.btnDairyTutor, 0.5, { alpha: 0 });
        this.timelineBtnDairy.play();
    }

    hideBtnDairyTutor() {        
        this.timelineBtnDairy.pause(0);
        gsap.to( this.btnDairyTutor, 0.5, { alpha: 0, visible: false});
    }

    initBtnBoxFactory() {
        this.btnBoxFactory = new PIXI.Container();
        this.display.addChild(this.btnBoxFactory);
        this.btnBoxFactory.visible = false; 
        this.btnBoxFactory.scale.set( 0.85 );

        let btnAction = new ImageObj(assets.textures.pixi.btnGreen);
        this.btnBoxFactory.addChild( btnAction.display );

        let btnText = new ImageObj(assets.textures.pixi.btnTextBuild);
        this.btnBoxFactory.addChild( btnText.display );

        this.btnBoxFactory.interactive = true;
        this.btnBoxFactory.on( 'pointertap', this.onBtnFactoryTap );

        this.initBtnFactoryTutor();
        
        this.btnBoxFactoryAnimation = gsap.to(this.btnBoxFactory.scale, 0.5, {
            x: 0.95,
            y: 0.95,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            paused: true
        });
        this.btnBoxFactoryAnimation.play();
    }

    initBtnFactoryTutor() {
        this.btnFactoryTutor = new PIXI.Container();
        this.btnBoxFactory.addChild(this.btnFactoryTutor);
        this.btnFactoryTutor.visible = false;

        let handSprite = new PIXI.Sprite( assets.textures.pixi['hand'] );
        handSprite.pivot.set(330, 0);
        handSprite.scale.set(0.35)
        handSprite.hitArea = new PIXI.Rectangle(0, 0, 0, 0); 
        this.btnFactoryTutor.addChild(handSprite);
        
        this.timelineBtnFactory = gsap.timeline({repeat: -1, repeatDelay: 1, paused: true, delay: 0.5});
        this.timelineBtnFactory.from( handSprite, 0.4, {x: -65, alpha: 0, ease: 'sine.out'});
        this.timelineBtnFactory.to( handSprite.scale, 0.3, {x: 0.28, y: 0.28, repeat: 1, yoyo: true, ease: 'sine.inOut' });	
		this.timelineBtnFactory.to( handSprite, 0.5, {x: 60, alpha: 0});
        //this.timelineBtnFactory.play();
	}

    showBtnFactoryTutor() {
        this.btnFactoryTutor.visible = true;
        gsap.from( this.btnFactoryTutor, 0.5, { alpha: 0 });
        this.timelineBtnFactory.play();
    }

    hideBtnFactoryTutor() {        
        this.timelineBtnFactory.pause(0);
        gsap.to( this.btnFactoryTutor, 0.5, { alpha: 0, visible: false});
    }

    moveFromDairyToFactory() {
        this.director.scripts.dairy.add(WaitTask, 0.5);
        this.director.scripts.dairy.add(FuncTask, { func: () => {
            gsap.to( this.background.position, 1, {x: 220, y: -320, ease: 'sine.inOut',  
                onComplete: () => {
                    this.btnBoxFactory.visible = true; 
                    gsap.from( this.btnBoxFactory, 0.5, {alpha: 0, 
                        onComplete: () => {
                            this.showBtnFactoryTutor();
                        }
                    });
                }});
        }});
        this.director.scripts.dairy.start();
    }

    onBtnTap = () => {  
        this.showRandomCow();
        this.decreaseMoneyCounter(10);
        playSound('button', false, 0.5);
        this.updateCowCounter();

        this.hideBtnCowTutor();
    
        if (this.availableCowIndices.length === 0) {
            this.btnCowBox.interactive = false;
            gsap.to(this.btnCowBox, 0.5, {alpha: 0, visible: false});
            this.btnCowBox.off('pointertap', this.onBtnTap);
            stopSound('moo');
    
            gsap.to(this.cowCounterBox, 0.5, {alpha: 0, visible: false});
            gsap.to(this.background.position, 1, {x: 330, y: 1120, delay: 0.5, ease: 'sine.inOut',  
                onComplete: () => {
                    this.btnActionBlue.interactive = true;
                    this.btnActionGreen.interactive = true;
                }
            });
            this.btnBoxDairy.visible = true; 
            gsap.from(this.btnBoxDairy, 0.5, {delay: 1.5, alpha: 0, 
                onComplete: () => {
                    this.showBtnDairyTutor();
                }
            });
            return;
        }
    }

    onBtnActionBlueTap = () => {
        if (this.availableMilkerIndices.length === 0) {
            console.log('No more milkers available');
            return;
        }
    
        if (this.currentMoney < 20) {
            console.log('Not enough money to hire a milker.');
            return;
        }
    
        this.btnActionBlue.interactive = false;
        this.btnActionGreen.interactive = false;
    
        let milkerIndex = this.availableMilkerIndices.shift();
    
        let milker = this.milkers[milkerIndex].walk;
        milker.visible = true;
        milker.play();
    
        this.decreaseMoneyCounter(20);
    
        playSound('button', false, 0.5);
        this.hideBtnDairyTutor();
    
        let positionsEnd = [
            { x: 242, y: -100 },
            { x: 85, y: -8 },
            { x: -68, y: 85 },
            { x: -228, y: 180 }
        ];
    
        let endPosition = positionsEnd[milkerIndex];
        gsap.to(milker.position, {
            x: endPosition.x,
            y: endPosition.y,
            duration: 2,
            ease: 'none',
            onComplete: () => {
                milker.visible = false;
                let idle = this.milkers[milkerIndex].idle;
                idle.position.set(endPosition.x, endPosition.y);
                idle.visible = true;
                idle.play();
    
                if (this.stalls[milkerIndex] === true) {
                    this.showCow(milkerIndex);
                } else {
                    this.enableButtons();
                }
            }
        });
    
        if (!this.availableMilkerIndices.length) {
            this.btnActionBlue.interactive = false;
            this.btnActionBlue.off('pointertap', this.onBtnActionBlueTap);
            stopSound('button');
        }
    }
                 
    onBtnActionGreenTap = () => {
        if (this.currentMoney < 10) {
            console.log('Not enough money to buy a stall.');
            return;
        }
    
        this.btnActionGreen.interactive = false;
        this.btnActionBlue.interactive = false;
    
        let stallIndex = this.stalls.findIndex(stall => stall === false);
        if (stallIndex === -1) {
            console.log('No free stalls available.');
            this.btnActionGreen.interactive = false;
            this.btnActionGreen.off('pointertap', this.onBtnActionGreenTap);
            return;
        }
    
        this.stalls[stallIndex] = true;
        this.decreaseMoneyCounter(10);
        playSound('button', false, 0.5);
        this.hideBtnDairyTutor();
    
        let stall = this.stallsImage.children[stallIndex];
        stall.visible = true;
    
        if (this.milkers[stallIndex].walk.visible === false && this.milkers[stallIndex].idle.visible === true) {
            this.showCow(stallIndex);
        } else {
            this.enableButtons();
        }
    
        gsap.delayedCall(0.7, () => {
            this.enableButtons();
        });
    
        if (!this.stalls.includes(false)) {
            this.btnActionGreen.interactive = false;
            this.btnActionGreen.off('pointertap', this.onBtnActionGreenTap);
            stopSound('button');
        }
    }

    showCow = (milkerIndex) => {
        let cow = this.cowsImage.children[milkerIndex];
        cow.visible = true;
        playSound('moo', false, 0.5);
        gsap.from(cow, 0.5, {
            delay: 0.3,
            alpha: 0,
            onComplete: () => {
                this.checkAllCowsVisible();
            }
        });
    }
        
    checkAllCowsVisible = () => {
        if (this.cowsImage.children.every(cow => cow.visible)) {
            gsap.to(this.btnBoxDairy, 0.5, { alpha: 0, visible: false });
            gsap.delayedCall(0.3, () => {
                this.moveFromDairyToFactory();
            });
            stopSound('button');
        } else {
            this.enableButtons();
        }
    }
    
    enableButtons = () => {
        if (this.cowsImage.children.every(cow => cow.visible)) {
            this.btnActionBlue.interactive = false;
            this.btnActionGreen.interactive = false;
        } else {
            this.btnActionBlue.interactive = true;
            this.btnActionGreen.interactive = true;
        }
    }

    onBtnFactoryTap = () => {
        if (this.btnBoxFactory.interactive) {
            this.btnFactoryClickCount++;
            this.btnBoxFactory.interactive = false;

            this.btnBoxFactoryAnimation.pause();
            gsap.to(this.btnBoxFactory.scale, 0.1, { x: 0.85, y: 0.85 });

            let startMoneyAnimation = () => {
                this.moneyAnim.visible = true;
                this.moneyAnim.gotoAndPlay(0);
                this.animateMoneyCounter(this.currentMoney, this.currentMoney + 100, 1000);
                this.currentMoney += 100;
                gsap.delayedCall(0.8, () => {
                    this.moneyAnim.visible = false;
                    this.moneyAnim.stop();
                });
            };

            this.hideBtnFactoryTutor();
    
            if (this.btnFactoryClickCount === 1) {
                this.decreaseMoneyCounter(50);
                playSound('build', false, 0.5);

                this.buildAnimButter.visible = true;
                this.buildAnimButter.play();
                this.butterImage.alpha = 1;
                this.moneyAnimButter.visible = true;
                this.moneyAnimButter.play();
                playSound('flyingCash', false, 0.5);

                this.prodButter.visible = true
                gsap.to(this.prodButter, 0.5, { alpha: 1, onStart: () => {  
                    gsap.to(this.prodButter, 0.8, {y: -225, ease: 'sine.inOut'})} 
                });

                startMoneyAnimation();
                gsap.to(this.background.position, 0.7, {x: -210, y: -170, delay: 0.7, ease: 'sine.inOut',
                    onComplete: () => {
                        this.moneyAnimButter.visible = false;
                        this.btnBoxFactory.interactive = true;

                        this.buildAnimButter.visible = false;
                        this.buildAnimButter.stop();
                        
                        this.btnBoxFactoryAnimation.play();
                    }
                });
            } else if (this.btnFactoryClickCount === 2) {
                this.decreaseMoneyCounter(70);
                playSound('build', false, 0.5);

                this.buildAnimCoffee.visible = true;
                this.buildAnimCoffee.play();
                this.coffeeImage.alpha = 1;
                this.moneyAnimCoffee.visible = true;
                this.moneyAnimCoffee.play();
                playSound('flyingCash', false, 0.5);

                this.prodCoffee.visible = true
                gsap.to(this.prodCoffee, 0.5, { alpha: 1, onStart: () => {  
                    gsap.to(this.prodCoffee, 0.8, {y: -230, ease: 'sine.inOut'})} 
                });

                startMoneyAnimation();
                gsap.to(this.background.position, 0.7, {x: -600, y: -270, delay: 0.7, ease: 'sine.inOut',
                    onComplete: () => {
                        this.moneyAnimCoffee.visible = false;
                        this.btnBoxFactory.interactive = true;

                        this.buildAnimCoffee.visible = false;
                        this.buildAnimCoffee.stop();

                        this.btnBoxFactoryAnimation.play();
                    }
                });
            } else if (this.btnFactoryClickCount === 3) {
                this.decreaseMoneyCounter(70);
                playSound('build', false, 0.5);

                this.buildAnimCustard.visible = true;
                this.buildAnimCustard.play();
                this.custardImage.alpha = 1;
                this.moneyAnimCustard.visible = true;
                this.moneyAnimCustard.play();
                playSound('flyingCash', false, 0.5);

                this.prodCustard.visible = true
                gsap.to(this.prodCustard, 0.5, { alpha: 1, onStart: () => {  
                    gsap.to(this.prodCustard, 0.8, {y: -215, ease: 'sine.inOut'})} 
                });

                startMoneyAnimation();
                gsap.to(this.background.position, 0.7, {x: -650, y: 220, delay: 0.7, ease: 'sine.inOut',
                    onComplete: () => {
                        this.moneyAnimCustard.visible = false;
                        this.btnBoxFactory.interactive = true;

                        this.buildAnimCustard.visible = false;
                        this.buildAnimCustard.stop();

                        this.btnBoxFactoryAnimation.play();
                    }
                });
            } else if (this.btnFactoryClickCount === 4) {
                this.decreaseMoneyCounter(100);
                playSound('build', false, 0.5);

                this.buildAnimYogourt.visible = true;
                this.buildAnimYogourt.play(); 
                this.yogourtImage.alpha = 1;
                this.moneyAnimYogurt.visible = true;
                this.moneyAnimYogurt.play();
                playSound('flyingCash', false, 0.5);

                this.prodYogourt.visible = true
                gsap.to(this.prodYogourt, 0.5, { alpha: 1, onStart: () => {  
                    gsap.to(this.prodYogourt, 0.8, {y: -260, ease: 'sine.inOut'})} 
                });

                startMoneyAnimation();
                gsap.to(this.background.position, 0.7, {x: -1050, y: 120, delay: 0.7, ease: 'sine.inOut',
                    onComplete: () => {
                        this.moneyAnimYogurt.visible = false;
                        this.btnBoxFactory.interactive = false;

                        this.buildAnimYogourt.visible = false;
                        this.buildAnimYogourt.stop(); 

                        this.btnBoxFactory.off('pointertap', this.onBtnFactoryTap);
                        this.btnBoxFactoryAnimation.play();
                    }
                });
                appEndGame();
            }
        }
    }
    

 	hideStartScreen() {
		gsap.to( this.startScreen, 0.5, {alpha: 0, visible: false} );
	}

	showStartScreen() {
		this.startScreen.visible = true;
		gsap.to( this.startScreen, 0.5, {alpha: 1} );
	}

    
    onResize = ({ isPortraite, leftUI, rightUI, upUI, downUI }) => {               
        if (isPortraite) { 
            this.character.display.scale.set( 0.37 );
            this.character.display.position.set( rightUI - 230, downUI - 360 );

            this.speechCaptionPortraite.position.set(0, 50 );
            this.speechCaptionLandscape.visible = false;

            this.moneyCounterBox.position.set( leftUI + 120, upUI + 50 );
            this.cowCounterBox.position.set( leftUI + 310, upUI + 50 );

            this.btnCowBox.position.set( 0,  downUI - 140 );
            this.btnBoxDairy.position.set( 0,  downUI - 160 );
            this.btnBoxFactory.position.set( 0,  downUI - 160 );
        } else {
            this.character.display.scale.set( 0.37 );
            this.character.display.position.set( rightUI - 230, downUI - 340 );

            this.speechCaptionLandscape.position.set(-30, -130 );
            this.speechCaptionPortraite.visible = false;

            this.moneyCounterBox.position.set( leftUI + 120, upUI + 60 );
            this.cowCounterBox.position.set( leftUI + 310, upUI + 60 );

            this.btnCowBox.position.set( rightUI - 220,  upUI + 95  );
            this.btnBoxDairy.position.set( rightUI - 320,  upUI + 95 );
            this.btnBoxFactory.position.set( rightUI - 220,  upUI + 95 );
        }
    }
}

