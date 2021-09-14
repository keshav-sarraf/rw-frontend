<template>
<div class="row">
    <div class="col-sm-4 text-start">
        Level 1 of 15
        <div class="progress">
            <div class="progress-bar" role="progressbar" :style="{width : finishedProgressPercent + '%'}" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
            <div class="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" :style="{width : currentProgressPercent + '%'}" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    </div>

    <div class="col-sm-4 text-center">
        <h2>{{title}}</h2>
    </div>

    <div class="col-sm-4 text-end">
        <div v-if="startTimer">
            Time Left : {{Math.round(timeLeft)}}s
        </div>
        <div v-else>
            Timer Paused
        </div>

        <div class="progress">
            <div class="progress-bar progress-bar-striped" role="progressbar" :style="{width : percentTimeLeft + '%'}" :class="{'bg-success': percentTimeLeft > 50,
                            'bg-warning' : percentTimeLeft > 20 && percentTimeLeft <= 50,
                            'bg-danger' : percentTimeLeft <= 20,
                            'progress-bar-animated': startTimer}" v-bind:aria-valuenow="Math.round(percentTimeLeft)" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    </div>
</div>

<hr>
</template>

<script>
import {
    ref,
    computed,
    onBeforeUnmount,
    watch
} from 'vue';

export default {
    props: {
        title: String,
        timeLimit: Number,
        finishedProgressPercent: Number,
        currentProgressPercent: Number,
        startTimer: Boolean,
        resetTimer: Boolean,
    },
    emits: ['timeElapsed', 'timerRestarted'],
    setup(props, context) {
        const timeLeft = ref(props.timeLimit);
        const percentTimeLeft = computed(() => Math.floor(100.0 * timeLeft.value / props.timeLimit));
        let refreshIntervalId = null;

        const startTimer = function () {
            refreshIntervalId = setInterval(() => {
                if (timeLeft.value > 0)
                    timeLeft.value -= 1;
                else {
                    console.log("From Header : time elapsed");
                    context.emit('timeElapsed');
                    clearInterval(refreshIntervalId);
                }
            }, 1000);
        }

        const stopTimer = function () {
            clearInterval(refreshIntervalId);
        }

        watch(() => props.startTimer, () => {
            // console.log(props.startTimer);
            if (props.startTimer === true)
                startTimer();
            else if (props.startTimer === false)
                stopTimer();
        });

        watch(() => props.resetTimer, () => {
            console.log("reset timer called : " + props.resetTimer);
            if (props.resetTimer === true){
                timeLeft.value = props.timeLimit;
                context.emit('timerRestarted');
            }  
        });

        if (props.startTimer === true || props.resetTimer === true)
            startTimer();

        onBeforeUnmount(() => {
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
