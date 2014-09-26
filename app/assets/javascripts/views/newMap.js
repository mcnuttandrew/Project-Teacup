Teacup.Views.newMap = Backbone.View.extend({
	template: JST['maps/newMap'],
	
	initialize: function(options){
		this.latitude = options.latitude;
		this.longitude = options.longitude;
	},
	
	render: function(){
		// debugger;
		var renderedContent = this.template({
			latitude: this.latitude,
			longitude: this.longitude
		});
		this.$el.html(renderedContent);
		return this;
	}

})