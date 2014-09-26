Teacup.Views.singleComment = Backbone.CompositeView.extend({
	template: JST['comments/single'],
	tagName: "ul",

	events: {
		"click #remove-comment": "removeComment"
	},

	render: function(){
		var that = this
		// setTimeout(function(){
			var renderedContent = that.template({
				comment: that.model,
			});
			that.$el.html(renderedContent);
		// }, 1)
		return this;
	},
	
	
	removeComment: function(event){
		event.preventDefault();
		this.model.destroy();
	}
})
