<template>
<div class="container">

    <regex-game-header title="👀 Simple Search" :timeLimit=120 :finishedProgressPercent=0 :currentProgressPercent=100*1/15 :startTimer="startLevel" @time-elapsed="timeElapsedAction" />

    <div v-if="!startLevel">
        <h4>Tutorial</h4>

        <p>
            You'd be given a block of text and a corresponding problem to find something in it. Your task is to to provide a regular expression that solves the associated problem. Remember the laptop is rigged to self destruct after sometime, so beware Agent Brown. Goodluck and godspeed 🏁.
        </p>

        <h4>Lesson</h4>

        <p>
            A regular expression (regex) is just a pattern of characters that we use to search within a given text. For example, the regular expression <code>the</code> means: the letter <code>t</code>, followed by the letter <code>h</code>, followed by the letter <code>e</code>.
        </p>
        <p>
            <code>"the" => The fat cat sat on <mark>the</mark> mat.</code>
        </p>
        <p>
            By default, regexes are normally case-sensitive so the regular expression <code>The</code> would not match the string <code>the</code>.
        </p>
        <p>
            <code>"The" => <mark>The</mark> fat cat sat on the mat.</code>
        </p>
    </div>

    <div v-if="startLevel">
        <h4>Mission 1</h4>
    </div>

    <button type="button" @click="startLevel = !startLevel" class="btn" :class="{ 'btn-danger': startLevel, 'btn-primary' : !startLevel}">{{startLevel ? "Pause Level" : "Start Level"}}</button>

</div>
</template>

<script>
import RegexGameHeader from './RegexGameHeader.vue';

import {
    ref
} from 'vue';

export default {
    components: {
        RegexGameHeader,
    },
    setup() {
        const startLevel = ref(false);

        const timeElapsedAction = function () {
            alert('time elapsed');
        };

        return {
            timeElapsedAction,
            startLevel
        };
    },
}
</script>
