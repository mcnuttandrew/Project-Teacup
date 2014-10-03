Teacup.Views.picSelectorView = Backbone.CompositeView.extend({
	template: JST["users/picSelector"],
	
	events: {
		"submit .user-pic-submit": "upload"
	},
	
	render: function(){
		var renderedContent = this.template({
			user: this.model
		});
		this.$el.html(renderedContent);
		return this;
	},
	
	upload: function () {
		var that = this;
	  filepicker.pick(function(blob) {
	    var newImage = new Teacup.Models.Image({
				// that.model.set({filepicker_url: blob.url})
				
	      filepicker_url: blob.url
	    });
	    newImage.save({}, {
	      success: function () {
	        alert('Image saved!');
	      }
	    })
	  });
	}
	
})