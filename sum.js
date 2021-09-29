let matrixOne = [[4,2,7],[4,23,7],[3,2,9]];
let matrixTwo = [[9,21,7],[1,12,6],[25,2,5]];
let array = matrixOne.length;

function sumOfMatrix() {
    let matrixSum=[]
    let a = 3;
    let b = 3;
    for (i=0; i<a; i++) {
        let rowNumber = i;
        matrixSum[i]=sumOfNumbers(rowNumber,b);
    }
    return matrixSum;
}

function sumOfNumbers(rowNumber,b) {
    let sum = []
    for (j=0; j<b; j++) {
        let columnNumber = j;
        sum[j] = matrixOne[rowNumber][columnNumber] + matrixTwo[rowNumber][columnNumber]
    }
    return sum;
}

var sumOfTwoMatrix = sumOfMatrix()
console.log(sumOfTwoMatrix)