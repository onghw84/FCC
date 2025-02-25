const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    this.timeout(5000);
    suite('Integration tests with chai-http', function () {
      // #1: Convert a valid input such as 10L
      test('Test valid input eg 10L', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/convert?input=10L')
          .end(function (err, res) {
            assert.equal(res.status, 200);
            const data = JSON.parse(res.text);
            assert.equal(data.string, '10 liters converts to 2.64172 gallons');
            assert.equal(data.initNum, 10);
            assert.equal(data.initUnit, 'L');
            assert.equal(data.returnNum, 2.64172);
            assert.equal(data.returnUnit, 'gal');
            done();
          });
      });
      // #2: Convert an invalid input such as 32g
      test('Test invalid unit eg 32g', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/convert?input=32g')
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'invalid unit');
            done();
          });
      });
      // #3: Convert an invalid number such as 3/7.2/4kg
      test('Test invalid number eg 3/7.2/4kg', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/convert?input=3/7.2/4kg')
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'invalid number');
            done();
          });
      });
      // #4: Convert an invalid number AND unit such as 3/7.2/4kilomegagram
      test('Test invalid number eg 3/7.2/4kilomegagram', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/convert?input=3/7.2/4kilomegagram')
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'invalid number and unit');
            done();
          });
      });
      // #5: Convert with no number such as kg
      test('Test no number eg kg', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/convert?input=kg')
          .end(function (err, res) {
            assert.equal(res.status, 200);
            const data = JSON.parse(res.text);            
            assert.equal(data.string, '1 kilograms converts to 2.20462 pounds');
            assert.equal(data.initNum, 1);
            assert.equal(data.initUnit, 'kg');
            assert.equal(data.returnNum, 2.20462);
            assert.equal(data.returnUnit, 'lbs');
            done();
          });
      });
    });
});
