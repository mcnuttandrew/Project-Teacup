Teacup.Views.trendingModal = Backbone.View.extend({
	template: JST['posts/trending'],
	
	initialize: function(options){
		this.trends = [];
		this.multiples = [];
		this.colors = [];
		this.getTrends();
	},
		
	events: {
		"click #refreshColors": "getColors",
		"click #loopColors": "getColorsLoop",
		"change form#date-selector": "updateStartDate"
	},	
		
	render: function(){	
		
		var renderedContent = this.template({
			trends: this.trends,
			multiples: this.multiples,
			colors: this.colors
		});
		this.$el.html(renderedContent);	
		if(this.$el.find(".trendingList").children().length < 1){
			this.$el.find(".trendingList").html("<h1 class='loading text-center'>X</h1>")
		}
		return this;
	},
	
	getTrends: function(startDate){
		var that = this;
		var loc;
		if(startDate){
			loc = 'api/trend_over_time/' + startDate			
		} else {
			loc = 'api/trend_over'
		}
		$.ajax({ 
			url: loc, 
			type: 'GET',
			success: function(trends){
				that.trends = trends[0];
				that.multiples = trends[1];
				that.getColors();
			}, 
			error: function(){
				debugger;
			}
		});
	},
	
	getColors: function(){
		this.colors = [];
		for(var i = 0; i < this.multiples.length; i++){
			this.colors.push('#' + Math.random().toString(16).substring(2, 8))
		}	
		this.render()
	},
	
	getColorsLoop: function(){
		debugger;
		var that = this
		setInterval(function(){
			that.getColors()	
		}, 100)
	},
	
	updateStartDate: function(event){
		this.$el.find(".trendingList").html("<h1 class='loading text-center'> X </h1>");
		this.getTrends($(event.currentTarget).serializeJSON().date);
	}
	
	
	
	
})