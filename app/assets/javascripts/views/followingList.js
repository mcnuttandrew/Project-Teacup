Teacup.Views.followingView = Backbone.View.extend({
	template: JST["users/following"],

	render: function() {
		var followingUsersIds = this.model.get('followed');
		var followingUsers = [];
		for(var i = 0; i < followingUsersIds.length; i++){
			followingUsers.push(this.collection.getOrFetch(followingUsersIds[i]));
		}
		var relationshipStatuses = this.findRelationships(followingUsers);
		
		var renderedContent = this.template({
			user: this.model,
			followingUsers: followingUsers,
			relationshipStatuses: relationshipStatuses
		});
		this.$el.html(renderedContent);
		return this;
	},
	
	
	findRelationships: function(followingUsers){
		var relationshipStatuses = [];
		var that = this;
		for(var i = 0; i< followingUsers.length; i++){
			var mark = false;
			followingUsers[i].get('followed').forEach(function(user){
				if(that.model.get('id') === user.id){ mark = true}
			})

			if(mark){
				relationshipStatuses.push(1);
			} else {
				relationshipStatuses.push(0);
			}
		}
		return relationshipStatuses;
	}
	
})