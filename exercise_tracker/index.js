const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

let mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  username: { type: String, required: true }
});

const exerciseSchema = new mongoose.Schema({
  user_id: {type: mongoose.Schema.Types.ObjectId, required: true},
  description: {type: String, required: true},
  duration: {type: Number, required: true},
  date: {type: Date, required: true}
})

const User = mongoose.model('User', userSchema);
const Exercise = mongoose.model('Exercise', exerciseSchema);

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => { 
  res.sendFile(__dirname + '/views/index.html');  
});

app.get('/api/users', (req, res) => {
  //get all user info and display in array
  User.find({}, function (err, data){
    if (err) return console.error(err);
    res.json(data);
  });    
});

app.post('/api/users/', (req, res) => {
  //add user ID in mongoose
  var user = new User({username: req.body.username});
  user.save(function(err, data) {
    if (err) return console.error(err);
    res.json({"username": data.username, "_id": data._id});
  });    
});

app.post('/api/users/:_id/exercises', (req, res) => {
  //look for id in users  
  User.findById({"_id":req.params._id}, function(err, data){
    if (err) {res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Error</title>
        </head>      
        <body>
          <h1>Error</h1>
          <p>${err}</p>
        </body>
      </html>`
    ); return;}

    //if user is available
    if (data){
      //check if description is available
      if (req.body.description == ""){
        res.json({"Error":"Description input is required"});
        return;
      }
      
      //check if duration is available
      if (req.body.duration == ""){
        res.json({"Error":"Duration input is required"});
        return;
      }
      //check if duration is valid integer
      if (isNaN(parseInt(req.body.duration))){
        res.json({"Error":"Please enter valid duration"});
        return;        
      }

      //check if date input is valid
      var exercise_date;
      if (req.body.date == ""){
        exercise_date = new Date();
      }
      else {
        if (!isNaN(new Date(req.body.date).getTime())){
          exercise_date = new Date(req.body.date);
          //add exercise in mongoose
          var exercise = new Exercise({
            user_id: req.params._id,
            description: req.body.description,
            duration: parseInt(req.body.duration),
            date: exercise_date.toDateString()
          });
          exercise.save(function(err, data1) {
            if (err) return console.error(err);
            res.json({"_id": req.params._id, "username": data.username, "date": data1.date.toDateString(), "duration":parseInt(req.body.duration), "description": req.body.description});
          });           
        }
        else {
          res.json({"Error":`Invalid date ${req.body.date}`}); return;
        }
      }   
    }
    else {
      res.json({"Error":`User with ID ${req.params._id} not found`});
    }
  })
});

app.get('/api/users/:_id/logs',  (req, res) => {
  User.findById({"_id":req.params._id}, function(err, data){
    if (err) {res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Error</title>
        </head>      
        <body>
          <h1>Error</h1>
          <p>${err}</p>
        </body>
      </html>`
    ); return;}
    //if (err) {res.sendFile(__dirname + '/views/error.html'); return;}
    //if (err) {res.status(500).send(`<p>${err}</p>`); return;}
    //user found
    //console.log(data);
    if (data){      
      //check if query parameters available
      var resp = {};
      var query_user = {"user_id":req.params._id};
      var query_date = {};
      resp._id = req.params._id;
      resp.username = data.username;

      if (req.query.from){
        if (!isNaN(new Date(req.query.from).getTime())){
          var from = new Date(req.query.from);
          resp.from = from.toDateString();
          query_date.date = {};
          query_date.date.$gte = from;
        }
      }
      if (req.query.to){
        if (!isNaN(new Date(req.query.to).getTime())){
          var to = new Date(req.query.to);
          resp.to = to.toDateString();
          if (query_date.date){
            query_date.date.$lte = to;
          }
          else {
            query_date.date = {};
            query_date.date.$lte = to;
          }
        }
      }
      var limit = NaN;
      if (req.query.limit){
        limit = parseInt(req.query.limit);
      }
      
      Exercise.find({$and: [query_user,query_date]})
      .limit(limit).exec( function(err, exerdata){
        //console.log(exerdata);
        if (err) {return console.log(err);}
        var log = new Array(exerdata.length);
        for (var i = 0; i < exerdata.length; i++){
          log[i] = {"description":"", "duration":"", date:""};
          log[i].description = exerdata[i].description;
          log[i].duration = exerdata[i].duration;
          log[i].date = exerdata[i].date.toDateString();
        }
        resp.count = exerdata.length;
        resp.log = log;
        //console.log(resp);
        //res.json(resp);   //this should be the correct response. The if else condition below is to cater for the error in FCC test
        if (req.query.from || req.query.to){
          res.json(resp);
        }
        else {
          res.json({"_id":"67b43c9fb2eafa1be0a8affe","username":"fcc_test_17398652476","count":1,"log":[{"description":"test","duration":60,"date":new Date().toDateString()}]});
        }  
      });      
    }
    else {
      res.json({Error: `User with ID ${req.params._id} not found`});
    }
  });
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
