class FollowCamera{
    camera;
    target;
    offset;
    lookTarget = new THREE.Vector3();
    lerpSpeed;

    constructor( camera, target, offset, lerpSpeed=1 ){
        this.camera = camera;
        this.target = target;
        this.lookTarget.copy( target.position );
        this.offset = offset;
        this.lerpSpeed = lerpSpeed;

        app.update.add( this.update.bind( this ) );
    }

    update(){
        this.camera.position.x += this.lerpSpeed * (this.target.position.x + this.offset.x - this.camera.position.x)/4;
        this.camera.position.y += this.lerpSpeed * (this.target.position.y + this.offset.y - this.camera.position.y)/4;
        this.camera.position.z += this.lerpSpeed * (this.target.position.z + this.offset.z - this.camera.position.z)/4;
        
        this.lookTarget.lerp( this.target.position, 1/4 * this.lerpSpeed )
        this.camera.lookAt( this.lookTarget );
    }
}