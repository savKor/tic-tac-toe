let matrixOne = [[4,2,7],[4,23,7],[3,2,9]];
let matrixTwo = [[9,21,7],[1,'df',6],[25,2,5]];

let array = matrixOne.length;

function sumOfMatrix() {
    let matrixSum=[]
    for (i=0; i<array; i++) {
        let rowNumber = i;
        matrixSum[i]=sumOfArrayElements(rowNumber);
    }
    return matrixSum;
}

function sumOfArrayElements(rowNumber) {
    let sum = []
    for (j=0; j<array; j++) {
        let columnNumber = j;
        sum[j] = matrixOne[rowNumber][columnNumber] + matrixTwo[rowNumber][columnNumber]
    }
    return sum;
}

var sumOfTwoMatrix = sumOfMatrix()
console.log(sumOfTwoMatrix)