<template>
<div class="container">
    
    <div class="row">
        <div class="col-sm-4 text-start">
            Level 0 of 15
            <div class="progress">
                <div class="progress-bar progress-bar-striped" role="progressbar" style="width: 0%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div>

        <div class="col-sm-4 text-center">
            <h2>Introduction</h2>
        </div>

        <div class="col-sm-4 text-end">
            Time Left : {{Math.round(timeLeft)}}s
            <div class="progress">
                <div class="progress-bar progress-bar-striped" role="progressbar" :style="{width : percentTimeLeft + '%'}" :class="{'bg-success': percentTimeLeft > 50,
                            'bg-warning' : percentTimeLeft > 20 && percentTimeLeft <= 50,
                            'bg-danger' : percentTimeLeft <= 20}" v-bind:aria-valuenow="Math.round(percentTimeLeft)" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div>
    </div>

    <hr>

    <p>
        Intro
    </p>
</div>
</template>

<script>
import {
    ref,
    computed
} from 'vue';

export default {
    setup() {
        const timeLimit = 20;
        const timeLeft = ref(timeLimit);
        const percentTimeLeft = computed(() => 100 * timeLeft.value / timeLimit);

        setInterval(() => {
            if (timeLeft.value > 0)
                timeLeft.value -= 0.01;
        }, 10)

        return {
            timeLeft,
            percentTimeLeft
        };
    },
}
</script>
