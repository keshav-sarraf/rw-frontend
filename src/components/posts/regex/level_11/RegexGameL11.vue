<template>
<div class="container">

    <regex-game-header title="The Alternation |" :timeLimit=60*5 :finishedProgressPercent=100*10/16 :currentProgressPercent=100*1/15 :startTimer="levelStarted && !levelFinished" @time-elapsed="onTimeElapse" @timer-restarted="onTimerRestart" :resetTimer="resetTimer" />

    <div v-if="levelFinished">
        <div class="alert alert-success" role="alert">
            Let's see if we can recover and enhance these images.
        </div>

        <button type="button" @click="$router.push('regex-game-l12')" class="btn btn-success mb-3">Next Level</button>
    </div>

    <regex-game-l-11-lesson v-if="!levelStarted"/>    
    <regex-game-l-11-mission v-if="levelStarted" @level-finished="onLevelFinished" />
    <br>
    <button v-if="!levelFinished" type="button" @click="levelStarted = !levelStarted" class="btn mb-3" :class="{ 'btn-dark': levelStarted, 'btn-primary' : !levelStarted}">{{levelStarted ? "Pause Level" : "Start Level"}}</button>
    <br>
    <button v-if="levelStarted" type="button" @click="$router.push('regex-game-l12')" class="btn btn-danger mb-3">Skip to next level</button>
</div>
</template>

<script>
import RegexGameHeader from '../RegexGameHeader.vue';
import RegexGameL11Lesson from './RegexGameL11Lesson.vue';
import RegexGameL11Mission from './RegexGameL11Mission.vue';

import {
    ref
} from 'vue';

export default {
    components: {
        RegexGameHeader,
        RegexGameL11Lesson,
        RegexGameL11Mission
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
