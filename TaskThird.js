// First version
// Использовал алгоритм "жадного" поиска
const set = { 'set': [1, 1, 4, 2, 10, 11, 3, 2, 3, 1, 4, 2] }
const set2 = { 'set': [3, 4, 2, 5, 8, 3, 1, 4, 2] }

console.log(findPartition(set))
console.log(findPartition(set2))

function findPartition(integers) {
    if (typeof integers['set'] !== "object") {
        throw new Error('Entry value is wrong');
    }
    let array01 = [];
    let array02 = [];
    let sum1 = 0;
    let sum2 = 0;
    let halfSum = integers['set'].reduce((a, b) => { return (a + b) }) / 2;
    let sortedArr = integers['set'].sort((a, b) => {
        return a - b;
    });

    let arrayLength = sortedArr.length;
    for (let i = 0; i < arrayLength; i++) {

        if (sum1 <= sum2 || sum2 >= halfSum) {
            array01.push(sortedArr[i]);
            sum1 += sortedArr[i];
        } else {
            array02.push(sortedArr[i]);
            sum2 += sortedArr[i];
        }
    }


    console.log("sum_01", " = ", sum1, "; ", "sum_02", " = ", sum2, ";")

    return {
        'set_01': [...array01],
        'set_02': [...array02],
    }

}


// ==================== Second version

// var numbers = [0, 1, 2, 3, 4, 5, 6, 7];

// function sumSeven(numbers) {
//     let sortedArr = numbers.sort((a, b) => {
//         return a - b;
//     })


//     let n = sortedArr.length - 1,
//         sum1 = 0,
//         sum2 = 0,
//         arr1 = [],
//         arr2 = [],
//         va1, va2, j;
//     for (let k = n; k >= 1; k -= 2) {
//         if (sum1 <= sum2) {
//             j = 0;
//             while (sum1 + sortedArr[k] > sum2 + sortedArr[j] && j < k - 1) j++;
//             va1 = sortedArr.splice(k, 1)[0];
//             va2 = sortedArr.splice(j, 1)[0];
//         }
//         else {
//             j = 0;
//             while (sum2 + sortedArr[k] > sum1 + sortedArr[j] && j < k - 1) j++;
//             va2 = sortedArr.splice(k, 1)[0];
//             va1 = sortedArr.splice(j, 1)[0];
//         }
//         arr1[arr1.length] = va1;
//         arr2[arr2.length] = va2;
//         sum1 += va1;
//         sum2 += va2;


//         console.log(a1, a2)
//     }
// }

// sumSeven(numbers); // 