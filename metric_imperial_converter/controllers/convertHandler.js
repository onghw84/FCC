math = require('mathjs');

function ConvertHandler() {
  
  this.getNum = function(input) {
    if (input.split("/").length == 3){
      //console.log("two occurrance of /");
      return 0;
    }
    if (input.match(/(^[\d|.|/]+[a-z]+$)/gi)){
      //console.log("valid input");
      return math.evaluate(input.match(/(^[\d|.|/]+)/gi)[0]);
    }
    else if (input.match(/(^[a-z]+$)/i)){
      //console.log("valid input");
      return 1;
    }
    else {
      return 0;
    }
  };
  
  this.getUnit = function(input) {
    if (input.match(/([a-z]+$)/gi)){
      if (input.match(/([a-z]+$)/gi)[0].toLowerCase() == 'l'){
        return 'L';
      }
      else {
        return input.match(/([a-z]+$)/gi)[0].toLowerCase();
      }
    }
    else {
      return "invalid unit";
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    switch (initUnit){
      case 'L':
        return 'gal';
      case 'gal':
        return 'L';
      case 'mi':
        return 'km';
      case 'km':
        return 'mi';
      case 'lbs':
        return 'kg';
      case 'kg':
        return 'lbs';
      default:
        return 'invalid unit';
    }
  };

  this.spellOutUnit = function(unit) {
    switch (unit){
      case 'L':
        return 'liters';
      case 'gal':
        return 'gallons';
      case 'mi':
        return 'miles';
      case 'km':
        return 'kilometers';
      case 'lbs':
        return 'pounds';
      case 'kg':
        return 'kilograms';
      default:
        return 'invalid unit';
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch (initUnit){
      case 'L':
        return initNum/galToL;
      case 'gal':
        return initNum*galToL;
      case 'mi':
        return initNum*miToKm;
      case 'km':
        return initNum/miToKm;
      case 'lbs':
        return initNum*lbsToKg;
      case 'kg':
        return initNum/lbsToKg;
      default:
        return 0;
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${spellOutUnit(initUnit)} converts to ${returnNum} ${spellOutUnit(returnUnit)}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
