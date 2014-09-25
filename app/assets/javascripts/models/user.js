Teacup.Models.User = Backbone.Model.extend({
	urlRoot: function() {
		return "/api/users"
	},
	
	posts: function(){
		this._posts = this._posts || new Teacup.Collections.Posts([], {posts: this})
		return this._posts;
	},
	
	parse: function(payload){
		if (payload.posts) {
			this.posts().set( payload.posts, {parse: true});
			delete payload.posts;
		}
		return payload;
  },
	
	follows: function(user){
		var mark = false;
		if(this.attributes.followed){
			this.attributes.followed.forEach(function(use){
				if(use.id === user.id){ mark = true }
			})
		}
		return mark;
	},
	
})