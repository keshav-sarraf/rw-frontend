const matchRegexAndFormatInput = (inputString, re) => {
    let regexResult = re.exec(inputString);

    if (regexResult != null){
        let match = regexResult[0];
        let matchStartIdx = regexResult.index;
        let leftSubStr = inputString.substring(0, matchStartIdx);
        let matchedSubStr = inputString.substring(matchStartIdx, matchStartIdx + match.length);
        let rightSubStr = inputString.substring(matchStartIdx + match.length, inputString.length);
        //console.log(leftSubStr);
        //console.log(matchedSubStr);
        //console.log(rightSubStr);
        let formattedString = leftSubStr + "<mark><u>" + matchedSubStr + "</u></mark>" + rightSubStr;

        return {
            "originalString" : inputString,
            "formattedString" :  formattedString
        };
    }

    return null;
}

export {matchRegexAndFormatInput};