// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery.serializejson
//= require jquery.geocomplete.js
//= require underscore
//= require backbone
//= require backbone.bootstrap-modal
//= require bootstrap
//= require teacup
//= require_tree ../templates
//= require_tree ./utils
//= require_tree ./models
//= require_tree ./collections
//= require_tree ./views
//= require_tree ./routers
//= require_tree .
//
// var reTrigger = Backbone.Events.trigger
//
// Backbone.Events.trigger = function(name) {
//   // TRIGGER LOGGER
//   // logging the class name and the name of the trigger event
//   var id = this.id || 'n/a'
//   console.log(this.triggerClassName + ' (' + id + "): " + name)
//
//   return reTrigger.apply(this, arguments)
// }
//
// _.extend(Backbone.Model.prototype, Backbone.Events)
// _.extend(Backbone.Collection.prototype, Backbone.Events)
// _.extend(Backbone.Router.prototype, Backbone.Events)
// _.extend(Backbone.View.prototype, Backbone.Events)
//
// Backbone.Model.prototype.triggerClassName = 'Model'
// Backbone.Router.prototype.triggerClassName = 'Router'
// Backbone.Collection.prototype.triggerClassName = 'Collection'
// Backbone.View.prototype.triggerClassName = 'View'
