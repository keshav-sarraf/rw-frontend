<template>
<div>
    <h4>Mission</h4>

    <p>
        Our target now is to find The Group's next plan. We have recovered multiple items from the laptop. All of these would need separate treatment. First one for you is a series of websites.
    </p>

    <p>
        Can you find the valid websites among the recovered list of websites. A valid website would be one which starts with 'http:' or 'https:'
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

            <div v-if="matchedWebsiteList.length > 0" class="row mb-4 border-top border-bottom">
                <div class="col-sm-12" v-for="(location, idx) in matchedWebsiteList" :key="location">
                    {{idx+1}}. <a v-bind:href="location.originalString"><span v-html="location.formattedString"></span></a>
                </div>
            </div>
            <div v-else>
                0 results to show
            </div>
        </div>

        <h6>List of Websites</h6>
        <div class="row my-2 border-top">
            <div class="col-sm-12" v-for="(location, idx) in websiteList" :key="location">
                {{idx+1}}. <a v-bind:href="location">{{location}}</a>
            </div>
        </div>

        <user-help v-if="!levelFinished" btnText="hint" helpText="look for the character that's different between http: and https:" />
    </div>

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
import websiteListJson from './websites.json';
import UserHelp from '../UserHelp.vue';

export default {
    components: {
        UserHelp,
    },
    emits: ["levelFinished"],
    setup(props, context) {
        const levelFinished = ref(false);
        const websiteList = ref(websiteListJson["web_links"].sort(() => Math.random() - 0.5));
        const matchedWebsiteList = ref([]);
        const userProvidedRegex = ref("");
        const regexErrorMessage = ref("");
        const targetRegex = new RegExp("https?:", "g");
        const target = websiteList.value.filter(w => regExUtil.matchRegexAndFormatInput(w, targetRegex) != null);

        const checkAnswer = function () {
            return target.length == matchedWebsiteList.value.length &&
                matchedWebsiteList.value.every(v => target.includes(v.originalString));
        }

        const executeRegex = function () {

            if (userProvidedRegex.value === "")
                return;

            matchedWebsiteList.value = [];
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

            for (let i = 0; i < websiteList.value.length; i++) {
                let website = websiteList.value[i];
                let regexResult = regExUtil.matchRegexAndFormatInput(website, re);
                if (regexResult)
                    matchedWebsiteList.value.push(regexResult);
            }

            if (checkAnswer()) {
                levelFinished.value = true;
                context.emit('levelFinished');
            }

            //console.log(matchedWebsiteList.value);
            //console.log(checkAnswer());
        }

        return {
            levelFinished,
            userProvidedRegex,
            regexErrorMessage,
            websiteList,
            matchedWebsiteList,
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
