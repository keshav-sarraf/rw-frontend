<template>
<div>
    <h4>Mission</h4>

    <p>
        We have figured out the Group's plans. They want to overwhelm the DNS infrastructure of the internet. DNS stands for Domain Name System. In simple terms, it is like a phone book for our computers. Whenever we ask our computer / phone to take us to "www.reinveingwheel.com", our device relies on DNS to find the IP address of the server where the website www.reinveingwheel.com is hosted. Once our browser know's the IP address, it can then establish a connection. If the DNS infrastructure is down, then even though all the websites would be fully functional, our computers won't be able to connect to them.
    </p>

    <p>
        Below is an email from the anonymous describing how the attack would take place. There is mention of a software called ramp. The problem is that the word "ramp" is mentioned in the email as either "RAMP" or "ramp" at different places. Your task is to write a regex query that returns both the versions of the word "ramp" - ("RAMP" and "ramp").
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
        <h6>Retrieved Email:</h6>

        <div v-if="searchedEmailMessage != null" class="row mb-4 border-top border-bottom">
            <div v-html="searchedEmailMessage">
            </div>
        </div>
        <div v-else>
            <div class="row my-2 border-top" v-html="emailMessage">
            </div>
        </div>
    </div>

    <user-help v-if="!levelFinished" btnText="hint" helpText="Can you use character sets '[]' to search for both words 'RAMP' and 'ramp'. [Rr] will look for both characters R and r"/>

    <div class="footer border-top">
        <h6>Credits:</h6>
        <p>Following <a href="https://www.cloudflare.com/en-in/learning/ddos/dns-amplification-ddos-attack/">article</a> explains a bit more about the nature of DDoS attack. Following <a href="https://pastebin.com/NKbnh8q8">Pastebin</a> link contains the the actual message from Anonymous on which this exercise is based</p>
    </div>
</div>
</template>

<script>
import {
    ref
} from 'vue';

import UserHelp from '../UserHelp.vue';
import emailMessageRaw from 'raw-loader!./anonymous_mail.html'
import * as regExUtil from '../regexUtils.js';

export default {
    components: {
        UserHelp,
    },
    emits: ["levelFinished"],
    setup(props, context) {
        const levelFinished = ref(false);
        const emailMessage = ref(emailMessageRaw);
        const searchedEmailMessage = ref(null);
        const userProvidedRegex = ref("");
        const regexErrorMessage = ref("");
        const targetRegex = new RegExp("[Rr][Aa][Mm][Pp]", "g");
        const target = regExUtil.matchRegexAndFormatInput(emailMessage.value, targetRegex);

        const executeRegex = function () {

            console.log("execute regex called");

            if (userProvidedRegex.value === "")
                return;

            searchedEmailMessage.value = null;
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

            let regexResult = regExUtil.matchRegexAndFormatInput(emailMessage.value, re);
            if (regexResult != null)
                searchedEmailMessage.value = regexResult.formattedString;
            
            if(regexResult.formattedString == target.formattedString){
                levelFinished.value = true;
                context.emit('levelFinished');
            } else {
                console.log("Don't Match");
            }
        }

        return {
            levelFinished,
            userProvidedRegex,
            regexErrorMessage,
            emailMessage,
            searchedEmailMessage,
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
