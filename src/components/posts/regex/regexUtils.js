const matchRegexAndFormatInput = (inputString, re) => {

    let encodedString = inputString;
    let match = matchAndFormatRegexRecursive(encodedString, re);

    if(match){
        return {
            "originalString" : inputString,
            "formattedString" :  match.formattedString,
            "groups" : match.groups,
        }
    } else {
        return(null);
    }
        
}

const matchAndFormatRegexRecursive = (inputString, re) => {
    
    let regexResult = re.exec(inputString);
    //console.log(re);
    //console.log("input");
    //console.log(inputString);
    //console.log(regexResult);

    if (regexResult === null)
        return(null);

    let groups = [];
    for(let i=1; i<regexResult.length;i++){
        groups.push(regexResult[i]);
    }

    let match = regexResult[0];
    let matchStartIdx = regexResult.index;
    let leftSubStr = inputString.substring(0, matchStartIdx);
    let matchedSubStr = inputString.substring(matchStartIdx, matchStartIdx + match.length);
    let rightSubStr = inputString.substring(matchStartIdx + match.length, inputString.length);

    let rightSubStrMatch = null;

    if(re.global){
        re.lastIndex = 0;
        rightSubStrMatch = matchAndFormatRegexRecursive(rightSubStr, re);
    }
    
    //console.log("right");
    //console.log(rightSubStrMatch);

    let formattedString = "";

    if(rightSubStrMatch){
        formattedString = leftSubStr + '<mark class="mark"><u>' + matchedSubStr + '</u></mark>' + rightSubStrMatch.formattedString;
    } else {
        formattedString = leftSubStr + '<mark class="mark"><u>' + matchedSubStr + '</u></mark>' + rightSubStr;
    }

    let result = {
        "formattedString" : formattedString,
        "groups" : groups,
    };

    return(result);
}

export {matchRegexAndFormatInput};