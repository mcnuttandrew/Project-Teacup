Teacup.Models.Comment = Backbone.Model.extend({
	urlRoot: function(){
		return "/api/posts/" + this.attributes.post_id + "/comments"
	},
	
})