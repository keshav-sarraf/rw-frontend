<template>
<div>
    <h4>Mission</h4>

    <p>
        Our surveillance team has identified some suspicious activity in the vicinity of ICANN facilities. We believe that there are vehicles surveilling the area. They could be The Group's men. The team on the ground sent us a list containing suspicious vehicle registrations. Somehow the list got corrupted in transmission and got mixed with random gibberish.
    </p>

    <p>
        Can you help us find valid vehicle registrations from the list please. It has the following properties.
        <ol>
            <li>Starts with 2 uppercase alphabets</li>
            <li>It is followed by a hyphen (-)</li>
            <li>Then comes 2 numeric characters</li>
            <li>Followed by 3 alphabets of either uppercase or lowercase</li>
        </ol>
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

            <div v-if="matchedVehicleList.length > 0" class="row mb-4 border-top border-bottom">
                <div class="col-sm-4" v-for="(number, idx) in matchedVehicleList" :key="number">
                    {{idx+1}}. <span v-html="number.formattedString"></span>
                </div>
            </div>
            <div v-else>
                0 results to show
            </div>
        </div>

        <h6>List of Websites</h6>
        <div class="row my-2 border-top">
            <div class="col-sm-4" v-for="(number, idx) in vehicleList" :key="number">
                {{idx+1}}. {{number}}
            </div>
        </div>

        <user-help v-if="!levelFinished" btnText="hint" helpText="you can use shorthand to make the regex a bit easier to read or you can go via character sets. If you use {} then things will get slighly easier" />
    </div>

    <!-- <div class="footer border-top">
        <h6>Credits:</h6>
        <p> This segment is inspired by an <a href="https://www.icann.org/en/blogs/details/the-problem-with-the-seven-keys-13-2-2017-en">ICANN article on the recovery keys</a>
        </p>
    </div> -->
</div>
</template>

<script>
import {
    ref
} from 'vue';

import * as regExUtil from '../regexUtils.js';
import numbersListJson from './vehicle_numbers.json';
import UserHelp from '../UserHelp.vue';

export default {
    components: {
        UserHelp,
    },
    emits: ["levelFinished"],
    setup(props, context) {
        const levelFinished = ref(false);
        const vehicleList = ref(numbersListJson["vehicles"].sort(() => Math.random() - 0.5));
        const matchedVehicleList = ref([]);
        const userProvidedRegex = ref("");
        const regexErrorMessage = ref("");
        const targetRegex = new RegExp("[A-Z]{2}-\\d{2}\\w{3}", "g");
        const targetMatches = vehicleList.value.filter(n => regExUtil.matchRegexAndFormatInput(n, targetRegex) != null);

        const checkAnswer = function () {
            return targetMatches.length == matchedVehicleList.value.length &&
                matchedVehicleList.value.every(v => targetMatches.includes(v.originalString));
        }

        const executeRegex = function () {

            if (userProvidedRegex.value === "")
                return;

            matchedVehicleList.value = [];
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

            for (let i = 0; i < vehicleList.value.length; i++) {
                let website = vehicleList.value[i];
                let regexResult = regExUtil.matchRegexAndFormatInput(website, re);
                if (regexResult)
                    matchedVehicleList.value.push(regexResult);
            }

            if (checkAnswer()) {
                levelFinished.value = true;
                context.emit('levelFinished');
            }

            //console.log(matchedVehicleList.value);
            //console.log(checkAnswer());
        }

        return {
            levelFinished,
            userProvidedRegex,
            regexErrorMessage,
            vehicleList,
            matchedVehicleList,
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
