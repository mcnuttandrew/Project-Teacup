Teacup.Views.userShow = Backbone.View.extend({
	template: JST["users/show"],
	
	initialize: function(){
		this.listenTo(this.collection, "sync", this.render);
		this.listenTo(this.model, "sync", this.render);
	},
	
	events: {
		"click .follow": "followUser",
		"click .unfollow": "unfollowUser"
	},
	
	render: function(){
		var selectedPosts = this.collection;
		if(selectedPosts.length > 0){
			selectedPosts = this.collection.where({user_id: this.model.id});
		}
		var currentUserId = $("#currentUser").data().id;
		var mark = false;
		if(this.model.get('followed') ){
			this.model.get('followed').forEach(function(follower){
				if(follower.id === currentUserId){
					mark = true;
				}
			})
		};
		var renderedContent = this.template({
			collection: selectedPosts,
			user: this.model,
			follows: mark,
			currentUserId: currentUserId
		});
		this.$el.html(renderedContent);
		return this;
	},
	
	followUser: function(){
		// this.model.
	},
	
	unfollowUser: function(){
		// this.model.
	},
	
})