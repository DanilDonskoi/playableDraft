class StatsBoxPortraite {
	cellsDamage = [];
	cellsAmmo = [];
	cellsDefence = [];

	constructor() {
		this.initDisplay();

		app.update.add( this.onUpdate );
	}

	initDisplay() {
		this.display = new PIXI.Container();

		this.statsBox = new PIXI.Container();
		this.statsBox.scale.set( 0.4 );
		this.display.addChild( this.statsBox );

		let example = new PIXI.Sprite( assets.textures.pixi['statsPortraite'] );
		example.anchor.set( 0.5 );
		this.statsBox.addChild( example );

		this.initDamage();
		this.initAmmo();
		this.initDefence();
	}

	initDamage() {
		this.damage = new PIXI.Container();
		this.statsBox.addChild( this.damage );
		this.damage.position.set( -542, -115 )

		for (let i = 0; i < 5; i++) {
			let cell = new PIXI.Sprite( assets.textures.pixi['cellRed'] );
			cell.alpha = 0;
			cell.position.set(i * 29, 0);
			this.cellsDamage.push(cell);
			this.damage.addChild( cell );
		}
	}

	initAmmo() {
		this.ammo = new PIXI.Container();
		this.statsBox.addChild( this.ammo );
		this.ammo.position.set( -123, -115 )

		for (let i = 0; i < 7; i++) {
			let cell = new PIXI.Sprite( assets.textures.pixi['cellYellow'] );
			cell.alpha = 0;
			cell.position.set(i * 29, 0);
			this.cellsAmmo.push( cell );
			this.ammo.addChild( cell );
		}
	}

	initDefence() {
		this.defence = new PIXI.Container();
		this.statsBox.addChild( this.defence );
		this.defence.position.set( 301, -115 );

		for (let i = 0; i < 4; i++) {
			let cell = new PIXI.Sprite( assets.textures.pixi['cellBlue'] );
			cell.alpha = 0;
			cell.position.set(i * 29, 0);
			this.cellsDefence.push( cell );
			this.defence.addChild( cell );
		}
	}

	animateDamage() {
		this.cellsDamage.forEach((cell, index) => {
			let finalAlpha = 1; 
			if (index === 3) {
				finalAlpha = 0.5;
			} else if (index === 4) {
				finalAlpha = 0.3;
			}
			gsap.to( cell, 1.2, {alpha: finalAlpha, delay: index * 0.3, ease: "power1.inOut"} );
		});
	}
	
	animateAmmo() {
		this.cellsAmmo.forEach((cell, index) => {
			let finalAlpha = 1; 
			if (index === 5) {
				finalAlpha = 0.5;
			} else if (index === 6) {
				finalAlpha = 0.3;
			}
			gsap.to( cell, 1.2, {alpha: finalAlpha, delay: index * 0.3, ease: "power1.inOut"} );
		});
	}
	
	animateDefence() {
		this.cellsDefence.forEach((cell, index) => {
			let finalAlpha = 1; 
			if (index === 2) {
				finalAlpha = 0.5;
			} else if (index === 3) {
				finalAlpha = 0.3;
			}
			gsap.to( cell, 1.2, {alpha: finalAlpha, delay: index * 0.3, ease: "power1.inOut"} );
		});
	}

	onUpdate = () => {
		
    }

	hide() {
		gsap.to( this.display, 0.5, {alpha: 0, visible: false} );
	}

	show() {
		this.display.visible = true;
		gsap.to( this.display, 0.5, {alpha: 1} );

		this.animateDamage();
		this.animateAmmo();
		this.animateDefence();
	}
}