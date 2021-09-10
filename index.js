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

const winningCombination = 3;

//создание матрицы для проверки
function creatMatrixForCheckingTheWinner(cell) {
  var matrixToCheck = [];
  var matrixСenter = cell
  matrixСenter = matrixСenter.id.split('_');
  var centerRow=matrixСenter[0]
  var centerCell=matrixСenter[1]
  console.log(centerRow)
  console.log(centerCell)
  var matrixRow = winningCombination*2-1;
  var matrixCell = winningCombination*2-1;
  for(var i=0; i<matrixRow; i++) {
    matrixToCheck[i] = getMatrixRowWithElementsFromMainMatrix(matrixCell);
    edOriginalRowIndex(centerRow, centerCell)
  }
  console.log(matrixToCheck[winningCombination][winningCombination])
  return matrix
}


function getMatrixRowWithElementsFromMainMatrix(size) {
  var row = []
  for (var j=0; j<size; j++) {
    row[j]=undefined;
  }
  return row;
}




function edOriginalRowIndex(centerRow, centerCell) {
  for (let originalRowIndex = centerRow-winningCombination-1; originalRowIndex < centerRow+winningCombination-1; originalRowIndex++) {
    if (originalRowIndex<0||originalRowIndex<matrix.length) {
      break
    }  else {
      matrixToCheck[i] = edOriginalCellIndex(matrixCell, centerCell);
      matrixToCheck[i]=matrix[originalRowIndex];
    }
  }
} 

function edOriginalCellIndex(size, centerCell) {
  for (var j=0; j<size; j++) {
    for (let originalCellIndex = centerCell-winningCombination-1; originalCellIndex < centerCell+winningCombination-1; originalCellIndex++) {
      if (originalCellIndex<0||originalCellIndex<matrix.length) {
        break
      }  else {
        row[j]=row[originalCellIndex];
      }
    }
  }
}



function checkWin() {
}

function boardCheck() {
}


/** 

//Проверка строки 

for ()

//Проверка столбца


//Провека диагонали


//
/** 
  Нужно сделать отрисовку крестиков и ноликов.
    1.Написать как при нажатие на клетку будет рисоваться рисунок крестика или нолика
*/

const crossChose = 'cross'
const circleChose = 'circle'
const cellElements = document.querySelectorAll('.cell')
const winningMessage = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageText = document.getElementById('winningMessageText')
let turn
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
  if (turn) {
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
  if (turn) {
    currentSymbol = circleChose
  } else {
    currentSymbol = crossChose
  }
  console.log(currentSymbol)
  var matrixForChecking = creatMatrixForCheckingTheWinner(cell)
  console.log(matrixForChecking)
  placeMark(cell, currentSymbol)
  if (checkWin()) {
    endGame(false)
  } //else is (checkDraw()) {endGame(true)} 
    else {
    swapTurns()
    setFigure()
  }
}


function swapTurns() {
  turn = !turn
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