Teacup.Views.mainView = Backbone.CompositeView.extend({
	template: JST["main/main"],
	
	initialize: function(options){
		this.userCollection = options.userCollection;
		this.postCollection = options.postCollection;
		this.listenTo(this.postCollection, "add", this.addPost);
 		this.listenTo(this.postCollection, "remove", this.removePost);
		
		this.listenToOnce(this.userCollection, "sync", this.render);
		this.listenTo(this.postCollection, "sync", this.render);
		
		var currentUserId = $("#currentUser").data().id;
		var postNewView = new Teacup.Views.newPost({
			model: Teacup.Collections.users.getOrFetch(currentUserId),
			collection: this.postCollection,
			userCollection: this.userCollection
		});
		this.addSubview(".new-content", postNewView);
		this.postSize = 1;
		this.postCollection.each(this.addPost.bind(this));
	},
	
	events: {
		"click .expandPost": "postModal"
	},
	
	render: function(){
		this.postSize = 0;
		var renderedContent = this.template({})
		this.$el.html(renderedContent)
		this.attachSubviews();
		// debugger;
		return this;
	},
	
	addPost: function(post) {
		console.log(this.subviews()[".main-posts"], this.postSize)
		//fills up the main feed to a maximum size,
		//at the maximum it swaps out the model of a random view
		if(! this.subviews()[".main-posts"]
			 || this.subviews()[".main-posts"].length < 9 
			 || (this.postSize > 0 && this.postSize < 9) ) {
				this.postSize +=1;
				var poster = this.userCollection.getOrFetch(post.attributes.user_id);
				var that = this;
				var PostsShow = new Teacup.Views.compressedPost({
					color: this.getColor(),
					model: post,
					user: poster
				});
				that.addSubviewBefore(".main-posts", PostsShow);
		} else {//if(this.subviews()[".main-posts"].length === 9 || this.postSize === 9){
			var subview = this.subviews()[".main-posts"][Math.floor(Math.random() * 9)]
			var that = this;
			$(subview.$el).fadeOut(1000, function(){
				subview.model = post
				subview.color = that.getColor();
				subview.render();
				$(subview.$el).fadeIn(1000);
			});
		}
	},
	
	
	removePost: function(post){
		var subview = _.find(
			this.subviews(".main-posts"), function(subview){
				return subview.model === post;
			}
		);
		var that  = this;
		that.removeSubview(".main-posts", subview);
	},
	
	getColor: function(){
		var colors = ["#FF0000", "#00FF00", "#FF00FF", "#FFFF00", "#00FFFF"];
		return colors[Math.floor(Math.random() * 5)];
	},
	
	
	postModal: function(event) {
		// debugger;
		var targetPost = event.currentTarget.getAttribute('data-id');
		var post = this.postCollection.getOrFetch(targetPost);
		var user = this.userCollection.getOrFetch(post.user_id);

		var view = new Teacup.Views.postView({
			model: post,
			user: user
		});
		this.modal = new Backbone.BootstrapModal({
			content: view,
			title: post.get('content'),
			animate: true
		}).open();
	},
	
	replaceSquare: function(location, model){
	}
	
})