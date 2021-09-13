<template>
<div class="container">

    <regex-game-header title="👀 Simple Search" :timeLimit=10 :finishedProgressPercent=0 :currentProgressPercent=100*1/15 @time-elapsed="timeElapsedAction"/>

</div>
</template>

<script>

import RegexGameHeader from './RegexGameHeader.vue';

export default {
    components : {
        RegexGameHeader,
    },
    setup() {
        const timeElapsedAction = function(){
            alert('time elapsed');
        };

        return { timeElapsedAction };
    },
}
</script>
