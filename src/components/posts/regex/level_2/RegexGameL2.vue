<template>
<div class="container">

    <regex-game-header title="👀 Simple Search" :timeLimit=300 :finishedProgressPercent=100*1/15 :currentProgressPercent=100*1/15 :startTimer="levelStarted && !levelFinished" @time-elapsed="onTimeElapse" @timer-restarted="onTimerRestart" :resetTimer="resetTimer" />

    <div v-if="levelFinished">
        <div class="alert alert-success" role="alert">
            Thank You Agent Brown, this was helpful. We'll contact you soon.
        </div>

        <button type="button" @click="$router.push('regex-game-l2')" class="btn btn-success mb-3">Next Level</button>
    </div>

    <regex-game-l-2-lesson v-if="!levelStarted"/>    
    <regex-game-l-2-mission v-if="levelStarted" @level-finished="onLevelFinished" />
    
    <button v-if="!levelFinished" type="button" @click="levelStarted = !levelStarted" class="btn mb-3" :class="{ 'btn-danger': levelStarted, 'btn-primary' : !levelStarted}">{{levelStarted ? "Pause Level" : "Start Level"}}</button>
</div>
</template>

<script>
import RegexGameHeader from '../RegexGameHeader.vue';
import RegexGameL2Lesson from './RegexGameL2Lesson.vue';
import RegexGameL2Mission from './RegexGameL2Mission.vue';

import {
    ref
} from 'vue';

export default {
    components: {
        RegexGameHeader,
        RegexGameL2Lesson,
        RegexGameL2Mission
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
