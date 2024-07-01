function appStart() {
	app.scene2d.visible = true;
	document.getElementById('main').style.visibility = "visible";
	document.getElementById('progress').style.display = "none";
		
	/*marker_init@start*/
	/*marker_init@end*/		
}


function stageDown(e) {
	app.mouse.isDown = true;		

	if (app.isPause) {
		app.isPause = false;
		try{ gsap.globalTimeline.resume() }catch(e){}
	}	
			
	if (app.stateGame == 'loaded') {
		app.stateGame = 'game';
		
		if(!app.isActive) {
			app.isActive = true;
			Howler.mute(!app.isSounds);
		}

		playSound( "bg", true, 0.3 );
		fadeSound('bg', 0, 0.15, 3000);
	}		
}


function stageMove(e) {	
	
}


function stageUp(e) {	
	app.mouse.isDown = false;
}

//---------------------------------------------------------------------------------
//- clickAd

function clickAd() {
	/*marker_click@start*/ 
	
	try{
		if((/iphone|ipad|ipod/i).test(window.navigator.userAgent.toLowerCase())) {						
			window.open( params.linkIOS.value );
		}else{
			window.open( params.linkAndroid.value );
		}
	}catch(e){}
	
	/*marker_click@end*/
}

//-----------------------------------------------------

function appEndGame() {
	if (app.stateGame != 'game_end') {
		app.stateGame = 'game_end';
		
		/*marker_endgame@start*/
		/*marker_endgame@end*/				
				
		if(params.fullscreenCta.value){
			gsap.set(app.obj2d.fsCTA, {delay:1.0, overwrite: "none", visible:true});
		}
	}
}
