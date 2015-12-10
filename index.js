//set up
var express = require('express')
var app = express();
var bodyParser = require('body-parser')
var database = null;

//If a client asks for a file,
//look in the public folder. If it's there, give it to them.
app.use(express.static(__dirname + '/public'));

//this lets us read POST data
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//make an empty list of ideas
var coolIdeas = []; // array of the counter
var counter = 1000; // start of the counter
counter = counter + 1; // adds one to the counter variable
var idea = {};
idea.id = counter;
idea.text = "try wearing a hat on cold days";
idea.dt = new Date();
coolIdeas.push(idea);

//let a client GET the list of ideas
app.get('/ideas', function (req, res) {
  res.send(coolIdeas);
});

//let a client POST new ideas
app.post('/ideas', function (req, res) {
  console.log(req.body.idea);
  console.log(req.body.username);//write it on the command prompt so we can see
  //coolIdeas.push(req.body.idea); //save a new idea
  var idea = {};
  var dbPosts = database.collection('posts');
dbPosts.insert(idea);
  idea.text = req.body.idea;
  idea.dt = new Date();
  idea.username =  req.body.username;
  coolIdeas.push(idea);
  res.send("Thanks for your great idea!");
});

//listen for connections on port 3000
app.listen(process.env.PORT || 3000);
console.log("I am listening...");

var mongodb = require('mongodb');
var uri = 'mongodb://user:weak@ds054288.mongolab.com:54288/girlcode';

mongodb.MongoClient.connect(uri, function(err, newdb) {
  if(err) throw err;
  console.log("yay we connected to the database");
  database = newdb;
  var dbPosts = database.collection('posts');
  dbPosts.find(function (err, cursor) {
    cursor.each(function (err, item) {
      if (item != null) {
        coolIdeas.push(item);
      }
    });
  });
});
