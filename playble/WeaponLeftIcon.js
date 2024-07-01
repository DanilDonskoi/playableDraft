class WeaponLeftIcon {
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

		let image = new PIXI.Sprite( assets.textures.pixi['weaponLeft'] );
		image.anchor.set( 0.5 );
		this.icon.addChild( image );

		this.iconOptions = new PIXI.Container();
		this.iconOptions.visible = false;
		this.iconOptions.interactive = true;
		this.iconOptions.on('pointerdown', this.onOptionTap);

		this.atomizer = new PIXI.Sprite( assets.textures.pixi['atomizerIcon'] );
		this.atomizer.anchor.set( 0.5 );
		this.iconOptions.addChild( this.atomizer );
		this.atomizer.position.set( -140, -130 );
		this.atomizer.interactive = true;
		this.atomizer.on('pointerdown', this.onAtomizerTap);

		this.cryo = new PIXI.Sprite( assets.textures.pixi['cryoIcon'] );
		this.cryo.anchor.set( 0.5 );
		this.iconOptions.addChild( this.cryo );
		this.cryo.position.set( -205, 205);
		this.cryo.interactive = true;
		this.cryo.on('pointerdown', this.onCryoTap);

		this.glacier = new PIXI.Sprite( assets.textures.pixi['glacierIcon'] );
		this.glacier.anchor.set( 0.5 );
		this.iconOptions.addChild( this.glacier );
		this.glacier.position.set( 205, -205 );
		this.glacier.interactive = true;
		this.glacier.on('pointerdown', this.onGlacierTap);
		
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
			this.iconOptions.position.set( leftUI + 230, upUI + 370 );
			this.iconOptions.scale.set(0.48);

			this.doneBtn.position.set( leftUI + 160, downUI - 350 );
			this.doneBtn.scale.set(0.46);

			this.handOptionTutor.position.set( this.cryo.position.x, this.cryo.position.y );
        } 

        if ( orientation === 'landscape' ) {
			this.iconOptions.position.set( leftUI + 330, upUI + 295 );
			this.iconOptions.scale.set(0.48);

			this.doneBtn.position.set( leftUI + 393, downUI - 120 );
			this.doneBtn.scale.set(0.46);

			this.handOptionTutor.position.set( this.cryo.position.x, this.cryo.position.y );
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
		this.timelineOption.to( handSprite, 0.5, {x: 75, y: -330, ease: 'sine.out'});
        this.timelineOption.to( handSprite.scale, 0.3, {x: 0.95, y: 0.95, repeat: 1, yoyo: true, ease: 'sine.inOut' });	
		this.timelineOption.to( handSprite, 0.5, {x: 410, y: -410, ease: 'sine.out'});
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
		app.obj3d.mech.weaponUpIcon.hide();
		gsap.to( app.obj3d.mech.weaponLeftIconPoint.position, 0.6, {x: -14, y: 8, z: 0, delay: 0.1, ease: 'sine.inOut' });	
		gsap.to ( app.obj3d.lookingPosition, 0.7, {x: -5, y: 10, z: 0})
		gsap.to(app.camera3d.position, 0.7, {x: -32, y: 7, z: 13, ease: "power1.inOut", 
			onComplete: () => {
				this.show();
				gsap.to( this.icon.scale, 0.4, {x: 0.51, y: 0.51, ease: 'sine1.inOut'} );
			},
		});
		this.iconOptions.visible = true;
		gsap.from( this.atomizer, 0.6, {alpha: 0, delay: 0.6, 
			onComplete: () => {
				this.timelineOption.play();
			}}
		);
		gsap.from( this.cryo, 0.6, {alpha: 0, delay: 0.7} );
		gsap.from( this.glacier, 0.6, {alpha: 0, delay: 0.8} );

		gsap.from( this.atomizer.scale, 0.6, {x: 0.85, y: 0.85, delay: 0.6} );
		gsap.from( this.cryo.scale, 0.6, {x: 0.85, y: 0.85,  delay: 0.7} );
		gsap.from( this.glacier.scale, 0.6, {x: 0.85, y: 0.85,  delay: 0.8} );

        gsap.to( this.handOptionTutor, 0.5, {alpha: 1} );
		playSound('click', false, 0.5);
	}

	onOptionTap = () => {
		this.iconOptions.off('pointerdown', this.onOptionTap);
        gsap.to( this.handOptionTutor, 0.3, {alpha: 0, visible: false} );
        this.timelineOption.pause(0);
	}

	onAtomizerTap = () => {
		if (this.doneBtn.visible==false) {
			this.doneBtn.visible = true;
			this.timelineDoneBtn.play();
			gsap.from( this.doneBtn, 0.6, {alpha: 0, delay: 0.45} );
			gsap.from( this.doneBtn.scale, 0.5, {x: 0.5, y: 0.5, repeat: -1, ease: 'sine.inOut', yoyo: true, delay: 0.7} );
		}
		gsap.to( this.atomizer.scale, 0.3, {x: 1.1, y: 1.1, ease: 'sine.inOut', delay: 0.1});	
		gsap.to( this.cryo.scale, 0.3, {x: 1, y: 1, ease: 'sine.inOut'});	
		gsap.to( this.glacier.scale, 0.3, {x: 1, y: 1, ease: 'sine.inOut'});	

		gsap.delayedCall( 0.2, () => {
			app.obj3d.mech.atomizer.visible = true;
			app.obj3d.mech.cryo.visible = false;
			app.obj3d.mech.glacier.visible = false;
			gsap.from( app.obj3d.mech.atomizer.position, 0.3, {x: -10, ease: 'sine.inOut' });
		});
		this.atomizer.off('pointerdown', this.onAtomizerTap);
		this.cryo.on('pointerdown', this.onCryoTap);
		this.glacier.on('pointerdown', this.onGlacierTap);
		playSound('click', false, 0.5); 
	}
	
	onCryoTap = () => {
		if (this.doneBtn.visible==false) {
			this.doneBtn.visible = true;
			this.timelineDoneBtn.play();
			gsap.from( this.doneBtn, 0.6, {alpha: 0, delay: 0.45} );
			gsap.from( this.doneBtn.scale, 0.5, {x: 0.5, y: 0.5, repeat: -1, ease: 'sine.inOut', yoyo: true, delay: 0.7} );
		}
		gsap.to( this.cryo.scale, 0.3, {x: 1.1, y: 1.1, ease: 'sine.inOut', delay: 0.1});	
		gsap.to( this.atomizer.scale, 0.3, {x: 1, y: 1, ease: 'sine.inOut'});	
		gsap.to( this.glacier.scale, 0.3, {x: 1, y: 1, ease: 'sine.inOut'});

		gsap.delayedCall( 0.2, () => {
			app.obj3d.mech.cryo.visible = true;
			app.obj3d.mech.atomizer.visible = false;
			app.obj3d.mech.glacier.visible = false;
			gsap.from( app.obj3d.mech.cryo.position, 0.3, {x: -10, ease: 'sine.inOut'});
		});
		this.cryo.off('pointerdown', this.onCryoTap);
		this.atomizer.on('pointerdown', this.onAtomizerTap);
		this.glacier.on('pointerdown', this.onGlacierTap);
		playSound('click', false, 0.5); 
	}

	onGlacierTap = () => {
		if (this.doneBtn.visible==false) {
			this.doneBtn.visible = true;
			this.timelineDoneBtn.play();
			gsap.from( this.doneBtn, 0.6, {alpha: 0, delay: 0.45} );
			gsap.from( this.doneBtn.scale, 0.5, {x: 0.5, y: 0.5, repeat: -1, ease: 'sine.inOut', yoyo: true, delay: 0.7} );
		}
		gsap.to( this.glacier.scale, 0.3, {x: 1.1, y: 1.1, ease: 'sine.inOut', delay: 0.1});	
		gsap.to( this.cryo.scale, 0.3, {x: 1, y: 1, ease: 'sine.inOut'});	
		gsap.to( this.atomizer.scale, 0.3, {x: 1, y: 1, ease: 'sine.inOut'});

		gsap.delayedCall( 0.2, () => {
			app.obj3d.mech.glacier.visible = true;
			app.obj3d.mech.atomizer.visible = false;
			app.obj3d.mech.cryo.visible = false;
			gsap.from( app.obj3d.mech.glacier.position, 0.3, {x: -10, ease: 'sine.inOut'});
		});
		this.glacier.off('pointerdown', this.onGlacierTap);
		this.atomizer.on('pointerdown', this.onAtomizerTap);
		this.cryo.on('pointerdown', this.onCryoTap);
		playSound('click', false, 0.5); 
	}

	onDoneBtnTap = () => {
		this.removeFromActiveIcons();
		gsap.to( this.doneBtn.scale, 0.3, {x: 0.56, y: 0.56, repeat: 1, yoyo: true, ease: 'sine.inOut', delay: 0.1});	

		this.atomizer.off('pointerdown', this.onAtomizerTap);
		this.cryo.off('pointerdown', this.onCryoTap);
		this.glacier.off('pointerdown', this.onGlacierTap);
		this.doneBtn.off('pointerdown', this.onDoneBtnTap);

		this.timelineDoneBtn.pause(0);
		gsap.to( this.atomizer, 0.6, {alpha: 0, delay: 0.6, visible: false} );
		gsap.to( this.cryo, 0.6, {alpha: 0, delay: 0.7, visible: false} );
		gsap.to( this.glacier, 0.6, {alpha: 0, delay: 0.8, visible: false} );
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