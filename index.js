//set up
var express = require('express')
var app = express();
var bodyParser = require('body-parser')

//If a client asks for a file,
//look in the public folder. If it's there, give it to them.
app.use(express.static(__dirname + '/public'));

//this lets us read POST data
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//make an empty list of ideas
var coolIdeas = [];
var counter = 1000;
var idea = {};
idea.text = "try wearing a hat on cold days";
idea.dt = new Date();
coolIdeas.push(idea);

//let a client GET the list of ideas
app.get('/ideas', function (req, res) {
  res.send(coolIdeas);
});

//
app.get('/idea', function (req, res) {
   var searchId = req.query.id;
   var searchedIdea = "";
   console.log("Searching for post " + searchId);
   for (i = 1000; i == counter; i ++){
     if (i == searchId) {
       searchedIdea = "tomato";
     }
   }
   res.send(searchedIdea);
});

//let a client POST new ideas
app.post('/ideas', function (req, res) {
  console.log(req.body.idea); //write it on the command prompt so we can see
  //coolIdeas.push(req.body.idea); //save a new idea
  var idea = {};
  idea.text = req.body.idea;
  idea.image = req.body.image;
  idea.dt = new Date
  idea.id = counter;
  counter = counter + 1;
  coolIdeas.push(idea);
  res.send("Thanks for your great idea!");
});

//listen for connections on port 3000
app.listen(process.env.PORT || 3000);
console.log("I am listening...");
