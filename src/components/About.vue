<template>
<div class="container">

    <h2>About Us</h2>

    <hr>

    <!-- <p> I couldn't figure out what to write here. Since I had plenty of time in my hand, I started imagining random scenarios
        in my head. One scenario in particular stands out from the rest. It describes a day when a lot of people have visited this site.
        Within that story line, below is how I imagine a conversation went between me and one the imaginary visitors 😃
    </p> -->

    <div v-for="chat in chatList" :key="chat.question">
        <!-- question -->
        <div class="row">
            <div class="col-sm-8 offset-sm-1 mb-2">
                <div class="card text-white bg-dark">
                    <div class="card-body">
                        <h5 class="card-title">Visitor</h5>
                        <p class="card-text">{{chat.question}}</p>
                    </div>
                </div>
            </div>

            <!-- answer -->
            <div class="col-sm-8 offset-sm-3 mb-2">
                <div class="card border-primary">
                    <div class="card-body">
                        <h5 class="card-title">Reinventing Wheel</h5>
                        <p class="card-text">{{chat.answer}}</p>
                        <a v-if="chat.external_link_tag != null" v-bind:href=chat.external_link_url>{{chat.external_link_tag}}</a>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

<!-- TODO: Add hyperlinks for email and insta ? -->
</template>

<script>
import {
    ref
} from 'vue';
import chatListJson from '../assets/about/content.json';

export default {
    setup() {
        const chatList = ref(chatListJson.conversation);
        return {
            chatList
        };
    },
}
</script>
