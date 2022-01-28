<template>
<div class="p-2 m-2x" :class="{'border border-danger' : isError}">
    <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="gray" v-model="picked">
        <label class="form-check-label" for="inlineRadio1">Gray</label>
    </div>
    <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="yellow" v-model="picked">
        <label class="form-check-label" for="inlineRadio2">Yellow</label>
    </div>
    <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="green" v-model="picked">
        <label class="form-check-label" for="inlineRadio3">Green</label>
    </div>
    <input
        v-model="letter"
        type="text" 
        :class="{ 'bg-secondary text-white': picked=='gray', 'bg-warning text-darkr': picked=='yellow', 'bg-success text-white': picked=='green' }"
        placeholder="Letter">
</div>
</template>


<script>
import {
    ref,
    watch
} from 'vue';

export default {
    setup() {
        const letter = ref("");
        const picked = ref("");
        const isError = ref(false);

        watch(letter, (newLetter, origLetter) => {
            console.log("letter changed from " + origLetter + " to " + newLetter);
            if(newLetter.length > 1)
                isError.value = true;
            else
                isError.value = false;
        });

        watch(picked, (newState, origState) => {
            console.log("state changed from " + origState + " to " + newState);
        });

        return {
            letter,
            picked,
            isError
        }
    },
}
</script>