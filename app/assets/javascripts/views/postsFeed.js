Teacup.Views.postsFeed = Backbone.CompositeView.extend({
	template: JST['posts/feedShow'],
	
	initialize: function(){
		
		this.collection.each(this.addPost.bind(this));

	},
	
	render: function(){
		var currentUserId = $("#currentUser").data().id;
		var renderedContent = this.template({
			collection: this.collection,
			user: Teacup.Collections.users.getOrFetch(currentUserId)
		});
		this.$el.html(renderedContent);
		this.attachSubviews();
		return this;
	}	,
	
	
	addPost: function(post) {
		var PostsShow = new Teacup.Views.singlePost({model: post});
		this.addSubview(".posts", PostsShow);
	},
	
	removePost: function(post){
		var subview = _.find(
			this.subviews(".posts"), function(subview){
				return subview.model === post;
			}
		);
		this.removeSubview(".posts", subview);
	}
})