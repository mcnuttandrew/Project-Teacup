Teacup.Views.singleExpand = Backbone.CompositeView.extend({
	template: JST['posts/expand'],
	className: "col-xs-3  bg-danger",

	initialize: function(){
		this.listenTo(this.model , "sync", this.render)
		this.listenTo(this.model.comments(), "add", this.addComment );
		this.listenTo(this.model.comments(), "remove", this.removeComment );
		this.model.comments().each(this.addComment.bind(this));
		var commentNewView = new Teacup.Views.newComment({
			collection: this.model.comments(),
			model: this.model
		});
		this.addSubview(".commment-form", commentNewView);
		if(this.model.get('latitude') && this.model.get('longitude')){
			this.buildMap(this.model.get('latitude'), this.model.get('longitude'));
		}
	},

	render: function(){
		var renderedContent = this.template({
			user: Teacup.Collections.users.getOrFetch(this.model.user_id),
			post: this.model
		});
		this.$el.html(renderedContent);
		this.attachSubviews();
		return this;
	},

	
	addComment: function(comment) {
		var CommentsShow = new Teacup.Views.singleComment({ model: comment });
		this.addSubview(".comments-list", CommentsShow);
	},
	
	removeComment: function(comment){
		var subview = _.find(
			this.subviews(".comments-list"), function(subview){
				return subview.model === comment;
			}
		);
		this.removeSubview(".comments-list", subview);
	},
	
	buildMap: function(latitude, longitude){
		// this.removeMap(latitude, longitude);
		$(".mapPost").empty();
		var newMapView = new Teacup.Views.newMap({latitude: latitude, longitude: longitude})
		this.addSubview(".mapPost", newMapView);
	},
})
