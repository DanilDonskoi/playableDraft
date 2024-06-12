function createScene() {
	app.template = new Template();

	app.obj2d.main = new PIXI.Container();
	app.scene2d.addChild( app.obj2d.main );

	app.obj2d.fsCTA = app.template.fullScreenCTA();
	app.obj2d.soundBtn = app.template.soundButton();
	
	app.screenManager = new ScreenManager(
		new OpeningScreen(),
		new EnemyScreen(),
		new ArenaScreen(),
		new FightScreen(),
		new FinishScreen(),
	); 

	app.screenManager.set( OpeningScreen, undefined, true );

	app.obj2d.main.addChild(
		app.screenManager.display, 		
		app.obj2d.fsCTA,
		app.obj2d.soundBtn,
	);
}

function createAnimSprite(texture, framesData, animName) {	
	let spriteSheet;
  
	if ( app.sheets[animName] === undefined ) {
		let sheetData = createSpriteSheet(animName, framesData[animName]);

		spriteSheet = new PIXI.Spritesheet(texture, sheetData);
		spriteSheet.parse(() => { });

		app.sheets[animName] = spriteSheet;
	} else {
		spriteSheet = app.sheets[animName];
	}  

	let animSprite = new PIXI.AnimatedSprite(spriteSheet.animations[animName]);	
	animSprite.animationSpeed = 0.35;
	animSprite.loop = false;	
	animSprite.tint = 0xff0000;
	
	return animSprite;
}	

function createSpriteSheet(animName, frames) {
	let sheetData = {
		frames,
		animations: {
			[animName] : []
		}, 
		meta: {
			scale: 1
		}
	}

	for (let frameName in frames) {
		sheetData.animations[animName].push(frameName);
	}

	return sheetData;
}

