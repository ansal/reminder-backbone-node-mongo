// global backbone app
var app = app || {};

(function(){
  'use strict';

  // individual reminder view
  app.ReminderView = Backbone.View.extend({
  
    tagName: 'li',

    template: _.template($('#reminderTemplate').html()),

    events: {
      'click .deleteButton': 'deleteReminder'
    },

    initialize: function() {
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    deleteReminder: function() {
      this.model.destroy();
    }

  });

})();