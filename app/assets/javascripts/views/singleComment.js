Teacup.Views.singleComment = Backbone.CompositeView.extend({
	template: JST['comments/single'],
	tagName: "ul",
	
	initialize: function(){
		this.findMentions();
		//should there be a listen to on here?
	},
	
	events: {
		"click #remove-comment": "removeComment"
	},

	render: function(){
		var that = this
		
		if(that.mentionDetails.length > 1){
			that.mentionDetails = that.mentionDetails.sort(function(a, b){
				return a[2]-b[2];
			})
		}
		
		var renderedContent = that.template({
			comment: that.model,
			dets: that.mentionDetails
		});
		that.$el.html(renderedContent);
		return this;
	},
	
	
	removeComment: function(event){
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
				$.ajax({
					url: 'api/users/search',
					type: 'GET',
					data: {query: mention},
					success: function(user){
						if(user.length === 1){
							var startpoint = that.model.get('content').indexOf("@" + user[0].username);
							endpoint = startpoint + user[0].username.length +1;
							if(startpoint >= 0){
								that.mentionDetails.unshift([user[0].id, user[0].username,  startpoint, endpoint]);
							}	
							that.render();		
						}
					}
				});
			}
		} 
	}
	
	
})
