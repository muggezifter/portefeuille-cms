	(function() {
		var fromProjection = new OpenLayers.Projection("EPSG:4326"); // transform from WGS 1984
		var toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
		var extent = new OpenLayers.Bounds(4.4770, 51.9244, 4.5170, 51.9410).transform(fromProjection, toProjection);

		var controls =  [
	            new OpenLayers.Control.TouchNavigation({
	                dragPanOptions: {
	                    enableKinetic: true
	                }
	            }),
	            new OpenLayers.Control.ZoomPanel()];
	          

			// create map
		var map = new OpenLayers.Map({
			    div: "planet-crooswijk-map",
			    restrictedExtent: extent,
			    controls: controls,
			    layers: [
			        new OpenLayers.Layer.OSM("PlanetCrooswijk","http://crooswijk.mapping-my-mind.org/Tiles/${z}/${x}/${y}.png" , {   minZoomLevel: 15, maxZoomLevel: 17,tileOptions: {crossOriginKeyword: null}})
			    ],
			    center: new OpenLayers.LonLat(4.496645, 51.933457).transform(fromProjection, toProjection),
			    zoom: 16
		});

		map.events.register('zoomend',this, function(e){
			    var x = map.getZoom();
			    //alert(x);
			    if (x < 16) { 
			        // hide - btn
			    } else if (x > 16) {
			        // hide + btn
			    } else {
			         // show both btns
			     }
	    });

	})();