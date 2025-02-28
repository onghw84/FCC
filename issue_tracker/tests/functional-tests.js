const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    this.timeout(5000);
    suite('Integration tests with chai-http', function () {

      // #1: Create an issue with every field: POST request to /api/issues/{project}
      test('Create an issue with every field', function (done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/issues/test_project')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({issue_title: 'title1', 
            issue_text: 'issuetext1',
            created_by: "creator1",
            assigned_to: "assignedto1",
            status_text: "statustext1"})
          .end(function (err, res) {          
            assert.equal(res.status, 200);            
            const data = JSON.parse(res.text);
            assert.isDefined(data._id);
            assert.isDefined(data.created_on);
            assert.equal(data.issue_title, 'title1');
            assert.equal(data.issue_text, 'issuetext1');
            assert.equal(data.created_on, data.updated_on);
            assert.equal(data.created_by, 'creator1');
            assert.equal(data.assigned_to, 'assignedto1');
            assert.isTrue(data.open);
            assert.equal(data.status_text, 'statustext1');
            done();
          });               
      });

      // #2: Create an issue with only required fields: POST request to /api/issues/{project}
      test('Create an issue with only required field', function (done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/issues/test_project')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({issue_title: 'title2', 
            issue_text: 'issuetext2',
            created_by: "creator2",
            assigned_to: "",
            status_text: ""            
        })
          .end(function (err, res) {            
            assert.equal(res.status, 200);                        
            const data = JSON.parse(res.text);
            assert.isDefined(data._id);
            assert.isDefined(data.created_on);
            assert.equal(data.issue_title, 'title2');
            assert.equal(data.issue_text, 'issuetext2');
            assert.equal(data.created_on, data.updated_on);
            assert.equal(data.created_by, 'creator2');
            assert.equal(data.assigned_to, '');
            assert.isTrue(data.open);
            assert.equal(data.status_text, '');
            done();
          });               
      });

      // #3: Create an issue with missing required fields: POST request to /api/issues/{project}
      test('Create an issue with missing required fields', function (done) {
        chai
        .request(server)
        .keepOpen()
        .post('/api/issues/test_project')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({issue_title: 'title3', 
          issue_text: 'issuetext3',
          assigned_to: "",
          status_text: ""})
        .end(function (err, res) {            
          assert.equal(res.status, 200);            
          const data = JSON.parse(res.text);
          assert.equal(data.error,"required field(s) missing");
          done();
        });            
      });

      // #4: View issues on a project: GET request to /api/issues/{project}
      test('View issues on a project', function (done) {
        chai
        .request(server)
        .keepOpen()
        .get('/api/issues/test_project')
        .end(function (err, res) {            
          assert.equal(res.status, 200);            
          const data = JSON.parse(res.text);
         // console.log(data);
          const len = data.length;
          assert.isAbove(len,0);
          assert.isDefined(data[len-1]._id);
          assert.isDefined(data[len-1].created_on);
          assert.isDefined(data[len-1].issue_title);
          assert.isDefined(data[len-1].issue_text);
          assert.isDefined(data[len-1].created_on);
          assert.isDefined(data[len-1].created_by);
          assert.isDefined(data[len-1].assigned_to);
          assert.isDefined(data[len-1].open);
          assert.isDefined(data[len-1].status_text);
          done();
        });            
      });      

      // #5: View issues on a project with one filter: GET request to /api/issues/{project}
      test('View issues on a project with one filter', function (done) {
        chai
        .request(server)
        .keepOpen()
        .get('/api/issues/test_project?open=true')
        .end(function (err, res) {            
          assert.equal(res.status, 200);            
          const data = JSON.parse(res.text);
         // console.log(data);
          const len = data.length;
          assert.equal(len,2);
          assert.isDefined(data[len-1]._id);
          assert.isDefined(data[len-1].created_on);
          assert.isDefined(data[len-1].issue_title);
          assert.isDefined(data[len-1].issue_text);
          assert.isDefined(data[len-1].created_on);
          assert.isDefined(data[len-1].created_by);
          assert.isDefined(data[len-1].assigned_to);
          assert.isTrue(data[len-1].open);
          assert.isDefined(data[len-1].status_text);
          done();
        });            
      });        

      // #6: View issues on a project with multiple filters: GET request to /api/issues/{project}
      test('View issues on a project with multiple filter', function (done) {
        chai
        .request(server)
        .keepOpen()
        .get('/api/issues/test_project?open=true&assigned_to=assignedto1')
        .end(function (err, res) {            
          assert.equal(res.status, 200);            
          const data = JSON.parse(res.text);
         // console.log(data);
          const len = data.length;
          assert.equal(len,1);
          assert.isDefined(data[len-1]._id);
          assert.isDefined(data[len-1].created_on);
          assert.isDefined(data[len-1].issue_title);
          assert.isDefined(data[len-1].issue_text);
          assert.isDefined(data[len-1].created_on);
          assert.isDefined(data[len-1].created_by);
          assert.equal(data[len-1].assigned_to, "assignedto1");
          assert.isTrue(data[len-1].open);
          assert.isDefined(data[len-1].status_text);
          done();
        });            
      });        

      // #7: Update one field on an issue: PUT request to /api/issues/{project}
      test('Update one field on an issue', function (done) {        
        chai
          .request(server)
          .keepOpen()
          .post('/api/issues/test_project')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({issue_title: 'title7', 
            issue_text: 'issuetext7',
            created_by: "creator7",
            assigned_to: "",
            status_text: ""            
          })
          .end(function (err, res) {            
            assert.equal(res.status, 200);                        
            const data = JSON.parse(res.text);
            const _id = data._id;
          //set put request

          chai
          .request(server)
          .keepOpen()
          .put('/api/issues/test_project')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({_id: _id, 
            issue_title: "",
            issue_text: "",
            created_by: "",
            assigned_to: "testassign7",
            status_text: ""})          
          .end(function (err, res) {
            assert.equal(res.status, 200);            
            const data1 = JSON.parse(res.text);
            assert.equal(data1.result, "successfully updated");
            assert.equal(data1._id, _id);

            chai
            .request(server)
            .keepOpen()
            .get(`/api/issues/test_project?_id=${_id}`)
            .end(function (err, res) {
              assert.equal(res.status, 200);            
              const data2 = JSON.parse(res.text);
              const len2 = data2.length;
              assert.equal(len2,1);
              assert.equal(data2[len2-1]._id, _id);
              assert.equal(data2[len2-1].created_by,"");
              assert.equal(data2[len2-1].issue_title,"");
              assert.equal(data2[len2-1].issue_text,"");
              assert.notEqual(data2[len2-1].created_on, data2[len2-1].updated_on);
              assert.equal(data2[len2-1].assigned_to, "testassign7");
              assert.isTrue(data2[len2-1].open);
              assert.equal(data2[len2-1].status_text,"");
            });
          });
          done();
        });            
      });        

      // #8: Update multiple fields on an issue: PUT request to /api/issues/{project}
      test('Update multiple fields on an issue', function (done) {        
        chai
          .request(server)
          .keepOpen()
          .post('/api/issues/test_project')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({issue_title: 'title8', 
            issue_text: 'issuetext8',
            created_by: "creator8",
            assigned_to: "",
            status_text: "",
            open: false
          })
          .end(function (err, res) {            
            assert.equal(res.status, 200);                        
            const data = JSON.parse(res.text);
            const _id = data._id;

          //set put request
          chai
          .request(server)
          .keepOpen()
          .put('/api/issues/test_project')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({_id: _id, 
            issue_title: "",
            issue_text: "",
            created_by: "testassign8",
            assigned_to: "testassign8",
            open: false,
            status_text: ""})          
          .end(function (err, res) {
            assert.equal(res.status, 200);            
            const data1 = JSON.parse(res.text);
            assert.equal(data1.result, "successfully updated");
            assert.equal(data1._id, _id);

            chai
            .request(server)
            .keepOpen()
            .get(`/api/issues/test_project?_id=${_id}`)
            .end(function (err, res) {
              assert.equal(res.status, 200);            
              const data2 = JSON.parse(res.text);
              const len = data2.length;
              assert.equal(len,1);
              assert.equal(data2[len-1]._id, _id);
              assert.equal(data2[len-1].created_by,"testassign8");
              assert.equal(data2[len-1].issue_title,"");
              assert.equal(data2[len-1].issue_text,"");
              assert.notEqual(data2[len-1].created_on, data2[len-1].updated_on);
              assert.equal(data2[len-1].assigned_to, "testassign8");
              assert.isFalse(data2[len-1].open);
              assert.equal(data2[len-1].status_text,"");
            });
          });
          done();
        });            
      }); 

      // #9: Update an issue with missing _id: PUT request to /api/issues/{project}
      test('Update an issue with missing _id', function (done) {          
        //set put request
        chai
        .request(server)
        .keepOpen()
        .put('/api/issues/test_project')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          issue_title: "",
          issue_text: "",
          created_by: "testassign9",
          assigned_to: "testassign9",
          status_text: ""})          
          .end(function (err, res) {
            assert.equal(res.status, 200);   
            const data1 = JSON.parse(res.text);
            assert.equal(data1.error, "missing _id");
        });
        done();
      }); 

      // #10: Update an issue with no fields to update: PUT request to /api/issues/{project}
      test('Update an issue with no fields to update', function (done) {        
        chai
          .request(server)
          .keepOpen()
          .post('/api/issues/test_project')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({issue_title: 'title10', 
            issue_text: 'issuetext10',
            created_by: "creator10",
            assigned_to: "",
            status_text: ""            
          })
          .end(function (err, res) {            
            assert.equal(res.status, 200);                        
            const data = JSON.parse(res.text);
            const _id = data._id;

            //set put request
            chai
            .request(server)
            .keepOpen()
            .put('/api/issues/test_project')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({_id: _id})          
            .end(function (err, res) {
              assert.equal(res.status, 200);
              const data1 = JSON.parse(res.text);
              assert.equal(data1.error, "no update field(s) sent");
              assert.equal(data1._id, _id);
            });
          done();
        });            
      });
      
      // #11: Update an issue with an invalid _id: PUT request to /api/issues/{project}
      test('Update an issue with invalid _id', function (done) {          
        //set put request
        chai
        .request(server)
        .keepOpen()
        .put('/api/issues/test_project')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({_id: "abcdefg",
          issue_title: "",
          issue_text: "",
          created_by: "testassign9",
          assigned_to: "testassign9",
          status_text: ""})          
          .end(function (err, res) {
            assert.equal(res.status, 200);   
            const data1 = JSON.parse(res.text);
            assert.deepEqual(data1.error, "could not update");
            assert.deepEqual(data1._id, "abcdefg");
        });
        done();
      }); 

      // #12: Delete an issue: DELETE request to /api/issues/{project}
      test('Delete an issue', function (done) {        
        chai
          .request(server)
          .keepOpen()
          .post('/api/issues/test_project')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({issue_title: 'title12', 
            issue_text: 'issuetext12',
            created_by: "creator12",
            assigned_to: "",
            status_text: ""            
          })
          .end(function (err, res) {            
            assert.equal(res.status, 200);                        
            const data = JSON.parse(res.text);
            const _id = data._id;
          //set delete request
          chai
          .request(server)
          .keepOpen()
          .delete('/api/issues/test_project')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({_id: _id})
          .end(function (err, res) {
            assert.equal(res.status, 200);            
            const data1 = JSON.parse(res.text);            
            assert.equal(data1.result, "successfully deleted");
            assert.equal(data1._id, _id);
            
            chai
            .request(server)
            .keepOpen()
            .get(`/api/issues/test_project?_id=${_id}`)
            .end(function (err, res) {
              assert.equal(res.status, 200);            
              const data2 = JSON.parse(res.text);
              const len = data2.length;
              assert.equal(len,0);
            });
          });
          done();
        });
      });

      // #13: Delete an issue with an invalid _id: DELETE request to /api/issues/{project}
      test('Delete an issue with an invalid _id', function (done) {        
        //set delete request
        chai
        .request(server)
        .keepOpen()
        .delete('/api/issues/test_project')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({_id: "abcdefg"})
        .end(function (err, res) {
          assert.equal(res.status, 200);            
          const data1 = JSON.parse(res.text);
          assert.equal(data1.error, "could not delete");
          assert.equal(data1._id, "abcdefg");
        });
        done();
      });

      // #14: Delete an issue with missing _id: DELETE request to /api/issues/{project}
      test('Delete an issue with missing _id', function (done) {        
        //set delete request
        chai
        .request(server)
        .keepOpen()
        .delete('/api/issues/test_project')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send()
        .end(function (err, res) {
          assert.equal(res.status, 200);            
          const data1 = JSON.parse(res.text);
          assert.equal(data1.error, "missing _id");
        });
        done();
      });
      
    });    
});
