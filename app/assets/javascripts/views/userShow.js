Teacup.Views.userShow = Backbone.View.extend({
	template: JST["users/show"],
	
	initialize: function(options){
		this.currentUser = options.currentUser;

		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.currentUser, "sync", this.render);
		this.listenTo(this.model, "change", this.render);
	},
	
	events: {
		"click .follow": "followUser",
		"click .unfollow": "unfollowUser"
	},
	
	render: function(){
		if(this.currentUser){
			console.log(this.currentUser.follows(this.model));
			var renderedContent = this.template({
				user: this.model,
				follows: this.currentUser.follows(this.model),
				currentUserId: this.currentUser.id
			});
		};
		this.$el.html(renderedContent);
		return this;
	},
	
	followUser: function(){
		$.ajax({ url: ('api/users/'+this.model.id+'/followship'), type: 'POST' });
		this.model.attributes.followers.push(this.currentUser);
		this.render();
		Backbone.history.navigate("/users/" + this.model.id, {trigger: true})
	},
	
	unfollowUser: function(){
		$.ajax({ url: ('api/users/'+this.model.id+'/followship'), type: 'DELETE' })
		var inde = this.model.attributes.followers.indexOf(this.currentUser);
		if(inde > -1){
			this.model.attributes.followers.splice(inde);
		}
		this.render();
		Backbone.history.navigate("/users/" + this.model.id, {trigger: true})
	},
	
})