'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {

      if (!(req.body.puzzle && req.body.coordinate && req.body.value)){
        res.json({ error: 'Required field(s) missing' });
      }

      const puzzle = req.body.puzzle;
      const coord = req.body.coordinate.toUpperCase();      
      const value = req.body.value;
      const valid = solver.validate(puzzle);
      
      if (valid.error){
        res.json(valid); return;
      }
      if (!value.match(/^([1-9])$/)){
        res.json({ "error": "Invalid value" }); return;
      }      
      if (!coord.match(/^([A-I][1-9])$/)){
        res.json({ "error": "Invalid coordinate" }); return;
      }

      if (solver.getNumber(puzzle, coord) == value){
        res.json({"valid": true}); return;
      }

      const result = {}; result.valid = true; result.conflict = [];
      if (solver.checkRowPlacement(puzzle, coord[0], coord[1], value)){
        result.valid = false; result.conflict.push("row");
      }

      if (solver.checkColPlacement(puzzle, coord[0], coord[1], value)){
        result.valid = false; result.conflict.push("column");
      }

      if (solver.checkRegionPlacement(puzzle, coord[0], coord[1], value)){
        result.valid = false; result.conflict.push("region");      
      }
      if (result.conflict.length == 0){
        res.json({"valid": true});        
      }
      else {res.json(result);}
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      if (!req.body.puzzle){
        res.json({ error: 'Required field missing' }); return;
      }
      const puzzle = req.body.puzzle;
      const valid = solver.validate(puzzle);
      if (valid.error){
        res.json(valid);
      }
      else {
        const solution = solver.solve(puzzle);
        res.json(solution);
      }
    });
};
