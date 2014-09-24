Teacup.Routers.Router = Backbone.Router.extend({
	initialize: function(el) {
		this.$rootEl = el;
	},
	
	routes: {
		"": "home",
		"following": "following",
		"followers": "followers",
		"users/:id": "show"
	},
	
	home: function() {
		Teacup.Collections.users.fetch();
		Teacup.Collections.posts.fetch();
		var feedView = new Teacup.Views.postsFeed({
			userCollection: Teacup.Collections.users,
			postCollection: Teacup.Collections.posts
		});
		this._swapView(feedView);
	}, 

	show: function(id){
		Teacup.Collections.posts.fetch();
		// Teacup.Collections.posts.where({user_id: parseInt(id, 10)});
		var userView = new Teacup.Views.userShow({
			collection: Teacup.Collections.posts,
			model: Teacup.Collections.users.getOrFetch(id)
		});
		this._swapView(userView);
	},

	following: function() {
		var that = this;
		Teacup.Collections.users.fetch({success: function(){
			var followView = new Teacup.Views.followingView({
				collection: Teacup.Collections.users
			});
			that._swapView(followView);
		}})
	},
	
	followers: function() {
		var that = this;
		Teacup.Collections.users.fetch({success: function(){
			var followView = new Teacup.Views.followersView({
				collection: Teacup.Collections.users
			});
			that._swapView(followView);
		}})
	},
	
	_swapView: function(view){
		this.currentView && this.currentView.remove();
		this.currentView = view;
		this.$rootEl.html(view.render().el);
	} 
})