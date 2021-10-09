<template>
<div>
    <h4>Mission</h4>

    <p>
        We think we have cracked The Group's next plan. When we cross referenced the documents, images and the coordinates, one thing stood out. A non profit organization called ICANN. Its purpose is to manage DNS infrastructure including it's security. If you remember from our previous conversations about root servers, all of them fall under ICANN's purview. ICANN itself only manages 1 of them and has allocated rest of them to other organisations.
    </p>
    <p>

        As we have told you before, DNS network is like a telephone directory (or the contacts app) for computers. We give the computer a website like - "www.reinventingwheel.com" and the telephone directory returns the website's IP address. In the Phase 1 of the Project Blackout, The group planned to make this entire directory unavailable to the public. Now since that has failed, they are planning to counterfeit the directory and distribute it within the public, so whenever a user looks for a website, they'll be directed to something else. It'll be as if someone purposefully shuffled and names and numbers of all the contacts in our phone.
    </p>
    <p>
        DNS infrastructure already has a security system built in to prevent counterfeiting. It is called DNSSEC. It works on a principal called public key cryptography. In a nutshell, the system consists of 2 keys, one is called private key and is stored secretly while and the other is called public key which is freely given to anyone who asks for it. Sender of the information signs the data with his/her private key. The receiver can then use sender's public key to check the sanctity of the information. If someone tampers with the information midway, then receiver would know and can then take appropriate actions.
    </p>
    <p>
        At DNSSEC's heart sits a set of secret private keys that is crucial to DNSSEC. If The Group is able to get hold of these private keys, then they would be able to tamper with all the DNS traffic. They would be able to intercept communications, read the content of the messages and replace them with something malicious. Since they'd have signed the malicious information with the sender's private key, the receiver won't be able to detect that the message was tampered with.
    </p>
    <p>
        Imagine you visit the website of your bank and it turns out that the website which opened up is actually a malicious copy of the original site, that website can trick you into providing all your details and potentially render your bank account empty
    </p>

    <p>
        The actual keys are stored in a tamper proof device which can only be operated under complete supervision of ICANN employees. However, to plan for extreme circumstances like destruction of these tamper proof boxes, ICANN stores a copy of the keys in a secure locker within it's facilities. That locker in turn can only be accessed by a select few internet security experts. We have a list of those people below.
    </p>
    <p>
        Your task is to provide the name and country code of these people so that we can ensure their safety. Additionally we need your regex to be able to capture names of these experts as well. As usual your provided regex would be matched with these strings individually.
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

            <div v-if="matchedPeopleList.length > 0" class="row mb-4 border-top border-bottom">
                <div class="col-sm-12" v-for="(number, idx) in matchedPeopleList" :key="number">
                    {{idx+1}}. <span v-html="number.formattedString"></span>
                    <span> --> subgroups : </span> {{number.groups}}
                </div>
            </div>
            <div v-else>
                0 results to show
            </div>
        </div>

        <h6>List of Websites</h6>
        <div class="row my-2 border-top">
            <div class="col-sm-12" v-for="(number, idx) in peopleList" :key="number">
                {{idx+1}}. {{number}}
            </div>
        </div>

        <user-help v-if="!levelFinished" btnText="hint" helpText="^ can be helpful if you need to search from the begining of a line. () can be used to capture a portion of the matching string." />
    </div>
    <br>
    <div class="footer border-top">
        <h6>Credits:</h6>
        <p> This segment is inspired by an <a href="https://www.icann.org/en/blogs/details/the-problem-with-the-seven-keys-13-2-2017-en">ICANN article on the recovery keys</a>
        </p>
    </div>
</div>
</template>

<script>
import {
    ref
} from 'vue';

import * as regExUtil from '../regexUtils.js';
import numbersListJson from './people.json';
import UserHelp from '../UserHelp.vue';

export default {
    components: {
        UserHelp,
    },
    emits: ["levelFinished"],
    setup(props, context) {
        const levelFinished = ref(false);
        const peopleList = ref(numbersListJson["people"]);
        const matchedPeopleList = ref([]);
        const userProvidedRegex = ref("");
        const regexErrorMessage = ref("");
        const targetRegex = new RegExp("^(.*), ([A-Z]{2})", "g");
        const targetMatches = peopleList.value.filter(n => regExUtil.matchRegexAndFormatInput(n, targetRegex) != null);
        let targetGroups = targetMatches.map(n => regExUtil.matchRegexAndFormatInput(n, targetRegex).groups);
        targetGroups = targetGroups.flat();

        const checkAnswer = function () {
            return targetMatches.length == matchedPeopleList.value.length &&
                matchedPeopleList.value.every(v => targetMatches.includes(v.originalString)) &&
                matchedPeopleList.value.every(v => v.groups.every(w => targetGroups.includes(w)));
        }

        const executeRegex = function () {

            if (userProvidedRegex.value === "")
                return;

            matchedPeopleList.value = [];
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

            for (let i = 0; i < peopleList.value.length; i++) {
                let website = peopleList.value[i];
                let regexResult = regExUtil.matchRegexAndFormatInput(website, re);
                if (regexResult)
                    matchedPeopleList.value.push(regexResult);
            }

            if (checkAnswer()) {
                levelFinished.value = true;
                context.emit('levelFinished');
            }

            //console.log(matchedPeopleList.value);
            //console.log(checkAnswer());
        }

        return {
            levelFinished,
            userProvidedRegex,
            regexErrorMessage,
            peopleList,
            matchedPeopleList,
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
