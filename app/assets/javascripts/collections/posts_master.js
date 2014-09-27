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
	},
	
	swapItems : function(index1, index2) {
		this.models[index1] = this.models.splice(index2, 1, this.models[index1])[0];
	}
			
})

Teacup.Collections.masterPosts = new Teacup.Collections.MasterPosts();