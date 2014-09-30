Teacup.Views.trends = Backbone.View.extend({
	template: JST['posts/trends'],
	className: "trending-wrapper",
	
	initialize: function(options){
		this.trends = [];
		this.getTrends();
		var that = this;
		that.word = "?";
		setInterval(function(){
			if(that.trends){
				if(that.word === "?"){
					that.word = that.trends[0];
				}	else {
					that.word = that.trends[(that.trends.indexOf(that.word) + 1)%that.trends.length];
				}	
			} else {
				that.word = "?";
			}
			that.render();
		}, 3000)
	},
		
	render: function(){	
		
		var renderedContent = this.template({
			// trends: this.trends
			word: this.word
		});
		this.$el.html(renderedContent);
		 // debugger;
		return this;
	},
	
	getTrends: function(){
		var that =this;
		$.ajax({ 
			url: ('api/trend'), 
			type: 'GET',
			success: function(trends){
				that.trends = trends;
				that.render();
			}
		});
	},
})