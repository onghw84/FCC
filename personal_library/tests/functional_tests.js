/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {

    this.timeout(5000);
    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        //done();
        const title = 'test book1';
        chai
          .request(server)
          .keepOpen()
          .post('/api/books')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({title: title})
          .end(function (err, res) {                      
            assert.equal(res.status, 200);            
            const data = JSON.parse(res.text);
            assert.isDefined(data._id);
            assert.equal(data.title,title);
            done();
          });
      });
      
      test('Test POST /api/books with no title given', function(done) {
        //done();
        chai
          .request(server)
          .keepOpen()
          .post('/api/books')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({})
          .end(function (err, res) {                      
            assert.equal(res.status, 200);
            assert.equal(res.text,"missing required field title");
            done();
          });
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        const title = 'test book2';
        chai
          .request(server)
          .keepOpen()
          .post('/api/books')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({title: title})
          .end(function (err, res) {
            chai
            .request(server)
            .keepOpen()
            .get('/api/books')
            .end(function (err, res) {                      
              assert.equal(res.status, 200);            
              const data = JSON.parse(res.text);
              const len = data.length;
              assert.isAbove(len, 0);
              assert.isDefined(data[len-1]._id);
              assert.equal(data[len-1].title,title);
              assert.isArray(data[len-1].comments);
              assert.equal(data[len-1].commentcount,0);
            });            
            done();
          });        
      });            
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        const id = "77bfd896bb60b3006b2ff48b";
        chai.request(server)
        .get(`/api/books/${id}`)
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, 'no book exists');
          done();
        });
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        const title = 'test book3';
        chai
          .request(server)
          .keepOpen()
          .post('/api/books')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({title: title})
          .end(function (err, res) {
            const id = JSON.parse(res.text)._id;
            chai
            .request(server)
            .keepOpen()
            .get(`/api/books/${id}`)
            .end(function (err, res) {                      
              assert.equal(res.status, 200);            
              const data = JSON.parse(res.text);
              assert.equal(data._id, id);
              assert.equal(data.title,title);
              assert.isArray(data.comments);
              assert.equal(data.commentcount,0);
              done();
            });     
          });                         
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        const title = 'test book4';
        const comment = 'book4: test comment';
        chai
          .request(server)
          .keepOpen()
          .post('/api/books')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({title: title})
          .end(function (err, res) {
            const id = JSON.parse(res.text)._id;
            chai
              .request(server)
              .keepOpen()
              .post(`/api/books/${id}`)
              .set('content-type', 'application/x-www-form-urlencoded')
              .send({comment: comment})
              .end(function (err, res) {                  
                assert.equal(res.status, 200);            
                const data = JSON.parse(res.text);
                assert.equal(data._id, id);
                assert.equal(data.title,title);
                assert.isArray(data.comments);
                assert.equal(data.comments[0], comment);
                assert.equal(data.commentcount,1);
                done();   
            });
          });       
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        const title = 'test book5';
        chai
          .request(server)
          .keepOpen()
          .post('/api/books')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({title: title})
          .end(function (err, res) {
            const id = JSON.parse(res.text)._id;
            chai
              .request(server)
              .keepOpen()
              .post(`/api/books/${id}`)
              .set('content-type', 'application/x-www-form-urlencoded')
              .send({})
              .end(function (err, res) {                  
                assert.equal(res.status, 200);            
                assert.equal(res.text, "missing required field comment");
                done();   
            });
          }); 
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        const id = "77bfd896bb60b3006b2ff48b";
        chai
          .request(server)
          .keepOpen()
          .post(`/api/books/${id}`)
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({comment: "testcomment"})
          .end(function (err, res) {                  
            assert.equal(res.status, 200);            
            assert.equal(res.text, "no book exists");
            done();   
        });
      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        const title = 'test book6';
        chai
          .request(server)
          .keepOpen()
          .post('/api/books')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({title: title})
          .end(function (err, res) {
            const id = JSON.parse(res.text)._id;
            chai
              .request(server)
              .keepOpen()
              .delete('/api/books/'+id)
              .end(function (err, res) {                  
                assert.equal(res.status, 200);            
                assert.equal(res.text, "delete successful");
                done();   
            });
          }); 
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        const id = "77bfd896bb60b3006b2ff48b";
        chai
          .request(server)
          .keepOpen()
          .delete('/api/books/'+id)
          .end(function (err, res) {                  
            assert.equal(res.status, 200);
            console.log(res.text);
            assert.equal(res.text, "no book exists");
            done();   
        });
      });

    });

  });

});
