const { text } = require("body-parser");

class SudokuSolver {

  validate(puzzleString) {
    if (puzzleString.length != 81){
      return { "error": "Expected puzzle to be 81 characters long" }
    }
    if (!puzzleString.match(/(^[1-9|.]+$)/gi)){
      return { "error": "Invalid characters in puzzle" }
    }   
    return { "text": "Puzzle validated"};
  }

  checkRowPlacement(puzzleString, row, column, value) {
    for (var i = 1; i < 10; i++){
      if (value == this.getNumber(puzzleString, row+i.toString())){
        //console.log(`${value}: ${row+i.toString()}`)
        return true;
      }
    }    
    return false;    
  }

  checkColPlacement(puzzleString, row, column, value) {
    const rows = 'ABCDEFGHI';  
    for (var i = 0; i < 9; i++){
      if (value == this.getNumber(puzzleString, rows[i]+column.toString())){
        return true;
      }
    }
    return false;  
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const region = [['A1','A2','A3','B1','B2','B3','C1','C2','C3'],
                  ['A4','A5','A6','B4','B5','B6','C4','C5','C6'],
                  ['A7','A8','A9','B7','B8','B9','C7','C8','C9'],
                  ['D1','D2','D3','E1','E2','E3','F1','F2','F3'],
                  ['D4','D5','D6','E4','E5','E6','F4','F5','F6'],
                  ['D7','D8','D9','E7','E8','E9','F7','F8','F9'],
                  ['G1','G2','G3','H1','H2','H3','I1','I2','I3'],
                  ['G4','G5','G6','H4','H5','H6','I4','I5','I6'],
                  ['G7','G8','G9','H7','H8','H9','I7','I8','I9']];
    const coord = row+column;
    const roi = region[region.findIndex(el => el.includes(coord))];
    for (var i = 0; i < 9; i++){
      if (value == this.getNumber(puzzleString, roi[i])){
        return true;
      }
    }
    return false;
  }

  getCoord(index){
    const row = 'ABCDEFGHI';    
    return row[Math.floor(index/9)]+(index%9+1).toString();
  }

  getNumber(puzzleString, coord){
    const row = 'ABCDEFGHI';    
    return puzzleString[row.indexOf(coord[0])*9 + parseInt(coord[1]) - 1];
  }

  solveOne(testString){
    var resultMatrix = Array(81);
    var resultLenMatrix = Array(81).fill(100);      
    for (var j = 0; j < 81; j++){
      if (testString[j] == '.'){
        var coord = this.getCoord(j);
        //console.log(coord);
        var validNum = [];
        for (var i = 1; i <= 9; i++){
          if (!(this.checkRowPlacement(testString, coord[0], coord[1], i))){
            if (!this.checkColPlacement(testString, coord[0], coord[1], i)){
              if (!this.checkRegionPlacement(testString, coord[0], coord[1], i)){
                validNum.push(i);
              }                
            }
          } 
        }
        //console.log(`${j}: ${validNum}`);
        resultMatrix[j] = validNum;
        resultLenMatrix[j] = validNum.length;
        if (validNum.length == 1){                
          testString[j] = validNum[0];
          break;
        }
      }
    }    
    return {"solution": testString, "resultMatrix": resultMatrix, "resultLenMatrix": resultLenMatrix};
  }

  solve(puzzleString) {
    const column = '123456789'
    const row = 'ABCDEFGHI'    

    for (var i = 1; i <= 9; i++){
      if (puzzleString.split(i).length - 1 > 9){
        return { "error": "Puzzle cannot be solved" };
      }
    } 

    //STUPID method
    var testString = puzzleString.split("");
    var backTrack = [];
    while (testString.includes('.')){
      var solObj = this.solveOne(testString);
      testString = solObj.solution;      
      //console.log(testString.toString().replaceAll(",",""));
      var resultMatrix = solObj.resultMatrix;
      var resultLenMatrix = solObj.resultLenMatrix;

      const minResult = Math.min(...resultLenMatrix);
      if ( minResult == 0){
        if (backTrack.length == 0){
          return { "error": "Puzzle cannot be solved" };
          break;
        }
        else {
          //perform backtrack here
          var backSol = backTrack.pop();
          testString = backSol.solution.slice(0);
          testString[backSol.fillIndex] = backSol.resultMatrix[0];
          if (backSol.resultMatrix.length > 1){
            backTrack.push({"solution": backSol.solution.slice(0), 
              "fillIndex": backSol.fillIndex, 
              "resultMatrix":backSol.resultMatrix.slice(1)});
          }
        }
      }

      //if all tests has more than 1 answer, use the one with least answer
      if (minResult > 1){        
        var fillIndex = resultLenMatrix.indexOf(minResult);
        backTrack.push({"solution": testString.slice(0), "fillIndex": fillIndex, "resultMatrix":resultMatrix[fillIndex].slice(1)});
        testString[fillIndex] = resultMatrix[fillIndex][0];        
      }
    }

    return { "solution":  testString.toString().replaceAll(',','')};                  
    
  }
}

module.exports = SudokuSolver;

