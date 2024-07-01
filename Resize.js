//---------------------------------------------------------------------------------
//- Resize

app.resize = function(e) {
	app.mainWidth = window.innerWidth;
	app.mainHeight = window.innerHeight;
	app.canvasWidth = Math.ceil(app.scaleFactor * window.innerWidth);
	app.canvasHeight = Math.ceil(app.scaleFactor * window.innerHeight);

	//- 2D canvas
	app.canvas2d.style.width = app.mainWidth + "px";
	app.canvas2d.style.height = app.mainHeight + "px";
	app.canvas2d.width = app.canvasWidth;
	app.canvas2d.height = app.canvasHeight;

	app.renderer2d.resize(app.canvasWidth, app.canvasHeight);
	app.scene2d.position.set(Math.ceil(app.canvasWidth * 0.5), Math.ceil(app.canvasHeight * 0.5));	

	//- 3D canvas
	app.camera3d.aspect = window.innerWidth / window.innerHeight;
	app.renderer3d.setSize(app.scaleFactor * window.innerWidth, app.scaleFactor * window.innerHeight);

	app.canvas3d.style.width = app.mainWidth + "px";
	app.canvas3d.style.height = app.mainHeight + "px";
	app.canvas3d.width = app.scaleFactor * window.innerWidth;
	app.canvas3d.height = app.scaleFactor * window.innerHeight;
	
	app.obj2d.ui.scale.set( 1, 1 );	

	let leftUI, rightUI, upUI, downUI, orientation;

	if ( app.mainWidth < app.mainHeight ) {		
		app.obj2d.ui.scale.set(app.canvasWidth / 720);		

		if ( app.obj2d.ui.scale.y * 1280 > app.canvasHeight ) {
			app.obj2d.ui.scale.set(app.canvasHeight / 1280 );
		}			

		leftUI = -app.canvasWidth * 0.5 / app.obj2d.ui.scale.x;
		rightUI = app.canvasWidth * 0.5 / app.obj2d.ui.scale.x;
		upUI = -app.canvasHeight * 0.5 / app.obj2d.ui.scale.y;
		downUI = app.canvasHeight * 0.5 / app.obj2d.ui.scale.y;
		orientation = 'portraite';

		app.obj2d.soundBtn.x = rightUI - 60;
		app.obj2d.soundBtn.y = downUI - 60;
		app.obj2d.soundBtn.scale.set(0.5);

		app.obj2d.captionPortraite.x = 0,
		app.obj2d.captionPortraite.y = upUI + 100;
		app.obj2d.captionPortraite.scale.set(0.5);

		app.obj2d.logoBox.x = leftUI + 110;
		app.obj2d.logoBox.y = downUI - 100;
		app.obj2d.logoBox.scale.set(0.5);

		//app.obj2d.statsLandscape.display.visible = false;
		app.obj2d.statsPortraite.display.x = 0;
		app.obj2d.statsPortraite.display.y = upUI + 290;

		app.obj2d.battleBtnBox.x = 0;
		app.obj2d.battleBtnBox.y = downUI - 240;
		app.obj2d.battleBtnBox.scale.set(0.65);
		
		app.camera3d.fov = 60;
		app.camera3d.updateProjectionMatrix();		
	} else {		
		app.obj2d.ui.scale.set(app.canvasWidth / 1280);		

		if ( app.obj2d.ui.scale.y * 720 > app.canvasHeight ) {
			app.obj2d.ui.scale.set(app.canvasHeight / 720 );
		}		
		
		leftUI = -app.canvasWidth * 0.5 / app.obj2d.ui.scale.x;
		rightUI = app.canvasWidth * 0.5 / app.obj2d.ui.scale.x;
		upUI = -app.canvasHeight * 0.5 / app.obj2d.ui.scale.y;
		downUI = app.canvasHeight * 0.5 / app.obj2d.ui.scale.y;
		orientation = 'landscape';
		
		app.obj2d.soundBtn.x = leftUI + 60;
		app.obj2d.soundBtn.y = downUI - 60;
		app.obj2d.soundBtn.scale.set(0.55);

		app.obj2d.captionPortraite.visible = false;
		app.obj2d.captionLandscape.visible = true;
		app.obj2d.captionLandscape.x = 0,
		app.obj2d.captionLandscape.y = upUI + 65;
		app.obj2d.captionLandscape.scale.set(0.5);

		app.obj2d.logoBox.x = leftUI + 120;
		app.obj2d.logoBox.y = upUI + 100;
		app.obj2d.logoBox.scale.set(0.5);

		// app.obj2d.statsPortraite.visible = false;
		app.obj2d.statsLandscape.display.x = rightUI - 260;
		app.obj2d.statsLandscape.display.y = upUI + 320;

		app.obj2d.battleBtnBox.x = rightUI - 263;
		app.obj2d.battleBtnBox.y = downUI - 120;
		app.obj2d.battleBtnBox.scale.set(0.65);

		app.obj3d.mech.shieldIcon.iconOptions.scale.set( 0.7 );
		app.obj3d.mech.shieldIcon.doneBtn.scale.set( 0.47 );

		app.obj3d.mech.weaponLeftIcon.iconOptions.scale.set( 0.47 );
		app.obj3d.mech.weaponLeftIcon.doneBtn.scale.set( 0.47 );

		app.obj3d.mech.weaponUpIcon.iconOptions.scale.set( 0.47 );
		app.obj3d.mech.weaponUpIcon.doneBtn.scale.set( 0.47 );

		app.camera3d.fov = 40;
		app.camera3d.updateProjectionMatrix();
	}		

	app.obj2d.tutorMain.onResize( { leftUI, rightUI, upUI, downUI, orientation });
	app.obj2d.shieldIcon.onResize( { leftUI, rightUI, upUI, downUI, orientation });
	app.obj2d.weaponLeftIcon.onResize( { leftUI, rightUI, upUI, downUI, orientation });
	app.obj2d.weaponUpIcon.onResize( { leftUI, rightUI, upUI, downUI, orientation });

	app.obj2d.fsCTA.scale.x = 0.1 + app.canvasWidth / 1280 / app.obj2d.ui.scale.x;
	app.obj2d.fsCTA.scale.y = 0.1 + app.canvasHeight / 1280 / app.obj2d.ui.scale.x;

	app.camera3d.left = -window.innerWidth/2;
	app.camera3d.right = window.innerWidth/2; 
	app.camera3d.top = window.innerHeight/2;
	app.camera3d.bottom = -window.innerHeight/2;
	app.camera3d.updateProjectionMatrix();
}