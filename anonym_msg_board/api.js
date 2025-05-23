'use strict';
let mongoose = require('mongoose');
console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const ReplySchema = new mongoose.Schema({
    text: {type: String, required: true},
    delete_password: {type: String, required: true},
    created_on: {type: Date, required: true},
    reported: {type: Boolean, default: false}
});
const Reply = mongoose.model('Reply', ReplySchema);

const ThreadSchema = new mongoose.Schema({
    board: {type: String, required: true},
    text: {type: String, required: true},
    delete_password: {type: String, required: true},
    reported: {type: Boolean, default: false},
    created_on: {type: Date, required: true},
    bumped_on: {type: Date},
    replies: [ReplySchema],
});
const Thread = mongoose.model('Thread', ThreadSchema);

Thread.deleteMany({}, function(err,data){if (err) return console.error(err);});
Reply.deleteMany({}, function(err,data){if (err) return console.error(err);});
/*
const create_date = new Date();
var newThread = new Thread({board: "test", text:"testtext", created_on: create_date, bumped_on: create_date,
  reported: false, delete_password: "test123"});
newThread.save(function(err, data) {
  if (err) return console.error(err);
  console.log(data);
  const newReply = new Reply({text: "testreply", delete_password: "test123"});
  Thread.findById(data._id, function(err, data){    
    if (err) return console.error(err);
    if (data){      
        newReply.save(function(err, data) {
          if (err) return console.error(err);
        });    
        data.bumped_on = new Date();
        data.replies.push(newReply);
        data.save(function(err, data) {
          if (err) return console.error(err);
        });       
    }
  })  
});*/

module.exports = function (app) {
  
  app.route('/api/threads/:board')
  .post((req, res) => {
    //console.log(req.params.board);
    var {board, text, delete_password} = req.body;
    if (!board){
      board = req.params.board;
    }
    const create_date = new Date();
    const newThread = new Thread({text: text, delete_password: delete_password, board: board,
      created_on: create_date, bumped_on: create_date});
    newThread.save(function(err, data) {
      if (err) return console.error(err);
      else{
        //res.json(newThread);
        res.redirect(`/b/${board}/`);
      }
    });
  })
  .get((req, res) => {
    const board = req.params.board;
    //an array of the most recent 10 bumped threads on the board with only the most recent 3 replies for each
    Thread.find({board: board}).sort({bumped_on: -1}).limit(10).exec( (err, data) => {
      if (!data) {
        res.json({error: "No thread with this board name"});
      } 
      else {
        const threads = data.map((thread) => {
          const replies = thread.replies.map((reply) => {
            const {_id, text, created_on} = reply;
            return {_id, text, created_on};
          });
          return {_id: thread._id, text: thread.text, created_on: thread.created_on, bumped_on: thread.bumped_on, replies: replies.slice(-3), replycount: thread.replies.length,};
        });
        //console.log(threads);
        res.json(threads);
      }
    })
  })
  .put((req, res, next) => {
    var {board, thread_id} = req.body;
    if (!board){
      board = req.params.board;
    }
    Thread.findOne({board: board, _id: thread_id}, (err, data) => {
      if (!data) {
        res.send("No thread with this board name and _id");
      } 
      else {
        data.reported = true;
        data.save((err, data) => {
          if (err) return console.error(err);
          res.send("Reported");
        });
      }
    });
  })
  .delete((req, res) => {
    var {board, thread_id, delete_password} = req.body;
    if (!board){
      board = req.params.board;
    }
    Thread.findOne({board: board, _id: thread_id}, (err, data) => {
      if (!data) {
        res.send("No thread with this board name and _id");
      } 
      else {        
        if (data.delete_password === delete_password) {
          Thread.findOneAndDelete({board: board, _id: thread_id}, (err, data) => {
            if (err) return console.error(err);
            res.send("success");
          });
        } 
        else {
          res.send("incorrect password");
          return;
        }
      }
    });
  });
    
  app.route('/api/replies/:board')  .post((req, res) => {
    var {board, thread_id, text, delete_password} = req.body;
    if (!board){
      board = req.params.board;
    }
    const create_date = new Date();
    const newReply = new Reply({text: text, delete_password: delete_password, created_on: create_date});
    Thread.findOne({board: board, _id: thread_id}, (err, data) => {
      data.bumped_on = new Date();
      data.replies.push(newReply);
      data.save(function(err, data) {
        if (err) return console.error(err);
      });
      res.redirect(`/b/${board}/${thread_id}/`);
    });        
  })
  .get((req, res) => {
    const board = req.params.board;
    const thread_id = req.query.thread_id;
    Thread.findOne({board: board, _id:thread_id}, (err, data) => {
      if (!data) {
        res.json({error: "No thread with this board name and _id"});
      } 
      else {
        const replies = data.replies.map((reply) => {
          const {_id, text, created_on} = reply;
          return {_id, text, created_on};
        });
        res.json({_id:thread_id, text:data.text, created_on: data.created_on, bumped_on: data.bumped_on, replies: replies});
      }
    })
  })
  .put((req, res, next) => {
    var {board, thread_id, reply_id} = req.body;
    if (!board){
      board = req.params.board;
    }
    Thread.findOne({board: board, _id: thread_id}, (err, data) => {
      if (!data) {
        res.send("No reply with this board name and thread_id");
      } 
      else {
        let reply = data.replies.id(reply_id);
        if (reply){
          data.replies.id(reply_id).reported = true;
          data.save((err, data) => {
            if (err) return console.error(err);
            res.send("Reported");
          });
        }
        else {
          res.send("No reply with this board name and reply_id");
        }
      }
    });
  })
  .delete((req, res) => {
    var {board, thread_id, reply_id, delete_password} = req.body;
    if (!board){
      board = req.params.board;
    }   
    Thread.findOne({board: board, _id: thread_id}, (err, data) => {
      if (!data) {
        res.send("No reply with this board name and thread_id");
      }
      else {
        let reply = data.replies.id(reply_id);
        if (reply){
          if (reply.delete_password === delete_password) {
            data.replies.id(reply_id).text = "[deleted]";
            data.save((err, data) => {
              if (err) return console.error(err);
              res.send("success");
            });
          } 
          else {
            res.send("incorrect password");
            return;
          }
        }
        else {
          res.send("No reply with this board name and reply_id");
        }
      }
    });
  });

};
