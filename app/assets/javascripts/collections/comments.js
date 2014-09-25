Teacup.Collections.Comments = Backbone.Collection.extend({
	model: Teacup.Models.Comment,
	url: function () {
		return "/api/comments/" + this.id;
	},
	
	getOrFetch: function(id){
		var comments = this;
		var comment = this.get(id);
		if(!comment){
			comment = new Teacup.Models.Comment({id: id})
			comment.fetch({
				success: function(){
					this.add(comment);
				}
			});
		} else {
			comment.fetch();
		}
		return comment;
	}
})

Teacup.Collections.comments = new Teacup.Collections.Comments();