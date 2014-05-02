// global backbone app
var app = app || {};

(function(){
  'use strict';

  // individual reminder view
  app.ReminderView = Backbone.View.extend({
  
    tagName: 'li',

    template: _.template($('#reminderTemplate').html()),

    events: {
      'click .deleteButton': 'deleteReminder',
      'click .editButton': 'showEditor',
      'click .updateButton': 'updateReminder',
    },

    initialize: function() {
      // cache dom elements

      // model events
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    showEditor: function() {
      this.$el.find('div').toggle();
    },

    updateReminder: function() {
      var title = this.$el.find('.editedTitle').val();
      var date = this.$el.find('.editedDate').val();
      if(!title || !date) {
        alert('Please enter all fields');
        return;
      }
      this.model.set('title', title);
      this.model.set('date', date);
      this.model.save();
      this.$el.find('div').toggle();
    },

    deleteReminder: function() {
      this.model.destroy();
    }

  });

})();