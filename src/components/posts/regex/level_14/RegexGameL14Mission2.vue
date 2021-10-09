<template>
<div class="border border-5 p-1">
    <h5>Task 2</h5>

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

        <div v-if="matchedAmountsInvoice2.length > 0" class="row mb-4 border-top border-bottom">
            <div class="col-sm-12" v-for="(number, idx) in matchedAmountsInvoice2" :key="number">
                {{idx+1}}. <span v-html="number.formattedString"></span>
            </div>
        </div>
        <div v-else>
            0 results to show
        </div>
    </div>

    <h6>Invoice #2</h6>
    <div class="row my-2 border-top">
        <div class="col-sm-12" v-for="number in invoice2ItemsList" :key="number">
            {{number}}
        </div>
    </div>

    <user-help v-if="!levelFinished" btnText="hint" helpText="This is quite similar to one of the examples in the lesson" />

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
import invoice2 from './invoice2.json';
import UserHelp from '../UserHelp.vue';

export default {
    components: {
        UserHelp,
    },
    emits: ["levelFinished"],
    setup(props, context) {
        const levelFinished = ref(false);
        const invoice2ItemsList = ref(invoice2["items"].sort(() => Math.random() - 0.5));
        const matchedAmountsInvoice2 = ref([]);
        const userProvidedRegex = ref("");
        const regexErrorMessage = ref("");
        const targetRegex = new RegExp("[\\d.]+(?=\\sUSD)", "g");
        const targetMatches = invoice2ItemsList.value.filter(n => regExUtil.matchRegexAndFormatInput(n, targetRegex) != null);

        const checkAnswer = function () {
            return targetMatches.length == matchedAmountsInvoice2.value.length &&
                matchedAmountsInvoice2.value.every(v => targetMatches.includes(v.originalString));
        }

        const executeRegex = function () {

            if (userProvidedRegex.value === "")
                return;

            matchedAmountsInvoice2.value = [];
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

            for (let i = 0; i < invoice2ItemsList.value.length; i++) {
                let website = invoice2ItemsList.value[i];
                let regexResult = regExUtil.matchRegexAndFormatInput(website, re);
                if (regexResult)
                    matchedAmountsInvoice2.value.push(regexResult);
            }

            if (checkAnswer()) {
                levelFinished.value = true;
                context.emit('levelFinished', 'invoice2');
            }

            //console.log(matchedAmountsInvoice2.value);
            //console.log(checkAnswer());
        }

        return {
            levelFinished,
            userProvidedRegex,
            regexErrorMessage,
            invoice2ItemsList,
            matchedAmountsInvoice2,
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
