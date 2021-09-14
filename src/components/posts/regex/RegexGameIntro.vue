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

    <div class="border p-3">
        <p>
            Agent Brown,
        </p>
        <p>
            The agency is in dire need of your help. We are working on bringing down a secret organization called "The Group". They want to take down the internet and bring chaos to the world. Your old partner - Agent White was successful in infiltrating The Group's inner circle, but before she could extract meaningful information, her cover was blown. She was successful in escaping but her current whereabouts are unknown and we have lost all contact.
        </p>
        <p>
            Her last message has led us to a laptop. We suspect that the moment we turn on the laptop, it'll start a self destruct sequence and we won't have enough time to analyze it completely. That's why we are reaching out to you. With your experience in RegEx, we may just be able to save the world and your friend's life.
        </p>
        <p>
            Your mission, should you choose to accept it would be to analyze the documents present in the laptop and figure out The Group's next plan. Beware that time is of the essence.
        </p>

        <div class="row">
            <div class="col-sm-2">
                <button type="button" @click="$router.push('regex-game-l1')" class="btn btn-primary">Accept Mission</button>
            </div>
            <div class="col-sm-2">
                <button type="button" @click="$router.push('regex-post-intro')" class="btn btn-danger">Reject Mission</button>
            </div>
        </div>

    </div>
</div>
</template>

<script>

export default {
    setup() {
    },
}
</script>
