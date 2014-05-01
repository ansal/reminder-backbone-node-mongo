// global backbone app
var app = app || {};

(function(){
  'use strict';

  // collection for reminder model

  var reminderCollection = Backbone.Collection.extend({
    model: app.Reminder,
    url: '/api/reminder'
  });

  app.ReminderCollection = new reminderCollection();

})();