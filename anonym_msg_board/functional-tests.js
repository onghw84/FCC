const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

var thread1_id;
var thread2_id;
var reply1_id;
var reply2_id;
const board_name = "general";
const thread_url = "/api/threads/" + board_name;
const reply_url = "/api/replies/" + board_name;

suite('Functional Tests', function() {

    test("Creating a new thread: POST request to /api/threads/{board}", function(done) {
        chai
            .request(server)
            .post(thread_url)
            .set("content-type", "application/json")
            .send({
                text: "test1",
                delete_password: "test1"
            })
            .end(function(err, res) {
                chai
                .request(server)
                .get(thread_url)
                .end(function(err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body[0].text, "test1");
                    done();
                });
            });
    });

    test("Viewing the 10 most recent threads with 3 replies each: GET request to /api/threads/{board}", function(done) {
        chai
        .request(server)
        .post(thread_url)
        .set("content-type", "application/json")
        .send({
            text: "test2",
            delete_password: "test2"
        })
        .end(function(err, res) {
            chai
                .request(server)
                .get(thread_url)
                .end(function(err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body[0].text, "test2");
                    assert.equal(res.body[1].text, "test1");
                    done();
                });
            });
    });

    test("Deleting a thread with the incorrect password: DELETE request to /api/threads/{board} with an invalid delete_password", function(done) {
        chai
        .request(server)
        .get(thread_url)
        .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body[0].text, "test2");
            assert.equal(res.body[1].text, "test1");
            thread2_id = res.body[0]._id;
            thread1_id = res.body[1]._id;
            chai
                .request(server)
                .delete(thread_url)
                .set("content-type", "application/json")
                .send({thread_id: thread2_id, delete_password: "xxxxx"})
                .end(function(err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.text, "incorrect password");
                    done();
                });
            });
    });

    test("Deleting a thread with the correct password: DELETE request to /api/threads/{board} with a valid delete_password", function(done) {
        chai
            .request(server)
            .delete(thread_url)
            .set("content-type", "application/json")
            .send({thread_id: thread2_id, delete_password: "test2"})
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.text, "success");
                done();
            });
    });    

    test("Reporting a thread: PUT request to /api/threads/{board}", function(done) {
        chai
            .request(server)
            .put(thread_url)
            .set("content-type", "application/json")
            .send({
                thread_id: thread1_id
            })
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.text, "Reported");
                done();
            });
    });

    test("Creating a new reply: POST request to /api/replies/{board}", function(done) {
        chai
            .request(server)
            .post(reply_url)
            .set("content-type", "application/json")
            .send({
                thread_id: thread1_id,
                text: "reply1",
                delete_password: "reply1"
            })
            .end(function(err, res) {
                assert.equal(res.status, 200);
                done();
            });
    });

    test("Viewing a single thread with all replies: GET request to /api/replies/{board}", function(done) {
        chai
            .request(server)
            .post(reply_url)
            .set("content-type", "application/json")
            .send({
                thread_id: thread1_id,
                text: "reply2",
                delete_password: "reply2"
            })
            .end(function(err, res) {
            chai
                .request(server)
                .get(reply_url)
                .query({
                    thread_id: thread1_id
                })
                .end(function(err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body._id, thread1_id);
                    assert.equal(res.body.text, "test1");
                    assert.equal(res.body.replies[0].text, "reply1");
                    assert.equal(res.body.replies[1].text, "reply2");
                    reply1_id = res.body.replies[0]._id;
                    reply2_id = res.body.replies[1]._id;
                    done();
                }
            );
        });
    });

    test("Deleting a reply with the incorrect password: DELETE request to /api/replies/{board} with an invalid delete_password", function(done) {
        chai
            .request(server)
            .delete(reply_url)
            .set("content-type", "application/json")
            .send({
                thread_id: thread1_id,
                reply_id: reply2_id,
                delete_password: "xxxxx",
            })
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.text, "incorrect password");
                done();
            });
    });

    test("Deleting a reply with the correct password: DELETE request to /api/replies/{board} with a valid delete_password", function(done) {
        chai
            .request(server)
            .delete(reply_url)
            .set("content-type", "application/json")
            .send({
                thread_id: thread1_id,
                reply_id: reply2_id,
                delete_password: "reply2",
            })
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.text, "success");
                done();
            });
    });
    
    test("Reporting a reply: PUT request to /api/replies/{board}", function(done) {
        chai
            .request(server)
            .put(reply_url)
            .set("content-type", "application/json")
            .send({
                thread_id: thread1_id,
                reply_id: reply1_id
            })
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.text, "Reported");
                done();
            });
    });
});

