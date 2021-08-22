<template>
    <div class="container" >
        <div v-for="chat in chatList" :key="chat.question">
            <!-- question -->
            <div class="row">
                <div class="col-sm-8 offset-sm-2 mb-3 align-self-start">
                    <div class="card text-white bg-dark">
                        <div class="card-body">
                            <h5 class="card-title">You</h5>
                            <p class="card-text">{{chat.question}}</p>
                        </div>
                    </div>
                </div>

                <div class="col-sm-8 offset-sm-4 mb-3 align-self-end">
                    <div class="card border-primary">
                        <div class="card-body">
                            <h5 class="card-title">Reinventing Wheel</h5>
                            <p class="card-text">{{chat.answer}}</p>
                        </div>
                    </div>
                </div>
            </div>    
            
        </div>
    </div>

    
</template>

<script>

import {ref} from 'vue';
import chatListJson from '../assets/about/content.json';

export default {
    setup() {
        const chatList = ref(chatListJson.conversation);
        return {chatList};
    },
}
</script>