Teacup.Views.newPost = Backbone.View.extend({
	template: JST["posts/new"],
	tagName: "li",
	
	events: {
		"submit form.post-submit": "submit"
	},
	
	render: function(){
		var renderedContent = this.template({collection: this.collection});
		this.$el.html(renderedContent);
		return this;
	},
	
	submit: function(event){
		event.preventDefault();
		var formData = $(event.currentTarget).serializeJSON();
		var that = this;
		var newPost = new Teacup.Models.Post();
		newPost.set(formData);
		newPost.save({}, {
			success: function(){
				that.collection.add(newPost);
				that.render();
			},
			error: function(response){
				$(".errors").append(response.responseJSON);
			}
		});
	},

	
})