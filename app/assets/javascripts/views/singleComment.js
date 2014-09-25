Teacup.Views.singleComment = Backbone.CompositeView.extend({
	template: JST['comments/single'],
	tagName: "ul",

	render: function(){
		var renderedContent = this.template({
			comment: this.model,
		});
		this.$el.html(renderedContent);
		return this;
	},
})
