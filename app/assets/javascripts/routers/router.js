Teacup.Routers.Router = Backbone.Router.extend({
	initialize: function(el) {
		this.$rootEl = el;
	},
	
	routes: {
		"home": "home",
		"users/:id": "show",
		"" : "main",
		"scatter": "scatter"
	},
	
	home: function() {
		Teacup.Collections.posts.fetch();
		Teacup.Collections.users.fetch();
		var feedView = new Teacup.Views.postsFeed({
			userCollection: Teacup.Collections.users,
			postCollection: Teacup.Collections.posts
		});
		this._swapView(feedView);
	}, 
	
	main: function() {
		Teacup.Collections.masterPosts.fetch();
		Teacup.Collections.users.fetch();
		var anonView = new Teacup.Views.mainView({
			userCollection: Teacup.Collections.users,
			postCollection: Teacup.Collections.masterPosts
		});
		this._swapView(anonView);
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
	
	scatter: function(event){
		var currentUser = Teacup.Collections.users.getOrFetch($("#currentUser").data().id)
		Teacup.Collections.users.fetch();	
		var view = new Teacup.Views.followFollowers({
			model: currentUser,
			collection: Teacup.Collections.users
		});

		this.modal = new Backbone.BootstrapModal({
			content: view,
			title: "Find Users to Follow",
			animate: true
		}).open();
		$(this.modal.$el.children().children()[0]).css("backgroundColor", "#9B46E8");
	},

	_swapView: function(view){
		this.currentView && this.currentView.remove();
		this.currentView = view;
		this.$rootEl.html(view.render().el);
	} 
})