<template>
<div>
    <h4>Mission</h4>

    <p>
        I have both good news and bad news. Good news is that all the organizations that maintain these root servers have informed us that they have added security patches to prevent the attacks. Bad news is that, we have partially restored another email from the laptop's hard drive which indicates that the danger is far from over. Overloading DNS servers with requests was just phase 1 of the attack there more phases planned after this.
    </p>

    <p>
        We have a partially recovered email for you to analyze. They talk about multiple versions of Project Blackout. Provide a regex which returns all the versions, i.e. "Project Blackout", "Project Blackout1", "Project Blackout2", etc
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

        <div v-if="matchedEmailLineList.length > 0" class="row mb-4 border-top border-bottom">
            <div class="col-sm-12" v-for="(line, idx) in matchedEmailLineList" :key="line">
                {{idx+1}}. <span v-html="line.formattedString"></span>
            </div>
        </div>
        <div v-else>
            0 results to show
        </div>
    </div>

    <h6>Partially recovered email</h6>
    <div class="row my-2 border-top">
        <div class="col-sm-12" v-for="line in emailLineList" :key="line">
            {{line}}
        </div>
    </div>

    <user-help v-if="!levelFinished" btnText="hint" helpText="Can you use [] alongside * to get all mentions of project blackout" />

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
import emailMessageRaw from 'raw-loader!./plan_b_email.txt'
import UserHelp from '../UserHelp.vue';

export default {
    components: {
        UserHelp,
    },
    emits: ["levelFinished"],
    setup(props, context) {
        const levelFinished = ref(false);
        const emailLineList = ref(emailMessageRaw.split("\n"));
        const matchedEmailLineList = ref([]);
        //console.log(emailLineList.value);
        const userProvidedRegex = ref("");
        const regexErrorMessage = ref("");
        
        const targetRegex = new RegExp("Project Blackout[123]*", "g");
        let target = [];
        for (let i = 0; i < emailLineList.value.length; i++) {
            let regexResult = regExUtil.matchRegexAndFormatInput(emailLineList.value[i], targetRegex);
            if (regexResult)
                target.push(regexResult.formattedString);
        }

        const checkAnswer = function () {
            return target.length == matchedEmailLineList.value.length &&
                matchedEmailLineList.value.every(v => target.includes(v.formattedString));
        }

        const executeRegex = function () {

            if (userProvidedRegex.value === "")
                return;

            matchedEmailLineList.value = [];
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

            for (let i = 0; i < emailLineList.value.length; i++) {
                let email = emailLineList.value[i];
                let regexResult = regExUtil.matchRegexAndFormatInput(email, re);
                if (regexResult)
                    matchedEmailLineList.value.push(regexResult);
            }

            if (checkAnswer()) {
                levelFinished.value = true;
                context.emit('levelFinished');
            }

            //console.log(matchedEmailLineList.value);
            //console.log(checkAnswer());
        }

        return {
            levelFinished,
            userProvidedRegex,
            regexErrorMessage,
            emailLineList,
            matchedEmailLineList,
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
