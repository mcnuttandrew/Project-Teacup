Teacup.Views.singlePost = Backbone.CompositeView.extend({
	template: JST['posts/single'],
	tagName: "ul",
	
	events: {
		"click .removeTweet": "removeTweet",
	},
	
	render: function(){	
		console.log("rendering single post")
		var curUser = Teacup.Collections.users.getOrFetch(this.model.get('user_id'));
		var renderedContent = this.template({
			post: this.model,
			user: curUser
		});
		this.attachSubviews();
		this.$el.html(renderedContent);
	
		return this;
	},
	
	removeTweet: function(){
		event.preventDefault();
		this.model.destroy();
	},
})