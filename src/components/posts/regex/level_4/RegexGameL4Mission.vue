<template>
<div>
    <h4>Mission</h4>

    <p>
        DNS infrastructure functions like a chain. In simple terms, whenever our computers asks the DNS network about IP address of a website, a computer in that DNS network checks if it knows the answer, if it knows, then it replies back immediately, otherwise it asks another computer in the chain and the sequence goes on till the answer is found. Within this chain the below mentioned 13 IP addresses play an important role. These IP addresses belong to something called root servers. Almost all the chain of queries in the DNS network end up encountering one of these 13 root servers. Although there are only 13 IP addresses, they are hosted by hundreds of computers spread over the world. In order for The Group to bring the whole DNS system down, they'd have to take down majority of these servers.
    </p>

    <p>
        We have received information that the attack would happen in batches and the first wave would hit all the servers which have ".1" in their addresses.
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
                <div class="col-sm-4" v-for="(location, idx) in matchedrootServerList" :key="location">
                    {{idx+1}}. <span v-html="location.formattedString"></span>
                </div>
            </div>
            <div v-else>
                0 results to show
            </div>
        </div>

        <h6>List of Root Servers</h6>
        <div class="row my-2 border-top">
            <div class="col-sm-4" v-for="(location, idx) in rootServerList" :key="location">
                {{idx+1}}. {{location}}
            </div>
        </div>

        <user-help v-if="!levelFinished" btnText="hint" helpText="a literal . can be represented using /. or [.]" />
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
        const targetRegex = new RegExp("[.]1");
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
