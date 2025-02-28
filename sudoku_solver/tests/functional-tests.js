const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);
const Example = require('../controllers/puzzle-strings.js');
const validpuzzle = Example.puzzlesAndSolutions[0][0];
const invalidpuzzle1 = "a.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
const invalidpuzzle2 = ".9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
const invalidpuzzle3 = "12345678945612.3.................................................................";

suite('Functional Tests', function() {
    this.timeout(5000);
    suite('Integration tests with chai-http', function () {

        // #1: Solve a puzzle with valid puzzle string: POST request to /api/solve
        test('Solve a puzzle with valid puzzle string', function (done) {
            chai
                .request(server)
                .keepOpen()
                .post('/api/solve')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({puzzle: validpuzzle})
                .end(function (err, res) { 
                    assert.equal(res.status, 200);
                    const data = JSON.parse(res.text);
                    assert.equal(data.solution, Example.puzzlesAndSolutions[0][1]);
                    done();
                });               
            });
            
        // #2: Solve a puzzle with missing puzzle string: POST request to /api/solve
        test('Solve a puzzle with missing puzzle string', function (done) {
            chai
                .request(server)
                .keepOpen()
                .post('/api/solve')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({})
                .end(function (err, res) { 
                    assert.equal(res.status, 200);
                    const data = JSON.parse(res.text);
                    assert.equal(data.error, "Required field missing");
                    done();
                    });               
            });

        // #3: Solve a puzzle with invalid characters: POST request to /api/solve
        test('Solve a puzzle with invalid characters', function (done) {
            chai
                .request(server)
                .keepOpen()
                .post('/api/solve')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({puzzle: invalidpuzzle1})
                .end(function (err, res) { 
                    assert.equal(res.status, 200);
                    const data = JSON.parse(res.text);
                    assert.equal(data.error, "Invalid characters in puzzle");
                    done();
                    });               
            });

        // #4: Solve a puzzle with incorrect length: POST request to /api/solve
        test('Solve a puzzle with incorrect length', function (done) {
            chai
                .request(server)
                .keepOpen()
                .post('/api/solve')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({puzzle: invalidpuzzle2})
                .end(function (err, res) { 
                    assert.equal(res.status, 200);
                    const data = JSON.parse(res.text);
                    assert.equal(data.error, "Expected puzzle to be 81 characters long");
                    done();
                    });               
            });
            
        // #5: Solve a puzzle that cannot be solved: POST request to /api/solve
        test('Solve a puzzle that cannot be solved', function (done) {
            chai
                .request(server)
                .keepOpen()
                .post('/api/solve')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({puzzle: invalidpuzzle3})
                .end(function (err, res) { 
                    assert.equal(res.status, 200);
                    const data = JSON.parse(res.text);
                    assert.equal(data.error, "Puzzle cannot be solved");
                    done();
                    });               
            });

        // #6: Check a puzzle placement with all fields: POST request to /api/check
        test('Check a puzzle placement with all fields', function (done) {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({puzzle: validpuzzle, coordinate: 'A2', value: 3})
                .end(function (err, res) { 
                    assert.equal(res.status, 200);
                    const data = JSON.parse(res.text);
                    assert.property(data, 'valid');
                    assert.isTrue(data.valid);
                    done();
                    });               
            }); 

        // #7: Check a puzzle placement with single placement conflict: POST request to /api/check
        test('Check a puzzle placement with single placement conflict', function (done) {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({puzzle: validpuzzle, coordinate: 'A2', value: 8})
                .end(function (err, res) { 
                    assert.equal(res.status, 200);
                    const data = JSON.parse(res.text);
                    assert.equal(data.conflict.length, 1);
                    done();
                    });
            });

        // #8: Check a puzzle placement with multiple placement conflict: POST request to /api/check
        test('Check a puzzle placement with multiple placement conflict', function (done) {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({puzzle: validpuzzle, coordinate: 'A2', value: 6})
                .end(function (err, res) { 
                    assert.equal(res.status, 200);
                    const data = JSON.parse(res.text);
                    assert.equal(data.conflict.length, 2);
                    done();
                    });
            });

        // #9: Check a puzzle placement with all placement conflict: POST request to /api/check
        test('Check a puzzle placement with all placement conflict', function (done) {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({puzzle: validpuzzle, coordinate: 'A2', value: 2})
                .end(function (err, res) { 
                    assert.equal(res.status, 200);
                    const data = JSON.parse(res.text);
                    assert.equal(data.conflict.length, 3);
                    done();
                    });
            });

        // #10: Check a puzzle placement with missing required fields: POST request to /api/check
        test('Check a puzzle placement with invalid characters', function (done) {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({puzzle: validpuzzle, coordinate: 'A2'})
                .end(function (err, res) { 
                    assert.equal(res.status, 200);
                    const data = JSON.parse(res.text);
                    assert.equal(data.error, "Required field(s) missing");
                    done();
                    });
            });

        // #11: Check a puzzle placement with invalid characters: POST request to /api/check
        test('Check a puzzle placement with invalid characters', function (done) {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({puzzle: invalidpuzzle1, coordinate: 'A2', value: 1})
                .end(function (err, res) { 
                    assert.equal(res.status, 200);
                    const data = JSON.parse(res.text);
                    assert.equal(data.error, "Invalid characters in puzzle");
                    done();
                    });
            });

        // #12: Check a puzzle placement with incorrect length: POST request to /api/check
        test('Check a puzzle placement with incorrect length', function (done) {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({puzzle: invalidpuzzle2, coordinate: 'A2', value: 1})
                .end(function (err, res) { 
                    assert.equal(res.status, 200);
                    const data = JSON.parse(res.text);
                    assert.equal(data.error, "Expected puzzle to be 81 characters long");
                    done();
                    });
            });

        // #13: Check a puzzle placement with invalid placement coordinate: POST request to /api/check
        test('Check a puzzle placement with invalid placement coordinate', function (done) {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({puzzle: validpuzzle, coordinate: 'AB2', value: 1})
                .end(function (err, res) { 
                    assert.equal(res.status, 200);
                    const data = JSON.parse(res.text);
                    assert.equal(data.error, "Invalid coordinate");
                    done();
                    });
            });

        // #14: Check a puzzle placement with invalid placement value: POST request to /api/check
        test('Check a puzzle placement with invalid placement value', function (done) {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({puzzle: validpuzzle, coordinate: 'A2', value: 10})
                .end(function (err, res) { 
                    assert.equal(res.status, 200);
                    const data = JSON.parse(res.text);
                    assert.equal(data.error, "Invalid value");
                    done();
                    });
            })            
    });
});

