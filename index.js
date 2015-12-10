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
var coolIdeas = []; // array of the counter

var idea = {};

// idea.id = counter;
idea.text = "A HAT WILL NO LONGER ASSIST YOU";
idea.dt = new Date();
idea.likes = 0;
coolIdeas.push(idea);

//let a client GET the list of ideas
app.get('/ideas', function (req, res) {
  res.send(coolIdeas);
});

app.get('/idea', function (req, res) {
   var searchId = req.query.id;
   console.log("Searching for post " + searchId);
   coolIdeas.forEach(function (idea) {
       if (idea.id == searchId) {
           res.send(idea);
       }
   });
});

var counter = 999; // start of the counter

//let a client POST new ideas
app.post('/ideas', function (req, res) {
  console.log(req.body.idea);
  console.log(req.body.username);//write it on the command prompt so we can see
  //coolIdeas.push(req.body.idea); //save a new idea
  var idea = {};

  counter = counter + 1; // adds one to the counter variable
  idea.id = counter;

  idea.text = req.body.idea;
  idea.dt = new Date();
  idea.likes = 0;
  idea.username =  req.body.username;
  coolIdeas.push(idea);
  res.send("Thanks for your great idea!");
});

app.post("/liked", function (req, res) {
  coolIdeas.forEach(function (idea) {
      if (idea.id == req.body.postId) {
        idea.likes=idea.likes+1
      }
  });
  console.log(req.body.postId);
  console.log(idea)
   //code goes here
   res.send("thanks");
});



//listen for connections on port 3000
app.listen(process.env.PORT || 3000);
console.log("I am listening...");
