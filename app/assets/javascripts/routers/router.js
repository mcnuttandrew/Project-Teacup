Teacup.Routers.Router = Backbone.Router.extend({
	initialize: function(el) {
		this.$rootEl = el;
		
		var router = this;
		$('a[class="btn"][href="#/scatter"]').on('click', function(event) {
			event.preventDefault();
			router.scatter();
		});
		$('a[class="btn"][href="#/trends"]').on('click', function(event) {
			event.preventDefault();
			router.trends();
		});
		$('a[class="search"][id="search"]').on('click', function(event) {
			event.preventDefault();
			router.search();
		});
	},
	
	routes: {
		"home": "home",
		"users/:id": "show",
		"users_search/:search": "search",
		"" : "main",
		"userhome": "userhome"
	},
	
	userhome: function(){
		Backbone.history.navigate("#/users/"+$("#currentUser").data().id, {trigger: true})
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
		var userView = new Teacup.Views.userShow({
			model: Teacup.Collections.users.getOrFetch(id),
			currentUser: Teacup.Collections.users.getOrFetch($("#currentUser").data().id),
			userCollection: Teacup.Collections.users,
		});
		this._swapView(userView);
	},
	
	scatter: function(event){
		var that = this
		Teacup.Collections.users.fetch({
			success: function() {
				// alert('in success')
				var currentUser = Teacup.Collections.users.get($("#currentUser").data().id);
			
				var view = new Teacup.Views.followFollowers({
					model: currentUser,
					collection: Teacup.Collections.users
				});
				if(that.modal){ that.modal.remove();}
				that.modal = new Backbone.BootstrapModal({
					content: view,
					title: "Users interaction",
					animate: true
				})
				that.modal.open();
			
				$(that.modal.$el.children().children()[0]).css("backgroundColor", "#9B46E8");
			}
		
		});	
	},
	
	trends: function(event){
		var view = new Teacup.Views.trendingModal();
		var modal = new Backbone.BootstrapModal({
			content: view,
			title: "Now Trending",
			animate: true
		}).open();
		$(modal.$el.children().children()[0]).css("backgroundColor", "#625AFF");
	},
	
	search: function(searchTerm){
		var that = this;
		var view = new Teacup.Views.searchUsers();
		var modal = new Backbone.BootstrapModal({
			content: view,
			title: "Users Search",
			animate: true
		}).open();
		$(modal.$el.children().children()[0]).css("backgroundColor", "#625AFF");
	},

	_swapView: function(view){
		this.currentView && this.currentView.remove();
		this.currentView = view;
		this.$rootEl.html(view.render().el);
	} 
})