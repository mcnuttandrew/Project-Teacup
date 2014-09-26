Teacup.Views.newPost = Backbone.CompositeView.extend({
	template: JST["posts/new"],
	
	initialize: function(){
		this.listenTo(this.model, "change", this.render);
	
		this.coords = {latitude: 33.873415, longitude: -115.900992 }
		this.buildMap(this.coords.latitude, this.coords.longitude);
	},
	
	events: {
		"submit form.post-submit": "submit",
		"keypress #content": "charsCount",
		"keypress #latitude": "latitude",
		"keypress #longitude": "longitude"
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
		console.log(formData);
		debugger;
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
	
	latitude: function(event){
		this.coords.latitude = $(event.currentTarget).serializeJSON().latitude;
		this.buildMap(this.coords.latitude, this.coords.longitude);
	},
	
	longitude: function(event){
		this.coords.longitude = $(event.currentTarget).serializeJSON().longitude;
		this.buildMap(this.coords.latitude, this.coords.longitude);
	},
	
	buildMap: function(latitude, longitude){
		$(".map").empty();
		var newMapView = new Teacup.Views.newMap({latitude: latitude, longitude: longitude})
		this.addSubview(".map", newMapView);
	},
	
})