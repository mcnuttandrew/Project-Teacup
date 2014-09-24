Teacup.Collections.Posts = Backbone.Collection.extend({
	model: Teacup.Models.Post,
	url: "/api/user_feed",
	
	getOrFetch: function(id){
		var posts = this;
		var post = this.get(id);
		if(!post){
			post = new Teacup.Models.Post({id: id})
			post.fetch({
				success: function(){
					this.add(post);
				}
			});
		} else {
			post.fetch();
		}
		return post;
	}
})

Teacup.Collections.posts = new Teacup.Collections.Posts();