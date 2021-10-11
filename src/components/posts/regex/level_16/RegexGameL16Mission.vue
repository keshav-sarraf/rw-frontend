<template>
<div>
    <h4>Mission</h4>

    <p>
        As far the submarine cables go, a good thing is that there is a lot of redundancy built in, there are multiple ways to connect 2 locations and even if  couple of connections get damaged, then there would not be much harm to the connectivity. These cables span more than a million kilometers in length. It is almost impossible to guard each and every location. To catch The Group in action, we have to identify few probable locations where the attack could take place. We have compiled a list of top 10 locations where the maximum number of cables intersect. If someone has to create havoc, then these locations seem more probable.
    </p>

    <p>
        The provided list contains a location code followed by the city followed by country and then the number of submarine cables that cross that city. Provide a regex that gives the city. We'll work accordingly
    </p>

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

        <div v-if="matchedCityList.length > 0" class="row mb-4 border-top border-bottom">
            <div class="col-sm-12" v-for="(number, idx) in matchedCityList" :key="number">
                {{idx+1}}. <span v-html="number.formattedString"></span>
            </div>
        </div>
        <div v-else>
            0 results to show
        </div>
    </div>

    <h6>List of Hubs</h6>
    <div class="row my-2 border-top">
        <div class="col-sm-12" v-for="number in cityList" :key="number">
            {{number}}
        </div>
    </div>

    <user-help v-if="!levelFinished" btnText="hint" helpText="try to think in terms of lookaheads and lookbehinds, PS: If you are using safari to run this, then lookbehinds don't work :(" />

    <!-- <div class="footer border-top">
        <h6>Credits:</h6>
        <p> This segment is inspired by an <a href="https://www.icann.org/en/blogs/details/the-problem-with-the-seven-keys-13-2-2017-en">ICANN article on the recovery keys</a>
        </p>
    </div> -->
</div>
</template>

<script>
import {
    ref
} from 'vue';

import * as regExUtil from '../regexUtils.js';
import numbersListJson from './submarine_cables.json';
import UserHelp from '../UserHelp.vue';

export default {
    components: {
        UserHelp,
    },
    emits: ["levelFinished"],
    setup(props, context) {
        const levelFinished = ref(false);
        const cityList = ref(numbersListJson["hubs"].sort(() => Math.random() - 0.5));
        const matchedCityList = ref([]);
        const userProvidedRegex = ref("");
        const regexErrorMessage = ref("");
        //const targetRegex = new RegExp("(?<=:\\s)([\\w,\\s]+)(?=,)", "g");
        const targetRegex = new RegExp("([\\w,\\s]+)(?=,)", "g");
        let targetMatches = cityList.value.filter(n => regExUtil.matchRegexAndFormatInput(n, targetRegex) != null);
        targetMatches = targetMatches.map(n => regExUtil.matchRegexAndFormatInput(n, targetRegex).formattedString);

        const checkAnswer = function () {
            return targetMatches.length == matchedCityList.value.length &&
                matchedCityList.value.every(v => targetMatches.includes(v.formattedString));
        }

        const executeRegex = function () {

            if (userProvidedRegex.value === "")
                return;

            matchedCityList.value = [];
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

            for (let i = 0; i < cityList.value.length; i++) {
                let website = cityList.value[i];
                let regexResult = regExUtil.matchRegexAndFormatInput(website, re);
                if (regexResult)
                    matchedCityList.value.push(regexResult);
            }

            if (checkAnswer()) {
                levelFinished.value = true;
                context.emit('levelFinished');
            }

            //console.log(matchedCityList.value);
            //console.log(checkAnswer());
        }

        return {
            levelFinished,
            userProvidedRegex,
            regexErrorMessage,
            cityList,
            matchedCityList,
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
