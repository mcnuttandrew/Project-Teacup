Teacup.Views.newPost = Backbone.View.extend({
	template: JST["posts/new"],
	
	initialize: function(){
		this.listenTo(this.model, "change", this.render);
	},
	
	events: {
		"submit form.post-submit": "submit",
		"click .following-btn": "followingRedirect",
		"click .followers-btn": "followersRedirect"
	},
	
	render: function(){
		var followerCount = 0;
		var followingCount = 0;
		//move to user model
		if(this.model.get('followed')){
			 var followingCount = this.model.get('followed').length; 
		} 
		if(this.model.get('followers')){
			 var followerCount = this.model.get('followers').length; 
		} 
		var renderedContent = this.template({
			user: this.model,
			followerCount: followerCount,
			followingCount: followingCount
		});
		this.$el.html(renderedContent);
		// debugger;
		return this;
	},
	
	submit: function(event){
		event.preventDefault();
		var formData = $(event.currentTarget).serializeJSON();
		var that = this;
		var newPost = new Teacup.Models.Post();
		newPost.set(formData);
		newPost.save({}, {
			success: function(){
				that.collection.add(newPost);
			},
			error: function(response){
				$(".errors").append(response.responseJSON);
			}
		});
		
	},
	//move to links
	followingRedirect: function(){
		Backbone.history.navigate("/following", {trigger: true})
	},
	
	followersRedirect: function(){
		Backbone.history.navigate("/followers", {trigger: true})
	},
	
})