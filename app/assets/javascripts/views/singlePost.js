Teacup.Views.singlePost = Backbone.CompositeView.extend({
	template: JST['posts/single'],
	// tagName: "li",
	
	initialize: function(options){
		this.user = options.user;
		
	},
	
	events: {
		"click .removeTweet": "removeTweet",
	},
	
	render: function(){	
		var that = this;
		setTimeout(function(){
			var renderedContent = that.template({
				post: that.model,
				user: that.user
			});
			that.attachSubviews();
			that.$el.html(renderedContent);
		}, 0)
		return this;
	},
	
	removeTweet: function(){
		event.preventDefault();
		this.model.destroy();
	},
})