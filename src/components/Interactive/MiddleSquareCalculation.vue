<template>
<div class="border my-2 p-2">
    <div class="row">
        <div class="col-sm-10 m-auto">
            <label for="customRange" class="form-label">Select a number between 1 - 9999 to be used as a seed</label>
            <input v-model="userSelectedSeed" type="range" class="form-range" min="1" max="9999" id="customRange">
        </div>

        <div class="col text-center m-auto">
            <label for="selectedSeed" class="form-label">Selected Seed</label>
            <h4 id="selectedSeed">{{userSelectedSeed}}</h4>
        </div>

        <div class="col text-center m-auto">
            <label for="lenChain" class="form-label">Length of the chain</label>
            <h4 id="lenChain">{{randArr.length-1}}</h4>
        </div>

    </div>
    <div class="row">
        <div class="col-sm-12 text-start m-auto">
            <label for="generatedRandNums" class="form-label">Generated sequence (Click on a number to see details)</label>
            <div id="generatedRandNums">
                <span v-for="(num,index) in randArr" :key="index" class="badge m-1" :class="{ 'bg-success': isSeed(num), 'bg-danger': isDuplicate(num), 'bg-primary' : !isSeed(num) && !isDuplicate(num) }" @click="setCalculationDetailIdx(index)">
                    {{num}}
                </span>
            </div>
        </div>
    </div>
    <div class="row" v-if="calculationDetail.num">

        <div class="col text-center m-auto">
            <label for="selectedNumber" class="form-label">Selected random number</label>
            <h4 id="selectedNumber">{{calculationDetail.num}}</h4>
        </div>

        <div class="col text-center m-auto">
            <label for="seedForSelectedNumber" class="form-label">Seed for the random number</label>
            <h4 id="seedForSelectedNumber">{{calculationDetail.seed}}</h4>
        </div>

        <div class="col text-center m-auto">
            <label for="selectedNumberCalculation" class="form-label">Calculation</label>
            <h4 id="selectedNumberCalculation" v-if="calculationDetail.seed">{{calculationDetail.seed}} Squared = {{calculationDetail.prepad}}<u>{{calculationDetail.num}}</u>{{calculationDetail.postpad}}</h4>
        </div>

    </div>
</div>
</template>

<script>
import {
    ref,
    watch,
    reactive,
} from 'vue';

import * as prng from '../../utils/customRandNumGen.js';

import _ from 'lodash'

export default {
    setup() {
        //for experiment
        const userSelectedSeed = ref(318);
        const numDigits = 4;
        const result = prng.generateRandSequenceMiddleSquare(userSelectedSeed.value, numDigits);
        const calculationDetail = reactive({});

        const duplicateEntry = ref(result.loopVal);
        const randArr = ref(result.arr);

        const debouncedSequenceGenerator = _.debounce(() => {
            const result = prng.generateRandSequenceMiddleSquare(userSelectedSeed.value, numDigits);
            duplicateEntry.value = result.loopVal;
            randArr.value = result.arr;

            calculationDetail.num = null;
        }, 70);

        watch(userSelectedSeed, () => {
            debouncedSequenceGenerator();
        });

        //for styling
        const isSeed = (num) => num === parseInt(userSelectedSeed.value);
        const isDuplicate = (num) => num === duplicateEntry.value;

        //for showing details of the calculated number
        const setCalculationDetailIdx = function (idx) {
            if (idx === 0) {
                calculationDetail.seed = "";
                calculationDetail.square = "";
                calculationDetail.prepad = "";
                calculationDetail.postpad = "";
                calculationDetail.num = userSelectedSeed.value;
            } else {
                const prevNum = randArr.value[idx - 1];
                const res = prng.generateNextRandNumMiddleSquare(prevNum, numDigits);

                calculationDetail.seed = res.seed;
                calculationDetail.square = res.strSquare;
                const padding = res.padding;
                calculationDetail.prepad = res.strSquare.substring(0, padding);
                calculationDetail.postpad = res.strSquare.substring(padding + numDigits, res.strSquare.length);
                calculationDetail.num = res.strSquare.substring(padding, padding + numDigits);
            }
            return;
        }

        return {
            userSelectedSeed,
            randArr,
            duplicateEntry,
            calculationDetail,
            isSeed,
            isDuplicate,
            setCalculationDetailIdx,
        };
    }
}
</script>
