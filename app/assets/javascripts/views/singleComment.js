/*
Teacup.Views.singlePost = Backbone.CompositeView.extend({
	template: JST['posts/single'],
	tagName: "ul",
	
	events: {
		"click .btn": "removeTweet"
	},
	
	initialize: function(){
			this.comments.each(this.addComment.bind(this));
	},
	
	render: function(){	
		var curUser= Teacup.Collections.users.getOrFetch(this.model.get('user_id'));
		var renderedContent = this.template({
			post: this.model,
			user: curUser
		});
		this.$el.html(renderedContent);
		return this;
	},
	
	removeTweet: function(){
		event.preventDefault();
		this.model.destroy();
	},
	
	
	
})*/
