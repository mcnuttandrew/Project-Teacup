Teacup.Collections.Users = Backbone.Collection.extend({
	initialize: function(id) {
		this.id = id;
	},
	
	url: function() {
		if(this.id){ 
			return "/api/users/" + this.id
		} else {
			return "/api/users"
		}
	},
	model: Teacup.Models.User,
	
	getOrFetch: function(id){
		var users = this;
		var user = this.get(id);
		if(!user){
			user = new Teacup.Models.User({id: id})
			user.fetch({
				success: function(){
					users.add(user);
				}
			})
		} else {
			user.fetch();
		}
		return user;
	}
})

Teacup.Collections.users = new Teacup.Collections.Users();