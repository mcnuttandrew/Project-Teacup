Teacup.Views.trendingModal = Backbone.View.extend({
	template: JST['posts/trending'],
	
	initialize: function(options){
		this.trends = [];
		this.multiples = [];
		this.colors = [];
		this.getTrends();
	},
		
	events: {
		"click #refreshColors": "getColors"
	},	
		
	render: function(){	
		
		var renderedContent = this.template({
			trends: this.trends,
			multiples: this.multiples,
			colors: this.colors
		});
		this.$el.html(renderedContent);	
		return this;
	},
	
	getTrends: function(){
		var that = this;
		$.ajax({ 
			url: ('api/trend_over'), 
			type: 'GET',
			success: function(trends){
				that.trends = trends[0];
				that.multiples = trends[1];
				that.getColors();
				// that.render()
			}
		});
	},
	
	getColors: function(){
		this.colors = [];
		for(var i = 0; i < this.multiples.length; i++){
			this.colors.push('#' + Math.random().toString(16).substring(2, 8))
		}	
		this.render()
	}
	
	
	
})