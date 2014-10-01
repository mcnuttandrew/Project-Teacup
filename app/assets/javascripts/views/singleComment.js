Teacup.Views.singleComment = Backbone.CompositeView.extend({
	template: JST['comments/single'],
	tagName: "ul",

	events: {
		"click #remove-comment": "removeComment"
	},

	render: function(){
		var that = this
		var renderedContent = that.template({
			comment: that.model,
		});
		that.$el.html(renderedContent);
		return this;
	},
	
	
	removeComment: function(event){
		event.preventDefault();
		this.model.destroy();
	}
})
