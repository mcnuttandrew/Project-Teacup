Teacup.Views.newPost = Backbone.CompositeView.extend({
	template: JST["posts/new"],
	
	initialize: function(options){
		
		this.userCollection = options.userCollection
		this.listenTo(this.model, "change", this.render);
		this.listenToOnce(this.userCollection, "sync", this.render);
		this.coords = {latitude: 0, longitude: 0 };
		this.dreamCoords = {latitude: 0, longitude: 0 };
		var newTrendView = new Teacup.Views.trends()
		this.addSubview(".trends", newTrendView);
	},
	
	events: {
		"submit form.post-submit": "submit",
		"keypress #content": "charsCount",
		"keypress #geocoderInput": "geocoderFill",
		"keypress #geocoderInputDream": "geocoderFillDream",
		"click .following": "openFollowingModal",
		"click .followers": "openFollowersModal",
		"click .trending-click": "trendingModal"
	},
	
	render: function(){
		this.getGeolocation();
		var renderedContent = this.template({
			user: this.model,
		});
		this.$el.html(renderedContent);
		this.attachSubviews();
		this.coords = {latitude: 0, longitude: 0 }
		this.dreamCoords = {latitude: 0, longitude: 0 }
		return this;
	},
	
	//This method is this bceause of special casing. 
	submit: function(event){
		event.preventDefault();
		var formData = $(event.currentTarget).serializeJSON();
		var that = this;
		var newPost = new Teacup.Models.Post();
		formData.latitude = this.coords.latitude;
		formData.longitude = this.coords.longitude;
		formData.dream_latitude = this.dreamCoords.latitude;
		formData.dream_longitude = this.dreamCoords.longitude;
		if(formData.dream_latitude === 0){
			delete formData.dream_latitude;
		}
		if(formData.dream_longitude === 0){
			delete formData.dream_longitude;
		}
		newPost.set(formData);
		newPost.save(formData, {
			success: function(){
				//special cases for when on dashboard (true path) vs main feed
				if($(".main-posts").length === 0){
					that.collection.add(newPost);
				} else {
					that.collection.add(newPost);
				}
				that.render();
			},
			error: function(response){
				$(".errors").append(response.responseJSON);
			}
		});
		
	},
	
	charsCount: function(event){
		numLeft = (250-event.target.textLength)+'';
		this.$el.find(".chars-left").empty();
		this.$el.find(".chars-left").text(numLeft);
	},
	
	geocoderFill: function(){
		var that = this;
		$("#geocoderInput").geocomplete({details: ".post-submit"}).bind("geocode:result",
		 function(event, result){
			 that.coords.latitude = result.geometry.location.k;
			 that.coords.longitude = result.geometry.location.B;
  	});
	},
	
	geocoderFillDream: function(){
		var that = this;
		$("#geocoderInputDream").geocomplete({details: ".post-submit"}).bind("geocode:result",
		 function(event, result){
			 that.dreamCoords.latitude = result.geometry.location.k;
			 that.dreamCoords.longitude = result.geometry.location.B;
  	});
	},
	
	getGeolocation: function(){
		var pos;
		var that = this;
		// Try HTML5 geolocation
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				that.coords.latitude = position.coords.latitude;
				that.coords.longitude = position.coords.longitude;
				var requestLoc = "http://maps.google.com/maps/api/geocode/xml?latlng="+ position.coords.latitude  ;
				requestLoc = requestLoc + "," + position.coords.longitude+ "&sensor=false.json";
				setTimeout(function(){				
					$.ajax({ 
						url: (requestLoc), 
						type: 'GET',
						success: function(location){
							var spelledLocation = $.text(location.firstChild.children[1].children[1]) + "";
							$("#geocoderInput").attr("placeholder", spelledLocation);
						}
					});
				}, 100)

			}, function() {
						pos = nil;
			});
		} else {
			// Browser doesn't support Geolocation
			pos = nil;
		}
	},
	
	openFollowingModal: function() {
		var view = new Teacup.Views.followingView({
			model: Teacup.Collections.users.getOrFetch($("#currentUser").data().id),
			collection: this.userCollection
		});
		var title = Teacup.Collections.users.getOrFetch($("#currentUser").data().id).get('username') + " follows"
		var modal = new Backbone.BootstrapModal({
			content: view,
			title: title,
			animate: true,
			allowCancel: true
		}).open();
		
		$(modal.$el.children().children()[0]).css("backgroundColor", "#625AFF");
	},
	
	openFollowersModal: function() {
		var view = new Teacup.Views.followersView({
			model: Teacup.Collections.users.getOrFetch($("#currentUser").data().id),
			collection: this.userCollection
		});
		var title = Teacup.Collections.users.getOrFetch($("#currentUser").data().id).get('username') + " is followed by"
		var modal = new Backbone.BootstrapModal({
			content: view,
			title: title,
			animate: true
		}).open();
		
		$(modal.$el.children().children()[0]).css("backgroundColor", "#625AFF");
	},
	
	trendingModal: function(){
		var view = new Teacup.Views.trendingModal();
		var modal = new Backbone.BootstrapModal({
			content: view,
			title: "Now Trending",
			animate: true
		}).open();
		$(modal.$el.children().children()[0]).css("backgroundColor", "#625AFF");
	},
})