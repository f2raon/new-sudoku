module.exports = function solveSudoku(matrix) {
  
  //call main algorithm
  if (solve(matrix)) {
    //console.log(matrix);
    return matrix;
  }
}

// this function works in loop mode
function solve(matrix) {
  var loc = findEmptyLocation(matrix);
  // if not any empty location, returns true
  if (loc === false) return true;

  var row = loc[0];
  var col = loc[1];

  for (let i = 1; i < 10; i++) {
    if (isLocationSafe(matrix, row, col, i)) {
      matrix[row][col] = i;

      //calling recursive function
      if (solve(matrix)) {
        return true;
      }

      //undo function :)
      matrix[row][col] = 0;
    }
  }
  return false;
}

//checking for empty location
function findEmptyLocation(matrix) {
  var loc = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (matrix[i][j] == 0) {
        loc.push(i);
        loc.push(j);
        return loc;
      }
    }
  }
  return false;
}

//returns true if locations is safe
function isLocationSafe(matrix, row, col, number) {
  return usedInRow(matrix, row, number) == false && 
         usedInColumn(matrix, col, number) == false && 
         usedInBox(matrix, (row - row%3),( col - col%3), number) == false;
}

//checking for safe in 3x3 box, returns false if safe
function usedInBox(matrix, row, col, number) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (matrix[i+row][j+col] == number) return true;
    }
  }
  return false;
}

//checking for safe in column, returns false if safe
function usedInColumn(matrix, col, number) {
  for (let i = 0; i < 9; i++) {
    if (matrix[i][col] == number) return true;
  }
  return false;
}

//checking for safe in row, returns false if safe
function usedInRow(matrix, row, number) {
  for (let i = 0; i < 9; i++) {
    if (matrix[row][i] == number) return true;
  }
  return false;
}
