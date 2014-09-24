Teacup.Views.newPost = Backbone.View.extend({
	template: JST["posts/new"],
	
	events: {
		"submit form.post-submit": "submit",
		"click .following-btn": "followingRedirect",
		"click .followers-btn": "followersRedirect"
	},
	
	render: function(){
		// debugger;
		var currentUserId = $("#currentUser").data().id;
		var renderedContent = this.template({
			collection: Teacup.Collections.users,
			user: Teacup.Collections.users.getOrFetch(currentUserId)
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
				that.render();
			},
			error: function(response){
				$(".errors").append(response.responseJSON);
			}
		});
		
	},

	followingRedirect: function(){
		Backbone.history.navigate("/following", {trigger: true})
	},
	
	followersRedirect: function(){
		Backbone.history.navigate("/followers", {trigger: true})
	},
	
})