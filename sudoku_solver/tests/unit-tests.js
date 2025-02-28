const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

const Example = require('../controllers/puzzle-strings.js');

const validpuzzle = Example.puzzlesAndSolutions[0][0];
const invalidpuzzle1 = "a.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
const invalidpuzzle2 = ".9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
const invalidpuzzle3 = "12345678945612.3.................................................................";

suite('Unit Tests', () => {
    suite('validate', function () {        
        // #1: Logic handles a valid puzzle string of 81 characters
        test('valid puzzle string of 81 characters', function () {
            assert.equal(solver.validate(validpuzzle).text, "Puzzle validated");
        })
        // #2: Logic handles a puzzle string with invalid characters (not 1-9 or .)
        test('puzzle string with invalid characters', function () {
            assert.equal(solver.validate(invalidpuzzle1).error, "Invalid characters in puzzle");
        });
        // #3: Logic handles a puzzle string that is not 81 characters in length
        test('puzzle string that is not 81 characters in length', function () {
            assert.equal(solver.validate(invalidpuzzle2).error, "Expected puzzle to be 81 characters long");
        });
    })

    suite('check Placement', function () {        
        // #4: Logic handles a valid row placement
        test('valid row placement', function () {
            const data = solver.checkRowPlacement(validpuzzle, 'A', 2, 3);
            assert.isFalse(data);
        });
        // #5: Logic handles an invalid row placement
        test('invalid row placement', function () {
            const data = solver.checkRowPlacement(validpuzzle, 'A', 2, 8);
            assert.isTrue(data);
        });
        // #6: Logic handles a valid column placement
        test('valid column placement', function () {
            const data = solver.checkColPlacement(validpuzzle, 'A', 2, 3);
            assert.isFalse(data);
        });
        // #7: Logic handles an invalid column placement
        test('invalid column placement', function () {
            const data = solver.checkColPlacement(validpuzzle, 'A', 2, 9);
            assert.isTrue(data);
        })
        // #8: Logic handles a valid region (3x3 grid) placement
        test('valid region placement', function () {
            const data = solver.checkRegionPlacement(validpuzzle, 'A', 2, 3);
            assert.isFalse(data);
        });
        // #9: Logic handles an invalid region (3x3 grid) placement
        test('invalid region placement', function () {
            const data = solver.checkRegionPlacement(validpuzzle, 'A', 2, 5);
            assert.isTrue(data);
        });
    });

    suite('solve', function () {  
        // #10: Valid puzzle strings pass the solver
        test('valid puzzle strings', function () {
            const data = solver.solve(validpuzzle);            
            assert.isDefined(data.solution);
        });
        // #11: Invalid puzzle strings fail the solver
        test('invalid puzzle strings', function () {
            const data = solver.solve(invalidpuzzle3);            
            assert.equal(data.error, "Puzzle cannot be solved");
        });
        // #12: Solver returns the expected solution for an incomplete puzzle
        test('returns the expected solution for an incomplete puzzle', function () {
            for (var i = 0; i < Example.puzzlesAndSolutions.length; i++){
                const data = solver.solve(Example.puzzlesAndSolutions[i][0]);            
                assert.equal(data.solution, Example.puzzlesAndSolutions[i][1]);
            }
        });        
    });

});
