class FinishScreen extends Screen {
    
    constructor() {
        super();
        this.initScreen();
        app.resizes.add( this.onResize );
    }

    initScreen() {
        this.display = new PIXI.Container();
        this.initScene();
    }

    initScene() {  
        let filterOutline = new PIXI.filters.OutlineFilter(5, 0xffffff);
        filterOutline.padding = 10;

        this.bckgrndCity = new PIXI.Sprite(assets.textures.pixi.city);        
        this.bckgrndCity.anchor.set( 0.5, 0.5 );
        this.bckgrndCity.visible = false;

        this.bckgrndCommandCenter = new PIXI.Sprite(assets.textures.pixi.commandCenter);        
        this.bckgrndCommandCenter.anchor.set( 0.5, 0.5 );
        this.bckgrndCommandCenter.visible = false;

        this.bckgrndDesert = new PIXI.Sprite(assets.textures.pixi.desert);        
        this.bckgrndDesert.anchor.set( 0.5, 0.5 );
        this.bckgrndDesert.visible = false;

        this.bckgrndCave = new PIXI.Sprite(assets.textures.pixi.cave);        
        this.bckgrndCave.anchor.set( 0.5, 0.5 );
        this.bckgrndCave.visible = false;

        this.display.addChild( this.bckgrndCity, this.bckgrndCommandCenter, this.bckgrndDesert, this.bckgrndCave );

        this.lutBox = new PIXI.Sprite(assets.textures.pixi.boxLocked);
        this.lutBox.anchor.set(0.5);
        this.lutBox.position.set(0, 0);
        this.display.addChild( this.lutBox );
        this.lutBox.filters = [filterOutline]; 
    }

    enter( object ) {
        switch (object.arenaName ) {
            case 'city':
                this.bckgrndCity.visible = true;
                gsap.from( this.bckgrndCity, 0.4, {alpha: 0} );
                break;

            case 'commandCenter':
                this.bckgrndCommandCenter.visible = true;
                gsap.from( this.bckgrndCity, 0.4, {alpha: 0} );
                break;
                
            case 'desert':
                this.bckgrndDesert.visible = true;
                gsap.from( this.bckgrndCity, 0.4, {alpha: 0} );
                break;

            case 'cave':
                this.bckgrndCave.visible = true;
                gsap.from( this.bckgrndCity, 0.4, {alpha: 0} );
                break;
        }
    }

    exit() {
       //console.log('exit from finish screen')
    }
    
    onResize = ({ isPortraite, leftUI, rightUI, upUI, downUI }) => {               
        if (isPortraite) {
            this.bckgrndCity.height = downUI - upUI;
            this.bckgrndCity.width = 720 * this.bckgrndCity.height/1280;
            this.bckgrndCommandCenter.height = downUI - upUI;
            this.bckgrndCommandCenter.width = 720 * this.bckgrndCommandCenter.height/1280;
            this.bckgrndDesert.height = downUI - upUI;
            this.bckgrndDesert.width = 720 * this.bckgrndDesert.height/1280;
            this.bckgrndCave.height = downUI - upUI;
            this.bckgrndCave.width = 720 * this.bckgrndCave.height/1280;            
        } else {            
            this.bckgrndCity.width = rightUI - leftUI;
            this.bckgrndCity.height = 1280 * this.bckgrndCity.width/720;
            this.bckgrndCommandCenter.height = rightUI - leftUI;
            this.bckgrndCommandCenter.width = 1280 * this.bckgrndCommandCenter.width/720;
            this.bckgrndDesert.height = rightUI - leftUI;
            this.bckgrndDesert.width = 1280 * this.bckgrndDesert.width/720;
            this.bckgrndCave.height = rightUI - leftUI;
            this.bckgrndCave.width = 1280 * this.bckgrndCave.width/720;
        }
    }
}

