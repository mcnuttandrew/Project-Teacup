window.Teacup = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
		new Teacup.Routers.Router($("#main"));
		Backbone.history.start();
  }
};