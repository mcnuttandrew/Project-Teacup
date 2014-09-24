Teacup.Models.Post = Backbone.Model.extend({
	urlRoot: "/api/user_feed",
	
	user: function(){
	  if(!this._user) {
	       this._user = new Teacup.Collections.Users([], { post: this });
	     }
     return this._user;
	},

	parse: function(response){
	    if (response.user) {
	      this.user().set( response.user, {parse: true});
	      delete response.user;
	    }
	    return response;
	  },
})