Teacup.Views.searchUsers = Backbone.View.extend({
	template: JST['users/search'],
	
	initialize: function(options){
		this.users = [];
	},
	
	events: {
		"submit .userSearch": "submit",
		"keydown .userSearch": "keypresser"
	},
	
	render: function(){
		var that = this;
		var renderedContent = that.template({
			users: this.users,
			search: this.searchterm
		});
		that.$el.html(renderedContent);
		return that;
	},
	
	keypresser: function(event){
		var that = this
		var formData = $(event.currentTarget).serializeJSON();
		console.log(formData["query"]);
		$.ajax({
			url: 'api/users/search',
			type: 'GET',
			data: {query: formData["query"]},
			success: function(users){
				var userList = that.$el.find(".users-list");
				userList.empty();
				for(var i= 0; i < users.length; i++){
					var listAppend = "<li class='searchCell'><a href='#/users/" + users[i].id+ "'>"
					listAppend = listAppend + "<h3> " + users[i].username+ " </h3></a></li>"
					userList.append(listAppend);
				}
				
			}
		});
		
		
	},
	
	submit: function(event){
		event.preventDefault();
	}
	
})