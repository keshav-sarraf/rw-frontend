<template>
<div class="row">
    <div class="col-sm-10 m-auto">
        <label for="customRange" class="form-label">Select the number of trials for which to repeat the experiment</label>
        <input v-model="numExperimentLoop" type="range" class="form-range" min="1" max="10001" step="10" id="customRange">
    </div>

    <div class="col text-center m-auto">
        <label for="loopSize" class="form-label">Number of repeatitions</label>
        <h4 id="loopSize">{{numExperimentLoop}}</h4>
    </div>
</div>
<div>
    <div v-if="processing" class="spinner-grow" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
    <table v-else class="table table-striped table-bordered table-sm align-middle">
        <caption>Distribution of color changes</caption>
        <thead>
            <tr>
                <th scope="col" class="text-center"># color changes</th>
                <th scope="col" class="text-center">Percentage</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(numColorChanges, index) in result" :key="index">
                <th scope="row">
                    {{index}}
                </th>
                <td>
                    {{numColorChanges}}%
                </td>
            </tr>
        </tbody>
    </table>

    <h4>
        Average : {{average.toFixed(2)}}
    </h4>

    <p>
        As we perform more trials, we can see that the average number of color changes definitely reaches 5. But it's interesting to see the exact distribution as well. It looks like a perfect bell curve.
    </p>

</div>
</template>

<script>
import {
    ref,
    watch,
    computed
} from 'vue';

import debounce from 'lodash.debounce';

export default {
    setup() {
        const numExperimentLoop = ref(100);
        const numBalls = 5;
        const result = ref(new Array(2 * numBalls).fill(0));
        const processing = ref(false);

        const average = computed(() => {
            let average = 0;
            for (let i = 0; i < result.value.length; i++)
                average += i * result.value[i] / 100;
            return average;
        });

        const performExperimentOnce = (numBalls) => {
            let blackBalls = numBalls;
            let whiteBalls = numBalls;
            let prevDraw = "";
            let latestDraw = "";
            let numColorChanges = 0;

            while (blackBalls + whiteBalls > 0) {
                let max = blackBalls + whiteBalls;
                let min = 1;
                let randomBallNum = Math.floor(Math.random() * (max - min + 1) + min);
                if (randomBallNum <= blackBalls) {
                    latestDraw = 'B';
                    blackBalls -= 1;
                } else {
                    latestDraw = 'W';
                    whiteBalls -= 1;
                }

                numColorChanges = (prevDraw != "" && latestDraw != prevDraw) ? numColorChanges + 1 : numColorChanges;
                prevDraw = latestDraw;
            }

            return numColorChanges;
        };

        const performExperimentRepeatedly = (repeatitions) => {
            result.value = new Array(2 * numBalls).fill(0);

            for (let i = 0; i < repeatitions; i++) {
                let isolatedResult = performExperimentOnce(numBalls);
                result.value[isolatedResult] += 1;
            }

            for (let i = 0; i < result.value.length; i++) {
                result.value[i] = Math.round(100 * result.value[i] / repeatitions);
            }
        };

        const debouncedExperimentCondunctor = debounce(() => {
            processing.value = true;
            performExperimentRepeatedly(numExperimentLoop.value);
            processing.value = false;
        }, 100);

        watch(numExperimentLoop, () => {
            debouncedExperimentCondunctor();
        });

        performExperimentRepeatedly(numExperimentLoop.value);

        return {
            processing,
            numExperimentLoop,
            result,
            average
        };
    },
}
</script>
