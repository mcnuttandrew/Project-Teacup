Teacup.Views.newPost = Backbone.CompositeView.extend({
	template: JST["posts/new"],
	
	initialize: function(options){
		this.userCollection = options.userCollection
		
		this.listenTo(this.model, "change", this.render);
		this.listenToOnce(this.userCollection, "sync", this.render);
		
		
		this.coords = {latitude: 33.873415, longitude: -115.900992 }
		this.buildMap(this.coords.latitude, this.coords.longitude);
	},
	
	events: {
		"submit form.post-submit": "submit",
		"keypress #content": "charsCount",
		"keypress #geocoderInput": "geocoderFill",
		"click .following": "openFollowingModal",
		"click .followers": "openFollowersModal",
		"click .preview": "mapModal"
	},
	
	
	
	render: function(){
		var renderedContent = this.template({
			user: this.model,
		});
		this.attachSubviews();
		this.$el.html(renderedContent);
		return this;
	},
	
	submit: function(event){
		event.preventDefault();
		var formData = $(event.currentTarget).serializeJSON();
		var that = this;
		var newPost = new Teacup.Models.Post();
		formData.latitude = this.coords.latitude;
		formData.longitude = this.coords.longitude;
		newPost.set(formData);
		newPost.save(formData, {
			success: function(){
				that.collection.add(newPost);
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
			 that.coords.longitude = result.geometry.location.k;
			 that.coords.longitude = result.geometry.location.B;
  	});
	},
	
	buildMap: function(latitude, longitude){
		$(".map").empty();
		var newMapView = new Teacup.Views.newMap({latitude: latitude, longitude: longitude})
		this.addSubview(".map", newMapView);
	},
	
	mapModal: function() {
		var view = new Teacup.Views.newMap({
			latitude: this.coords.latitude,
			longitude: this.coords.longitude
		});
		this.modal = new Backbone.BootstrapModal({
			content: view,
			title: $(event.currentTarget).serializeJSON().content,
			animate: true
		}).open();
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
			animate: true
		}).open(function(){ console.log('clicked OK') });
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
		
	}
	
	
	
	
})