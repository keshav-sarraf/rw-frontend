<template>
<div class="row">
    <div class="col-sm-4 text-start">
        Level 1 of 15
        <div class="progress">
            <div class="progress-bar progress-bar-striped" role="progressbar" :style="{width : finishedProgressPercent + '%'}" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
            <div class="progress-bar progress-bar-striped bg-info" role="progressbar" :style="{width : currentProgressPercent + '%'}" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    </div>

    <div class="col-sm-4 text-center">
        <h2>{{title}}</h2>
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
</template>

<script>
import {
    ref,
    computed,
} from 'vue';
import { onUnmounted } from '@vue/runtime-core';

export default {
    props: {
        title: String,
        timeLimit: Number,
        finishedProgressPercent: Number,
        currentProgressPercent: Number
    },
    emits: ['timeElapsed'],
    setup(props, context) {
        const timeLeft = ref(props.timeLimit);
        const percentTimeLeft = computed(() => 100.0 * timeLeft.value / props.timeLimit);

        let refreshIntervalId = setInterval(() => {
            if (timeLeft.value > 0)
                timeLeft.value -= 0.01;
            else{
                console.log("From Header : time elapsed");
                context.emit('timeElapsed');
                clearInterval(refreshIntervalId);
            }
        }, 10);

        onUnmounted(() => {
            console.log("Header Unmounted");
            clearInterval(refreshIntervalId);
        });

        return {
            timeLeft,
            percentTimeLeft
        };
    },
}
</script>
