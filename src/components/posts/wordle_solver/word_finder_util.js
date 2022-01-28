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
    let allYellowChars = yellowCharsArr.join("").toLowerCase();
    let yellowSet = new Set(allYellowChars);
    let yellowChars = [...yellowSet];
    let filteredWords1 = wordList.filter(word => yellowChars.every(letter => new Set(word).has(letter)));
    let idxArr = [0,1,2,3,4];

    let filteredWords2 = filteredWords1.filter(word => !idxArr.some(idx => yellowCharsArr[idx].toLowerCase().includes(word[idx].toLowerCase())));
    
    return(filteredWords2);
}

export {getFirstWordSuggestions, grayFilter, yellowFilter};