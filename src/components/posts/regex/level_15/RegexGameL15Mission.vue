<template>
<div>
    <h4>Mission</h4>

    <p>
        We have received an encoded message from Agent White.
    </p>

    <p>
        Agent white has hidden the message between random words. It is hard to read the received message. The words that are meant for us to read, have one or more copies of 'x' or 'z' before them. Your task is to provide a regex which filters the necessary words and highlights the prefix characters so that we can read the exact message
    </p>

    <div class="row" v-if="!levelFinished">
        <div class="col-sm-3">
            <div class="input-group mb-3">
                <input type="text" v-model="userProvidedRegex" @keydown.enter="executeRegex" class="form-control" placeholder="Enter regex" aria-label="Input Regex">
                <div class="input-group-append">
                    <button class="btn btn-outline-primary" type="button" @click="executeRegex">Execute RegEx</button>
                </div>
            </div>
        </div>
    </div>

    <div v-if="regexErrorMessage" class="alert alert-danger" role="alert">
        {{regexErrorMessage}}
    </div>

    <div class="mb-3">
        <h6>Results matching the Regex</h6>

        <div v-if="matchedWordList.length > 0" class="row mb-4 border-top border-bottom">
            <div class="col-sm-2" v-for="location in matchedWordList" :key="location">
                <span v-html="location.formattedString"></span>
            </div>
        </div>
        <div v-else>
            0 results to show
        </div>
    </div>

    <h6>Message from agent White:</h6>
    <div class="row my-2 border-top">
        <div class="col-sm-2" v-for="location in wordList" :key="location">
            {{location}}
        </div>
    </div>

    <user-help v-if="!levelFinished" btnText="hint" helpText="can you use [] and + to select all the words needed in the message" />

    <!-- <div class="footer border-top">
        <h6>Credits:</h6>
        <p>List of locations is taken from <a href="https://edition.cnn.com/travel/article/natural-wonder-bucket-list/index.html">CNN's natural wonder bucket list</a> and <a href="https://www.planetware.com/world/top-rated-tourist-attractions-in-the-world-cam-1-40.htm">Planet Ware's 20 top rated tourist attractions in the world list</a>. Head over there to view more information about each location.</p>
    </div> -->
</div>
</template>

<script>
import {
    ref
} from 'vue';

import * as regExUtil from '../regexUtils.js';
import encryptedMessage from 'raw-loader!./encrypted_message.txt'
import UserHelp from '../UserHelp.vue';

export default {
    components: {
        UserHelp,
    },
    emits: ["levelFinished"],
    setup(props, context) {
        const levelFinished = ref(false);
        const wordList = ref(encryptedMessage.split(" "));
        //console.log(wordList.value);
        const matchedWordList = ref([]);
        const userProvidedRegex = ref("");
        const regexErrorMessage = ref("");
        const targetRegex = new RegExp("[xz]+", "g");
        const target = wordList.value.filter(loc => regExUtil.matchRegexAndFormatInput(loc, targetRegex) != null);

        const checkAnswer = function () {
            console.log(target);
            console.log(matchedWordList.value);


            return target.length == matchedWordList.value.length &&
                matchedWordList.value.every(v => target.includes(v.originalString));
        }

        const executeRegex = function () {

            if (userProvidedRegex.value === "")
                return;

            matchedWordList.value = [];
            let re;

            try {
                re = new RegExp(userProvidedRegex.value, "g");
            } catch (e) {
                //console.log(e);
                regexErrorMessage.value = e;
                //console.log(regexErrorMessage);
                return;
            }

            regexErrorMessage.value = "";

            for (let i = 0; i < wordList.value.length; i++) {
                let loc = wordList.value[i];
                let regexResult = regExUtil.matchRegexAndFormatInput(loc, re);
                if (regexResult)
                    matchedWordList.value.push(regexResult);
            }

            if (checkAnswer()) {
                levelFinished.value = true;
                context.emit('levelFinished');
            }

            //console.log(matchedWordList.value);
            //console.log(checkAnswer());
        }

        return {
            levelFinished,
            userProvidedRegex,
            regexErrorMessage,
            wordList,
            matchedWordList,
            executeRegex,
        };
    },
}
</script>

<style>
.mark {
    margin: 0px;
    padding: 0px;
    background-color: gold
}
</style>
