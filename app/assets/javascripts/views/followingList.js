Teacup.Views.followingView = Backbone.CompositeView.extend({
	template: JST["users/following"],

	render: function() {
		var that = this
		
		var curUser = this.collection.getOrFetch($("#currentUser").data().id);
		var followingUsersIds = curUser.get('followed');
		var followingUsers = [];
		for(var i = 0; i < followingUsersIds.length; i++){
			followingUsers.push(this.collection.getOrFetch(followingUsersIds[i]));
		}
		var relationshipStatuses = this.findRelationships(curUser, followingUsers);
		
		var renderedContent = that.template({
			followingUsers: followingUsers,
			relationshipStatuses: relationshipStatuses
		});
		that.$el.html(renderedContent);
		// that.attachSubviews();

		return this;
	},
	
	
	findRelationships: function(curUser, followingUsers){
		var relationshipStatuses = []
		for(var i = 0; i< followingUsers.length; i++){
			var mark = false;
			followingUsers[i].get('followed').forEach(function(user){
				if(curUser.get('id') === user.id){ mark = true}
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