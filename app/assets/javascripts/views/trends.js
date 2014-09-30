Teacup.Views.trends = Backbone.View.extend({
	template: JST['posts/trends'],
	className: "trending-wrapper",
	//protects for cases when trends has not finished loading
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