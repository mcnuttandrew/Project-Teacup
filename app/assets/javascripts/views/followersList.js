Teacup.Views.followersView = Backbone.CompositeView.extend({
	template: JST["users/followers"],

	render: function() {
		var that = this
		
		var curUser = this.collection.getOrFetch($("#currentUser").data().id);
		var followedUsersIds = curUser.get('followers');
		var followedUsers = [];
		for(var i = 0; i < followedUsersIds.length; i++){
			followedUsers.push(this.collection.getOrFetch(followedUsersIds[i]));
		}
		var relationshipStatuses = this.findRelationships(curUser, followedUsers)
		var renderedContent = that.template({
			followedUsers: followedUsers,
			relationshipStatuses: relationshipStatuses
		});
		that.$el.html(renderedContent);
		// that.attachSubviews();
		// return that;
		

		return this;
	},
	
	findRelationships: function(curUser, followedUsers){
		var relationshipStatuses = [];
		for(var i = 0; i< followedUsers.length; i++){
			var mark = false;
			followedUsers[i].get('followed').forEach(function(user){
				if(curUser.get('id') === user.id){ mark = true}
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