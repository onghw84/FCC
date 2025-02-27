/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

let mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const bookSchema = new mongoose.Schema({
  title: {type: String, required: true},
  comments: {type: [String]}
})

const Book = mongoose.model('Book', bookSchema);
//clean up database
/*
Book.remove({}, function (err, data){
  if (err) return console.log(err);
  console.log("clean up database");
})*/

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      Book.find({} , function(err, data) {
        if (err) return console.error(err);
        let data1 = JSON.parse(JSON.stringify(data));
        for (var i = 0; i < data1.length; i++){
          data1[i].commentcount = data1[i].comments.length;      
        }
        res.json(data1);
      }); 
    })
    
    .post(function (req, res){
      if (!req.body.title){
        res.send("missing required field title"); return;
      }
      var book = new Book({title: req.body.title});
      book.save(function(err, data) {
        if (err) return console.error(err);
        let data1 = JSON.parse(JSON.stringify(data));
        delete data1.__v;
        delete data1.comments;
        res.json(data1);
      });
    })
    
    .delete(function(req, res){
      Book.remove({} , function(err, data) {
        if (err) {res.send("fail to delete"); return console.error(err)};
        res.send("complete delete successful");   
      });      
    });


  app.route('/api/books/:id')
    .get(function (req, res){
      if (!req.params.id){
        res.send("no book exists"); return;
      }
      Book.findById({_id: req.params.id} , function(err, data) {
        if (err) {res.send("no book exists"); return console.error(err)};
        if (data){
          let data1 = JSON.parse(JSON.stringify(data));
          //delete data1.__v;
          data1.commentcount = data1.comments.length;
          res.json(data1);
        }
        else {
          res.send("no book exists"); return;
        }
      });
    })
    
    .post(function(req, res){
      if (!req.body.comment){
        res.send("missing required field comment"); return;
      }  
      if (!req.params.id){
        res.send("no book exists"); return;
      }
      Book.findById({_id: req.params.id} , function(err, data) {
        if (err) {res.send("no book exists"); return console.error(err)};
        if (data){
          data.comments.push(req.body.comment);
          data.save(function(err, data1) {
            if (err) return console.error(err);
            let data2 = JSON.parse(JSON.stringify(data1));
            //delete data1.__v;
            data2.commentcount = data2.comments.length;
            res.json(data2);
          });   
        }
        else {
          res.send("no book exists"); return;
        }
      }); 
    })
    
    .delete(function(req, res){
      if (!req.params.id){
        res.send("no book exists"); return;
      }
      Book.findByIdAndRemove({_id: req.params.id} , function(err, data) {
        if (err) {res.send("no book exists"); return console.error(err)};
        if (data){
          res.send("delete successful");   
        }
        else {
          res.send("no book exists"); return;
        }
      });
    });  
};
