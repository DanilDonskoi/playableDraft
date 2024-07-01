function createScene() {	
	init3dScene();	
	init2dScene();	
}

function init3dScene() {
	app.obj3d.main = new THREE.Group();
	app.scene3d.add( app.obj3d.main );		
	
	initCamera();
	initLights();
	initMaterials();
	initWorld();
	initTutor();
}

function initCamera() {	
	app.camera3d = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 1000);
	app.camera3d.position.set( 22.2, 3.4, 35 );
	//app.camera3d.position.set( 22.2, 3.4, 35 );
	app.camera3d.lookAt( 0.3, 10, 0 );
	//app.camera3d.lookAt( 0.3, 10, 0 );

	let lookingPosition = new THREE.Vector3( 0.3, 10, 0 )
	app.obj3d.lookingPosition = lookingPosition;
}

function initLights() {
	let lightAmbient = new THREE.AmbientLight(0xffffff, 0.8);
	app.obj3d.lightAmbient = lightAmbient;
	app.obj3d.main.add( lightAmbient );

	let lightDirectionalOne = new THREE.DirectionalLight(0xffffff, 0.8);
	lightDirectionalOne.position.set( 25, 30, 48 );
	lightDirectionalOne.castShadow = true;
	app.obj3d.lightDirectionalOne = lightDirectionalOne;
	app.obj3d.main.add(lightDirectionalOne);

	lightDirectionalOne.shadow.camera.left = -30;
	lightDirectionalOne.shadow.camera.right = 30;
	lightDirectionalOne.shadow.camera.top = 30;
	lightDirectionalOne.shadow.camera.bottom = -30;
	lightDirectionalOne.shadow.radius = 2;

	lightDirectionalOne.shadow.mapSize.width = 1024;
	lightDirectionalOne.shadow.mapSize.height = 1024;
}

function initMaterials() {
	for (let textureName in assets.textures.three) {
		let texture = assets.textures.three[textureName];
		setTextureDefaultSettings(texture);
	};
	app.material.ground = new THREE.MeshLambertMaterial({
		map: assets.textures.three['circle'],
	});
	app.material.blue = new THREE.MeshPhongMaterial({
		map: assets.textures.three['blue'],
		specular: 0x999999,
		shininess:50,		
	});
	app.material.yellow = new THREE.MeshPhongMaterial({
		map: assets.textures.three['yellow'],
		specular: 0x999999,
		shininess: 50,		
	});
	app.material.grey = new THREE.MeshPhongMaterial({
		map: assets.textures.three['grey'],
		specular: 0x999999,
		shininess: 50,	
	});
	app.material.cryodiffuse = new THREE.MeshPhongMaterial({
		map: assets.textures.three['cryo'],
		specular: 0x999999,
		shininess: 50,			
	});
	app.material.havoc = new THREE.MeshPhongMaterial({
		map: assets.textures.three['havoc'],
		specular: 0x999999,
		shininess: 40,			
	});
	app.material.hazard = new THREE.MeshPhongMaterial({
		map: assets.textures.three['hazard'],
		specular: 0x999999,
		shininess: 50,			
	});
	app.material.atomizer = new THREE.MeshPhongMaterial({
		map: assets.textures.three['atomizer'],
		specular: 0x999999,
		shininess: 50,			
	});
	app.material.glacier = new THREE.MeshPhongMaterial({
		map: assets.textures.three['glacier'],
		specular: 0x999999,
		shininess: 50,			
	});
	app.material.volt = new THREE.MeshPhongMaterial({
		map: assets.textures.three['volt'],
		specular: 0x999999,
		shininess: 50,			
	});
}

function initWorld() {
	let ground = assets.models.circle;
	app.obj3d.main.add(ground);
	app.obj3d.ground = ground; 

	ground.traverse( child => {
		child.receiveShadow = true;
		child.castShadow = true;
		child.material = app.material.ground;
	});

	let mech = new Robot();
	app.obj3d.mech = mech;
	app.obj3d.main.add( mech.model );
	app.tutorObjects.firstObject = mech.shieldIcon.display;

	showAllIcons();
}

function setTextureDefaultSettings( texture, magFilter=THREE.NearestFilter ) {
	texture.magFilter = magFilter;
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.flipY = false;
}

function init2dScene() {
	app.obj2d.ui = new PIXI.Container();
	app.scene2d.addChild( app.obj2d.ui );	

	app.obj2d.fsCTA = app.template.fullScreenCTA();
	app.obj2d.soundBtn = app.template.soundButton();

	app.obj2d.captionPortraite = new PIXI.Sprite( assets.textures.pixi['caption'] );
	app.obj2d.captionPortraite.anchor.set( 0.5 );
	app.obj2d.captionPortraite.visible = true;

	app.obj2d.captionLandscape = new PIXI.Sprite( assets.textures.pixi['captionLandscape'] );
	app.obj2d.captionLandscape.anchor.set( 0.5 );
	app.obj2d.captionLandscape.visible = false;

	app.obj2d.logoBox = new PIXI.Container();
	let logo = new PIXI.Sprite( assets.textures.pixi['logo'] );
	logo.anchor.set(0.5);
	let installBtn = new PIXI.Sprite( assets.textures.pixi['installBtn'] );
	installBtn.anchor.set(0.5);
	app.obj2d.logoBox.addChild( logo, installBtn );
	gsap.from( installBtn.scale, 0.5, {x: 0.92, y: 0.92, repeat: -1, yoyo: true, ease: 'sine.inOut'})

	app.obj2d.statsPortraite = new StatsBoxPortraite();
	app.obj2d.statsPortraite.display.visible = false;

	app.obj2d.statsLandscape = new StatsBoxLandscape();
	app.obj2d.statsLandscape.display.visible = false;

	app.obj2d.battleBtnBox = new PIXI.Container();
	app.obj2d.battleBtnBox.visible = false;
	app.obj2d.battleBtnBox.interactive = true;
	app.obj2d.battleBtnBox.on('pointerup', clickAd)
	let battleBtn = new PIXI.Sprite( assets.textures.pixi['battleBtn'] );
	battleBtn.anchor.set( 0.5 );
	app.obj2d.battleBtnBox.addChild( battleBtn );

	app.obj2d.ui.addChild(		
		app.obj2d.soundBtn,
		app.obj3d.mech.shieldIcon.display,
		app.obj3d.mech.shieldIcon.iconOptions,
		app.obj3d.mech.shieldIcon.doneBtn,
		app.obj3d.mech.weaponLeftIcon.display,
		app.obj3d.mech.weaponLeftIcon.iconOptions,
		app.obj3d.mech.weaponLeftIcon.doneBtn,
		app.obj3d.mech.weaponUpIcon.display,
		app.obj3d.mech.weaponUpIcon.iconOptions,
		app.obj3d.mech.weaponUpIcon.doneBtn,
		app.obj2d.captionPortraite,
		app.obj2d.captionLandscape,
		app.obj2d.logoBox,
		app.obj2d.tutorMain.display,
		app.obj2d.statsPortraite.display,
		app.obj2d.statsLandscape.display,
		app.obj2d.battleBtnBox,
		app.obj2d.fsCTA,
	);
}

function initTutor() {	
	app.obj2d.tutorMain = new Tutorial(app.tutorObjects);
	app.obj2d.tutorMain.show();
}

function showAllIcons() {
	for (let icon of app.activeIcons) {
		if (icon && typeof icon.show === 'function') {
			icon.show();
		}
	}
}

function performFinals() {
	app.obj3d.mech.model.animation.actions.Idle.stop();
	app.obj3d.mech.model.animation.set( "Ability" );
	app.obj3d.mech.model.animation.actions.Ability.setLoop( THREE.LoopOnce );
	if ( app.mainWidth < app.mainHeight ) {
		// app.obj2d.statsPortraite.show();
		// app.obj2d.battleBtnBox.visible = true;
		// gsap.to( app.obj2d.battleBtnBox, 0.5, {alpha: 1} );
		// gsap.to( app.obj2d.battleBtnBox.scale, 0.4, {x: 0.71, y: 0.71, repeat: -1, yoyo: true, ease: 'power1.inOut' } );	
		gsap.to ( app.obj3d.lookingPosition, 0.7, {x: 0, y: 10.5, z: 0})
		gsap.to(app.camera3d.position, 0.7, {x: 0, y: 8, z: 40, ease: "power1.inOut", delay: 0.7,
			onComplete: () => {
				app.obj2d.statsPortraite.show();
				app.obj2d.battleBtnBox.visible = true;
				gsap.to( app.obj2d.battleBtnBox, 0.5, {alpha: 1} );
				gsap.to( app.obj2d.battleBtnBox.scale, 0.4, {x: 0.71, y: 0.71, repeat: -1, yoyo: true, ease: 'power1.inOut' } );	
			},
		});
	} else {
		// app.obj2d.statsLandscape.show();
		// app.obj2d.battleBtnBox.visible = true;
		// gsap.to( app.obj2d.battleBtnBox, 0.5, {alpha: 1} );
		// gsap.to( app.obj2d.battleBtnBox.scale, 0.4, {x: 0.71, y: 0.71, repeat: -1, yoyo: true, ease: 'power1.inOut' } );
		gsap.to ( app.obj3d.lookingPosition, 0.7, {x: 0, y: 10.5, z: 0})
		gsap.to(app.camera3d.position, 0.7, {x: 0, y: 8, z: 40, ease: "power1.inOut", delay: 0.7,
			onComplete: () => {
				app.obj2d.statsLandscape.show();
				app.obj2d.battleBtnBox.visible = true;
				gsap.to( app.obj2d.battleBtnBox, 0.5, {alpha: 1} );
				gsap.to( app.obj2d.battleBtnBox.scale, 0.4, {x: 0.69, y: 0.69, repeat: -1, yoyo: true, ease: 'power1.inOut' } );
			},
		});

	}
}