Teacup.Views.postsFeed = Backbone.CompositeView.extend({
	template: JST['posts/feedShow'],
	
	initialize: function(){
		// add/remove listeners;
		this.listenTo(this.collection, "add", this.addPost);
		this.listenTo(this.collection, "remove", this.removePost);
		this.listenTo(this.collection, "sync", this.render);
		//new
		var postNewView = new Teacup.Views.newPost({collection: this.collection});
		this.addSubview(".newcontent", postNewView);
		//feed
		this.collection.each(this.addPost.bind(this));
	},
	
	
	
	render: function(){		
		var renderedContent = this.template({
			collection: this.collection,
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