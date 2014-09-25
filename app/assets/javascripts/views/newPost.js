Teacup.Views.newPost = Backbone.View.extend({
	template: JST["posts/new"],
	
	initialize: function(){
		this.listenTo(this.model, "change", this.render);
	},
	
	events: {
		"submit form.post-submit": "submit",
		"keypress #content": "charsCount",
		"keypress #latitude": "latitude"
	},
	
	render: function(){
		
		var renderedContent = this.template({
			user: this.model,
		});
		this.$el.html(renderedContent);
		// debugger;
		return this;
	},
	
	submit: function(event){
		event.preventDefault();
		var formData = $(event.currentTarget).serializeJSON();
		var that = this;
		var newPost = new Teacup.Models.Post();
		newPost.set(formData);
		newPost.save({}, {
			success: function(){
				that.collection.add(newPost);
				that.render;
			},
			error: function(response){
				$(".errors").append(response.responseJSON);
			}
		});
		
	},
	
	charsCount: function(event){
		numLeft = (250-event.target.textLength)+'';
		console.log(event.currentTarget);
		this.$el.find(".chars-left").empty();
		this.$el.find(".chars-left").text(numLeft);
	},
	
	latitude: function(event){
		// debugger;
		 numLeft = ($(event.currentTarget).serializeJSON());
		 console.log(numLeft.latitude);
		// this.$el.find(".chars-left").empty();
		// this.$el.find(".chars-left").text(numLeft);
	}
	
})