Teacup.Views.compressedPost = Backbone.CompositeView.extend({
	template: JST['posts/compressed'],
	// tagName: "li",
	
	initialize: function(options){
		this.user = options.user;
		this.color = options.color; 
		this.listenTo(this.user, "sync", this.render);
	},
	
	events: {
		"click .removeTweet": "removeTweet",
	},
	
	render: function(){	
		var that = this;
		setTimeout(function(){
			var renderedContent = that.template({
				post: that.model,
				user: that.user,
				color: that.color
			});
			that.attachSubviews();
			that.$el.html(renderedContent);
		}, 0);
		
		
		return that;
	},
	
	removeTweet: function(){
		event.preventDefault();
		this.model.destroy();
	},
})