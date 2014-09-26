Teacup.Views.newComment = Backbone.View.extend({
	template: JST["comments/new"],
	
	initialize: function(){
		this.hackCONSTANT = this.model.id
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
		//renders
		event.preventDefault();
		var formData = $(event.currentTarget).serializeJSON();
		var that = this;
		// var newComment = new Teacup.Models.Comment({post_id: this.hackCONSTANT});
		var newComment = new Teacup.Models.Comment({ post_id: this.model.id });
		newComment.set(formData);
		newComment.save({}, {
			success: function(){
				that.model.comments().add(newComment);
				that.render();
			},
			error: function(response){
				$(".errors").append(response.responseJSON);
			}
		});
	}
});