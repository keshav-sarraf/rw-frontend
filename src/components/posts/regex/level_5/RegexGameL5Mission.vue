<template>
<div>
    <h4>Mission</h4>

    <p>
        We are in touch with all the 12 organizations that maintain these root servers. They are working on a security patch to prevent the attack, in the meanwhile if we know which servers would be attacked first, then we can monitor those more closely and hold off the attackers.
    </p>

    <p>
        We have more information on the first wave of the attack, within the 8 servers which have ".1" in their address, we believe that the ones which have the sequence ".1x8" have more probability of being hit first. In ".1x8", x can be any character except 2. We have the list of servers presented in a line by line format. We need you to provide a regex which when matched with each of these lines searches for the servers which have more probability of getting attacked.
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

            <div v-if="matchedrootServerList.length > 0" class="row mb-4 border-top border-bottom">
                <div class="col-sm-12" v-for="(location, idx) in matchedrootServerList" :key="location">
                    {{idx+1}}. <span v-html="location.formattedString"></span>
                </div>
            </div>
            <div v-else>
                0 results to show
            </div>
        </div>

        <h6>List of Root Servers</h6>
        <div class="row my-2 border-top">
            <div class="col-sm-12" v-for="location in rootServerList" :key="location">
                {{location}}
            </div>
        </div>

        <user-help v-if="!levelFinished" btnText="hint" helpText="try to match the pattern .1x8 where x is any character except '2'. You can use [^] for negation." />
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
import rootServerListJson from './root_servers.json';
import UserHelp from '../UserHelp.vue';

export default {
    components: {
        UserHelp,
    },
    emits: ["levelFinished"],
    setup(props, context) {
        const levelFinished = ref(false);
        const rootServerList = ref(rootServerListJson["root_servers"]);
        const matchedrootServerList = ref([]);
        const userProvidedRegex = ref("");
        const regexErrorMessage = ref("");
        const targetRegex = new RegExp("[.]1[^2]8");
        const target = rootServerList.value.filter(email => targetRegex.exec(email) != null);

        const checkAnswer = function () {
            return target.length == matchedrootServerList.value.length &&
                matchedrootServerList.value.every(v => target.includes(v.originalString));
        }

        const executeRegex = function () {

            if (userProvidedRegex.value === "")
                return;

            matchedrootServerList.value = [];
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

            for (let i = 0; i < rootServerList.value.length; i++) {
                let email = rootServerList.value[i];
                let regexResult = regExUtil.matchRegexAndFormatInput(email, re);
                if (regexResult)
                    matchedrootServerList.value.push(regexResult);
            }

            if (checkAnswer()) {
                levelFinished.value = true;
                context.emit('levelFinished');
            }

            //console.log(matchedrootServerList.value);
            //console.log(checkAnswer());
        }

        return {
            levelFinished,
            userProvidedRegex,
            regexErrorMessage,
            rootServerList,
            matchedrootServerList,
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
