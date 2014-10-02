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
			$(that.$el.children()[0]).css("background-color", that.color);
			$(that.$el.children()[0]).css("-webkit-box-shadow", "0 0 20px " + that.color);
			$(that.$el.children()[0]).css("-moz-box-shadow", "0 0 20px " + that.color);
			$(that.$el.children()[0]).css("box-shadow", "0 0 20px " + that.color);
		}, 0);
		return that;
	},

	removeTweet: function(){
		event.preventDefault();
		this.model.destroy();
	},
})