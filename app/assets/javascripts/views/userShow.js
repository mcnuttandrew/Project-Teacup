Teacup.Views.userShow = Backbone.View.extend({
	template: JST["users/show"],
	
	render: function(){
		debugger;
		var renderedContent = this.template({
			collection: this.collection,
			user: this.user
		});
		this.$el.html(renderedContent);
		return this;
	}
	
})