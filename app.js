
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

var apis = require('./routes/api');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Connect to mongodb database reminders
mongoose.connect('mongodb://localhost/reminders');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error:'));
db.once('open', function callback () {
  console.log('connected to mongodb - mongodb://localhost/foodatjaaga');
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// API URLS
app.get('/api/reminder', apis.ReminderAll);
app.post('/api/reminder', apis.CreateReminder);
app.put('/api/reminder', apis.UpdateReminder);
app.delete('/api/reminder', apis.DeleteReminder);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
