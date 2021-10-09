<template>
<div class="container">

    <regex-game-header title="The Plus +" :timeLimit=300 :finishedProgressPercent=100*6/16 :currentProgressPercent=100*1/16 :startTimer="levelStarted && !levelFinished" @time-elapsed="onTimeElapse" @timer-restarted="onTimerRestart" :resetTimer="resetTimer" />

    <div v-if="levelFinished">
        <div class="alert alert-success" role="alert">
            Thank You Agent Brown, looks like Agent White won't be able to help for sometime. We'll have to figure this one out ourselves.
        </div>

        <button type="button" @click="$router.push('regex-game-l8')" class="btn btn-success mb-3">Next Level</button>
    </div>

    <regex-game-l-7-lesson v-if="!levelStarted"/>    
    <regex-game-l-7-mission v-if="levelStarted" @level-finished="onLevelFinished" />
    <br>
    <button v-if="!levelFinished" type="button" @click="levelStarted = !levelStarted" class="btn mb-3" :class="{ 'btn-dark': levelStarted, 'btn-primary' : !levelStarted}">{{levelStarted ? "Pause Level" : "Start Level"}}</button>
    <br>
    <button v-if="levelStarted" type="button" @click="$router.push('regex-game-l8')" class="btn btn-danger mb-3">Skip to next level</button>
</div>
</template>

<script>
import RegexGameHeader from '../RegexGameHeader.vue';
import RegexGameL7Lesson from './RegexGameL7Lesson.vue';
import RegexGameL7Mission from './RegexGameL7Mission.vue';

import {
    ref
} from 'vue';

export default {
    components: {
        RegexGameHeader,
        RegexGameL7Lesson,
        RegexGameL7Mission
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
