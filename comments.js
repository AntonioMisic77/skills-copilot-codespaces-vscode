// Create web server 
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var port = process.env.PORT || 8080;

// Setup connection to the database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comments');

// Create a schema for our data
var commentSchema = new mongoose.Schema({
  name: String,
  comment: String,
  date: { type: Date, default: Date.now }
});

// Create a model for the schema
var Comment = mongoose.model('Comment', commentSchema);

// Create a new comment
app.post('/comment', function(req, res){
  var new_comment = new Comment(req.body);
  new_comment.save(function(err, data){
    if(err)
      res.send(err);
    res.json(data);
  });
});

// Retrieve all comments 
app.get('/comment', function(req, res){
  Comment.find({}, function(err, data){
    if(err)
      res.send(err);
    res.json(data);
  });
});

// Retrieve a single comment
app.get('/comment/:id', function(req, res){
  Comment.findById(req.params.id, function(err, data){
    if(err)
      res.send(err);
    res.json(data);
  });
});

// Update a comment
app.put('/comment/:id', function(req, res){
  Comment.findByIdAndUpdate(req.params.id, req.body, function(err, data){
    if(err)
      res.send(err);
    res.json(data);
  });
});

// Delete a comment
app.delete('/comment/:id', function(req, res){
  Comment.findByIdAndRemove(req.params.id, function(err, data){
    if(err)
      res.send(err);
    res.json(data);
  });
});

// Start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);