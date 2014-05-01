var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reminderSchema = new Schema({
  title: String,
  date: Date
});

module.exports.Reminder = mongoose.model('Reminder', reminderSchema);