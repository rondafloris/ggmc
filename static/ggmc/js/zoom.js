var pan_zoom=function(location){
		
		console.log("pan_zoom: "+location);
		
		var this_delay=4*window.app.DELAY;
		
		var bounce = ol.animation.bounce({
		  resolution:window.map.getView().getResolution()*1.2,
		  duration:this_delay
		});
		
		var pan = ol.animation.pan({
		  source: window.map.getView().getCenter(),
		  duration:this_delay
		});
		
		var zoom = ol.animation.zoom({
			resolution: window.map.getView().getResolution(),
			duration:this_delay
		});
		
		window.map.beforeRender(pan);
		window.map.beforeRender(zoom);
		
		var bbox=window.app.current_target_layer.getSource().getFeatures()[0].getGeometry().getExtent();
		var res=compute_resolution(bbox,true,window.innerWidth,window.innerHeight);
		res*=1.2;
		if(res==0)res=100;
		
		window.map.getView().setResolution(res);
		window.map.getView().setCenter(location);
		
		if(window.app.current_target_layer != null){
			console.log("pan_zoom setting timeout for check_feature");
			window.app.last_timeout=window.setTimeout(window.app.check_feature,this_delay);
		}
		else{
			console.log("pan_zoom calling start_move directly");
			window.app.start_move(null);
		}
	}
var pan_zoom_home=function(){
	console.log("bounce_home");
	
	var this_delay=4*window.app.DELAY;
	
	var pan = ol.animation.pan({
	  source: window.map.getView().getCenter(),
	  duration:this_delay
	});

	var zoom = ol.animation.zoom({
		resolution: window.map.getView().getResolution(),
		duration:this_delay
	});
	
	window.map.beforeRender(pan);
	window.map.beforeRender(zoom);

	var W=window.innerWidth;
	var H=window.innerHeight;
	var bbox=INSTALLED[window.app.current]['bbox'];
	var res=compute_resolution(bbox,false,W,H);
	window.map.getView().setResolution(res);
	
	var location=ol.proj.transform([(bbox[0]+bbox[2])/2.,(bbox[1]+bbox[3])/2.],"EPSG:4326","EPSG:3857");;
	window.map.getView().setCenter(location);
	
	console.log('pan_zoom_home setting timeout for start_move');
	window.app.last_timeout=window.setTimeout(window.app.start_move,this_delay);	
}
