Teacup.Views.newMap = Backbone.View.extend({
	template: JST['maps/newMap'],
	className: "map-wrapper",
	
	initialize: function(options){
		view = this
		this.latitude = options.latitude;
		this.longitude = options.longitude;
		this.origin = new google.maps.LatLng(this.latitude, this.longitude);
		this.dreamLocation = new google.maps.LatLng(options.dreamLatitude, options.dreamLongitude)
		this.markers = [];
		this.map;	
	},
	
	render: function(){
		var renderedContent = this.template({
			latitude: this.latitude,
			longitude: this.longitude
		});
		this.$el.html(renderedContent);
		var that = this
		setTimeout(function(){
			that.renderMap();
		}, 100);

		return this;
	},
	
	renderMap: function(){
		
		var styles = [
		    {
				"stylers": [
				      { "invert_lightness": true },
				      { "hue": "#003bff" },
				      { "saturation": -6 }
				    ]
		    }
		  ];
		var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});
		var mapOptions = {
			zoom: 3,
			center: this.origin,
			mapTypeControlOptions:{
				mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']	
			}		
		};
		// debugger;
		this.map = new google.maps.Map(this.$el.find("#map-canvas")[0], mapOptions);
		this.map.mapTypes.set('map_style', styledMap);
		this.map.setMapTypeId('map_style');
		var that = this
		setTimeout(function(){	
			google.maps.event.trigger(that.map, 'resize');
			that.map.setCenter(that.origin);
		},100);
		this.drop();
	}, 
	
	drop: function () {
		var that = this;
		var pinColor = "FFFFFF";
    var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor)
  
    this.markers.push(new google.maps.Marker({
	    position: this.origin,
			icon: pinImage,
	    map: that.map
    }));
		var pinColor2 = "FD48FF";
    var pinImage2 = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor2)
    this.markers.push(new google.maps.Marker({
 	    position: this.dreamLocation,
			icon: pinImage2,
 	    map: that.map,
    }));
		
		var flightPlanCoordinates = [this.origin, this.dreamLocation];
	  var flightPath = new google.maps.Polyline({
	    path: flightPlanCoordinates,
	    geodesic: true,
	    strokeColor: '#FFFFFF',
	    strokeOpacity: 1.0,
	    strokeWeight: 2
	  });

	  flightPath.setMap(this.map);
	},
	

})