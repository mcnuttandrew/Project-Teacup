Teacup.Views.newComment = Backbone.View.extend({
	template: JST["comments/new"],
	
	initialize: function(){
		// console.log(this.model.id)
		// this.hackCONSTANT = this.model.id
		this.listenTo(this.collection, "change", this.render);
		window.nv = this;
		console.log("initializing a new comment view: " + this.cid)
		console.log("initializing a new comment view: " + this.model.id)
	},
	
	events: {
		"submit form.comment-submit": "submit"
	},
	
	render: function() {
		console.log("rendering a new comment view: " + this.cid)
		console.log("rendering a new comment view: " + this.model.id)
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		setTimeout(function () {
			console.log("0 ms after rendering a new comment view: " + window.nv.model.id)
		}, 1000)
		return this;
	},
	
	submit: function(event) {
		//renders
		console.log("submiting a new comment view: " + this.cid)
		console.log("submiting a new comment view: " + this.model.id)
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