<template>
<div class="row">
    <div class="col-sm-1">
        <wordle-letter/>
    </div>
    <div class="col-sm-1">
        <wordle-letter/>
    </div>
    <div class="col-sm-1">
        <wordle-letter/>
    </div>
    <div class="col-sm-1">
        <wordle-letter/>
    </div>
    <div class="col-sm-1">
        <wordle-letter/>
    </div>
</div>
</template>

<script>
import WordleLetter from './WordleLetter.vue'

export default {
    components: {
        WordleLetter
    },
    setup() {

    },
}
</script>
