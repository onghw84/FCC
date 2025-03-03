const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
let translator = new Translator();

suite('Unit Tests', () => {

    suite('toBritish', function () {        
        const locale = 1; const highlight = 0;       //american to british
        // #1: Translate Mangoes are my favorite fruit. to British English
        test('Mangoes are my favorite fruit.', function () {
            const text = translator.Translate(locale, "Mangoes are my favorite fruit.", highlight);          
            assert.equal(text, "Mangoes are my favourite fruit.");
        })
        // #2: Translate I ate yogurt for breakfast. to British English
        test('I ate yogurt for breakfast.', function () {
            const text = translator.Translate(locale, "I ate yogurt for breakfast.", highlight);          
            assert.equal(text, "I ate yoghurt for breakfast.");
        });
        // #3: Translate We had a party at my friend's condo. to British English
        test("We had a party at my friend's condo.", function () {
            const text = translator.Translate(locale, "We had a party at my friend's condo.", highlight);          
            assert.equal(text, "We had a party at my friend's flat.");
        });       
        // #4: Translate Can you toss this in the trashcan for me? to British English
        test('Can you toss this in the trashcan for me?', function () {
            const text = translator.Translate(locale, "Can you toss this in the trashcan for me?", highlight);          
            assert.equal(text, "Can you toss this in the bin for me?");
        })
        // #5: Translate The parking lot was full. to British English
        test('The parking lot was full.', function () {
            const text = translator.Translate(locale, "The parking lot was full.", highlight);          
            assert.equal(text, "The car park was full.");
        });       
        // #6: Translate Like a high tech Rube Goldberg machine. to British English
        test("Like a high tech Rube Goldberg machine.", function () {
            const text = translator.Translate(locale, "Like a high tech Rube Goldberg machine.", highlight);          
            assert.equal(text, "Like a high tech Heath Robinson device.");
        });
        // #7: Translate To play hooky means to skip class or work. to British English
        test('To play hooky means to skip class or work.', function () {
            const text = translator.Translate(locale, "To play hooky means to skip class or work.", highlight);          
            assert.equal(text, "To bunk off means to skip class or work.");
        })
        // #8: Translate No Mr. Bond, I expect you to die. to British English
        test('No Mr. Bond, I expect you to die.', function () {
            const text = translator.Translate(locale, "No Mr. Bond, I expect you to die.", highlight);          
            assert.equal(text, "No Mr Bond, I expect you to die.");
        });
        // #9: Translate Dr. Grosh will see you now. to British English
        test("Dr. Grosh will see you now.", function () {
            const text = translator.Translate(locale, "Dr. Grosh will see you now.", highlight);          
            assert.equal(text, "Dr Grosh will see you now.");
        });                
        // #10: Translate Lunch is at 12:15 today. to British English
        test("Lunch is at 12:15 today.", function () {
            const text = translator.Translate(locale, "Lunch is at 12:15 today.", highlight);          
            assert.equal(text, "Lunch is at 12.15 today.");
        });
    });

    suite('toAmerican', function () {        
        const locale = 2; const highlight = 0;       //british to american

        // #1: Translate We watched the footie match for a while. to American English
        test('We watched the footie match for a while.', function () {
            const text = translator.Translate(locale, "We watched the footie match for a while.", highlight);          
            assert.equal(text, "We watched the soccer match for a while.");
        })
        // #2: Paracetamol takes up to an hour to work. to American English
        test('Paracetamol takes up to an hour to work.', function () {
            const text = translator.Translate(locale, "Paracetamol takes up to an hour to work.", highlight);          
            assert.equal(text, "Tylenol takes up to an hour to work.");
        });
        // #3: Translate First, caramelise the onions. to American English
        test("First, caramelise the onions.", function () {
            const text = translator.Translate(locale, "First, caramelise the onions.", highlight);          
            assert.equal(text, "First, caramelize the onions.");
        });      
        // #4: I spent the bank holiday at the funfair. to American English
        test('I spent the bank holiday at the funfair.', function () {
            const text = translator.Translate(locale, "I spent the bank holiday at the funfair.", highlight);          
            assert.equal(text, "I spent the public holiday at the carnival.");
        })
        // #5: Translate I had a bicky then went to the chippy. to American English
        test('I had a bicky then went to the chippy.', function () {
            const text = translator.Translate(locale, "I had a bicky then went to the chippy.", highlight);          
            assert.equal(text, "I had a cookie then went to the fish-and-chip shop.");
        });       
        // #6: Translate I've just got bits and bobs in my bum bag. to American English
        test("I've just got bits and bobs in my bum bag.", function () {
            const text = translator.Translate(locale, "I've just got bits and bobs in my bum bag.", highlight);          
            assert.equal(text, "I've just got odds and ends in my fanny pack.");
        });
        // #7: Translate The car boot sale at Boxted Airfield was called off. to American English
        test('The car boot sale at Boxted Airfield was called off.', function () {
            const text = translator.Translate(locale, "The car boot sale at Boxted Airfield was called off.", highlight);          
            assert.equal(text, "The swap meet at Boxted Airfield was called off.");
        })   
        // #8: Translate Have you met Mrs Kalyani? to American English
        test('Have you met Mrs Kalyani?', function () {
            const text = translator.Translate(locale, "Have you met Mrs Kalyani?", highlight);          
            assert.equal(text, "Have you met Mrs. Kalyani?");
        });
        // #9: Translate Prof Joyner of King's College, London. to American English
        test("Prof Joyner of King's College, London.", function () {
            const text = translator.Translate(locale, "Prof Joyner of King's College, London.", highlight);          
            assert.equal(text, "Prof. Joyner of King's College, London.");
        });                
        // #9: Translate Tea time is usually around 4 or 4.30. to American English
        test("Tea time is usually around 4 or 4.30.", function () {
            const text = translator.Translate(locale, "Tea time is usually around 4 or 4.30.", highlight);          
            assert.equal(text, "Tea time is usually around 4 or 4:30.");
        });            
    })

    suite('Highlight', function () {        
        const highlight = 1;     
        // #1: Highlight translation in Mangoes are my favorite fruit.
        test('Mangoes are my favorite fruit.', function () {
            const locale = 1;
            const text = translator.Translate(locale, "Mangoes are my favorite fruit.", highlight);          
            assert.equal(text, 'Mangoes are my <span class="highlight">favourite</span> fruit.');
        })
        // #2: Highlight translation in I ate yogurt for breakfast.
        test('I ate yogurt for breakfast.', function () {
            const locale = 1;
            const text = translator.Translate(locale, "I ate yogurt for breakfast.", highlight);          
            assert.equal(text, 'I ate <span class="highlight">yoghurt</span> for breakfast.');
        });
        // #3: Highlight translation in We watched the footie match for a while.
        test("We watched the footie match for a while.", function () {
            const locale = 2;
            const text = translator.Translate(locale, "We watched the footie match for a while.", highlight);          
            assert.equal(text, `We watched the <span class="highlight">soccer</span> match for a while.`);
        });
        // #4: Highlight translation in Paracetamol takes up to an hour to work.
        test("Paracetamol takes up to an hour to work.", function () {
            const locale = 2;
            const text = translator.Translate(locale, "Paracetamol takes up to an hour to work.", highlight);          
            assert.equal(text, '<span class="highlight">Tylenol</span> takes up to an hour to work.');
        });        
    }); 
});
