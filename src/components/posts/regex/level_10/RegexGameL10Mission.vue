<template>
<div>
    <h4>Mission</h4>

    <p>
        Those coordinates belonged to couple of office buildings and few monuments around the globe. We have not been able to find a connection between these locations and are looking further into it. Next, we have a list of recovered file names. Our forensic tech team has informed us that it'd be quicker for them to recover pdf documents from the hard drive.
    </p>

    <p>
        Given a list of files, figure out which ones are .pdf documents and extract their name without extension.
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

            <div v-if="matchedFileList.length > 0" class="row mb-4 border-top border-bottom">
                <div class="col-sm-4" v-for="(number, idx) in matchedFileList" :key="number">
                    {{idx+1}}. <span v-html="number.formattedString"></span>
                    <span> --> subgroups : </span> {{number.groups}}
                </div>
            </div>
            <div v-else>
                0 results to show
            </div>
        </div>

        <h6>List of Files</h6>
        <div class="row my-2 border-top">
            <div class="col-sm-2" v-for="number in fileList" :key="number">
                {{number}}
            </div>
        </div>

        <user-help v-if="!levelFinished" btnText="hint" helpText="We have to achieve 2 things here, finding all pdf documents and capture the name of the document. Searching for pdf documents should be easy, the new challenge is capturing just the name of the file" />
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
import numbersListJson from './files.json';
import UserHelp from '../UserHelp.vue';

export default {
    components: {
        UserHelp,
    },
    emits: ["levelFinished"],
    setup(props, context) {
        const levelFinished = ref(false);
        const fileList = ref(numbersListJson["files"]);
        const matchedFileList = ref([]);
        const userProvidedRegex = ref("");
        const regexErrorMessage = ref("");
        const targetRegex = new RegExp("(.*)[.]pdf", "g");
        const targetMatches = fileList.value.filter(n => regExUtil.matchRegexAndFormatInput(n, targetRegex) != null);
        let targetGroups = targetMatches.map(n => regExUtil.matchRegexAndFormatInput(n, targetRegex).groups);
        targetGroups = targetGroups.flat();

        const checkAnswer = function () {
            return targetMatches.length == matchedFileList.value.length &&
                matchedFileList.value.every(v => targetMatches.includes(v.originalString)) &&
                matchedFileList.value.every(v => v.groups.some(w => targetGroups.includes(w)));
        }

        const executeRegex = function () {

            if (userProvidedRegex.value === "")
                return;

            matchedFileList.value = [];
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

            for (let i = 0; i < fileList.value.length; i++) {
                let website = fileList.value[i];
                let regexResult = regExUtil.matchRegexAndFormatInput(website, re);
                if (regexResult)
                    matchedFileList.value.push(regexResult);
            }

            if (checkAnswer()) {
                levelFinished.value = true;
                context.emit('levelFinished');
            }

            //console.log(matchedFileList.value);
            //console.log(checkAnswer());
        }

        return {
            levelFinished,
            userProvidedRegex,
            regexErrorMessage,
            fileList,
            matchedFileList,
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
