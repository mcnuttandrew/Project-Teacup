Teacup.Collections.MasterPosts = Backbone.Collection.extend({
	model: Teacup.Models.Post,
	url: "/api/main_feed",
	
	initialize: function(models, options){
		if(options){this.user = options.user}
	},
	
	getOrFetch: function(id){
		var posts = this;
		var post = this.get(id);
		if(!post){
			post = new Teacup.Models.Post({ id: id })
			post.fetch({
				success: function(){
					posts.add(post);
				}
			});
		} else {
			post.fetch();
		}
		return post;
	}
})

Teacup.Collections.masterPosts = new Teacup.Collections.MasterPosts();