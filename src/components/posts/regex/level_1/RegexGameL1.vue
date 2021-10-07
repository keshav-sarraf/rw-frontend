<template>
<div class="container">

    <regex-game-header title="👀 Simple Search" :timeLimit=300 :finishedProgressPercent=0 :currentProgressPercent=100*1/16 :startTimer="levelStarted && !levelFinished" @time-elapsed="onTimeElapse" @timer-restarted="onTimerRestart" :resetTimer="resetTimer" />

    <div v-if="levelFinished">
        <div class="alert alert-success" role="alert">
            Thank You Agent Brown, this was helpful. We'll contact you once we have analyzed the laptop.
        </div>

        <button type="button" @click="$router.push('regex-game-l2')" class="btn btn-success mb-3">Next Level</button>
    </div>

    <regex-game-l-1-lesson v-if="!levelStarted" />
    <regex-game-l-1-mission v-if="levelStarted" @level-finished="onLevelFinished" />

    <button v-if="!levelFinished" type="button" @click="levelStarted = !levelStarted" class="btn mb-3" :class="{ 'btn-danger': levelStarted, 'btn-primary' : !levelStarted}">{{levelStarted ? "Pause Level" : "Start Level"}}</button>
</div>
</template>

<script>
import RegexGameHeader from '../RegexGameHeader.vue';
import RegexGameL1Lesson from './RegexGameL1Lesson.vue';
import RegexGameL1Mission from './RegexGameL1Mission.vue';

import {
    ref
} from 'vue';

export default {
    components: {
        RegexGameHeader,
        RegexGameL1Lesson,
        RegexGameL1Mission
    },
    setup() {
        const resetTimer = ref(false);
        const levelStarted = ref(false);
        const levelFinished = ref(false);

        const onLevelFinished = () => {
            levelFinished.value = true;
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        };
        
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
