<template>
<div class="container">

    <regex-game-header title="The Star *" :timeLimit=180 :finishedProgressPercent=100*5/16 :currentProgressPercent=100*1/15 :startTimer="levelStarted && !levelFinished" @time-elapsed="onTimeElapse" @timer-restarted="onTimerRestart" :resetTimer="resetTimer" />

    <div v-if="levelFinished">
        <div class="alert alert-success" role="alert">
            Thank You Agent Brown, Looks like the battle is far from over.
        </div>

        <button type="button" @click="$router.push('regex-game-l7')" class="btn btn-success mb-3">Next Level</button>
    </div>

    <regex-game-l-6-lesson v-if="!levelStarted"/>    
    <regex-game-l-6-mission v-if="levelStarted" @level-finished="onLevelFinished" />
    <br>
    <button v-if="!levelFinished" type="button" @click="levelStarted = !levelStarted" class="btn mb-3" :class="{ 'btn-dark': levelStarted, 'btn-primary' : !levelStarted}">{{levelStarted ? "Pause Level" : "Start Level"}}</button>
    <br>
    <button v-if="levelStarted" type="button" @click="$router.push('regex-game-l7')" class="btn btn-danger mb-3">Skip to next level</button>
</div>
</template>

<script>
import RegexGameHeader from '../RegexGameHeader.vue';
import RegexGameL6Lesson from './RegexGameL6Lesson.vue';
import RegexGameL6Mission from './RegexGameL6Mission.vue';

import {
    ref
} from 'vue';

export default {
    components: {
        RegexGameHeader,
        RegexGameL6Lesson,
        RegexGameL6Mission
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
