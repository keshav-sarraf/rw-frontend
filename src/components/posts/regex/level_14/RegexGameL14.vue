<template>
<div class="container">

    <regex-game-header title="Looking Around" :timeLimit=60*5 :finishedProgressPercent=100*13/16 :currentProgressPercent=100*1/15 :startTimer="levelStarted && !levelFinished" @time-elapsed="onTimeElapse" @timer-restarted="onTimerRestart" :resetTimer="resetTimer" />

    <div v-if="levelFinished">
        <div class="alert alert-success" role="alert">
            Thanks for the help. Let's see what or who turns up.
        </div>

        <button type="button" @click="$router.push('regex-game-l15')" class="btn btn-success mb-3">Next Level</button>
    </div>

    <regex-game-l-14-lesson v-if="!levelStarted"/>    
    <regex-game-l-14-mission-1 v-if="levelStarted" @level-finished="onLevelFinished" />
    <br>
    <regex-game-l-14-mission-2 v-if="levelStarted" @level-finished="onLevelFinished" />
    <br>
    <button v-if="!levelFinished" type="button" @click="levelStarted = !levelStarted" class="btn mb-3" :class="{ 'btn-dark': levelStarted, 'btn-primary' : !levelStarted}">{{levelStarted ? "Pause Level" : "Start Level"}}</button>
    <br>
    <button v-if="levelStarted" type="button" @click="$router.push('regex-game-l15')" class="btn btn-danger mb-3">Skip to next level</button>
</div>
</template>

<script>
import RegexGameHeader from '../RegexGameHeader.vue';
import RegexGameL14Lesson from './RegexGameL14Lesson.vue';
import RegexGameL14Mission1 from './RegexGameL14Mission1.vue';
import RegexGameL14Mission2 from './RegexGameL14Mission2.vue';

import {
    ref
} from 'vue';

export default {
    components: {
        RegexGameHeader,
        RegexGameL14Lesson,
        RegexGameL14Mission1,
        RegexGameL14Mission2
    },
    setup() {
        const resetTimer = ref(false);
        const levelStarted = ref(false);
        const levelFinished = ref(false);
        const mission1Finished = ref(false);
        const mission2Finished = ref(false);

        const onLevelFinished = (arg) => {
            if(arg === 'invoice1')
                mission1Finished.value = true;
            else if(arg === 'invoice2')
                mission2Finished.value = true;
            
            levelFinished.value = mission1Finished.value && mission2Finished.value;
        }
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
