class Robot {    
    constructor() {
        this.initModel();
        this.initIcons();

        app.update.add( this.update );
    };

    initModel() {   
        this.model = assets.models.mech;
        this.model.traverse( child => {
            child.receiveShadow = true;
            child.castShadow = true;
    
            if ( child.name.includes( 'Mech' ) ){
                child.material = app.material.grey;
            };
            if ( child.name.includes( 'Atomizer' ) ){
                child.material = app.material.atomizer;
            };
            if ( child.name.includes( 'Cryo' ) ){
                child.material = app.material.cryodiffuse;
            };
            if ( child.name.includes( 'Glacier' ) ){
                child.material = app.material.glacier;
            };
            if ( child.name.includes( 'Havoc' ) ){
                child.material = app.material.havoc;
            };
            if ( child.name.includes( 'Hazard' ) ){
                child.material = app.material.hazard;
            };
            if ( child.name.includes( 'Volt' ) ){
                child.material = app.material.volt;
            };
        });

	    addAnimationMixer( this.model, assets.models.mech.v_data.animations );
        this.model.animation.set( "Idle" );

        this.atomizer = this.model.getObjectByName('Atomizer');
        this.atomizer.visible = false;
        this.cryo = this.model.getObjectByName('Cryo');
        this.cryo.visible = false;
        this.glacier = this.model.getObjectByName('Glacier');
        this.glacier.visible = false;

        this.havoc = this.model.getObjectByName('Havoc');
        this.havoc.visible = false;
        this.hazard = this.model.getObjectByName('Hazard');
        this.hazard.visible = false;
        this.volt = this.model.getObjectByName('Volt');
        this.volt.visible = false;
    };

    initIcons() {
        this.shieldIconPoint = new THREE.Object3D();
        this.shieldIconPoint.position.set(8.4, 2.4, 0)
        this.model.add( this.shieldIconPoint );
        this.shieldIcon = new ShieldIcon();
	    app.obj2d.shieldIcon = this.shieldIcon;
		app.activeIcons.push(this.shieldIcon);
        
        this.weaponLeftIconPoint = new THREE.Object3D();
        this.weaponLeftIconPoint.position.set(-9.5, 7.7, 0)
        this.model.add( this.weaponLeftIconPoint );
        this.weaponLeftIcon = new WeaponLeftIcon();
        app.obj2d.weaponLeftIcon = this.weaponLeftIcon;
        app.activeIcons.push(this.weaponLeftIcon);

        this.weaponUpIconPoint = new THREE.Object3D();
        this.weaponUpIconPoint.position.set( -8, 17.2, 0)
        this.model.add( this.weaponUpIconPoint );
        this.weaponUpIcon = new WeaponUpIcon();
        app.obj2d.weaponUpIcon = this.weaponUpIcon;
        app.activeIcons.push(this.weaponUpIcon);
    };

    update = () => {   
        position3dTo2d( this.shieldIconPoint, this.shieldIcon.display );
        position3dTo2d( this.weaponLeftIconPoint, this.weaponLeftIcon.display );
        position3dTo2d( this.weaponUpIconPoint, this.weaponUpIcon.display );
    };

}