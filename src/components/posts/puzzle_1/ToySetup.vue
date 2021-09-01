<template>
    <div>
        <div class="row border-top border-bottom my-1">
            <div class="col-sm-12 text-start m-auto">
                Urn
            </div>
            <div class="col text-start m-auto">
                <b># White Balls :</b> {{numWhiteBalls}}
            </div>
            <div class="col text-end m-auto">
                {{numBlackBalls}} <b>: # Black Balls</b>
            </div>
        </div>

        <div class="row border-bottom my-1">
            <div class="col text-start m-auto">
                <b>Sequence of draws :</b> {{drawSequence.join(",")}}
            </div>
            <div class="col text-end m-auto">
                <p class="text-primary">{{numColorChanges}} <b>: # Color Changes</b></p>
            </div>
        </div>

        <div class="row p-1">
            <div class="col">
                <button type="button" v-if="numBlackBalls + numWhiteBalls > 0" class="btn-primary" @click="drawnNextBall()">Draw Next</button>
            </div>
            <div class="col">
                <button type="button" class="btn-danger" @click="reset()">Reset Experiment</button>
            </div>
            <div class="col text-end m-auto">
                {{latestDraw}} <b>: Last Drawn Ball</b>
            </div>
        </div>
    </div>
</template>

<script>
import {
    ref,
    computed
} from 'vue';

export default {
    setup() {
        const numBalls = 5;
        const black = 'B';
        const white = 'W';

        const numBlackBalls = ref(numBalls);
        const numWhiteBalls = ref(numBalls);
        const latestDraw = ref('');
        const drawSequence = ref([]);

        const numColorChanges = computed(() => {
            let numChanges = 0;

            for (let i = 0; i < drawSequence.value.length - 1; i++) {
                let isColorChange = drawSequence.value[i] != drawSequence.value[i + 1];
                numChanges = isColorChange ? numChanges + 1 : numChanges;
            }

            return numChanges;
        });

        const drawnNextBall = () => {
            let blackBalls = numBlackBalls.value;
            let whiteBalls = numWhiteBalls.value;
            let totalBalls = blackBalls + whiteBalls;
            let max = totalBalls;
            let min = 1;

            if (max < min)
                return;

            let randomBallNum = Math.floor(Math.random() * (max - min + 1) + min);

            if (randomBallNum <= blackBalls) {
                latestDraw.value = black;
                numBlackBalls.value -= 1;
            } else {
                latestDraw.value = white;
                numWhiteBalls.value -= 1;
            }

            if (latestDraw.value == white || latestDraw.value == black)
                drawSequence.value.push(latestDraw.value);
        };

        const reset = () => {
            numBlackBalls.value = numBalls;
            numWhiteBalls.value = numBalls;
            latestDraw.value = '';
            drawSequence.value = [];
        };

        return {
            numBlackBalls,
            numWhiteBalls,
            latestDraw,
            drawSequence,
            numColorChanges,
            drawnNextBall,
            reset
        };
    },
}
</script>
