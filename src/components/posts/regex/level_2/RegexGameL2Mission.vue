<template>
<div>
    <h4>Mission</h4>

    <p>
        Agent Brown,
        <br>
        Whoever the laptop belonged to was a cautious person. Most of the documents and emails were already deleted. After trying very hard, our technical team was able to extract fragments of information.
    </p>

    <p>
        Our sources have informed us that The Group has named their plan to disrupt the internet as Project Blackout. We have a list of partial email subjects from the laptop, As you can see that certain characters are a bit jumbled up. Can you help us search the ones which could be potentially referring to "Project Blackout".
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

            <div v-if="matchedEmailList.length > 0" class="row mb-4 border-top border-bottom">
                <div class="col-sm-4" v-for="(location, idx) in matchedEmailList" :key="location">
                    {{idx+1}}. <span v-html="location.formattedString"></span>
                </div>
            </div>
            <div v-else>
                0 results to show
            </div>
        </div>

        <h6>List of Emails found in the laptop</h6>
        <div class="row my-2 border-top">
            <div class="col-sm-12" v-for="location in emailList" :key="location">
                {{location}}
            </div>
        </div>

        <user-help v-if="!levelFinished" btnText="hint" helpText="Look for the subjects that could potentially resemble the words 'Project Blackout' and create a regular expression using . metacharacter to select the necessary emails" />
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
import emailListJson from './emails.json';
import UserHelp from '../UserHelp.vue';

export default {
    components: {
        UserHelp,
    },
    emits: ["levelFinished"],
    setup(props, context) {
        const levelFinished = ref(false);
        const emailList = ref(emailListJson["emails"].sort(() => Math.random() - 0.5));
        const matchedEmailList = ref([]);
        const userProvidedRegex = ref("");
        const regexErrorMessage = ref("");
        const targetRegex = new RegExp("..oject .lackout");
        const target = emailList.value.filter(email => targetRegex.exec(email) != null);

        const checkAnswer = function () {
            return target.length == matchedEmailList.value.length &&
                matchedEmailList.value.every(v => target.includes(v.originalString));
        }

        const executeRegex = function () {

            if (userProvidedRegex.value === "")
                return;

            matchedEmailList.value = [];
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

            for (let i = 0; i < emailList.value.length; i++) {
                let email = emailList.value[i];
                let regexResult = regExUtil.matchRegexAndFormatInput(email, re);
                if (regexResult)
                    matchedEmailList.value.push(regexResult);
            }

            if (checkAnswer()) {
                levelFinished.value = true;
                context.emit('levelFinished');
            }

            //console.log(matchedEmailList.value);
            //console.log(checkAnswer());
        }

        return {
            levelFinished,
            userProvidedRegex,
            regexErrorMessage,
            emailList,
            matchedEmailList,
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
