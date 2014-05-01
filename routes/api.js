// APIs for backbone app in front end to consume.

var Reminder = require('../models/reminder').Reminder;

// list of errors
var validationError = { error : 'validation error' };
var notFoundError = { error : 'object not found' };

// lists out all reminders in database
exports.ReminderAll = function(req, res) {
  Reminder.find({}, function(err, reminders){
    if(err) throw err;
    res.json(reminders);
  });
};

// lists a particular reminder
exports.ReminderOne = function(req, res) {
  res.send(req.param.id);
}

// creates a new reminder
// title and reminder are required
exports.CreateReminder = function(req, res) {
  var title = req.body.title;
  var date = req.body.date;
  if(typeof title === 'undefined' || typeof date === 'undefined') {
    res.json(validationError);
    return;
  }
  var reminder = new Reminder({
    title : title,
    date: new Date(date)
  });
  reminder.save(function(err, obj){
    if(err) throw err;
    res.json(obj);
  });
};

// updates a reminder
exports.UpdateReminder = function(req, res) {
  var id = req.body.id;
  var title = req.body.title;
  var date = req.body.date;
  if(typeof id === 'undefined'
    || typeof title === 'undefined'
    || typeof date === 'undefined') {
    res.json(validationError);
    return;
  }
  Reminder.findOne({_id: id}, function(err, reminder){
    if(err) throw err;
    if(!reminder) {
      res.json(notFoundError);
      return;
    }
    reminder.title = title;
    reminder.date = new Date(date);
    reminder.save(function(err, obj){
      if(err) throw err;
      res.json(obj);
    });
  });
};

// deletes a reminder
exports.DeleteReminder = function(req, res) {
  var id = req.body.id;
  if(typeof id === 'undefined') {
    res.json(validationError);
    return;
  }
  Reminder.findOne({_id: id})
  .remove()
  .exec(function(err){
    if(err) throw err;
    res.json({
      success: 'object deleted'
    });
  });
};