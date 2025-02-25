const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('getNum', function () {        
        // #1: convertHandler should correctly read a whole number input.
        test('wholenumber', function () {
            assert.equal(convertHandler.getNum('4gal'), 4);
            assert.equal(convertHandler.getNum('20L'), 20);
            assert.equal(convertHandler.getNum('102mi'), 102);
        })
        // #2: convertHandler should correctly read a decimal number input.
        test('decimalnumber', function () {
            assert.equal(convertHandler.getNum('4.23gal'), 4.23);
            assert.equal(convertHandler.getNum('23.0km'), 23.0);
            assert.equal(convertHandler.getNum('123.789lbs'), 123.789);
        });
        // #3: convertHandler should correctly read a fractional input.
        test('fractional input', function () {
            assert.equal(convertHandler.getNum('1/2gal'), 0.5);
            assert.equal(convertHandler.getNum('100/2kg'), 50);
        });
        // #4: convertHandler should correctly read a fractional input with a decimal.
        test('fractional input with decimal', function () {
            assert.equal(convertHandler.getNum('0.5/2gal'), 0.25);
            assert.equal(convertHandler.getNum('100.5/2mi'), 50.25);
        });
        // #5: convertHandler should correctly return an error on a double-fraction
        test('double-fraction', function () {
            assert.equal(convertHandler.getNum('1/2/2gal'), 0);
            assert.equal(convertHandler.getNum('5/2.0/3mi'), 0);
        });
        // #6: convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.
        test('no numeric input', function () {
            assert.equal(convertHandler.getNum('gal'), 1);
            assert.equal(convertHandler.getNum('km'), 1);
            assert.equal(convertHandler.getNum('kg'), 1);
        });
    });
        
    suite('Unit', function () {
        // #1: convertHandler should correctly read each valid input unit.
        test('read valid input unit', function () {            
            assert.equal(convertHandler.getUnit('1l'), 'L');
            assert.equal(convertHandler.getUnit('2gal'), 'gal');
            assert.equal(convertHandler.getUnit('3km'), 'km');
            assert.equal(convertHandler.getUnit('4mi'), 'mi');
            assert.equal(convertHandler.getUnit('5kg'), 'kg');
            assert.equal(convertHandler.getUnit('6lbs'), 'lbs');
        });
        // #2: convertHandler should correctly return an error for an invalid input unit.
        test('error for invalid input unit', function () {            
            assert.equal(convertHandler.getUnit('2l1'), "invalid unit");
            assert.equal(convertHandler.getUnit('123.4gal0'), "invalid unit");
            assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit('4la')), "invalid unit");
            assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit('234.5m')), "invalid unit");
        });
        // #3: convertHandler should return the correct return unit for each valid input unit.
        test('return correct return unit', function () {
            assert.equal(convertHandler.getReturnUnit('L'), 'gal');
            assert.equal(convertHandler.getReturnUnit('gal'), 'L');
            assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
            assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
            assert.equal(convertHandler.getReturnUnit('km'), 'mi');
            assert.equal(convertHandler.getReturnUnit('mi'), 'km');
        });
        // #4: convertHandler should correctly return the spelled-out string unit for each valid input unit.
        test('return spelled-out string', function () {
            assert.equal(convertHandler.spellOutUnit('L'), 'liters');
            assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
            assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
            assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
            assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
            assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
        });
    })

    suite('Unit convertHandler', function () {
        // #1: convertHandler should correctly convert gal to L.
        test('gal to L', function () {
            assert.approximately(convertHandler.convert(1,'gal'), 3.78541,0.01);
            assert.approximately(convertHandler.convert(0.25,'gal'), 0.25*3.78541,0.01);
        });
        // #2: convertHandler should correctly convert L to gal.
        test('L to gal', function () {
            assert.approximately(convertHandler.convert(1,'L'), 1/3.78541,0.01);
            assert.approximately(convertHandler.convert(0.25,'L'), 0.25/3.78541,0.01);            
        });
        // #3: convertHandler should correctly convert mi to km.
        test('mi to km', function () {
            assert.approximately(convertHandler.convert(1,'mi'), 1.60934,0.01);
            assert.approximately(convertHandler.convert(0.25,'mi'), 0.25*1.60934,0.01);
        });
        // #4: convertHandler should correctly convert km to mi.
        test('km to mi', function () {
            assert.approximately(convertHandler.convert(1,'km'), 1/1.60934,0.01);
            assert.approximately(convertHandler.convert(0.25,'km'), 0.25/1.60934,0.01);
        });
        // #5: convertHandler should correctly convert lbs to kg.
        test('lbs to kg', function () {
            assert.approximately(convertHandler.convert(1,'lbs'), 0.453592,0.01);
            assert.approximately(convertHandler.convert(0.25,'lbs'), 0.25*0.453592,0.01);
          });
        // #6: convertHandler should correctly convert kg to lbs.
        test('kg to lbs', function () {
            assert.approximately(convertHandler.convert(1,'kg'), 1/0.453592,0.01);
            assert.approximately(convertHandler.convert(0.25,'kg'), 0.25/0.453592,0.01);
          });                  
    });       
        
});
    


