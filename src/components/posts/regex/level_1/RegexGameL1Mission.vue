<template>
<div>
    <h4>Mission</h4>

    <p>
        Agent Brown, the retrieved laptop is password protected. In her last message, Agent White gave us a clue.
    </p>

    <p class="border p-3">
        <em>These people are on to me. I have hidden a laptop it in the library. Look for the book : 0833030477 <br>- W
            <br>
            <br>
            PS: Password is name of a place and contains the letters "St"
        </em>
    </p>

    <p>
        We have compiled a list of possible locations for you. Your task is to find out all locations within the list that have the letters "St" in their name. Enter a suitable regular expression and press "Execute Regex". Your provided input will be matched with each entry and you'd be shown the matching results.
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

            <div v-if="matchedLocationList.length > 0" class="row mb-4 border-top border-bottom">
                <div class="col-sm-4" v-for="(location, idx) in matchedLocationList" :key="location">
                    {{idx+1}}. <span v-html="location.formattedString"></span>
                </div>
            </div>
            <div v-else>
                0 results to show
            </div>
        </div>

        <h6>List of locations found in the laptop</h6>
        <div class="row my-2 border-top">
            <div class="col-sm-4" v-for="(location, idx) in locationList" :key="location">
                {{idx+1}}. {{location}}
            </div>
        </div>

        <user-help v-if="!levelFinished" btnText="hint" helpText="Regular Expressions are case sensitive." />
    </div>
    <br>
    <div class="footer border-top rounded">
        <h6>Credits:</h6>
        <p>List of locations is taken from <a href="https://edition.cnn.com/travel/article/natural-wonder-bucket-list/index.html">CNN's natural wonder bucket list</a> and <a href="https://www.planetware.com/world/top-rated-tourist-attractions-in-the-world-cam-1-40.htm">Planet Ware's 20 top rated tourist attractions in the world list</a>.</p>
    </div>
</div>
</template>

<script>
import {
    ref
} from 'vue';

import * as regExUtil from '../regexUtils.js';
import locationListJson from './locations.json';
import UserHelp from '../UserHelp.vue';

export default {
    components: {
        UserHelp,
    },
    emits: ["levelFinished"],
    setup(props, context) {
        const levelFinished = ref(false);
        const locationList = ref(locationListJson["locations"]);
        const matchedLocationList = ref([]);
        const userProvidedRegex = ref("");
        const regexErrorMessage = ref("");
        const targetRegex = new RegExp("St");
        const target = locationList.value.filter(loc => targetRegex.exec(loc) != null);

        const checkAnswer = function () {
            return target.length == matchedLocationList.value.length &&
                matchedLocationList.value.every(v => target.includes(v.originalString));
        }

        const executeRegex = function () {

            if (userProvidedRegex.value === "")
                return;

            matchedLocationList.value = [];
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

            for (let i = 0; i < locationList.value.length; i++) {
                let loc = locationList.value[i];
                let regexResult = regExUtil.matchRegexAndFormatInput(loc, re);
                if (regexResult)
                    matchedLocationList.value.push(regexResult);
            }

            if (checkAnswer()) {
                levelFinished.value = true;
                context.emit('levelFinished');
            }

            //console.log(matchedLocationList.value);
            //console.log(checkAnswer());
        }

        return {
            levelFinished,
            userProvidedRegex,
            regexErrorMessage,
            locationList,
            matchedLocationList,
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
