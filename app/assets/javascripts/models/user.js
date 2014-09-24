Teacup.Models.User = Backbone.Model.extend({
	urlRoot: function() {
		return "/api/users"//"/" + this.id
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
		//this might have gotten fucked up
})