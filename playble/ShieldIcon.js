class ShieldIcon {
	constructor() {
		this.initDisplay();
		this.initOptionTutor();
		this.initDoneBtnTutor();

		app.update.add( this.onUpdate );
	}

	initDisplay() {
		this.display = new PIXI.Container();
		this.display.interactive = true;
		this.display.on('pointerdown', this.onIconTap);

		this.icon = new PIXI.Container();
		this.icon.scale.set( 0.44 );
		this.display.addChild( this.icon );

		let image = new PIXI.Sprite( assets.textures.pixi['shield'] );
		image.anchor.set( 0.5 );
		this.icon.addChild( image );

		this.iconOptions = new PIXI.Container();
		this.iconOptions.visible = false;
		this.iconOptions.interactive = true;
		this.iconOptions.on('pointerdown', this.onOptionTap);
	
		this.shieldBlue = new PIXI.Sprite( assets.textures.pixi['shieldBlue'] );
		this.shieldBlue.anchor.set( 0.5 );
		this.shieldBlue.position.set( -275, -220 );
		this.iconOptions.addChild( this.shieldBlue );
		this.shieldBlue.interactive = true;
		this.shieldBlue.on('pointerdown', this.onBlueOptionTap);

		this.shieldYellow = new PIXI.Sprite( assets.textures.pixi['shieldYellow'] );
		this.shieldYellow.anchor.set( 0.5 );
		this.shieldYellow.position.set( -70, 105);
		this.iconOptions.addChild( this.shieldYellow );
		this.shieldYellow.interactive = true;
		this.shieldYellow.on('pointerdown', this.onYellowOptionTap);

		this.shieldGrey = new PIXI.Sprite( assets.textures.pixi['shieldGrey'] );
		this.shieldGrey.anchor.set( 0.5 );
		this.shieldGrey.position.set( 275, 220);
		this.iconOptions.addChild( this.shieldGrey );
		this.shieldGrey.interactive = true;
		this.shieldGrey.on('pointerdown', this.onGrayOptionTap);

		this.doneBtn = new PIXI.Container();
		let btnImage = new PIXI.Sprite( assets.textures.pixi['doneBtn'] );
		btnImage.anchor.set( 0.5 );
		this.doneBtn.addChild( btnImage );
		this.doneBtn.visible = false;
		this.doneBtn.interactive = true;
		this.doneBtn.on('pointerdown', this.onDoneBtnTap);
	}

	removeFromActiveIcons() {
        const index = app.activeIcons.indexOf(this);
        if (index != -1) {
            app.activeIcons.splice(index, 1);
        }
    }

	onUpdate = () => {
		
    }
    
    onResize( { leftUI, rightUI, upUI, downUI, orientation} ) {
        if ( orientation === 'portraite' ) {
			this.iconOptions.position.set( leftUI + 235, downUI - 315 );
			this.iconOptions.scale.set(0.48);

			this.doneBtn.position.set( rightUI - 135, downUI - 230 );
			this.doneBtn.scale.set(0.46);

			this.handOptionTutor.position.set( this.shieldBlue.position.x, this.shieldBlue.position.y );
        } 

        if ( orientation === 'landscape' ) {
			this.iconOptions.position.set( leftUI + 300, downUI - 245 );
			this.iconOptions.scale.set(0.48);

			this.doneBtn.position.set( rightUI - 230, downUI - 110 );
			this.doneBtn.scale.set(0.46);

			this.handOptionTutor.position.set(  this.shieldBlue.position.x, this.shieldBlue.position.y );
        }
    }

	hide() {
		gsap.to( this.display, 0.5, {alpha: 0, visible: false} );
	}

	show() {
		this.display.visible = true;
		gsap.to( this.display, 0.5, {alpha: 1} );
	}

	initOptionTutor() {
		this.handOptionTutor = new PIXI.Container();

        let handSprite = new PIXI.Sprite( assets.textures.pixi['hand'] );
        handSprite.pivot.set(9, 8);
        handSprite.hitArea = new PIXI.Rectangle(0, 0, 0, 0); 
        this.handOptionTutor.addChild( handSprite );
        this.iconOptions.addChild( this.handOptionTutor );
        
        this.timelineOption = gsap.timeline({repeat: -1, repeatDelay: 1, paused: true, delay: 0.5});
        this.timelineOption.from( handSprite, 0.4, {x: -65, alpha: 0, ease: 'sine.out'});
        this.timelineOption.to( handSprite.scale, 0.3, {x: 0.95, y: 0.95, repeat: 1, yoyo: true, ease: 'sine.inOut' });	
		this.timelineOption.to( handSprite, 0.5, {x: 205, y: 330, ease: 'sine.out'});
        this.timelineOption.to( handSprite.scale, 0.3, {x: 0.95, y: 0.95, repeat: 1, yoyo: true, ease: 'sine.inOut' });	
		this.timelineOption.to( handSprite, 0.5, {x: 545, y: 440, ease: 'sine.out'});
        this.timelineOption.to( handSprite.scale, 0.3, {x: 0.95, y: 0.95, repeat: 1, yoyo: true, ease: 'sine.inOut' });	
		this.timelineOption.to( handSprite, 0.5, {x: 600, alpha: 0});
	}

	initDoneBtnTutor() {
        let handSprite = new PIXI.Sprite( assets.textures.pixi['hand'] );
        handSprite.pivot.set(9, 8);
        handSprite.hitArea = new PIXI.Rectangle(0, 0, 0, 0); 
        this.doneBtn.addChild(handSprite);
        
        this.timelineDoneBtn = gsap.timeline({repeat: -1, repeatDelay: 1, paused: true, delay: 0.5});
        this.timelineDoneBtn.from( handSprite, 0.4, {y: -65, alpha: 0, ease: 'sine.out'});
        this.timelineDoneBtn.to( handSprite.scale, 0.3, {x: 0.95, y: 0.95, repeat: 1, yoyo: true, ease: 'sine.inOut' });	
		this.timelineDoneBtn.to( handSprite, 0.5, {y: 60, alpha: 0});
	}

	onIconTap = () => {
		this.display.off('pointerdown', this.onIconTap);
		this.hide();
		app.obj3d.mech.model.animation.actions.Idle.stop();
		app.obj3d.mech.weaponLeftIcon.hide();
		app.obj3d.mech.weaponUpIcon.hide();
		gsap.to( app.obj3d.mech.shieldIconPoint.position, 0.6, {x: 12.4, y: 3.4, z: 0, delay: 0.1, ease: 'sine.inOut' });	
		gsap.to ( app.obj3d.lookingPosition, 0.7, {x: 0, y: 10, z: 0})
		gsap.to(app.camera3d.position, 0.7, {x: 32, y: 1.2, z: 13.6, ease: "power1.inOut", 
			onComplete: () => {
				this.show();
				gsap.to( this.icon.scale, 0.4, {x: 0.51, y: 0.51, ease: 'sine1.inOut'} );
			},
		});
		this.iconOptions.visible = true;
		gsap.from( this.shieldBlue, 0.6, {alpha: 0, delay: 0.6,
			onComplete: () => {
				this.timelineOption.play();
			}} 
		);
		gsap.from( this.shieldYellow, 0.6, {alpha: 0, delay: 0.7} );
		gsap.from( this.shieldGrey, 0.6, {alpha: 0, delay: 0.8} );

		gsap.from( this.shieldBlue.scale, 0.6, {x: 0.85, y: 0.85, delay: 0.6} );
		gsap.from( this.shieldYellow.scale, 0.6, {x: 0.85, y: 0.85,  delay: 0.7} );
		gsap.from( this.shieldGrey.scale, 0.6, {x: 0.85, y: 0.85,  delay: 0.8} );

        gsap.to( this.handOptionTutor, 0.5, {alpha: 1} );
		playSound('click', false, 0.5);
	}

	onOptionTap = () => {
		this.iconOptions.off('pointerdown', this.onOptionTap);
        gsap.to( this.handOptionTutor, 0.3, {alpha: 0, visible: false} );
        this.timelineOption.pause(0);
	}

	onBlueOptionTap = () => {
		if (this.doneBtn.visible==false) {
			this.doneBtn.visible = true;
			this.timelineDoneBtn.play();
			gsap.from( this.doneBtn, 0.6, {alpha: 0, delay: 0.45} );
			gsap.from( this.doneBtn.scale, 0.5, {x: 0.5, y: 0.5, repeat: -1, ease: 'sine.inOut', yoyo: true, delay: 0.7} );
		}
		gsap.to( this.shieldBlue.scale, 0.3, {x: 1.1, y: 1.1, ease: 'sine.inOut', delay: 0.1} );	
		gsap.to( this.shieldYellow.scale, 0.3, {x: 1, y: 1, ease: 'sine.inOut'} );	
		gsap.to( this.shieldGrey.scale, 0.3, {x: 1, y: 1, ease: 'sine.inOut'} );	

		gsap.delayedCall( 0.2, () => {
			let mech = assets.models.mech.getObjectByName('SK_Galahad_Mech');
			mech.material = app.material.blue
		});
		this.shieldBlue.off('pointerdown', this.onBlueOptionTap);
		this.shieldYellow.on('pointerdown', this.onYellowOptionTap);
		this.shieldGrey.on('pointerdown', this.onGrayOptionTap);
		playSound('click', false, 0.5);
	}
	
	onYellowOptionTap = () => {
		if (this.doneBtn.visible==false) {
			this.doneBtn.visible = true;
			this.timelineDoneBtn.play();
			gsap.from( this.doneBtn, 0.6, {alpha: 0, delay: 0.45} );
			gsap.from( this.doneBtn.scale, 0.5, {x: 0.5, y: 0.5, repeat: -1, ease: 'sine.inOut', yoyo: true, delay: 0.7} );
		}
		gsap.to( this.shieldYellow.scale, 0.3, {x: 1.1, y: 1.1, ease: 'sine.inOut', delay: 0.1});	
		gsap.to( this.shieldBlue.scale, 0.3, {x: 1, y: 1, ease: 'sine.inOut'});	
		gsap.to( this.shieldGrey.scale, 0.3, {x: 1, y: 1, ease: 'sine.inOut'});

		gsap.delayedCall( 0.2, () => {
			let mech = assets.models.mech.getObjectByName('SK_Galahad_Mech');
			mech.material = app.material.yellow
		});
		this.shieldYellow.off('pointerdown', this.onYellowOptionTap);
		this.shieldGrey.on('pointerdown', this.onGrayOptionTap);
		this.shieldBlue.on('pointerdown', this.onBlueOptionTap);
		playSound('click', false, 0.5); 
	}

	onGrayOptionTap = () => {
		if (this.doneBtn.visible==false) {
			this.doneBtn.visible = true;
			this.timelineDoneBtn.play();
			gsap.from( this.doneBtn, 0.6, {alpha: 0, delay: 0.45} );
			gsap.from( this.doneBtn.scale, 0.5, {x: 0.5, y: 0.5, repeat: -1, ease: 'sine.inOut', yoyo: true, delay: 0.7} );
		}
		gsap.to( this.shieldGrey.scale, 0.3, {x: 1.1, y: 1.1, ease: 'sine.inOut', delay: 0.1});	
		gsap.to( this.shieldYellow.scale, 0.3, {x: 1, y: 1, ease: 'sine.inOut'});	
		gsap.to( this.shieldBlue.scale, 0.3, {x: 1, y: 1, ease: 'sine.inOut'});

		gsap.delayedCall( 0.2, () => {
			let mech = assets.models.mech.getObjectByName('SK_Galahad_Mech');
			mech.material = app.material.grey
		});
		this.shieldGrey.off('pointerdown', this.onGrayOptionTap);
		this.shieldBlue.on('pointerdown', this.onBlueOptionTap);
		this.shieldYellow.on('pointerdown', this.onYellowOptionTap);
		playSound('click', false, 0.5); 
	}

	onDoneBtnTap = () => {
		this.removeFromActiveIcons();
		gsap.to( this.doneBtn.scale, 0.2, {x: 0.56, y: 0.56, repeat: 1, yoyo: true, ease: 'sine.inOut', delay: 0.1});	

		this.shieldBlue.off('pointerdown', this.onBlueOptionTap);
		this.shieldYellow.off('pointerdown', this.onYellowOptionTap);
		this.shieldGrey.off('pointerdown', this.onGrayOptionTap);
		this.doneBtn.off('pointerdown', this.onDoneBtnTap);

        this.timelineDoneBtn.pause(0);
		gsap.to( this.shieldBlue, 0.6, {alpha: 0, delay: 0.6, visible: false} );
		gsap.to( this.shieldYellow, 0.6, {alpha: 0, delay: 0.7, visible: false} );
		gsap.to( this.shieldGrey, 0.6, {alpha: 0, delay: 0.8, visible: false} );
		gsap.to( this.doneBtn, 0.3, {alpha: 0, delay: 0.8, visible: false} );
		gsap.to( this.display, 0.3, {alpha: 0, delay: 0.9, visible: false} );
		gsap.to( this.iconOptions, 0.6, {alpha: 0, delay: 0.9, visible: false} );
		gsap.to ( app.obj3d.lookingPosition, 0.7, {x: 0.3, y: 10, z: 0, delay: 1} );
		gsap.to(app.camera3d.position, 0.7, {x: 22.2, y: 3.4, z: 32, delay: 1, ease: "power1.inOut", 
			onComplete: () => {
				showAllIcons();
				app.obj3d.mech.model.animation.actions.Idle.play();
				if (app.activeIcons.length === 0) {
					performFinals();
				}
			},
		});
		playSound('ability', false, 0.5);
	}
}