<template>
<div class="container">

    <regex-game-header title="The Begining and the End" :timeLimit=20*60 :finishedProgressPercent=100*11/16 :currentProgressPercent=100*1/15 :startTimer="levelStarted && !levelFinished" @time-elapsed="onTimeElapse" @timer-restarted="onTimerRestart" :resetTimer="resetTimer" />

    <div v-if="levelFinished">
        <div class="alert alert-success" role="alert">
            This time we have chosen not to inform ICANN directly about the Group's plans in order to avoid panic. But we know for sure that there is another hiccup in The Groups plan, they need 5 out of 6 keys to open the safe. We are trying to ensure safety of the keys and the security experts who hold them. We will be working in the shadows on this one.
        </div>

        <button type="button" @click="$router.push('regex-game-l13')" class="btn btn-success mb-3">Next Level</button>
    </div>

    <regex-game-l-12-lesson v-if="!levelStarted"/>    
    <regex-game-l-12-mission v-if="levelStarted" @level-finished="onLevelFinished" />
    <button v-if="!levelFinished" type="button" @click="levelStarted = !levelStarted" class="btn mb-3" :class="{ 'btn-dark': levelStarted, 'btn-primary' : !levelStarted}">{{levelStarted ? "Pause Level" : "Start Level"}}</button>
    <br>
    <button v-if="levelStarted" type="button" @click="$router.push('regex-game-l13')" class="btn btn-danger mb-3">Skip to next level</button>
</div>
</template>

<script>
import RegexGameHeader from '../RegexGameHeader.vue';
import RegexGameL12Lesson from './RegexGameL12Lesson.vue';
import RegexGameL12Mission from './RegexGameL12Mission.vue';

import {
    ref
} from 'vue';

export default {
    components: {
        RegexGameHeader,
        RegexGameL12Lesson,
        RegexGameL12Mission
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
