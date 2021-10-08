<template>
<div class="container">
    <h2>🕵🏽‍♂️ Expressions, Regular Expressions</h2>
    <h6>Published on 15th September 2021</h6>
    <h6>5 minutes read</h6>
    <hr>
    <p>
        If you already know what regular expressions are, feel free to skip ahead. <mark>For</mark> those who are still reading this, in simple terms: regular expressions are a simple programming language used for searching text within a document. <mark>As</mark> an example- If you are looking for words which begin in capital letters and are with a preceding period, then Ctrl/Cmd + F won't help you. In such situations, regular expressions are the tool to use.
    </p>

    <p>
        It doesn't matter if you just want to get your feet wet or are a pro looking to brush up, play along and enjoy the game where a nefarious entity tries to bring the internet down and you save the day by using your regex skills.
    </p>

    <p>
        If you are not familiar with RegEx at all then don't worry, each level is preceeded by a lesson to help you.
    </p>

    <p>
        PS: More than 90% of the lessons are inspired from <a href="https://github.com/ziishaned/learn-regex">this awesome github post</a>
    </p>

    <p>
        PPS: If you left the game in the middle, then you can pick it back up by chaging the URL. Each level is numbered sequentially and is reflected in the url.
    </p>

    <button type="button" @click="$router.push('regex-game-intro')" class="btn btn-primary">Start Game</button>
</div>
</template>

<script>
export default {
    setup() {

    },
}
</script>
