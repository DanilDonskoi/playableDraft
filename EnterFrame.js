//---------------------------------------------------------------------------------
//- ENTER FRAME

app.enterFrame = function () {
	app.animations.forEach(anim => anim.update(app.animSpeed));
	app.update.forEach(update => update());

	app.camera3d.lookAt( app.obj3d.lookingPosition );
}