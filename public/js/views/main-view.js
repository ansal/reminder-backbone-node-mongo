// global backbone app
var app = app || {};

(function(){
  'use strict';

  // main view
  app.MainView = Backbone.View.extend({
    el: '#app',

    events: {
      'click #createReminderButton' : 'createReminder'
    },

    initialize: function() {
      // cache dom elements
      this.$title = $('#title');
      this.$date = $('#date');
      this.$reminders = $('#reminders');

      // listen to collection events
      this.listenTo(app.ReminderCollection, 'add', this.addOne);
      this.listenTo(app.ReminderCollection, 'reset', this.addAll);
    },

    createReminder: function(e) {
      var title = this.$title.val();
      var date = this.$date.val();
      if (!title || !date) {
        alert('Please fill all fields');
        return;
      }
      app.ReminderCollection.create({
        title: title,
        date: date
      });
    },

    addOne: function(reminder) {
      var view = new app.ReminderView({ model: reminder });
      this.$reminders.append(view.render().el);
    },

    addAll: function () {
      this.$reminders.html('');
      app.ReminderCollection.each(this.addOne, this);
    },

  });


})();
