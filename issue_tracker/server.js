'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const expect      = require('chai').expect;
const cors        = require('cors');
require('dotenv').config();

const apiRoutes         = require('./routes/api.js');
const fccTestingRoutes  = require('./routes/fcctesting.js');
const runner            = require('./test-runner');

let app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({origin: '*'})); //For FCC testing purposes only

let mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const issueSchema = new mongoose.Schema({
  issue_title: {type: String},
  issue_text: {type: String},
  created_on: {type: Date, required: true},
  updated_on: {type: Date, required: true},
  created_by: {type: String},
  assigned_to: {type: String},
  open: {type: Boolean, required: true},
  status_text: {type: String},
  project: {type: String, required: true}
})

const Issue = mongoose.model('Issue', issueSchema);

//clean up database
Issue.remove({project: "test_project"}, function (err, data){
  if (err) return console.log(err);
  console.log("clean up database");
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Sample front-end
app.route('/:project/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/issue.html');
  });

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/api/issues/:project', (req, res) => {
  //get all user info and display in array
  var querystr = {}
  querystr.project = req.params.project;
  if (req.query.open){
    querystr.open = req.query.open;
  }
  if (req.query._id){
    querystr._id = req.query._id;
  }
  if (req.query.assigned_to){
    querystr.assigned_to = req.query.assigned_to;
  }  
  if (req.query.created_by){
    querystr.created_by = req.query.created_by;
  }
  if (req.query.issue_title){
    querystr.issue_title = req.query.issue_title;
  }      
  if (req.query.issue_text){
    querystr.issue_text = req.query.issue_text;
  }  
  if (req.query.status_text){
    querystr.status_text = req.query.status_text;
  }  
  if (req.query.status_text){
    querystr.created_on = req.query.created_on;
  }  
  if (req.query.updated_on){
    querystr.updated_on = req.query.updated_on;
  }    

  Issue.find(querystr, function (err, data){
    if (err) return console.error(err);
    res.json(data);
  });    
});

app.post('/api/issues/:project', function(req,res){
  //check if title is available
  if (req.body.issue_title == ""){
    res.json({"Error":"required field(s) missing"});
    return;
  }
  
  //check if text is available
  if (req.body.issue_text == ""){
    res.json({"Error":"required field(s) missing"});
    return;
  }

  //check if created by is valid integer
  if (req.body.created_by == ""){
    res.json({"Error":"required field(s) missing"});
    return;        
  }

  const create_date = new Date();
  var issue = new Issue({
    issue_title: req.body.issue_title,
    issue_text: req.body.issue_text,
    created_on: create_date,
    updated_on: create_date,
    created_by: req.body.created_by,
    assigned_to: req.body.assigned_to,
    open: true,
    status_text: req.body.status_text,
    project: req.params.project
  });
  issue.save(function(err, data) {
    if (err) return console.error(err);
    res.json(data);
  });    
})

app.put('/api/issues/:project_name', function(req,res){    
  Issue.findById({"_id":req.body._id}, function(err, data){
    if (err) {res.json({"error":"could not update","_id":req.body._id}); return;}
    if (data){
      if (!(req.body.issue_title || req.body.issue_text || req.body.created_by ||
        req.body.assigned_to || req.body.status_text || req.body.hasOwnProperty('open'))){
          res.json({error: 'no update field(s) sent', "_id":req.body._id});
      }
      else {
        data.issue_title = req.body.issue_title;
        data.issue_text = req.body.issue_text;
        data.created_by = req.body.created_by;
        data.assigned_to = req.body.assigned_to;
        data.status_text = req.body.status_text;
        data.updated_on = new Date();
        data.open = !(req.body.hasOwnProperty('open'));
        data.save(function(err, data) {
          if (err) return console.error(err);
          res.json({"result":"successfully updated","_id":req.body._id});
        });       
      }
    }
    else {
      res.json({"error":"could not update","_id":req.body._id}); return;
    }
  })
})

app.delete('/api/issues/:project_name', function(req,res){
  //find id and remove
  Issue.findByIdAndRemove({"_id":req.body._id}, function(err, data){
    if (err) {res.json({"error":"could not delete","_id":req.body._id}); return;}
    //if available
    if (data){
        res.json({"result":"successfully deleted","_id":req.body._id});
    }
    else {
      res.json({"error":"could not delete","_id":req.body._id}); return;
    }
  })
})
  

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API 
apiRoutes(app);  

//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

//Start our server and tests!
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
  if(process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch(e) {
        console.log('Tests are not valid:');
        console.error(e);
      }
    }, 3500);
  }
});

module.exports = app; //for testing
