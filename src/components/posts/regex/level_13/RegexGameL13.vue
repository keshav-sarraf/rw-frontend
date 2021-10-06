<template>
<div class="container">

    <regex-game-header title="ShortHand" :timeLimit=300 :finishedProgressPercent=100*12/16 :currentProgressPercent=100*1/15 :startTimer="levelStarted && !levelFinished" @time-elapsed="onTimeElapse" @timer-restarted="onTimerRestart" :resetTimer="resetTimer" />

    <div v-if="levelFinished">
        <div class="alert alert-success" role="alert">
            Thanks for the help. We'll see what details we can get on these vehicles.
        </div>

        <button type="button" @click="$router.push('regex-game-l13')" class="btn btn-success mb-3">Next Level</button>
    </div>

    <regex-game-l-13-lesson v-if="!levelStarted"/>    
    <regex-game-l-13-mission v-if="levelStarted" @level-finished="onLevelFinished" />
    
    <button v-if="!levelFinished" type="button" @click="levelStarted = !levelStarted" class="btn mb-3" :class="{ 'btn-danger': levelStarted, 'btn-primary' : !levelStarted}">{{levelStarted ? "Pause Level" : "Start Level"}}</button>
</div>
</template>

<script>
import RegexGameHeader from '../RegexGameHeader.vue';
import RegexGameL13Lesson from './RegexGameL13Lesson.vue';
import RegexGameL13Mission from './RegexGameL13Mission.vue';

import {
    ref
} from 'vue';

export default {
    components: {
        RegexGameHeader,
        RegexGameL13Lesson,
        RegexGameL13Mission
    },
    setup() {
        const resetTimer = ref(false);
        const levelStarted = ref(false);
        const levelFinished = ref(false);

        const onLevelFinished = () => levelFinished.value = true;
        const onTimerRestart = () => resetTimer.value = false;

        const onTimeElapse = function () {
            alert('Time elapsed!! :X, Restarting Level');
            resetTimer.value = true;
            levelStarted.value = false;
            levelFinished.value = false;
        };

        return {            
            onTimeElapse,
            onTimerRestart,
            onLevelFinished,
            levelStarted,
            levelFinished,
            resetTimer
        };
    },
}
</script>
