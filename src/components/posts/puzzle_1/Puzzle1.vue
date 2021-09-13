<template>
<div class="container">

    <h2>🖍 Color Switches</h2>
    <h6>Published on 2nd September 2021</h6>
    <h6>3 minutes read</h6>
    <hr>
    <p>
        I was going through a puzzle on brainstellar.com and something caught my eye. For sake of honor, <a href="https://brainstellar.com/puzzles/1020">this</a> is a link to the page, here's how it went:
    </p>

    <div class="border p-2">
        <em>
            You are given an urn with 10 balls (5 black and 5 white). You pick balls from urn one by one without replacements until all the balls are out. A black followed by a white or a white followed by a black is "a colour change". Calculate the expected number of colour changes if the balls are being picked randomly from the urn.
        </em>
    </div>

    <br>
    <p>
        Initially the problem appears daunting because there could be  10C5 (3,628,800) possible arrangements with these 10 balls. Counting the number of color changes in all of them seems impossible. And frankly, original puzzle had 50 balls each, so that definitely doesn't seem to be within counting range at all. But there exists a trick!
    </p>

    <button type="button" @click="showSolution = !showSolution" class="btn" :class="{ 'btn-danger': !showSolution, 'btn-primary' : showSolution}">{{solutionBtnText}}</button>

    <div class="my-2" v-if="showSolution">
        <p>
            <b> Answer : 5 </b>
        </p>
        <p>
            Mathematical solution to the problem can be determined using linearity of expectations. I'll not re-do the maths here, it is available on the <a href="https://brainstellar.com/puzzles/1020">source website</a>.
        </p>
    </div>

    <hr>

    <p class="my-2">
        I have seen such problems before... and truth be told, I have never been too comfortable around the obtained theoretical results. What got me thinking was the question - How would the results look like if someone actually performed the experiment ?
        <!-- And since I did not want to buy 100 balls, I did the next best thing and created a simulation.  -->
    </p>

    <button type="button" @click="showSimulation = !showSimulation" class="btn" :class="{ 'btn-success': !showSimulation, 'btn-primary' : showSimulation}">{{simulationBtnText}}</button>

    <div v-if="showSimulation" class="my-2">

        <p>
            Below is a toy simulator with 5 of each black and white balls. The maximum number of colour changes we can see is 9 (if all balls are drawn in alternate fashion) while the minimum possible value is 1(since there are 2 colors, there needs to be at least 1 boundary). Feel free to play around a couple of times to see what the results look like for you. When I did it, results varied between 2 - 7 with 6 being the most frequent one.
        </p>

        <toy-setup />

        <hr>

        <p>
            Since this is a probabilistic experiment, how about repeating it multiple times to see how the distribution of result looks like.
        </p>

        <button type="button" @click="showStats = !showStats" class="btn" :class="{ 'btn-success': !showStats, 'btn-primary' : showStats}">{{statsBtnText}}</button>

        <asymptotic-setup v-if="showStats" />
    </div>

</div>
</template>

<script>
import {
    ref,
    computed
} from 'vue';

import ToySetup from './ToySetup.vue';
import AsymptoticSetup from './AsymptoticSetup.vue';

export default {
    components: {
        ToySetup,
        AsymptoticSetup
    },
    setup() {

        const showSolution = ref(false);
        const showSimulation = ref(false);
        const showStats = ref(false);

        const solutionBtnText = computed(() => {
            return showSolution.value ? "Hide Solution" : "Show Solution";
        });

        const simulationBtnText = computed(() => {
            return showSimulation.value ? "Hide Simulation" : "Show Simulation";
        });

        const statsBtnText = computed(() => {
            return showStats.value ? "Hide Statistics" : "Show Statistics";
        });

        return {
            showSolution,
            showSimulation,
            showStats,
            solutionBtnText,
            simulationBtnText,
            statsBtnText,
        };
    },
}
</script>
