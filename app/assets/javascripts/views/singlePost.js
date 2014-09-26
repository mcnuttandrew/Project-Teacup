Teacup.Views.singlePost = Backbone.CompositeView.extend({
	template: JST['posts/single'],
	tagName: "ul",
	
	initialize: function(options){
		this.postOwner = options.postOwner
	},
	
	events: {
		"click .removeTweet": "removeTweet",
	},
	
	render: function(){	
		console.log("rendering single post")
		if(!this.postOwner){
			this.postOwner = Teacup.Collections.users.getOrFetch(this.model.get('user_id'));
		}
		console.log(this.postOwner);
		var renderedContent = this.template({
			post: this.model,
			user: this.postOwner
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