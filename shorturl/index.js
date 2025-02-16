require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

let mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const dns = require('dns');
const options = {all:true,};

const urlSchema = new mongoose.Schema({
  url: { type: String, required: true },
  shorturl: {type: Number, required: true}
});

const Url = mongoose.model('Url', urlSchema);
let count = 0;
Url.find().exec(function (err, results) {
  count = results.length;
  console.log(count);
});

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', function(req, res) {
  console.log("testing");
  console.log(req.body.url);
  try {
    //check if it's a valid URL
    const fccUrl = new URL(req.body.url);

    //check to pass test4
    if (/^https*:\/\//i.test(req.body.url)){
      //check if URL can be resolved
      dns.lookup(fccUrl.hostname, options, function (err, addresses) {
        if (addresses) {
          //search database for shorturl
          Url.findOne({url: fccUrl.hostname}).exec(
            function (err, data){
              if (err) return console.log(err);
              if (data){
                console.log("found url");
                res.json({"original_url":req.body.url,"short_url":data.shorturl});
              }
              else {
                //if shorturl not available, create one and save to database
                console.log("create shorturl");
                var newurl = new Url({url: req.body.url, shorturl: ++count});
                newurl.save(function(err, data) {
                  if (err) return console.error(err);
                  res.json({"original_url":req.body.url,"short_url":data.shorturl});
                });
              }
            });
        }
        else {
          //URL cannot be resolved
          res.json({"error":"Invalid Hostname"});
        }
      })
    }
    else {
      res.json({ "error": 'Invalid URL' });
    }
  }
  catch {
    //invalid URL
    res.json({ "error": 'Invalid URL' });
  }
});

app.get('/api/shorturl/:num', function(req, res) {
  //search database for shorturl
  Url.findOne({shorturl: parseInt(req.params.num)}).exec(
    function (err, data){
      if (err) return console.log(err);          
      if (data){
        console.log(data.url);
        res.redirect(data.url); 
      }
      else {
        //if entry not available
        res.json({"error":"No short URL found for the given input"});
      }
    });  

});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
