const board = document.getElementById('board')



/** 

  Нужно выполнить создание div через двумерный массив.
    1.Создание двумерного массива
    2.Связаться с элементами внутри двумерного массива.
    3.Задать значение на каждый элемент, чтобы создавался div.
  Чтобы строки и клетки доски создавались в соответсвие элемента массива.
    1.
  И ещё дать этим div-ам сразу название их класса.
*/


function createMatrix (){
  var matrix = [];
  var n = 6, m = 6;
  for(var i=0; i<n; i++) {
      matrix[i] = getMatrixRowWithEmptyElement(m);
  }
  return matrix
}

function getMatrixRowWithEmptyElement(size) {
  var row = []
  for (var j=0; j<size; j++) {
    row[j]=undefined;
  }
  return row;
}

var matrix = createMatrix();

function renderMatrix() {
  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];
    renderRow(row, i)
  }
}


function renderRow (row, rowIndex) {
  var newDiv = document.createElement("div");
  newDiv.className = 'row';
  newDiv.id = 'row'+rowIndex;
  board.appendChild(newDiv);
  const rowElement = document.getElementById('row'+rowIndex)
  rowElement.style.display = "flex";
  for (let j = 0; j < row.length; j++) {
    renderCell(rowIndex,j,rowElement)
  }
}

function renderCell (rowIndex,columIndex,rowElement) {
  var newDiv = document.createElement("div");
  newDiv.className = 'cell';
  newDiv.id = rowIndex+"_"+columIndex;
  rowElement.appendChild(newDiv);
}

renderMatrix()

/** 
  Нужно сделать проверку двумерного массива.
    1.При нажатие на клетку у нас должна образовываться матрица проверки выиграша
      (матрица, которая служит для проверки выйиграша игрока. сама матрица имеет размер winningCombination*2-1)
    2.Написать функцию проверки
      1.Проверка горизонтали
      2.Проверка вертикали
      3.Проверка по диагонали
    3.Написать функцию для проверки в сетке
*/

const winningCombination = 4;

//создание матрицы для проверки
function creatMatrixForCheckingTheWinner(centerRow, centerColumn, currentSymbol) {
  var matrixToCheck = [];
  var matrixRow = winningCombination*2-1;
  var matrixCell = winningCombination*2-1;
  for(var i=0; i<matrixRow; i++) {
    var rowIndex = centerRow-winningCombination+1+i;
    matrixToCheck[i] = getMatrixRowWithElementsFromMainMatrix(matrixCell, rowIndex, centerColumn);
  }
  matrixToCheck[winningCombination-1][winningCombination-1] = "cell "+currentSymbol
  return matrixToCheck
}

function getMatrixRowWithElementsFromMainMatrix(size, rowIndex, centerColumn) {
  let row = []
  for (let j=0; j<size; j++) {
    let columIndex = centerColumn-winningCombination+1+j;
    let originalCell
    if (rowIndex<0||rowIndex>=matrix.length||columIndex<0||columIndex>=matrix.length) {
      originalCell = undefined
    } else {
      originalCell = document.getElementById(rowIndex+"_"+columIndex).className
    }
    row[j]=originalCell
  }
  return row;
}


/**
Проверка по горизонтали
1.Сделать вариант проверки слева и справа от центральной клетки
2.Проверка должна проверять с центральной клетки
3.Провести проверку со всех сторон центральной клетки

function rowCheck(cell, currentSymbol, centerRow, centerColum, matrixForChecking) {
  var winMatrix = [];
  for (let i = 0; i < matrixForChecking[winningCombination].length; i++) {
    var cellAfterCenter = document.getElementById(centerRow+"_"+centerColum-i);
    if (cellAfterCenter.classList.contains(currentSymbol)) {
      
    } else {
      break;
    }
  }
}
*/

function rowCheck(matrixForChecking, currentSymbol) {
  var arrayForCheck = []
  for (var i = 0; i < matrixForChecking.length; i++) {
    var cell = i;
    arrayForCheck[i] = matrixForChecking[winningCombination-1][cell];
  }
  
  console.log(arrayForCheck)
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

function columCheck(matrixForChecking, currentSymbol) {
  var arrayForCheck = []
  for (var i = 0; i < matrixForChecking.length; i++) {
    var cell = i;
    arrayForCheck[i] = matrixForChecking[cell][winningCombination-1];
  }
  
  console.log(arrayForCheck)
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
  
  console.log(arrayForCheck)
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
    var cell = matrixForChecking.length-1-i;
    arrayForCheck[i] = matrixForChecking[cell][cell];
  }
  
  console.log(arrayForCheck)
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

/** 

function checkWin() {
}

*/

const crossChose = 'cross'
const circleChose = 'circle'
const cellElements = document.querySelectorAll('.cell')
const winningMessage = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageText = document.getElementById('winningMessageText')
let playerTurn
let currentSymbol



function startGame() {
  cellElements.forEach(cell => {
    cell.classList.remove(crossChose)
    cell.classList.remove(circleChose)
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

//функция добавляет к 
function placeMark(cell, currentSymbol) {
  cell.classList.add(currentSymbol)
}


//функция для начала работы с матрицей и рисования крестиков и ноликов.
function handleClick(e) {
  const cell = e.target
  console.log(e);
  if (playerTurn) {
    currentSymbol = circleChose
  } else {
    currentSymbol = crossChose
  }
  console.log(currentSymbol);
  var matrixСenter = cell
  matrixСenter = matrixСenter.id.split('_');
  var centerRow=matrixСenter[0]
  var centerColumn=matrixСenter[1]
  var matrixForChecking = creatMatrixForCheckingTheWinner(centerRow, centerColumn, currentSymbol)
  console.log(matrixForChecking)
  placeMark(cell, currentSymbol)
  if (columCheck(matrixForChecking, currentSymbol)||rightDiagonalCheck(matrixForChecking, currentSymbol)||leftDiagonalCheck(matrixForChecking, currentSymbol)||rowCheck(matrixForChecking, currentSymbol)) {
    endGame(false)
  } //else is (checkDraw()) {endGame(true)} 
    else {
    swapTurns()
    setFigure()
  }
}

//смена хода
function swapTurns() {
  playerTurn = !playerTurn
}

restartButton.addEventListener('click', startGame)

function endGame(draw) {
  if (draw) {
    winningMessageText.innerText = 'DRAW!'
  } else {
    winningMessageText.innerText = 'VICTORY!'
  }
  winningMessage.classList.add('show')
}


/**

// надо придумать вариант для ничьи.
function checkDraw() {
}

**/