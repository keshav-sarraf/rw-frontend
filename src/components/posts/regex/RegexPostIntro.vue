<template>
<div class="container">
    <h2>🕵🏽‍♂️ Expressions, Regular Expressions</h2>
    <h6>Published on 15th September 2021</h6>
    <h6>5 minutes read</h6>
    <hr>
    <p>
        If you already know what regular expressions are, feel free to skip ahead. <mark>For</mark> those who are still reading this, in simple terms: regular expressions are a simple programming language used for searching text within a document. <mark>As</mark> an example- If you are looking for words which begin in capital letters and are preceeded by a period, then Ctrl/Cmd + F won't help you. In such situations, regular expressions are the tool to use.
    </p>
    <p>
        It doesn't matter if you are just starting on RegExes or are a pro looking to brush up, play along and within next 5 mins you'd end up with hands on experience in regular expressions while having some fun along the way.
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
