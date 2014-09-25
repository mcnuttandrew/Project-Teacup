Teacup.Views.newPost = Backbone.View.extend({
	template: JST["posts/new"],
	
	initialize: function(){
		this.listenTo(this.model, "change", this.render);
	},
	
	events: {
		"submit form.post-submit": "submit",
		"click .following-btn": "followingRedirect",
		"click .followers-btn": "followersRedirect",
		"keypress #content": "charsCount"
	},
	
	render: function(){
		
		var renderedContent = this.template({
			user: this.model,
			// followerCount: followerCount,
			// followingCount: followingCount
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
		this.$el.find("strong").empty();
		this.$el.find("strong").text( numLeft);
	}
	
})