<template>
<div class="container">

    <regex-game-header title="👀 Simple Search" :timeLimit=600 :finishedProgressPercent=0 :currentProgressPercent=100*1/15 :startTimer="startLevel" @time-elapsed="timeElapsedAction" />

    <div v-if="!startLevel">
        <h4>Tutorial</h4>

        <p>
            You'd be given a block of text and a corresponding problem to find something in it. Your task is to to provide a regular expression that solves the associated problem. Remember the laptop is rigged to self destruct after sometime, so beware Agent Brown. Goodluck and godspeed 🏁.
        </p>

        <h4>Lesson</h4>

        <p>
            A regular expression (regex) is just a pattern of characters that we use to search within a given text. For example, the regular expression <code>the</code> means: the letter <code>t</code>, followed by the letter <code>h</code>, followed by the letter <code>e</code>.
        </p>
        <p>
            <code>"the" => The fat cat sat on <mark>the</mark> mat.</code>
        </p>
        <p>
            By default, regexes are normally case-sensitive so the regular expression <code>The</code> would not match the string <code>the</code>.
        </p>
        <p>
            <code>"The" => <mark>The</mark> fat cat sat on the mat.</code>
        </p>
    </div>

    <div v-if="startLevel">
        <h4>Mission 1</h4>

        <p>
            Agent Brown, we have intercepted the following message from an operative of The Group.
        </p>

        <p class="border p-3">
            <em>I have the old magazines that you were looking for. Meet me at our factory near the lake. You know the time <br>- Lily</em>
        </p>

        <p>
            This is one of the biggest breakthroughs that we have had in quite sometime. There is a mention of a factory near a lake, unfortunately we don't know anything about the factory or the lake mentioned in there. Within the laptop, we have recovered a list of locations. Your task is to figure out mentions of all the "lakes" in that list.
        </p>

        <div class="row mb-4 border">
            <div class="col-sm-6" v-for="(location, idx) in locationList" :key="location">
                {{idx+1}}. {{location}}
            </div>
        </div>

        <div class="row">
            <div class="col-sm-4">
                <div class="input-group mb-3">
                    <input type="text" v-model="regex" class="form-control" placeholder="Enter regex" aria-label="Input Regex" aria-describedby="basic-addon2">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" @click="executeRegex">Execute RegEx</button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="matchedLocationList.length > 0">
            <h6>Matched Locations</h6>

            <div class="row mb-4 border">
                <div class="col-sm-6" v-for="(location, idx) in matchedLocationList" :key="location">
                    {{idx+1}}. <span v-html="location"></span>
                </div>
            </div>
        </div>
    </div>

    <button type="button" @click="startLevel = !startLevel" class="btn mb-3" :class="{ 'btn-danger': startLevel, 'btn-primary' : !startLevel}">{{startLevel ? "Pause Level" : "Start Level"}}</button>

    <div class="footer border-top">
        <h6>Credits:</h6>
        <p>List of locations is taken from <a href="https://edition.cnn.com/travel/article/natural-wonder-bucket-list/index.html">CNN's Natural Wonder Bucket List</a>. Head over there to view more information about each location.</p>
    </div>

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
        const startLevel = ref(false);
        const locationList = ref(locationListJson["locations"]);
        const matchedLocationList = ref([]);
        const regex = ref("");

        const executeRegex = function(){
            matchedLocationList.value = [];
            let re;

            try {
                re = new RegExp(regex.value);
            } catch(e) {
                console.log(e);
                return;
            }

            for(let i=0; i < locationList.value.length; i++){
                let loc = locationList.value[i];
                let regexResult = regExUtil.matchRegexAndFormatInput(loc, re);
                if(regexResult)
                    matchedLocationList.value.push(regexResult);
            }

            console.log(matchedLocationList.value);
        }

        const timeElapsedAction = function () {
            alert('time elapsed');
        };

        return {
            regex,
            timeElapsedAction,
            executeRegex,
            startLevel,
            locationList,
            matchedLocationList
        };
    },
}
</script>
