Teacup.Views.singlePost = Backbone.View.extend({
	template: JST['posts/single'],
	tagName: "ul",
	
	render: function(){	
		// console.log(this.model.get('user_id'));
		
		var curUser= Teacup.Collections.users.getOrFetch(this.model.get('user_id'));
		console.log(curUser.attributes);
		var renderedContent = this.template({
			post: this.model,
			user: curUser
		});
		this.$el.html(renderedContent);
		return this;
	}	
})