Teacup.Views.postView = Backbone.CompositeView.extend({
	template: JST['posts/viewPost'],
	
	initialize: function(options){
		this.user = options.user;
		this.listenTo(this.user, "sync", this.render);
		this.listenTo(this.model.comments(), "add", this.addComment );
		this.listenTo(this.model.comments(), "remove", this.removeComment );
		
		this.model.comments().each(this.addComment.bind(this));
		
		var commentNewView = new Teacup.Views.newComment({
			collection: this.model.comments(),
			model: this.model
		});
		this.addSubview(".main-comments-form", commentNewView);
		this.buildMap();
	},
	
	
	render: function(){
		var that = this;
		var renderedContent = that.template({
			model: this.model
		});
		that.$el.html(renderedContent);
		that.attachSubviews();
		return that;
	},
	
	
	buildMap: function(){
		var postMap = new Teacup.Views.newMap({
			latitude: this.model.get('latitude'),
			longitude: this.model.get('longitude')
		});
		this.addSubview(".post-blowup-map", postMap);
	},
	
	addComment: function(comment) {
		var CommentsShow = new Teacup.Views.singleComment({ model: comment });
		this.addSubviewBefore(".comments-list", CommentsShow);
		this.render();
	},
	
	removeComment: function(comment){
		var subview = _.find(
			this.subviews(".comments-list"), function(subview){
				return subview.model === comment;
			}
		);
		this.removeSubview(".comments-list", subview);
	},
	
})