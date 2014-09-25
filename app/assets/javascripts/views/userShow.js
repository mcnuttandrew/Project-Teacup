Teacup.Views.userShow = Backbone.CompositeView.extend({
	template: JST["users/show"],
	
	initialize: function(options){
		this.currentUser = options.currentUser;

		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.currentUser, "sync", this.render);
		this.listenTo(this.model, "change", this.render);
		this.listenTo(this.model.posts(), "add", this.addPost);

		this.model.posts().each(this.addPost.bind(this));
	},
	
	events: {
		"click .follow": "followUser",
		"click .unfollow": "unfollowUser"
	},
	
	render: function(){
		// debugger;
		if(this.currentUser){
			var renderedContent = this.template({
				user: this.model,
				follows: this.currentUser.follows(this.model),
				currentUserId: this.currentUser.id
			});
		};
		
		this.$el.html(renderedContent);
		this.attachSubviews();
		return this;
	},
	
	addPost: function(post){
		var PostsShow = new Teacup.Views.singlePost({model: post});
		this.addSubviewBefore(".posts", PostsShow);
	},
	
	followUser: function(){
		var that = this
		$.ajax({ 
			url: ('api/users/'+this.model.id+'/followship'), 
			type: 'POST',
			success: function(){
				that.model.attributes.followers.push(that.currentUser);
				that.currentUser.attributes.followed.push(that.model);
				that.render();
			}
		});
	},
	
	unfollowUser: function(){
		var that = this;
		$.ajax({
			url: ('api/users/'+this.model.id+'/followship'),
			type: 'DELETE',
			success: function(){
				var index = -1;
				for(var i =0; i < that.model.attributes.followers.length; i++){
					if( that.model.attributes.followers[i].id === that.currentUser.id){
						index = i;
					}
				}
				if(index > -1){ that.model.attributes.followers.splice(index) }
				index = -1;
				for(var i =0; i < that.currentUser.attributes.followed.length; i++){
					if( that.currentUser.attributes.followed[i].id === that.model.id){
						index = i;
					}
				}
				if(index > -1){ that.currentUser.attributes.followed.splice(index) }
				that.render();
			}
		})
	},
	
})