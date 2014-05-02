// global backbone app
var app = app || {};

(function(){
  'use strict';

  // individual reminder view
  app.ReminderView = Backbone.View.extend({
  
    tagName: 'li',

    template: _.template($('#reminderTemplate').html()),

    initialize: function() {

    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });

})();