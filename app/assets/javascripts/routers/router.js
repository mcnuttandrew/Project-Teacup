Teacup.Routers.Router = Backbone.Router.extend({
	initialize: function(el) {
		this.$rootEl = el;
	},
	
	routes: {
		"": "home",
		// "following/:id": "following",
	// 	"followers/:id": "followers",
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
		Teacup.Collections.users.fetch();
		var userView = new Teacup.Views.userShow({
			model: Teacup.Collections.users.getOrFetch(id),
			currentUser: Teacup.Collections.users.getOrFetch($("#currentUser").data().id),
			userCollection: Teacup.Collections.users,
		});
		this._swapView(userView);
	},

	// following: function(id) {
// 		var that = this;
// 		Teacup.Collections.users.fetch({success: function(){
// 			var followView = new Teacup.Views.followingView({
// 				model: Teacup.Collections.users.getOrFetch(id),
// 				collection: Teacup.Collections.users
// 			});
// 			that._swapView(followView);
// 		}})
// 	},
//
// 	followers: function(id) {
// 		var that = this;
// 		Teacup.Collections.users.fetch({success: function(){
// 			var followView = new Teacup.Views.followersView({
// 				model: Teacup.Collections.users.getOrFetch(id),
// 				collection: Teacup.Collections.users
// 			});
// 			that._swapView(followView);
// 		}})
// 	},
	
	_swapView: function(view){
		this.currentView && this.currentView.remove();
		this.currentView = view;
		this.$rootEl.html(view.render().el);
	} 
})