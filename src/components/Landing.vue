<template>
<div class="container">

    <h2>Past Posts</h2>

    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Date</th>
                <th scope="col">Read Duration</th>
                <th scope="col">Labels</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(post, index) in postsList" :key="post.title">
                <th scope="row">{{index+1}}</th>
                <td>
                    <router-link v-bind:to=post.router_link>{{post.title}}</router-link>
                </td>
                <td>{{post.date}}</td>
                <td>{{post.read_duration}}</td>
                <td>
                    <span v-for="label in post.labels" :key="label" class="badge bg-primary m-1">
                        {{label}}
                    </span>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import {
    ref
} from 'vue';
import postsListJson from '../assets/posts/posts.json';

export default {
    setup() {
        const postsList = ref(postsListJson.posts);

        return {
            postsList
        }
    },
}
</script>
