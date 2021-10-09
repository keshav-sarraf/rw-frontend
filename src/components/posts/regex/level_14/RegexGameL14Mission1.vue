<template>
<div>
    <h4>Mission</h4>

    <p>
        The number plates on the cars are fake so it'd be slightly difficult to track the people driving them. Our operatives on the ground found one of the cars abandoned in a parking lot. On searching it, they found couple of old supermarket invoices. They are faded so we only have partial information visible on them. We hope to use these invoices to talk to the departmental store and see if we can find more information on the person driving the car.
    </p>

    <p>
        We have 2 invoices from 2 different stores. Both the stores have agreed to help us by giving us their CCTV footage. As you can see that date and time on the invoices are faded however the amount is intact. These footages span over several days. We can't scan through all of it. One possible solution is to check the store records for sales that were made for the given amount in these receipts and see if we can id the person.
    </p>

    <p>
        Your Task is to provide a regex for both the invoices which just provide the amount of individual items without the currency symbol. If the invoice says- $45 or 45 USD, the regex should return "45".
    </p>

    <div class="border border-5 p-1">
        <h5>Task 1</h5>

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

            <div v-if="matchedAmountsInvoice1.length > 0" class="row mb-4 border-top border-bottom">
                <div class="col-sm-12" v-for="(number, idx) in matchedAmountsInvoice1" :key="number">
                    {{idx+1}}. <span v-html="number.formattedString"></span>
                </div>
            </div>
            <div v-else>
                0 results to show
            </div>
        </div>

        <h6>Invoice #1</h6>
        <div class="row my-2 border-top">
            <div class="col-sm-12" v-for="number in invoice1ItemsList" :key="number">
                {{number}}
            </div>
        </div>

        <user-help v-if="!levelFinished" btnText="hint" helpText="Remember $ is a metacharacter in itself, you'd have to use \$ for selecting it. Also $ sign preceeds 1 or more numbers, we can use the symbol + here" />
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
import invoice1 from './invoice1.json';
import UserHelp from '../UserHelp.vue';

export default {
    components: {
        UserHelp,
    },
    emits: ["levelFinished"],
    setup(props, context) {
        const levelFinished = ref(false);
        const invoice1ItemsList = ref(invoice1["items"].sort(() => Math.random() - 0.5));
        const matchedAmountsInvoice1 = ref([]);
        const userProvidedRegex = ref("");
        const regexErrorMessage = ref("");
        const targetRegex = new RegExp("(?<=\\$)\\d+", "g");
        const targetMatches = invoice1ItemsList.value.filter(n => regExUtil.matchRegexAndFormatInput(n, targetRegex) != null);

        const checkAnswer = function () {
            return targetMatches.length == matchedAmountsInvoice1.value.length &&
                matchedAmountsInvoice1.value.every(v => targetMatches.includes(v.originalString));
        }

        const executeRegex = function () {

            if (userProvidedRegex.value === "")
                return;

            matchedAmountsInvoice1.value = [];
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

            for (let i = 0; i < invoice1ItemsList.value.length; i++) {
                let website = invoice1ItemsList.value[i];
                let regexResult = regExUtil.matchRegexAndFormatInput(website, re);
                if (regexResult)
                    matchedAmountsInvoice1.value.push(regexResult);
            }

            if (checkAnswer()) {
                levelFinished.value = true;
                context.emit('levelFinished', 'invoice1');
            }

            //console.log(matchedAmountsInvoice1.value);
            //console.log(checkAnswer());
        }

        return {
            levelFinished,
            userProvidedRegex,
            regexErrorMessage,
            invoice1ItemsList,
            matchedAmountsInvoice1,
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
