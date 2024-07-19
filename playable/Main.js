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
        this.display.addChild( this.background );
        this.background.position.set(-640, 970 ); // start -640, 970     factory 220, -320    dairy 330, 1220
        
        this.worldMap = new ImageObj(assets.textures.pixi.worldEmpty);
        this.background.addChild( this.worldMap.display );
        this.background.scale.set(0.9)

        this.initStartLayer();
        this.initWalkingCow();
        this.initDairy();
        this.initFactory();
        this.initUILayer();
        this.initScenario();
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
            gsap.to( this.background.position, 1, {x: 1720, y: 520, ease: 'quad.in'}); //  330, 1220
        }});
        this.director.scripts.intro.add(WaitTask, 1);
        this.director.scripts.intro.add(FuncTask, { func: () => {
            this.moneyCounterBox.visible = true;
            gsap.from( this.moneyCounterBox, 0.5, {alpha: 0} );
            gsap.delayedCall(0.7, () => {
                this.moneyAnim.visible = true;
                this.moneyAnim.play();
                playSound('flyingCash', false, 0.5);
                this.animateMoneyCounter(10, 500, 2600); 
            });
        }});
        this.director.scripts.intro.add(WaitTask, 3.3);
        this.director.scripts.intro.add(FuncTask, { func: () => {
            this.btnBoxCows.visible = true; 
            gsap.from( this.btnBoxCows, 0.5, {alpha: 0} );
            this.moneyAnim.visible = false;
            this.moneyAnim.stop();
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

        this.milkersImage = new PIXI.Container();
        this.dairy.addChild( this.milkersImage );
        this.milkersImage.visible = true;
        this.milkersImage.position.set( 3, -20)

        let milkerFirst = new ImageObj(assets.textures.pixi.milkerFirst);
        milkerFirst.display.visible = false;
        let milkerSecond = new ImageObj(assets.textures.pixi.milkerSecond);
        milkerSecond.display.visible = false;
        let milkerThird = new ImageObj(assets.textures.pixi.milkerThird);
        milkerThird.display.visible = false;
        let milkerFour = new ImageObj(assets.textures.pixi.milkerFour);
        milkerFour.display.visible = false;
        this.milkersImage.addChild( 
            milkerFirst.display,
            milkerSecond.display,
            milkerThird.display,
            milkerFour.display
        );
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
        
        this.buildAnimButter = createAnimSprite(assets.textures.pixi["upgrade"], buildSheetData, 'effects' );
        this.buildAnimButter.animationSpeed = 0.12;
        this.butterMachine.addChild( this.buildAnimButter );
        this.buildAnimButter.position.set(-340, -800);
        this.buildAnimButter.scale.set(1.3);
        this.buildAnimButter.loop = false;
        this.buildAnimButter.visible = true;
        //this.buildAnimButter.play();

        this.coffeeMachine = new PIXI.Container(); // -210, -270
        this.coffeeImage = new PIXI.Sprite( assets.textures.pixi.coffeeMachine );
        this.coffeeImage.anchor.set( 0.5 );
        this.coffeeImage.alpha = 0.3;
        this.coffeeMachine.addChild( this.coffeeImage );
        this.coffeeMachine.position.set(258, 63);
        this.background.addChild( this.coffeeMachine );
        this.coffeeMachine.visible = true;
        
        this.buildAnimCoffee = createAnimSprite(assets.textures.pixi["upgrade"], buildSheetData, 'effects' );
        this.buildAnimCoffee.animationSpeed = 0.12;
        this.coffeeMachine.addChild( this.buildAnimCoffee );
        this.buildAnimCoffee.position.set(-340, -800);
        this.buildAnimCoffee.scale.set(1.3);
        this.buildAnimCoffee.loop = false;
        this.buildAnimCoffee.visible = false;
        //this.buildAnimCoffee.play();

        this.curtardMachine = new PIXI.Container(); // -600, -270
        this.curtardImage = new PIXI.Sprite( assets.textures.pixi.curtardMachine );
        this.curtardImage.anchor.set( 0.5 );
        this.curtardImage.alpha = 0.3;
        this.curtardMachine.addChild( this.curtardImage );
        this.curtardMachine.position.set(670, 305);
        this.background.addChild( this.curtardMachine );
        this.curtardMachine.visible = true;
        
        this.buildAnimCurtard = createAnimSprite(assets.textures.pixi["upgrade"], buildSheetData, 'effects' );
        this.buildAnimCurtard.animationSpeed = 0.12;
        this.curtardMachine.addChild( this.buildAnimCurtard );
        this.buildAnimCurtard.position.set(-340, -800);
        this.buildAnimCurtard.scale.set(1.3);
        this.buildAnimCurtard.loop = false;
        this.buildAnimCurtard.visible = false;
        //this.buildAnimCurtard.play(); // -650, -70

        this.yogurtMachine = new PIXI.Container(); // -650, -70
        this.yogurtImage = new PIXI.Sprite( assets.textures.pixi.yogurtMachine );
        this.yogurtImage.anchor.set( 0.5 );
        this.yogurtImage.alpha = 0.3;
        this.yogurtMachine.addChild( this.yogurtImage );
        this.yogurtMachine.position.set(746, -236);
        this.background.addChild( this.yogurtMachine );
        this.yogurtMachine.visible = true;
        
        this.buildAnimYogurt = createAnimSprite(assets.textures.pixi["upgrade"], buildSheetData, 'effects' );
        this.buildAnimYogurt.animationSpeed = 0.12;
        this.yogurtMachine.addChild( this.buildAnimYogurt );
        this.buildAnimYogurt.position.set(-330, -780);
        this.buildAnimYogurt.scale.set(1.3);
        this.buildAnimYogurt.loop = false;
        this.buildAnimYogurt.visible = false;
        //this.buildAnimYogurt.play(); 

    }

    initUILayer() {
        this.initMoneyCounter();
        this.initBtnBoxCows();
        this.initBtnBoxDairy();
        this.initBtnBoxFactory();
    }

    initWalkingCow() {
        this.cowsBase = [];
        this.availableCowIndices = [0, 1, 2, 3, 4];
        
        this.cowBox = new PIXI.Container();
        this.display.addChild( this.cowBox );
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
            fontSize: 42,
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
            this.currentMoney = 500;
        }
        let newMoney = this.currentMoney - amount;
        if (newMoney < 0) {
            newMoney = 0;
        }
        this.animateMoneyCounter(this.currentMoney, newMoney, 500);
        this.currentMoney = newMoney;
        playSound('coin', false, 0.5);
    }

    initBtnBoxCows() {
        this.btnBoxCows = new PIXI.Container();
        this.display.addChild(this.btnBoxCows);
        this.btnBoxCows.visible = false; 

        let btnAction = new ImageObj(assets.textures.pixi.btnBlue);
        this.btnBoxCows.addChild( btnAction.display );

        let btnText = new ImageObj(assets.textures.pixi.btnTextCow);
        this.btnBoxCows.addChild( btnText.display );

        this.btnBoxCows.scale.set( 0.7 );
        this.btnBoxCows.interactive = true;
        this.btnBoxCows.on( 'pointertap', this.onBtnTap );  
    }

    initBtnBoxDairy() {
        this.btnBoxDairy = new PIXI.Container();
        this.display.addChild(this.btnBoxDairy);
        this.btnBoxDairy.visible = false; 
        this.btnBoxDairy.scale.set( 0.7 );
        
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
    }

    initBtnBoxFactory() {
        this.btnBoxFactory = new PIXI.Container();
        this.display.addChild(this.btnBoxFactory);
        this.btnBoxFactory.visible = false; 
        this.btnBoxFactory.scale.set( 0.7 );

        let btnAction = new ImageObj(assets.textures.pixi.btnGreen);
        this.btnBoxFactory.addChild( btnAction.display );

        let btnText = new ImageObj(assets.textures.pixi.btnTextBuild);
        this.btnBoxFactory.addChild( btnText.display );

        this.btnBoxFactory.interactive = true;
        this.btnBoxFactory.on( 'pointertap', this.onBtnFactoryTap );  
    }

    moveFromDairyToFactory() {
        this.director.scripts.dairy.add(WaitTask, 0.5);
        this.director.scripts.dairy.add(FuncTask, { func: () => {
            gsap.to( this.background.position, 1, {x: 220, y: -320, ease: 'quad.in',  
                onComplete: () => {
                    this.btnBoxFactory.visible = true; 
                    gsap.from( this.btnBoxFactory, 0.5, {alpha: 0} );
                }});
        }});
        this.director.scripts.dairy.start();
    }

    onBtnTap = () => {  
        this.showRandomCow();
        this.decreaseMoneyCounter(10);
        playSound('button', false, 0.5);

        if (this.availableCowIndices.length === 0) {
            this.btnBoxCows.interactive = false;
            gsap.to( this.btnBoxCows, 0.5, {alpha: 0, visible: false} );
            this.btnBoxCows.off( 'pointertap', this.onBtnTap );
            stopSound('moo');
            
            gsap.to( this.cowBox, 0.5, {alpha: 0, visible: false} );
            gsap.to( this.background.position, 1, {x: 330, y: 1220, delay: 0.5, ease: 'quad.in',  
                onComplete: () => {
                    this.btnActionBlue.interactive = true;
                    this.btnActionGreen.interactive = true;
                }
            });
            this.btnBoxDairy.visible = true; 
            gsap.from( this.btnBoxDairy, 0.5, {delay: 1.5, alpha: 0} );
            return;
        }
    }

    onBtnActionBlueTap = () => { 
        if (this.currentMoney < 20) {
            console.log('Not enough money to hire a milker.');
            return;
        }
    
        let milkerIndex = this.milkers.findIndex(milker => milker === false);
        if (milkerIndex === -1) {
            console.log('No free milkers available.');
            this.btnActionBlue.off('pointertap', this.onBtnActionBlueTap);
            return;
        }
    
        // Блокировка интерфейса
        this.btnActionBlue.interactive = false;
        this.btnActionGreen.interactive = false;
    
        this.milkers[milkerIndex] = true;
        this.decreaseMoneyCounter(20);
        playSound('button', false, 0.5);
    
        let milker = this.milkersImage.children[milkerIndex];
        milker.visible = true;
    
        if (this.stalls[milkerIndex] === true) {
            let cow = this.cowsImage.children[milkerIndex];
            cow.visible = true;
            playSound('moo', false, 0.5);
            gsap.from(cow, 0.5, {delay: 0.3, alpha: 0,  
                onComplete: () => {
                    if (!this.milkers.includes(false) && !this.stalls.includes(false)) {
                        gsap.to(this.btnBoxDairy, 0.5, {alpha: 0, visible: false});
                        this.moveFromDairyToFactory();
                    }
                    // Разблокировка интерфейса
                    this.btnActionBlue.interactive = true;
                    this.btnActionGreen.interactive = true;
                }
            });
        } else {
            // Разблокировка интерфейса
            this.btnActionBlue.interactive = true;
            this.btnActionGreen.interactive = true;
        }
    
        if (!this.milkers.includes(false)) {
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
    
        let stallIndex = this.stalls.findIndex(stall => stall === false);
        if (stallIndex === -1) {
            console.log('No free stalls available.');
            this.btnActionGreen.interactive = false;
            this.btnActionGreen.off('pointertap', this.onBtnActionGreenTap);
            return;
        }
    
        // Блокировка интерфейса
        this.btnActionBlue.interactive = false;
        this.btnActionGreen.interactive = false;
    
        this.stalls[stallIndex] = true;
        this.decreaseMoneyCounter(10);
        playSound('button', false, 0.5);
    
        let stall = this.stallsImage.children[stallIndex];
        stall.visible = true;
    
        if (this.milkers[stallIndex] === true) {
            let cow = this.cowsImage.children[stallIndex];
            cow.visible = true;
            playSound('moo', false, 0.5);
            gsap.from(cow, 0.5, {delay: 0.3, alpha: 0,   
                onComplete: () => {
                    if (!this.milkers.includes(false) && !this.stalls.includes(false)) {
                        gsap.to(this.btnBoxDairy, 0.5, {alpha: 0, visible: false});
                        this.moveFromDairyToFactory();
                    }
                    // Разблокировка интерфейса
                    this.btnActionBlue.interactive = true;
                    this.btnActionGreen.interactive = true;
                }
            });
        } else {
            // Разблокировка интерфейса
            this.btnActionBlue.interactive = true;
            this.btnActionGreen.interactive = true;
        }
    
        if (!this.stalls.includes(false)) {
            this.btnActionGreen.interactive = false;
            this.btnActionGreen.off('pointertap', this.onBtnActionGreenTap);
            stopSound('button');
        }
    }

    onBtnFactoryTap = () => {
        if (this.btnBoxFactory.interactive) {
            this.btnFactoryClickCount++;
            this.btnBoxFactory.interactive = false;
    
            if (this.btnFactoryClickCount === 1) {
                this.decreaseMoneyCounter(50);
                this.buildAnimButter.visible = true;
                this.buildAnimButter.play();
                playSound('build', false, 0.5);
                this.butterImage.alpha = 1;
                gsap.to(this.background.position, 0.7, {x: -210, y: -270, delay: 0.3, ease: 'quad.in',
                    onComplete: () => {
                        this.btnBoxFactory.interactive = true;
                    }
                });
            } else if (this.btnFactoryClickCount === 2) {
                this.decreaseMoneyCounter(70);
                this.buildAnimCoffee.visible = true;
                this.buildAnimCoffee.play();
                playSound('build', false, 0.5);
                this.coffeeImage.alpha = 1;
                gsap.to(this.background.position, 0.7, {x: -600, y: -270, delay: 0.3, ease: 'quad.in',
                    onComplete: () => {
                        this.btnBoxFactory.interactive = true;
                    }
                });
            } else if (this.btnFactoryClickCount === 3) {
                this.decreaseMoneyCounter(70);
                this.buildAnimCurtard.visible = true;
                this.buildAnimCurtard.play();
                playSound('build', false, 0.5);
                this.curtardImage.alpha = 1;
                gsap.to(this.background.position, 0.7, {x: -650, y: 220, delay: 0.3, ease: 'quad.in',
                    onComplete: () => {
                        this.btnBoxFactory.interactive = true;
                    }
                });
            } else if (this.btnFactoryClickCount === 4) {
                this.decreaseMoneyCounter(100);
                this.buildAnimYogurt.visible = true;
                this.buildAnimYogurt.play(); 
                playSound('build', false, 0.5);
                this.yogurtImage.alpha = 1;
                gsap.to(this.background.position, 0.7, {x: -650, y: 220, delay: 0.3, ease: 'quad.in',
                    onComplete: () => {
                        this.btnBoxFactory.interactive = false;
                        this.btnBoxFactory.off('pointertap', this.onBtnFactoryTap);
                        appEndGame();
                    }
                });
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

            this.speechCaptionPortraite.position.set(0, +50 );
            this.speechCaptionLandscape.visible = false;

            this.moneyCounterBox.position.set( leftUI + 120, upUI + 50 );
            this.btnBoxCows.position.set( 0,  downUI - 120 );
            this.btnBoxDairy.position.set( 0,  downUI - 120 );
            this.btnBoxFactory.position.set( 0,  downUI - 160 );
        } else {
            this.character.display.scale.set( 0.37 );
            this.character.display.position.set( rightUI - 230, downUI - 340 );

            this.speechCaptionLandscape.position.set(-30, -130 );
            this.speechCaptionPortraite.visible = false;

            this.moneyCounterBox.position.set( leftUI + 120, upUI + 60 );
            this.btnBoxCows.position.set( rightUI - 220,  upUI + 80  );
            this.btnBoxDairy.position.set( rightUI - 320,  upUI + 80 );
            this.btnBoxFactory.position.set( rightUI - 220,  upUI + 80 );
        }
    }
}

