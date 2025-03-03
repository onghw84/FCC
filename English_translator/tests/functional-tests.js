const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

const text = "Mangoes are my favorite fruit.";
const translated = 'Mangoes are my <span class="highlight">favourite</span> fruit.'
const locale = ["american-to-british","british-to-american"];
const invalidLocale = "testing";

suite('Functional Tests', function() {
    this.timeout(5000);

    suite('Integration tests with chai-http', function () {
        // #1: Translation with text and locale fields: POST request to /api/translate
        test('Translation with text and locale fields', function (done) {
            chai
                .request(server)
                .keepOpen()
                .post('/api/translate')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({text: text, locale: locale[0]})
                .end(function (err, res) { 
                    assert.equal(res.status, 200);
                    const data = JSON.parse(res.text);
                    assert.equal(data.text, text);
                    assert.equal(data.translation, translated);
                    done();
                });
            });
            
        // #2: Translation with text and invalid locale field: POST request to /api/translate
        test('Translation with text and invalid locale field', function (done) {
            chai
                .request(server)
                .keepOpen()
                .post('/api/translate')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({text: text, locale: invalidLocale})
                .end(function (err, res) { 
                    assert.equal(res.status, 200);
                    const data = JSON.parse(res.text);
                    assert.equal(data.error, "Invalid value for locale field");
                    done();
                    });               
            });

        // #3: Translation with missing text field: POST request to /api/translate
        test('Translation with missing text field', function (done) {
            chai
                .request(server)
                .keepOpen()
                .post('/api/translate')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({locale: locale[0]})
                .end(function (err, res) { 
                    assert.equal(res.status, 200);
                    const data = JSON.parse(res.text);
                    assert.equal(data.error, "Required field(s) missing");
                    done();
                    });               
            });

        // #4: Translation with missing locale field: POST request to /api/translate
        test('Translation with missing locale field', function (done) {
            chai
                .request(server)
                .keepOpen()
                .post('/api/translate')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({text: text})
                .end(function (err, res) { 
                    assert.equal(res.status, 200);
                    const data = JSON.parse(res.text);
                    assert.equal(data.error, "Required field(s) missing");
                    done();
                    });               
            });

        // #5: Translation with empty text: POST request to /api/translate
        test('Translation with empty text', function (done) {
            chai
                .request(server)
                .keepOpen()
                .post('/api/translate')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({text: "", locale: locale[0]})
                .end(function (err, res) { 
                    assert.equal(res.status, 200);
                    const data = JSON.parse(res.text);
                    assert.equal(data.error, "No text to translate");
                    done();
                    });               
            });
        
        // #6: Translation with text that needs no translation: POST request to /api/translate
        test('Translation with missing locale field', function (done) {
            chai
                .request(server)
                .keepOpen()
                .post('/api/translate')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({text: text, locale: locale[1]})
                .end(function (err, res) { 
                    assert.equal(res.status, 200);
                    const data = JSON.parse(res.text);
                    assert.equal(data.text, text);
                    assert.equal(data.translation, "Everything looks good to me!");
                    done();
                    });               
            });
        });             
});
