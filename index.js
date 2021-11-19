const board = document.getElementById('board')
let matrixSize=6;
let winningCombination=3;


function createMatrix (){
  let matrix = [];
  let n = matrixSize, m = matrixSize;
  for(let i=0; i<n; i++) {
      matrix[i] = getMatrixRowWithEmptyElement(m);
  }
  return matrix
}

function getMatrixRowWithEmptyElement(size) {
  let row = []
  for (let j=0; j<size; j++) {
    row[j]=undefined;
  }
  return row;
}

let matrix = createMatrix();

function renderMatrix() {
  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];
    renderRow(row, i)
  }
}


function renderRow (row, rowIndex) {
  let newDiv = document.createElement("div");
  newDiv.className = 'row';
  newDiv.id = 'row'+rowIndex;
  board.appendChild(newDiv);
  const rowElement = document.getElementById('row'+rowIndex)
  rowElement.style.display = "flex";
  for (let j = 0; j < row.length; j++) {
    renderCell(rowIndex,j,rowElement)
  }
}

function renderCell (rowIndex,columnIndex,rowElement) {
  let newDiv = document.createElement("div");
  newDiv.className = 'cell';
  newDiv.id = rowIndex+"_"+columnIndex;
  rowElement.appendChild(newDiv);
}

renderMatrix()

function creatMatrixForCheckingTheWinner(centerRow, centerColumn, currentSymbol) {
  let matrixToCheck = [];
  let matrixRow = winningCombination*2-1;
  let matrixCell = winningCombination*2-1;
  for(let i=0; i<matrixRow; i++) {
    let rowIndex = centerRow-winningCombination+1+i;
    matrixToCheck[i] = getMatrixRowWithElementsFromMainMatrix(matrixCell, rowIndex, centerColumn);
  }
  matrixToCheck[winningCombination-1][winningCombination-1] = "cell "+currentSymbol
  return matrixToCheck
}

function getMatrixRowWithElementsFromMainMatrix(size, rowIndex, centerColumn) {
  let row = []
  for (let j=0; j<size; j++) {
    let columnIndex = centerColumn-winningCombination+1+j;
    let cellClassName
    if (rowIndex<0||rowIndex>=matrix.length||columnIndex<0||columnIndex>=matrix.length) {
      cellClassName = undefined
    } else {
      cellClassName = document.getElementById(rowIndex+"_"+columnIndex).className
    }
    row[j]=cellClassName
  }
  return row;
}

function rowCheck(matrixForChecking, currentSymbol) {
  var arrayForCheck = []
  for (var i = 0; i < matrixForChecking.length; i++) {
    var cell = i;
    arrayForCheck[i] = matrixForChecking[winningCombination-1][cell];
  }
  
  var count = 0;
  for (var i = 0; i < arrayForCheck.length; i++) {
    if (arrayForCheck[i] != "cell "+currentSymbol) {
        count = 0;
      } else {
        count += 1;
        if (winningCombination <= count) {
          return true;
        }
      }
    }
  return false;
}

function columnCheck(matrixForChecking, currentSymbol) {
  var arrayForCheck = []
  for (var i = 0; i < matrixForChecking.length; i++) {
    var cell = i;
    arrayForCheck[i] = matrixForChecking[cell][winningCombination-1];
  }
  
  var count = 0;
  for (var i = 0; i < arrayForCheck.length; i++) {
      if (arrayForCheck[i] != "cell "+currentSymbol) {
        count = 0;
      } else {
        count += 1;
        if (winningCombination <= count) {
          return true;
        }
      }
    }
  return false;
}

function leftDiagonalCheck(matrixForChecking, currentSymbol) {
  var arrayForCheck = []
  for (var i = 0; i < matrixForChecking.length; i++) {
    var cell = i;
    arrayForCheck[i] = matrixForChecking[cell][cell];
  }

  var count = 0;
  for (var i = 0; i < arrayForCheck.length; i++) {
      if (arrayForCheck[i] != "cell "+currentSymbol) {
        count = 0;
      } else {
        count += 1;
        if (winningCombination <= count) {
          return true;
        }
      }
    }
  return false;
}

function rightDiagonalCheck(matrixForChecking, currentSymbol) {
  var arrayForCheck = []
  for (var i = 0; i < matrixForChecking.length; i++) {
    var cell = i; 
    arrayForCheck[i] = matrixForChecking[cell][matrixForChecking.length-1-cell];
  }
  
  var count = 0;
  for (var i = 0; i < arrayForCheck.length; i++) {
      if (arrayForCheck[i] != "cell "+currentSymbol) {
        count = 0;
      } else {
        count += 1;
        if (winningCombination <= count) {
          return true;
        }
      }
    }
  return false;
}

const crossChose = 'cross'
const circleChose = 'circle'
const cellElements = document.querySelectorAll('.cell')
const winningMessage = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageText = document.getElementById('winningMessageText')
let playerTurn;
let currentSymbol;



function startGame() {
  cellElements.forEach(cell => {
    cell.style.backgroundColor = "";
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setFigure()
  winningMessage.classList.remove('show')
}

startGame()

function setFigure() {
  board.classList.remove(crossChose)
  board.classList.remove(circleChose)
  if (playerTurn) {
    board.classList.add(circleChose)
  } else {
    board.classList.add(crossChose)
  }
}

function placeMark(cell, currentSymbol) {
  cell.classList.add(currentSymbol)
}

function handleClick(e) {
  const cell = e.target
  console.log(e);
  if (playerTurn) {
    currentSymbol = circleChose
  } else {
    currentSymbol = crossChose
  }
  console.log(currentSymbol);
  let handleCell = cell
  handleCell = handleCell.id.split('_');
  let centerRow=handleCell[0]
  let centerColumn=handleCell[1]
  let matrixForChecking = creatMatrixForCheckingTheWinner(centerRow, centerColumn, currentSymbol)
  let checkWin = rowCheck(matrixForChecking, currentSymbol)||columnCheck(matrixForChecking, currentSymbol)||rightDiagonalCheck(matrixForChecking, currentSymbol)||leftDiagonalCheck(matrixForChecking, currentSymbol);
  
  placeMark(cell, currentSymbol)
  if (checkWin) {
    endGame(false, currentSymbol)
  } //else is (checkDraw()) {endGame(true)} 
    else {
    swapTurns()
    setFigure()
  }
}

function swapTurns() {
  playerTurn = !playerTurn
}

restartButton.addEventListener('click', startGame)

function endGame(draw) {
  if (draw) {
    winningMessageText.innerText = 'DRAW!'
  } else {
    if (currentSymbol==crossChose) {
      winningMessageText.innerText = 'CROSS WINS!'
    } else {
      winningMessageText.innerText = 'CIRCLE WINS!'
    }
  }
  winningMessage.classList.add('show')
}


