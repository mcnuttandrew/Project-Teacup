Teacup.Views.postsFeed = Backbone.CompositeView.extend({
	template: JST['posts/feedShow'],
	
	initialize: function(options){
		//build custom connections
		this.postCollection = options.postCollection;
		this.userCollection = options.userCollection;
		
		// add/remove listeners;
		this.listenTo(this.postCollection, "add", this.addPost);
 		this.listenTo(this.postCollection, "remove", this.removePost);
		this.listenTo(this.userCollection, "sync", this.render);
		this.listenTo(this.postCollection, "sync", this.render);
		
		//new
		var currentUserId = $("#currentUser").data().id;
		var postNewView = new Teacup.Views.newPost({
			model: Teacup.Collections.users.getOrFetch(currentUserId),
			collection: this.postCollection
		});
		this.addSubview(".newcontent", postNewView);
		//feed
		this.postCollection.each(this.addPost.bind(this));
	},
	
	
	
	render: function(){		
		var renderedContent = this.template();
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