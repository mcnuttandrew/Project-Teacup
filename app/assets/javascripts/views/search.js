Teacup.Views.searchUsers = Backbone.View.extend({
	template: JST['users/search'],
	
	initialize: function(options){
		this.users = [];
	},
	
	events: {
		"submit .userSearch": "submit"
	},
	
	render: function(){
		var that = this;
		var renderedContent = that.template({
			users: this.users
		});
		that.$el.html(renderedContent);
		return that;
	},
	
	submit: function(event){
		event.preventDefault();
		var formData = $(event.currentTarget).serializeJSON();
		var that = this;
		$.ajax({
			url: ('api/users/search'),
			type: 'GET',
			data: {query: formData["query"]},
			success: function(users){
				that.users = users;
				that.render()
			}
		});
	}
	
})