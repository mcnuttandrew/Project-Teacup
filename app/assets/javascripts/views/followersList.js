Teacup.Views.followersView = Backbone.View.extend({
	template: JST["users/followers"],

	render: function() {
		var followedUsersIds = this.model.get('followers');
		var followedUsers = [];
		for(var i = 0; i < followedUsersIds.length; i++){
			followedUsers.push(this.collection.getOrFetch(followedUsersIds[i]));
		}
		var relationshipStatuses = this.findRelationships(followedUsers)
		var renderedContent = this.template({
			user: this.model,
			followedUsers: followedUsers,
			relationshipStatuses: relationshipStatuses
		});
		this.$el.html(renderedContent);
		return this;
	},
	
	findRelationships: function(followedUsers){
		var relationshipStatuses = [];
		var that = this
		for(var i = 0; i< followedUsers.length; i++){
			var mark = false;
			followedUsers[i].get('followed').forEach(function(user){
				if(that.model.get('id') === user.id){ mark = true}
			})
			if(mark){
				relationshipStatuses.push(1);
			} else {
				relationshipStatuses.push(0);
			}
		}
		return relationshipStatuses
	}
	
})