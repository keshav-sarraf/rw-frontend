const generateNextRandNumMiddleSquare = (seed, numDigits) => {
    const square = seed * seed;
    let strSquare = square.toString();

    //target length of square is double the numDigits with padding available on both sides
    let lenZeroPad = strSquare.length < numDigits * 2 ? numDigits * 2 - strSquare.length : 0;
    lenZeroPad = (lenZeroPad + strSquare.length - numDigits) % 2 == 1 ? lenZeroPad + 1 : lenZeroPad

    strSquare = new Array(lenZeroPad + 1).join("0") + strSquare;
    const padding = (strSquare.length - numDigits) / 2

    const nextNum = parseInt(strSquare.substring(padding, padding + numDigits));
    //console.log([seed, square, strSquare, padding, nextNum]);
    return nextNum;
};

const generateRandSequenceMiddleSquare = (seed, numDigits) => {

    let generatedRandNum = parseInt(seed);
    let arr = [generatedRandNum];

    const numbersSeen = new Set();
    numbersSeen.add(generatedRandNum);
    let loopVal = null;

    while (loopVal === null) {
        const nextRandNum = generateNextRandNumMiddleSquare(generatedRandNum, numDigits);

        if (numbersSeen.has(nextRandNum) && loopVal === null) {
            loopVal = nextRandNum;
            arr.push(nextRandNum);
            generatedRandNum = nextRandNum;
        } else if (loopVal === null) {
            arr.push(nextRandNum);
            generatedRandNum = nextRandNum;
            numbersSeen.add(generatedRandNum);
        }
    }

    return {arr, loopVal};
}

export {generateNextRandNumMiddleSquare, generateRandSequenceMiddleSquare};