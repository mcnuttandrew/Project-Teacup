Teacup.Models.User = Backbone.Model.extend({
	urlRoot: function() {
		return "/api/users"
	},
	
	posts: function(){
		if(!this._posts) {
			this._posts = new Teacup.Collections.Posts([], { user: this });
		}
	  return this._posts;
	},
	
	parse: function(payload){
		if (payload.tweets) {
			this.posts().set( payload.tweets, {parse: true});
			delete payload.tweets;
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
	
	followingCount: function(){
		if(this.get('followed')){
			 return this.get('followed').length; 
		} else {
			return 0;
		}
	},
	
	followerCount: function(){
		if(this.get('followers')){
			 return this.get('followers').length; 
		} else {
			return 0;
		}
	}

	
})