Teacup.Routers.Router = Backbone.Router.extend({
	initialize: function(el) {
		this.$rootEl = el;
	},
	
	routes: {
		"": "home"
	},
	
	home: function() {
		var that = this;
		Teacup.Collections.users.fetch()//why does work
		setTimeout(Teacup.Collections.posts.fetch({success: function(){
			var feedView = new Teacup.Views.postsFeed({
				collection: Teacup.Collections.posts
			});
			that._swapView(feedView);
		}}));
		
	},
	
	_swapView: function(view){
		this.currentView && this.currentView.remove();
		this.currentView = view;
		this.$rootEl.html(view.render().el);
	} 
})