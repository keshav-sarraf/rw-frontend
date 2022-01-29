const getFirstWordSuggestions = (wordList) => {
    let uniqueWords = wordList.filter(word => word.length == new Set(word.toLowerCase()).size);
    return(uniqueWords);
};

const grayFilter = (wordList, grayChars) => {
    let graySet = new Set(grayChars.toLowerCase());
    let filteredWords = wordList.filter(word => !word.toLowerCase().split("").some(letter => graySet.has(letter)));
    return(filteredWords);
}

const yellowFilter = (wordList, yellowCharsArr) => {
    yellowCharsArr = yellowCharsArr.map(letters => letters.replace(/\W+/g, "").replace(/\d+/g, ""));
    console.log(yellowCharsArr);
    let allYellowChars = yellowCharsArr.join("").toLowerCase();
    let yellowSet = new Set(allYellowChars);
    let yellowChars = [...yellowSet];
    let filteredWords1 = wordList.filter(word => yellowChars.every(letter => new Set(word).has(letter)));
    let idxArr = [0,1,2,3,4];

    let filteredWords2 = filteredWords1.filter(word => !idxArr.some(idx => yellowCharsArr[idx].toLowerCase().includes(word[idx].toLowerCase())));
    
    return(filteredWords2);
}

const greenFilter = (wordList, greenCharsArr) => {
    greenCharsArr = greenCharsArr.map(letters => letters.replace(/\W+/g, "").replace(/\d+/g, ""));
    let filteredWords = wordList.filter(word => [0,1,2,3,4].every(idx => (greenCharsArr[idx] == "") || greenCharsArr[idx].toLowerCase() == word[idx].toLowerCase()));
    return(filteredWords);
}

export {getFirstWordSuggestions, grayFilter, yellowFilter, greenFilter};