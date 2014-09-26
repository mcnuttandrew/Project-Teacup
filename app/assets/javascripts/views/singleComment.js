Teacup.Views.singleComment = Backbone.CompositeView.extend({
	template: JST['comments/single'],
	tagName: "ul",

	events: {
		"click #remove-comment": "removeComment"
	},

	render: function(){
		var renderedContent = this.template({
			comment: this.model,
		});
		this.$el.html(renderedContent);
		return this;
	},
	
	
	removeComment: function(event){
		event.preventDefault();
		this.model.destroy();
	}
})
