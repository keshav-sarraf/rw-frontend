<template>
<div>
    <h4>Mission</h4>

    <p>
        We still don't know what The Group's next plans are. Previous set of links were a dead end. They seemed to be mostly meme websites. Next in line is a list of numbers. We don't see any pattern yet but we suspect that some of them may be geographical coordinates to a location.
    </p>

    <p>
        From the list below, figure out the geographical coordinates. A geographical coordinate is defined as an optional - sign followed by 1-3 digit number followed by a decimal point followed by a 14 digit number. As a suggestion, you can use a regex shorthand \d in place of [0-9] character set. It represents all the numeric characters
    </p>

    <div class="border border-3 p-2 rounded">
        <div class="row" v-if="!levelFinished">
            <div class="col-sm-4">
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

            <div v-if="matchedNumberList.length > 0" class="row mb-4 border-top border-bottom">
                <div class="col-sm-12" v-for="(number, idx) in matchedNumberList" :key="number">
                    {{idx+1}}. <span v-html="number.formattedString"></span>
                </div>
            </div>
            <div v-else>
                0 results to show
            </div>
        </div>

        <h6>List of Numbers</h6>
        <div class="row my-2 border-top">
            <div class="col-sm-12" v-for="number in numberList" :key="number">
                {{number}}
            </div>
        </div>

        <user-help v-if="!levelFinished" btnText="hint" helpText="questionmark ? can used for optional characters, backslash and a fullstop \. can be used to select the fullstop. Can you combine these with curly braces {} to get the answer" />
    </div>

    <!-- <div class="footer border-top">
        <h6>Credits:</h6>
        <p>List of numbers is taken from <a href="https://edition.cnn.com/travel/article/natural-wonder-bucket-list/index.html">CNN's natural wonder bucket list</a> and <a href="https://www.planetware.com/world/top-rated-tourist-attractions-in-the-world-cam-1-40.htm">Planet Ware's 20 top rated tourist attractions in the world list</a>. Head over there to view more information about each number.</p>
    </div> -->
</div>
</template>

<script>
import {
    ref
} from 'vue';

import * as regExUtil from '../regexUtils.js';
import numbersListJson from './numbers.json';
import UserHelp from '../UserHelp.vue';

export default {
    components: {
        UserHelp,
    },
    emits: ["levelFinished"],
    setup(props, context) {
        const levelFinished = ref(false);
        const numberList = ref(numbersListJson["numbers"]);
        const matchedNumberList = ref([]);
        const userProvidedRegex = ref("");
        const regexErrorMessage = ref("");
        const targetRegex = new RegExp("[-]?[0-9]{1,3}.[0-9]{14}", "g");
        const target = numberList.value.filter(n => regExUtil.matchRegexAndFormatInput(n, targetRegex) != null);
        const formattedTarget = target.map(n => regExUtil.matchRegexAndFormatInput(n, targetRegex).formattedString);

        const checkAnswer = function () {
            return target.length == matchedNumberList.value.length &&
                matchedNumberList.value.every(v => formattedTarget.includes(v.formattedString));
        }

        const executeRegex = function () {

            if (userProvidedRegex.value === "")
                return;

            matchedNumberList.value = [];
            regexErrorMessage.value = "";
            let re;

            try {
                re = new RegExp(userProvidedRegex.value, "g");
            } catch (e) {
                //console.log(e);
                regexErrorMessage.value = e;
                //console.log(regexErrorMessage);
                return;
            }

            for (let i = 0; i < numberList.value.length; i++) {
                let website = numberList.value[i];
                let regexResult = regExUtil.matchRegexAndFormatInput(website, re);
                if (regexResult)
                    matchedNumberList.value.push(regexResult);
            }

            if (checkAnswer()) {
                levelFinished.value = true;
                context.emit('levelFinished');
            }

            //console.log(matchedNumberList.value);
            //console.log(checkAnswer());
        }

        return {
            levelFinished,
            userProvidedRegex,
            regexErrorMessage,
            numberList,
            matchedNumberList,
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
