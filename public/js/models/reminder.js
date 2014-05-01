// global backbone app
var app = app || {};

(function(){
  'use strict';

  // the reminder model

  app.Reminder = Backbone.Model.extend({
    defaults: {
      title: 'Untitled Reminder',
      date: new Date()
    }
  });


})();