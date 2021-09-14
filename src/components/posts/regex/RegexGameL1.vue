<template>
<div class="container">

    <regex-game-header title="👀 Simple Search" :timeLimit=300 :finishedProgressPercent=0 :currentProgressPercent=100*1/15 :startTimer="startLevel" @time-elapsed="timeElapsedAction"/>

    <button type="button" @click="startLevel = !startLevel" class="btn" :class="{ 'btn-danger': startLevel, 'btn-primary' : !startLevel}">{{startLevel ? "Pause Level" : "Start Level"}}</button>

</div>
</template>

<script>

import RegexGameHeader from './RegexGameHeader.vue';

import { ref } from 'vue';

export default {
    components : {
        RegexGameHeader,
    },
    setup() {
        const startLevel = ref(false);


        const timeElapsedAction = function(){
            alert('time elapsed');
        };

        return { timeElapsedAction, startLevel };
    },
}
</script>
