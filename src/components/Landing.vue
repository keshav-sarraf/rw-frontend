<template>
<div class="container">

    <h2>Posts</h2>
    <hr>

    <!-- <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Read Duration</th>
                <th scope="col">Labels</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(post, index) in postsList" :key="post.title">
                <th scope="row">
                    {{index+1}}
                </th>
                <td>
                    <router-link v-bind:to=post.router_link>{{post.title}}</router-link>
                </td>
                <td class="fst-italic fw-light">
                    {{post.description}}
                </td>
                <td>{{post.read_duration}}</td>
                <td>
                    <span v-for="label in post.labels" :key="label" class="badge bg-primary m-1">
                        {{label}}
                    </span>
                </td>
            </tr>
        </tbody>
    </table> -->

    <div class="card mb-1" v-for="post in postsList" :key="post.title">
        <div class="card-header">
            <div class="row">
                <div class="col align-self-start text-start">
                    {{post.read_duration}}
                </div>

                <div class="col align-self-end text-end">
                    {{post.date}}
                </div>
            </div>
        </div>
        <div class="card-body">
            <h5 class="card-title">
                <router-link v-bind:to=post.router_link>{{post.title}}</router-link>
            </h5>
            <p class="card-text">
                {{post.description}}
            </p>
        </div>
        <div class="card-footer text-muted">
            <span v-for="label in post.labels" :key="label" class="badge bg-primary m-1">
                {{label}}
            </span>
        </div>
    </div>

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
