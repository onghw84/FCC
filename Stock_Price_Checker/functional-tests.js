const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    const ip = '123.123.123.123';
    const ip1 = '123.123.124.123';

    test('Fetch data for one stock', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/api/stock-prices')
        .query({ stock: 'GOOG' })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'stockData');
          assert.equal(res.body.stockData.stock, 'GOOG');
          assert.property(res.body.stockData, 'price');
          assert.property(res.body.stockData, 'likes');
          done();
      });
    });
    
    test('Fetch data for one invalid stock with like', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/api/stock-prices')
        .set('X-Forwarded-For', ip)
        .query({ stock: 'test', like: false })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'stockData');            
          assert.property(res.body.stockData, 'error');
          assert.property(res.body.stockData, 'likes');
          assert.equal(res.body.stockData.error, 'invalid symbol');
          var like = res.body.stockData.likes;
          chai
          .request(server)
          .keepOpen()
          .get('/api/stock-prices')
          .set('X-Forwarded-For', ip)
          .query({ stock: 'test', like: true })
          .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.property(res.body, 'stockData');            
              assert.property(res.body.stockData, 'error');
              assert.equal(res.body.stockData.error, 'invalid symbol');
              assert.equal(res.body.stockData.likes, like+1);

              done();
          });
      });
    });
    
    test('1 like per IP', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/api/stock-prices')
        .set('X-Forwarded-For', ip)
        .query({ stock: 'GOOG', like: true })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'stockData');            
          assert.equal(res.body.stockData.stock, 'GOOG');
          var like = res.body.stockData.likes;
          chai
          .request(server)
          .keepOpen()
          .get('/api/stock-prices')
          .set('X-Forwarded-For', ip)
          .query({ stock: 'GOOG', like: true })
          .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.property(res.body, 'stockData');            
              assert.equal(res.body.stockData.stock, 'GOOG');
              assert.equal(res.body.stockData.likes, like);
              done();
          });
      });
    });
    
    test('Fetch data for two stocks', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/api/stock-prices')
        .query({ stock: ['GOOG', 'MSFT'] })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'stockData');
          assert.isArray(res.body.stockData);
          assert.lengthOf(res.body.stockData, 2);            
          const [stock1, stock2] = res.body.stockData;    
          assert.equal(stock1.stock, 'GOOG');
          assert.equal(stock2.stock, 'MSFT');
          assert.property(stock1, 'price');
          assert.property(stock1, 'rel_likes');
          assert.property(stock2, 'price');
          assert.property(stock2, 'rel_likes');
          assert.strictEqual(stock1.rel_likes + stock2.rel_likes, 0);
          done();
      });
    });
    
    test('Fetch data for two stocks with like', function (done) {
      chai
      .request(server)
      .keepOpen()
      .get('/api/stock-prices')
      .set('X-Forwarded-For', ip)
      .query({ stock: 'ABCD', like: true})
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, 'stockData');            
        assert.equal(res.body.stockData.stock, 'ABCD');
        var like = res.body.stockData.likes;
        chai
          .request(server)
          .keepOpen()
          .get('/api/stock-prices')
          .set('X-Forwarded-For', ip1)
          .query({ stock: ['ABCD', 'MSFT'], like: true })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.property(res.body, 'stockData');
            assert.isArray(res.body.stockData);
            assert.lengthOf(res.body.stockData, 2);
            const [stock1, stock2] = res.body.stockData;
            assert.equal(stock1.stock, 'ABCD');
            assert.equal(stock2.stock, 'MSFT');
            assert.property(stock1, 'rel_likes');
            assert.property(stock2, 'rel_likes');
            assert.strictEqual(stock1.rel_likes + stock2.rel_likes, 0);
            chai
            .request(server)
            .keepOpen()
            .get('/api/stock-prices')
            .query({ stock: 'ABCD'})
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.property(res.body, 'stockData');            
              assert.equal(res.body.stockData.stock, 'ABCD');
              assert.equal(res.body.stockData.likes, like+1);              
              done();
            });
        });
      });      
    });
});
