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
            <h2>✉️ The unexpected email</h2>
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
            The agency is in dire need of your help. We are working on capturing a secret organization called "The Group". They want to take down the internet and bring chaos to the world. They are pretty elusive and have been operating undetected for sometime now. After months of preparation, your old partner - Agent White was successful in infiltrating The Group's an undercover agent, but before she could extract meaningful information, her cover was blown. She was successful in escaping but her current whereabouts are unknown and we have lost all contact.
        </p>
        <p>
            Her last message has led us to a laptop. But we don't have the experts to help us comb through the data. Time is of the essence. With your experience in RegEx, we may just be able to extract critical pieces of information in limited amount of time.
        </p>
        <p>
            Your mission, should you choose to accept it would be to analyze the documents present in the laptop and prevent The Group from destroying the internet.
        </p>

        <div class="row">
            <div class="col-sm-2 p-1">
                <button type="button" @click="$router.push('regex-game-l1')" class="btn btn-primary">Accept Mission</button>
            </div>
            <div class="col-sm-2 p-1">
                <button type="button" @click="$router.push('regex-post-intro')" class="btn btn-danger">Reject Mission</button>
            </div>
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
