// globalbackbone app

var app = app || {};

$(function(){

  // set focus to input element
  $('#title').focus();
  // start things by starting the main view
  new app.MainView();
  // fetch the collection
  app.ReminderCollection.fetch({
    reset: true
  });
});