<template>
<div class="container">

    <div class="row">
        <!-- <div class="col-sm-4 text-start">
            Level 0 of 15
            <div class="progress">
                <div class="progress-bar progress-bar-striped" role="progressbar" style="width: 0%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div> -->

        <div class="col-sm-4 text-start">
            <h2>✉️ The expected email</h2>
        </div>

        <!-- <div class="col-sm-4 text-end">
            Time Left : {{Math.round(timeLeft)}}s
            <div class="progress">
                <div class="progress-bar progress-bar-striped" role="progressbar" :style="{width : percentTimeLeft + '%'}" :class="{'bg-success': percentTimeLeft > 50,
                            'bg-warning' : percentTimeLeft > 20 && percentTimeLeft <= 50,
                            'bg-danger' : percentTimeLeft <= 20}" v-bind:aria-valuenow="Math.round(percentTimeLeft)" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div> -->
    </div>

    <hr>

    <div class="mb-3">
        <p v-if="isEmailUnread">You have 1 new email</p>

        <button type="button" @click="showEmailFn()" class="btn mb-2" :class="{ 'btn-primary': !shouldShowEmail, 'btn-danger' : shouldShowEmail}">{{showEmailBtnText}}</button>
    </div>

    <div v-if="shouldShowEmail" class="border p-3">
        <p>
            Agent Brown,
        </p>
        <p>
            It's been some days since our last conversation. The Group was keeping us busy. We were able to intercept an attack in Singapore. Soon after that, agent White helped us in gathering legal evidence and we were able to capture few key members of The Group as well. With this we conclude the mission. We thank you for your help.
        </p>

    </div>
</div>
</template>

<script>
import {
    ref,
    computed
} from 'vue';

export default {
    setup() {
        const shouldShowEmail = ref(false);
        const isEmailUnread = ref(true);

        const showEmailFn = () => {
            shouldShowEmail.value = !shouldShowEmail.value;
            isEmailUnread.value = false;
        }

        const showEmailBtnText = computed(() => shouldShowEmail.value ? "Close Email" : "Show Email");

        return {
            shouldShowEmail,
            showEmailBtnText,
            showEmailFn,
            isEmailUnread
        }
    },
}
</script>
