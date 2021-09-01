<template>
<div class="container">

    <h2>Color Switches</h2>
    <h6>Published on 2nd September 2021</h6>
    <h6>3 minutes read</h6>
    <hr>
    <p>
        I was going through a puzzle on brainstellar.com and something caught my eye. In case you are interested, <a href="https://brainstellar.com/puzzles/1020">this</a> is a link to the page, otherwise here's how it went:
    </p>

    <div>
        <em>
            You are given an urn with 100 balls (50 black and 50 white). You pick balls from urn one by one without replacements until all the balls are out. A black followed by a white or a white followed by a black is "a colour change". Calculate the expected number of colour changes if the balls are being picked randomly from the urn.
        </em>
    </div>

    <br>

    <button type="button" @click="showSolution = !showSolution" class="btn" :class="{ 'btn-danger': !showSolution, 'btn-primary' : showSolution}">{{solutionBtnText}}</button>

    <div class="my-2" v-if="showSolution">
        <p>
            <b> Answer : 50 </b>
        </p>
        <p>
            Mathematical solution to the problem can be determined using linearity of expectations. I'll not re-do the maths here, it is available on the <a href="https://brainstellar.com/puzzles/1020">source website</a>.
        </p>
    </div>

    <hr>

    <p class="my-2">
        I have seen such problems before... and truth be told, I have never been too comfortable around the obtained theoritical results. What got me thinking was the question - How would the results look like if someone actually performed the experiment ?
        <!-- And since I did not want to buy 100 balls, I did the next best thing and created a simulation.  -->
        Below is a toy simulator with 5 of each black and white balls. In this setup, maximum number of color changes we can see is 9 while the minimum possible value is 1. Feel free to play around a couple of times to see what the results look like for you. When I did it, results moved between 2 - 7 with 6 being the most frequent one.
    </p>

    <toy-setup />

    <hr>

    <p>
        Since this is a probabilistic experiment, how about repeating it multiple times to see how the distribution of result looks like. 
    </p>

    <asymptotic-setup/>

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

        const solutionBtnText = computed(() => {
            return showSolution.value ? "Hide Solution" : "Show Solution";
        });

        return {
            showSolution,
            solutionBtnText,
        };
    },
}
</script>
