Teacup.Views.userShow = Backbone.CompositeView.extend({
	template: JST["users/show"],
	
	initialize: function(options){
		var getModal = $(".modal")
		if(getModal){
			getModal.remove();
			$("body").removeClass("modal-open");
			$(".modal-backdrop").remove();
		}
		this.currentUser = options.currentUser;
		this.userCollection = options.userCollection;

		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.currentUser, "sync", this.render);
		this.listenToOnce(this.userCollection, "sync", this.render);
		
		this.listenTo(this.model, "change", this.render);
		this.listenTo(this.model.posts(), "add", this.addPost);
		this.listenTo(this.model.posts(), "remove", this.removePost);
		this.model.posts().each(this.addPost.bind(this));
	},
	
	events: {
		"click .follow": "followUser",
		"click .unfollow": "unfollowUser",
		"click .expandPost": "expandPost",
		"click .following": "openFollowingModal",
		"click .followers": "openFollowersModal"
	},
	
	render: function(){
		if(this.currentUser && this.model.get('username')){
			var renderedContent = this.template({
				user: this.model,
				follows: this.currentUser.follows(this.model),
				currentUserId: this.currentUser.id
			});
		};
		
		this.$el.html(renderedContent);
		this.attachSubviews();
		this.placeGravitar();
		return this;
	},
	
	placeGravitar: function(){
		var loccc = "http://www.gravatar.com/avatar/" + MD5("<%=this.model.username%>@<%=this.model.username%>.net"); 
		loccc = loccc+ "&s=80?f=y&&d=identicon"
		$(".userPIC").append( $("<img class='img-circle img-responsive'>").attr("src",loccc) );
	},
	
	addPost: function(post){
		
		var PostsShow = new Teacup.Views.singlePost({
			model: post,
			user: this.model
		});
		this.addSubviewBefore(".posts", PostsShow);
	},
	
	removePost: function(post){
		var subview = _.find(
			this.subviews(".posts"), function(subview){
				return subview.model === post;
			}
		);
		this.removeSubview(".posts", subview);
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
	
	expandPost: function(event){
		$(".expansionSlot").empty();
		var targetPost = event.currentTarget.getAttribute('data-id');
		var post = Teacup.Collections.posts.getOrFetch(targetPost);
		var postExpand = new Teacup.Views.singleExpand({
			model: post,
			postOwner: this.model
		});
		this.addSubview(".expansionSlot", postExpand);
	},
	
	openFollowingModal: function() {
		var view = new Teacup.Views.followingView({
			model: Teacup.Collections.users.getOrFetch(this.model.id),
			collection: this.userCollection
		});
		var title = Teacup.Collections.users.getOrFetch(this.model.id).get('username') + " follows"
		this.modal = new Backbone.BootstrapModal({
			content: view,
			title: title,
			animate: true
		}).open();
		
		$(this.modal.$el.children().children()[0]).css("backgroundColor", "#625AFF");
	},
	
	openFollowersModal: function() {
		var view = new Teacup.Views.followersView({
			model: Teacup.Collections.users.getOrFetch(this.model.id),
			collection: this.userCollection
		});
		var title = Teacup.Collections.users.getOrFetch(this.model.id).get('username') + " is followed by"
		this.modal = new Backbone.BootstrapModal({
			content: view,
			title: title,
			animate: true
		}).open();

		$(this.modal.$el.children().children()[0]).css("backgroundColor", "#625AFF");
	},
	
	
	
})