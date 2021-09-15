<template>
<div class="p-1 mb-1">
    <div class="row my-1">

        <div class="col-sm-2 align-middle">
            <button type="button" @click="showHelp = !showHelp" class="btn btn-sm" :class="{ 'btn-outline-danger': !showHelp, 'btn-outline-primary' : showHelp}">{{btnTextComponent}}</button>
        </div>

        <div class="col text-start align-middle">
            <p v-if="showHelp">{{helpText}}</p>
        </div>

    </div>
</div>
</template>

<script>
import {
    ref,
    computed
} from 'vue';

export default {
    props: {
        btnText: String,
        helpText: String,
    },
    setup(props) {
        const showHelp = ref(false);

        const btnTextComponent = computed(() => showHelp.value ? "Hide " + props.btnText : "Show " + props.btnText);

        return {
            showHelp,
            btnTextComponent
        };
    },
}
</script>
