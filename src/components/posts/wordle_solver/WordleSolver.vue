<template>
<div class="container">
    <h2>🔎 Wordle Solver</h2>
    <h6>Published on 28th January 2022</h6>
    <h6>2 minutes read</h6>
    <hr>

<div>
    <a href="https://www.powerlanguage.co.uk/wordle/">Wordle</a> is a trending phenomena today. There's a nice <a href="https://www.nytimes.com/2022/01/03/technology/wordle-word-game-creator.html">NY times article</a> on it describing its origins. Frankly it's quite fun to play as well, but for people like me who are challenged in vocabulary, it's not exactly a piece of cake. So here's an app to help. Although I'd recommend not using this and instead playing the game in the sporting fashion it was meant to be played in.
</div>

    <div class="row my-2 py-2">
        <h3>I am not able to think of a word, suggest me something </h3>
    </div>

    <div class="row border my-2 py-2">
        <div class="col-sm-10">
            <p>
                If you don't know which word to start of with, you can generate random words with unique letters to get
                the most information out.
            </p>
            <button type="button" @click=getRandomUniqueLetteredWord class="btn btn-dark">Generate Unique Lettered Word</button>
        </div>
        <div class="col sm-2 align-self-end p-2">
            <h2 class="align-middle">{{randUniqueLetteredWord}}</h2>
        </div>
    </div>
    <div class="row border my-2 py-2">
        <div class="col-sm-10">
            <p>
                Or Generate a random 5 lettered word
            </p>
            <button type="button" @click=getRandomWord class="btn btn-dark">Generate Random Word</button>
        </div>
        <div class="col-sm-2 align-self-end p-2">
            <h2>{{randWord}}</h2>
        </div>
    </div>

    <div class="row my-2 py-2">
        <h3>I am in the middle of a game, suggest possible next words </h3>
    </div>

    <div class="row border my-2 py-2">
        <div class="col-sm-2">
            <h3 class="text-secondary">Grays</h3>
        </div>
        <div class="col-sm-5 align-self-end p-2">
            <!-- <label for="inputGrayLetters" class="form-label">Gray Letters</label> -->
            <input id="inputGrayLetters" style="text-transform: uppercase;" class="form-control bg-secondary text-white" aria-describedby="grayHelperBlock" v-model="grays">
            <div id="grayHelperBlock" class="form-text">
                Enter all the gray letters that you have seen so far. For e.g CSDEF
            </div>
        </div>
    </div>

    <div class="row border my-2 py-2">
        <div class="col-sm-2">
            <h3 class="text-warning">Yellows</h3>
        </div>
        <div class="col-sm-1 p-2">
            <!-- <label for="inputYellowLetter1" class="form-label">Yellow Letters</label> -->
            <input id="inputYellowLetter1" style="text-transform: uppercase;" class="form-control bg-warning text-darkr" aria-describedby="yellow1HelperBlock" v-model="y0">
            <div id="yellow1HelperBlock" class="form-text">
                Enter all the yellow letters at the first position
            </div>
        </div>

        <div class="col-sm-1 p-2">
            <!-- <label for="inputYellowLetter2" class="form-label"></label> -->
            <input id="inputYellowLetter2" style="text-transform: uppercase;" class="form-control bg-warning text-darkr" aria-describedby="yellow2HelperBlock" v-model="y1">
            <div id="yellow2HelperBlock" class="form-text">
                Enter all the yellow letters at the second position
            </div>
        </div>

        <div class="col-sm-1 p-2">
            <!-- <label for="inputYellowLetter3" class="form-label"></label> -->
            <input id="inputYellowLetter3" style="text-transform: uppercase;" class="form-control bg-warning text-darkr" aria-describedby="yellow3HelperBlock" v-model="y2">
            <div id="yellow3HelperBlock" class="form-text">
                Enter all the yellow letters at the third position
            </div>
        </div>

        <div class="col-sm-1 p-2">
            <!-- <label for="inputYellowLetter4" class="form-label"></label> -->
            <input id="inputYellowLetter4" style="text-transform: uppercase;" class="form-control bg-warning text-darkr" aria-describedby="yellow4HelperBlock" v-model="y3">
            <div id="yellow4HelperBlock" class="form-text">
                Enter all the yellow letters at the fourth position
            </div>
        </div>

        <div class="col-sm-1 p-2">
            <!-- <label for="inputYellowLetter5" class="form-label"></label> -->
            <input id="inputYellowLetter5" style="text-transform: uppercase;" class="form-control bg-warning text-darkr" aria-describedby="yellow5HelperBlock" v-model="y4">
            <div id="yellow5HelperBlock" class="form-text">
                Enter all the yellow letters at the fifth position
            </div>
        </div>

    </div>

    <div class="row border my-2 py-2">
        <div class="col-sm-2">
            <h3 class="text-success">Greens</h3>
        </div>
        <div class="col-sm-1 p-2">
            <!-- <label for="inputgreenLetter1" class="form-label">green Letters</label> -->
            <input id="inputgreenLetter1" style="text-transform: uppercase;" class="form-control bg-success text-white" aria-describedby="green1HelperBlock" v-model="g0">
            <div id="green1HelperBlock" class="form-text">
                Enter all the green letters at the first position
            </div>
        </div>

        <div class="col-sm-1 p-2">
            <!-- <label for="inputgreenLetter2" class="form-label"></label> -->
            <input id="inputgreenLetter2" style="text-transform: uppercase;" class="form-control bg-success text-white" aria-describedby="green2HelperBlock" v-model="g1">
            <div id="green2HelperBlock" class="form-text">
                Enter all the green letters at the second position
            </div>
        </div>

        <div class="col-sm-1 p-2">
            <!-- <label for="inputgreenLetter3" class="form-label"></label> -->
            <input id="inputgreenLetter3" style="text-transform: uppercase;" class="form-control bg-success text-white" aria-describedby="green3HelperBlock" v-model="g2">
            <div id="green3HelperBlock" class="form-text">
                Enter all the green letters at the third position
            </div>
        </div>

        <div class="col-sm-1 p-2">
            <!-- <label for="inputgreenLetter4" class="form-label"></label> -->
            <input id="inputgreenLetter4" style="text-transform: uppercase;" class="form-control bg-success text-white" aria-describedby="green4HelperBlock" v-model="g3">
            <div id="green4HelperBlock" class="form-text">
                Enter all the green letters at the fourth position
            </div>
        </div>

        <div class="col-sm-1 p-2">
            <!-- <label for="inputgreenLetter5" class="form-label"></label> -->
            <input id="inputgreenLetter5" style="text-transform: uppercase;" class="form-control bg-success text-white" aria-describedby="green5HelperBlock" v-model="g4">
            <div id="green5HelperBlock" class="form-text">
                Enter all the green letters at the fifth position
            </div>
        </div>

        <div v-if="greenErrorMsg" class="col-sm-2">
            <p class="text-danger">{{greenErrorMsg}}</p>
        </div>

    </div>

    <div class="row border my-2 py-2">
        <div class="col-sm-2">
            <h3>Suggestions</h3>
        </div>

        <div class="col-sm-10 text-start m-auto">
            <span v-for="(suggestion,index) in suggestions" :key="index" class="badge bg-primary m-1">
                {{suggestion.toUpperCase()}}
            </span>
        </div>
    </div>

</div>
</template>

<script>
import {
    computed,
    ref,
    watch
} from 'vue';
import wordListJson from './wordle_words.json'
import * as word_finder_util from './word_finder_util.js';

export default {
    setup() {
        const wordList = wordListJson;
        const uniqueLetterWords = word_finder_util.getFirstWordSuggestions(wordList);

        const randUniqueLetteredWord = ref("");
        const randWord = ref("");
        const grays = ref("");
        const y0 = ref("");
        const y1 = ref("");
        const y2 = ref("");
        const y3 = ref("");
        const y4 = ref("");
        const g0 = ref("");
        const g1 = ref("");
        const g2 = ref("");
        const g3 = ref("");
        const g4 = ref("");
        const greenErrorMsg = ref("");

        watch(grays, (n, o) => {
            console.log("Gray changed from : " + o + " to : " + n);

            // let filteredResults = word_finder_util.grayFilter(wordList, n);
            // console.log(filteredResults);
        });

        watch([y0, y1, y2, y3, y4], ([y0n, y1n, y2n, y3n, y4n], [y0o, y1o, y2o, y3o, y4o]) => {
            console.log("Yellow0 changed from : " + y0o + " to : " + y0n);
            console.log("Yellow1 changed from : " + y1o + " to : " + y1n);
            console.log("Yellow2 changed from : " + y2o + " to : " + y2n);
            console.log("Yellow3 changed from : " + y3o + " to : " + y3n);
            console.log("Yellow4 changed from : " + y4o + " to : " + y4n);

            // let filteredResults = word_finder_util.yellowFilter(wordList, [y0n,y1n,y2n,y3n,y4n]);
            // console.log(filteredResults);
        });

        watch([g0, g1, g2, g3, g4], ([g0n, g1n, g2n, g3n, g4n], [g0o, g1o, g2o, g3o, g4o]) => {
            console.log("Green0 changed from : " + g0o + " to : " + g0n);
            console.log("Green1 changed from : " + g1o + " to : " + g1n);
            console.log("Green2 changed from : " + g2o + " to : " + g2n);
            console.log("Green3 changed from : " + g3o + " to : " + g3n);
            console.log("Green4 changed from : " + g4o + " to : " + g4n);

            let lettersArr = [g0n, g1n, g2n, g3n, g4n];
            let hasMultipleChars = !lettersArr.some(l => l.length > 1);

            if (!hasMultipleChars)
                greenErrorMsg.value = "There can be only one green character at each position";
            else
                greenErrorMsg.value = "";

            // let filteredResults = word_finder_util.greenFilter(wordList, [g0n,g1n,g2n,g3n,g4n]);
            // console.log(filteredResults);
        });

        function shuffleArr(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var rand = Math.floor(Math.random() * (i + 1));
                [array[i], array[rand]] = [array[rand], array[i]]
            }
        }

        const suggestions = computed(() => {
            //checks
            //TODO: same letter can't be in all 3 colors

            let result = wordList;

            if (grays.value != "")
                result = word_finder_util.grayFilter(result, grays.value);

            if (y0.value != "" || y1.value != "" || y2.value != "" || y3.value != "" || y4.value != "")
                result = word_finder_util.yellowFilter(result, [y0.value, y1.value, y2.value, y3.value, y4.value]);

            if (g0.value != "" || g1.value != "" || g2.value != "" || g3.value != "" || g4.value != "")
                result = word_finder_util.greenFilter(result, [g0.value, g1.value, g2.value, g3.value, g4.value]);

            shuffleArr(result);

            if (result.length > 200)
                return result.slice(0, 200);

            return (result);
        });

        let numUniqueLetterWords = uniqueLetterWords.length;
        const getRandomUniqueLetteredWord = () => {
            randUniqueLetteredWord.value = uniqueLetterWords[Math.floor(Math.random() * numUniqueLetterWords)];
            randUniqueLetteredWord.value = randUniqueLetteredWord.value.toUpperCase();
        }

        let numWords = wordList.length;
        const getRandomWord = () => {
            randWord.value = wordList[Math.floor(Math.random() * numWords)];
            randWord.value = randWord.value.toUpperCase();
        }

        return {
            grays,
            y0,
            y1,
            y2,
            y3,
            y4,
            g0,
            g1,
            g2,
            g3,
            g4,
            greenErrorMsg,
            randUniqueLetteredWord,
            randWord,
            getRandomUniqueLetteredWord,
            getRandomWord,
            suggestions
        }
    },
}
</script>
