Teacup.Views.singlePost = Backbone.CompositeView.extend({
	template: JST['posts/single'],
	// tagName: "li",
	
	initialize: function(options){
		this.user = options.user;
		this.listenTo(this.user, "sync", this.render);
		this.findMentions();
	},
	
	events: {
		"click .removeTweet": "removeTweet",
	},
	
	render: function(){	
		var that = this;
		setTimeout(function(){
			if(that.mentionDetails.length > 1){
				that.mentionDetails = that.mentionDetails.sort(function(arr){
					return arr[2];
				})
			}
			// that.mention
			var renderedContent = that.template({
				post: that.model,
				user: that.user,
				dets: that.mentionDetails
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
	
	findMentions: function(){
		var that = this
		that.mentionDetails = [];
		that.splitContent = this.model.get('content').split("@");
		if( that.splitContent.length > 1){
			for(var i = 1; i < that.splitContent.length; i++){
				mention = that.splitContent[i].split(" ")[0]
				if( this.model.get('content')[this.model.get('content').indexOf(mention)-1] === "@" ){
					$.ajax({
						url: 'api/users/search',
						type: 'GET',
						data: {query: mention},
						success: function(user){
							if(user.length === 1){
								var startpoint = that.model.get('content').indexOf("@" + user[0].username);
								endpoint = startpoint + user[0].username.length +1;
								that.mentionDetails.unshift([user[0].id, user[0].username,  startpoint, endpoint]);	
								that.render();		
							}
						}
					});
				}
			}
		} 
	}
})