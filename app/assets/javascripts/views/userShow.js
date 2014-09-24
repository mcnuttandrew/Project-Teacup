Teacup.Views.userShow = Backbone.CompositeView.extend({
	template: JST['users/show'],

	events: {
		"click .btn": "removeTweet"
	},

	initialize: function(){
		debugger;
		_(this.collection).each(this.addPost.bind(this));
	},

	render: function(){
		var renderedContent = this.template({
			user: this.model,
			posts: this.collection
		});
		this.$el.html(renderedContent);
		this.attachSubviews();
		return this;
	},

	select_valid_posts: function(){
		this.collection.models
		var validPosts = [];
		for(var i = 0; i < this.collection.models.length; i++){
			if(this.collection.models[i].get('user_id') === this.model.id){
				validPosts.push(this.collection.models[i]);
			}
		}
		return validPosts
	}

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