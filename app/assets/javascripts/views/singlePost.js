Teacup.Views.singlePost = Backbone.CompositeView.extend({
	template: JST['posts/single'],
	tagName: "ul",
	className: "bg-info col-xs-7",
	
	events: {
		"click .btn": "removeTweet"
	},
	
	initialize: function(){
			// this.comments.each(this.addComment.bind(this));
	},
	
	render: function(){	
		var curUser= Teacup.Collections.users.getOrFetch(this.model.get('user_id'));
		var renderedContent = this.template({
			post: this.model,
			user: curUser
		});
		this.$el.html(renderedContent);
		return this;
	},
	
	removeTweet: function(){
		event.preventDefault();
		this.model.destroy();
	},
	
	
	// addComment: function(post) {
	// 	var CommentsShow = new Teacup.Views.singleComment({model: post});
	// 	this.addSubview(".posts", CommentsShow);
	// },
	
	removeComment: function(post){
		var subview = _.find(
			this.subviews(".posts"), function(subview){
				return subview.model === post;
			}
		);
		this.removeSubview(".posts", subview);
	}
	
})