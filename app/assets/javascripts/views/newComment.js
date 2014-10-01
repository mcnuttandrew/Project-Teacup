Teacup.Views.newComment = Backbone.View.extend({
	template: JST["comments/new"],
	
	initialize: function(){
		this.listenTo(this.collection, "change", this.render);
	},
	
	events: {
		"submit form.comment-submit": "submit"
	},
	
	render: function() {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	},
	
	submit: function(event) {
		event.preventDefault();
		var formData = $(event.currentTarget).serializeJSON();
		var that = this;
		var newComment = new Teacup.Models.Comment({ post_id: this.model.id });
		newComment.set(formData);
		newComment.save({}, {
			success: function(){
				that.model.comments().add(newComment, {at: 0});
				that.render();
			},
			error: function(response){
				$(".errors").append(response.responseJSON);
			}
		});
	}
});