Teacup.Views.singleExpand = Backbone.CompositeView.extend({
	template: JST['posts/expand'],
	className: "col-xs-3  expansion",

	events: {
		"click .expandpost": "mapModal",
	},

	initialize: function(){
		this.listenTo(this.model , "sync", this.render)
		this.listenTo(this.model , "sync", this.metaMap)
		this.listenTo(this.model.comments(), "add", this.addComment );
		this.listenTo(this.model.comments(), "remove", this.removeComment );
		this.model.comments().sort().each(this.addComment.bind(this));
		var commentNewView = new Teacup.Views.newComment({
			collection: this.model.comments().sort(),
			model: this.model
		});
		this.addSubview(".commment-form", commentNewView);
		
	},
	
	metaMap: function(){
		if(this.model.get('latitude') && this.model.get('longitude')){
			if(this.model.get('dream_latitude') && this.model.get('longitude')){
				this.buildMap(
					this.model.get('latitude'), 
					this.model.get('longitude'),
					this.model.get('dream_latitude'), 
					this.model.get('dream_longitude')
				);
			} else {
				this.buildMap(this.model.get('latitude'), this.model.get('longitude'));
			}

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
		this.addSubviewBefore(".comments-list", CommentsShow);
	},
	
	removeComment: function(comment){
		var subview = _.find(
			this.subviews(".comments-list"), function(subview){
				return subview.model === comment;
			}
		);
		this.removeSubview(".comments-list", subview);
	},
	
	buildMap: function(latitude, longitude, dreamLatitude, dreamLongitude){
		$(".mapPost").empty();
		var newMapView;
		if(dreamLatitude && dreamLongitude){
			newMapView = new Teacup.Views.newMap({
				latitude: latitude,
				longitude: longitude,
				dreamLatitude: dreamLatitude,
				dreamLongitude: dreamLongitude
			})
		} else {
			newMapView = new Teacup.Views.newMap({latitude: latitude, longitude: longitude})
		}
		this.addSubview(".mapPost", newMapView);
	},
	
	mapModal: function() {
		var user = Teacup.Collections.users.getOrFetch(this.model.user_id);
		var view = new Teacup.Views.postView({
			model: this.model,
			user: user
		});
		this.modal = new Backbone.BootstrapModal({
			content: view,
			title: this.model.get('content'),
			animate: true
		}).open();
		$(this.modal.$el.children().children()[0]).css("backgroundColor", "#625AFF");
	},
})
