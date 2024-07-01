class WeaponUpIcon {
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

		let image = new PIXI.Sprite( assets.textures.pixi['weaponUp'] );
		image.anchor.set( 0.5 );
		this.icon.addChild( image );

		this.iconOptions = new PIXI.Container();
		this.iconOptions.visible = false;
		this.iconOptions.interactive = true;
		this.iconOptions.on('pointerdown', this.onOptionTap);

		this.havoc = new PIXI.Sprite( assets.textures.pixi['havocIcon'] );
		this.havoc.anchor.set( 0.5 );
		this.iconOptions.addChild( this.havoc );
		this.havoc.position.set( 280, 180 );
		this.havoc.interactive = true;
		this.havoc.on('pointerdown', this.onHavocTap);

		this.hazard = new PIXI.Sprite( assets.textures.pixi['hazardIcon'] );
		this.hazard.anchor.set( 0.5 );
		this.iconOptions.addChild( this.hazard );
		this.hazard.position.set( 90, -130 );
		this.hazard.interactive = true;
		this.hazard.on('pointerdown', this.onHazardTap);

		this.volt = new PIXI.Sprite( assets.textures.pixi['voltIcon'] );
		this.volt.anchor.set( 0.5 );
		this.iconOptions.addChild( this.volt );
		this.volt.position.set( -275, -175 );
		this.volt.interactive = true;
		this.volt.on('pointerdown', this.onVoltTap);

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
			this.iconOptions.position.set( rightUI - 245, upUI + 360 );
			this.iconOptions.scale.set(0.48);

			this.doneBtn.position.set( rightUI - 300, downUI - 105 );
			this.doneBtn.scale.set(0.46);

			this.handOptionTutor.position.set( leftUI + 80, upUI + 450)
        } 

        if ( orientation === 'landscape' ) {
			this.iconOptions.position.set( rightUI - 260, upUI + 295 );
			this.iconOptions.scale.set(0.48);

			this.doneBtn.position.set( rightUI - 250,  downUI - 105 );
			this.doneBtn.scale.set(0.46);

			this.handOptionTutor.position.set( leftUI + 370, upUI + 175 );
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
		this.timelineOption.to( handSprite, 0.5, {x: 380, y: 50, ease: 'sine.out'});
        this.timelineOption.to( handSprite.scale, 0.3, {x: 0.95, y: 0.95, repeat: 1, yoyo: true, ease: 'sine.inOut' });	
		this.timelineOption.to( handSprite, 0.5, {x: 560, y: 360, ease: 'sine.out'});
        this.timelineOption.to( handSprite.scale, 0.3, {x: 0.95, y: 0.95, repeat: 1, yoyo: true, ease: 'sine.inOut' });	
		this.timelineOption.to( handSprite, 0.5, {x: 715, alpha: 0});
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
		app.obj3d.mech.shieldIcon.hide();
		app.obj3d.mech.weaponLeftIcon.hide();
		gsap.to( app.obj3d.mech.weaponUpIconPoint.position, 0.6, {x: -13.7, y: 16.7, z: 0, delay: 0.1, ease: 'sine.inOut' });	
		gsap.to ( app.obj3d.lookingPosition, 0.7, {x: -5, y: 13, z: 0})
		gsap.to(app.camera3d.position, 0.7, {x: -32, y: 16, z: 14, ease: "power1.inOut", 
			onComplete: () => {
				this.show();
				gsap.to( this.icon.scale, 0.4, {x: 0.51, y: 0.51, ease: 'sine1.inOut'} );
			},
		});
		this.iconOptions.visible = true;
		gsap.from( this.havoc, 0.6, {alpha: 0, delay: 0.6} );
		gsap.from( this.hazard, 0.6, {alpha: 0, delay: 0.7} );
		gsap.from( this.volt, 0.6, {alpha: 0, delay: 0.8} );

		gsap.from( this.havoc.scale, 0.6, {x: 0.85, y: 0.85, delay: 0.6} );
		gsap.from( this.hazard.scale, 0.6, {x: 0.85, y: 0.85,  delay: 0.7} );
		gsap.from( this.volt.scale, 0.6, {x: 0.85, y: 0.85,  delay: 0.8} );
		
        gsap.to( this.handOptionTutor, 0.5, {alpha: 1} );
		this.timelineOption.play();
		playSound('click', false, 0.5);
	}
	
	onOptionTap = () => {
		this.iconOptions.off('pointerdown', this.onOptionTap);
        gsap.to( this.handOptionTutor, 0.3, {alpha: 0, visible: false} );
        this.timelineOption.pause(0);
	}

	onHavocTap = () => {
		if (this.doneBtn.visible==false) {
			this.doneBtn.visible = true;
			this.timelineDoneBtn.play();
			gsap.from( this.doneBtn, 0.6, {alpha: 0, delay: 0.45} );
			gsap.from( this.doneBtn.scale, 0.5, {x: 0.5, y: 0.5, repeat: -1, ease: 'sine.inOut', yoyo: true, delay: 0.7} );
		}
		gsap.to( this.havoc.scale, 0.3, {x: 1.1, y: 1.1, ease: 'sine.inOut', delay: 0.1});	
		gsap.to( this.hazard.scale, 0.3, {x: 1, y: 1, ease: 'sine.inOut'});	
		gsap.to( this.volt.scale, 0.3, {x: 1, y: 1, ease: 'sine.inOut'});	

		gsap.delayedCall( 0.2, () => {
			app.obj3d.mech.havoc.visible = true;
			app.obj3d.mech.hazard.visible = false;
			app.obj3d.mech.volt.visible = false;
			gsap.from( app.obj3d.mech.havoc.position, 0.3, {y: 7, ease: 'sine.inOut'});
		});
		playSound('click', false, 0.5); 
	}
	
	onHazardTap = () => {
		if (this.doneBtn.visible==false) {
			this.doneBtn.visible = true;
			this.timelineDoneBtn.play();
			gsap.from( this.doneBtn, 0.6, {alpha: 0, delay: 0.45} );
			gsap.from( this.doneBtn.scale, 0.5, {x: 0.5, y: 0.5, repeat: -1, ease: 'sine.inOut', yoyo: true, delay: 0.7} );
		}
		gsap.to( this.hazard.scale, 0.3, {x: 1.1, y: 1.1, ease: 'sine.inOut', delay: 0.1});	
		gsap.to( this.havoc.scale, 0.3, {x: 1, y: 1, ease: 'sine.inOut'});	
		gsap.to( this.volt.scale, 0.3, {x: 1, y: 1, ease: 'sine.inOut'});

		gsap.delayedCall( 0.2, () => {
			app.obj3d.mech.hazard.visible = true;
			app.obj3d.mech.havoc.visible = false;
			app.obj3d.mech.volt.visible = false;
			gsap.from( app.obj3d.mech.hazard.position, 0.3, {y: 7, ease: 'sine.inOut'});
		});
		playSound('click', false, 0.5); 
	}

	onVoltTap = () => {
		if (this.doneBtn.visible==false) {
			this.doneBtn.visible = true;
			this.timelineDoneBtn.play();
			gsap.from( this.doneBtn, 0.6, {alpha: 0, delay: 0.45} );
			gsap.from( this.doneBtn.scale, 0.5, {x: 0.5, y: 0.5, repeat: -1, ease: 'sine.inOut', yoyo: true, delay: 0.7} );
		}
		gsap.to( this.volt.scale, 0.3, {x: 1.1, y: 1.1, ease: 'sine.inOut', delay: 0.1});	
		gsap.to( this.hazard.scale, 0.3, {x: 1, y: 1, ease: 'sine.inOut'});	
		gsap.to( this.havoc.scale, 0.3, {x: 1, y: 1, ease: 'sine.inOut'});

		gsap.delayedCall( 0.2, () => {
			app.obj3d.mech.volt.visible = true;
			app.obj3d.mech.havoc.visible = false;
			app.obj3d.mech.hazard.visible = false;
			gsap.from( app.obj3d.mech.volt.position, 0.3, {y: 7, ease: 'sine.inOut'});
		});
		playSound('click', false, 0.5); 
	}

	onDoneBtnTap = () => {
		this.removeFromActiveIcons();
		gsap.to( this.doneBtn.scale, 0.3, {x: 0.56, y: 0.56, repeat: 1, yoyo: true, ease: 'sine.inOut', delay: 0.1});	

		this.havoc.off('pointerdown', this.onBlueOptionTap);
		this.hazard.off('pointerdown', this.onYellowOptionTap);
		this.volt.off('pointerdown', this.onGreyOptionTap);
		this.doneBtn.off('pointerdown', this.onDoneBtnTap);

        this.timelineDoneBtn.pause(0);
		gsap.to( this.havoc, 0.6, {alpha: 0, delay: 0.6, visible: false} );
		gsap.to( this.hazard, 0.6, {alpha: 0, delay: 0.7, visible: false} );
		gsap.to( this.volt, 0.6, {alpha: 0, delay: 0.8, visible: false} );
		gsap.to( this.doneBtn, 0.6, {alpha: 0, delay: 0.8, visible: false} );
		gsap.to( this.display, 0.6, {alpha: 0, delay: 0.9, visible: false} );
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