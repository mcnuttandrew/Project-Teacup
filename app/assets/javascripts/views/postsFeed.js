Teacup.Views.postsFeed = Backbone.CompositeView.extend({
	template: JST['posts/feedShow'],
	
	initialize: function(options) {
		this.postCollection = options.postCollection;
		this.userCollection = options.userCollection;
		
		this.listenTo(this.postCollection, "add", this.addPost);
 		this.listenTo(this.postCollection, "remove", this.removePost);
		this.listenToOnce(this.userCollection, "sync", this.render);
		this.listenToOnce(this.postCollection, "sync", this.render);
		var currentUserId = $("#currentUser").data().id;
		var postNewView = new Teacup.Views.newPost({
			model: Teacup.Collections.users.getOrFetch(currentUserId),
			collection: this.postCollection
		});
		this.addSubview(".newcontent", postNewView);
				
		this.postCollection.each(this.addPost.bind(this));
	},
	
	events: {
		"click .expandPost": "expandPost",
		"click .following": "openFollowingModal",
		"click .followers": "openFollowersModal",
	},
	
	render: function() {	
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		this.attachSubviews();
		return this;
	},
	
	addPost: function(post) {

		var poster = this.userCollection.getOrFetch(post.attributes.user_id);
		var that = this;
		var PostsShow = new Teacup.Views.singlePost({
			model: post,
			user: poster
		});
		that.addSubviewBefore(".posts", PostsShow);
	},
	
	removePost: function(post){
		var subview = _.find(
			this.subviews(".posts"), function(subview){
				return subview.model === post;
			}
		);
		this.removeSubview(".posts", subview);
	},
	
	expandPost: function(event){
		$(".expansionSlot").empty();
		var targetPost = event.currentTarget.getAttribute('data-id');
		var post = Teacup.Collections.posts.getOrFetch(targetPost);
		var postExpand = new Teacup.Views.singleExpand({
			model: post
		});
		this.addSubview(".expansionSlot", postExpand);	
	},
	
	removeExpansionView: function(post){
		var subview = _.find(
			this.subviews(".expansionSlot"), function(subview){
				return subview.model !== post;
			}
		);
		if(subview){
			this.removeSubview(".expansionSlot", subview);
		}
	},
	

	openFollowingModal: function() {
		var view = new Teacup.Views.followingView({
			model: Teacup.Collections.users.getOrFetch($("#currentUser").data().id),
			collection: this.userCollection
		});
		var title = Teacup.Collections.users.getOrFetch($("#currentUser").data().id).get('username') + " follows"
		var modal = new Backbone.BootstrapModal({
			content: view,
			title: title,
			animate: true
		}).open(function(){ console.log('clicked OK') });
	},
	
	openFollowersModal: function() {
		var view = new Teacup.Views.followersView({
			model: Teacup.Collections.users.getOrFetch($("#currentUser").data().id),
			collection: this.userCollection
		});
		var title = Teacup.Collections.users.getOrFetch($("#currentUser").data().id).get('username') + " is followed by"
		var modal = new Backbone.BootstrapModal({
			content: view,
			title: title,
			animate: true
		}).open();
		
	}
	
})