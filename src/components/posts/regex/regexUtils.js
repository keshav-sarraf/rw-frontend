const matchRegexAndFormatInput = (inputString, re) => {

    let formattedMatch = matchAndFormatRegexRecursive(inputString, re);

    if(formattedMatch){
        return {
            "originalString" : inputString,
            "formattedString" :  formattedMatch,
        }
    } else {
        return(null);
    }
        
}

const matchAndFormatRegexRecursive = (inputString, re) => {
    let regexResult = re.exec(inputString);

    if (regexResult === null)
        return(null);

    
    let match = regexResult[0];
    let matchStartIdx = regexResult.index;
    let leftSubStr = inputString.substring(0, matchStartIdx);
    let matchedSubStr = inputString.substring(matchStartIdx, matchStartIdx + match.length);
    let rightSubStr = inputString.substring(matchStartIdx + match.length, inputString.length);

    let rightSubStrMatch = null;

    if(re.global)
        rightSubStrMatch = matchAndFormatRegexRecursive(rightSubStr, re);
    
    let formattedString = "";

    if(rightSubStrMatch){
        formattedString = leftSubStr + '<mark class="mark"><u>' + matchedSubStr + '</u></mark>' + rightSubStrMatch;
    } else {
        formattedString = leftSubStr + '<mark class="mark"><u>' + matchedSubStr + '</u></mark>' + rightSubStr;
    }

    return(formattedString);
}

export {matchRegexAndFormatInput};