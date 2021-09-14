<template>
<div class="container">

    <regex-game-header title="👀 Simple Search" :timeLimit=90 :finishedProgressPercent=0 :currentProgressPercent=100*1/15 :startTimer="levelStarted && !levelFinished" @time-elapsed="timeElapsedAction" @timer-restarted="timerRestartedAction" :resetTimer="resetTimer" />

    <div v-if="!levelStarted">
        <h4>Tutorial</h4>

        <p>
            You'd be given a block of text and a corresponding problem to find something in it. Your task is to to provide a regular expression that finds the text we are looking for. Remember the laptop is rigged to self destruct after sometime, so beware Agent Brown. Goodluck and godspeed 🏁.
        </p>

        <h4>Lesson</h4>

        <p>
            A regular expression (regex) is just a pattern of characters that we use to search within a given text. For example, the regular expression <code>the</code> means: the letter <code>t</code>, followed by the letter <code>h</code>, followed by the letter <code>e</code>.
        </p>
        <p>
            <code>"the" => The fat cat sat on <mark>the</mark> mat.</code>
        </p>
        <p>
            By default, regexes are normally case-sensitive so the regular expression <code>The</code> would <b>not</b> match the string <code>the</code>.
        </p>
        <p>
            <code>"The" => <mark>The</mark> fat cat sat on the mat.</code>
        </p>
    </div>

    <div v-if="levelStarted">
        <h4>Mission 1</h4>

        <p>
            Agent Brown, we have intercepted the following message.
        </p>

        <p class="border p-3">
            <em>I have the plans that you are looking for. Meet me near the lake in 3 days <br>- Lily</em>
        </p>

        <p>
            This is one of the biggest breakthroughs for us in quite sometime. There is a mention of a lake in the message, unfortunately we don't know which it is referring to. Insise the laptop, we have found a file containing a list of locations. Your task is to find out all the locations withing the list that have the word lake in their name. Enter a suitable regular expression and press "Execute Regex".
        </p>

        <div class="row">
            <div class="col-sm-4">
                <div class="input-group mb-3">
                    <input type="text" v-model="regex" @keydown.enter="executeRegex" class="form-control" placeholder="Enter regex" aria-label="Input Regex" aria-describedby="basic-addon2">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" @click="executeRegex">Execute RegEx</button>
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

        <div v-if="levelFinished" class="alert alert-success" role="alert">
            Thank You Agent Brown, this was helpful. We'll send recon teams to these lakes immediately. Feel free to play around with regex till then.
        </div>

        <button v-if="levelStarted && levelFinished" type="button" class="btn btn-success mb-3">Next Level</button>

        <h6>List of locations found in the laptop</h6>
        <div class="row my-2 border-top">
            <div class="col-sm-4" v-for="(location, idx) in locationList" :key="location">
                {{idx+1}}. {{location}}
            </div>
        </div>

        <div class="footer border-top">
            <h6>Credits:</h6>
            <p>List of locations is taken from <a href="https://edition.cnn.com/travel/article/natural-wonder-bucket-list/index.html">CNN's Natural Wonder Bucket List</a>. Head over there to view more information about each location.</p>
        </div>
    </div>

    <button v-if="!levelFinished" type="button" @click="levelStarted = !levelStarted" class="btn mb-3" :class="{ 'btn-danger': levelStarted, 'btn-primary' : !levelStarted}">{{levelStarted ? "Pause Level" : "Start Level"}}</button>
</div>
</template>

<script>
import RegexGameHeader from '../RegexGameHeader.vue';
import locationListJson from './locations.json';
import * as regExUtil from '../regexUtils.js';

import {
    ref
} from 'vue';

export default {
    components: {
        RegexGameHeader,
    },
    setup() {
        const resetTimer = ref(false);
        const levelStarted = ref(false);
        const levelFinished = ref(false);
        const locationList = ref(locationListJson["locations"]);
        const matchedLocationList = ref([]);
        const regex = ref("");
        const regexErrorMessage = ref("");
        const target = [
            "Pangong Tso Lake, India-China",
            "Lake Nakuru, Kenya",
            "Moraine Lake, Banff National Park, Alberta, Canada",
            "Lake Titicaca, Bolivia/Peru",
            "Plitvice Lakes, Croatia",
            "Lake Baikal, Russia"
        ];

        const checkAnswer = function () {
            return target.length == matchedLocationList.value.length &&
                matchedLocationList.value.every(v => target.includes(v.originalString));
        }

        const executeRegex = function () {
            matchedLocationList.value = [];
            let re;

            try {
                re = new RegExp(regex.value);
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

            if (checkAnswer())
                levelFinished.value = true;

            //console.log(matchedLocationList.value);
            //console.log(checkAnswer());
        }

        const timerRestartedAction = () => resetTimer.value = false;

        const timeElapsedAction = function () {
            alert('Time elapsed!! :X, Restarting Level');
            resetTimer.value = true;
            levelStarted.value = false;
            levelFinished.value = false;
            locationList.value = locationListJson["locations"];
            matchedLocationList.value = [];
            regex.value = "";
            regexErrorMessage.value = "";
        };

        return {
            regex,
            regexErrorMessage,
            timeElapsedAction,
            timerRestartedAction,
            executeRegex,
            levelStarted,
            locationList,
            matchedLocationList,
            levelFinished,
            resetTimer
        };
    },
}
</script>

<style>
.mark {
    margin: 0px;
    padding: 0px;
    background-color:gold
}
</style>
