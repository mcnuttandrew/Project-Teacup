Teacup.Views.trendingModal = Backbone.View.extend({
	template: JST['posts/trending'],
	
	initialize: function(options){
		this.trends = [];
		this.getTrends();
	},
		
	render: function(){	
		
		var renderedContent = this.template({trends: this.trends});
		this.$el.html(renderedContent);	
		return this;
	},
	
	getTrends: function(){
		var that = this;
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