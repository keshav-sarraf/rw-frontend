<template>
<div class="container">
    <h2>🕵🏽‍♂️ Expressions, Regular Expressions</h2>
    <h6>Published on 9th October 2021</h6>
    <h6>2 minutes read, 10-20 mintues play</h6>
    <hr>
    <p>
        If you already know what regular expressions are, feel free to skip ahead. For those who are still reading this, in a nutshell, regular expressions are quick and simple programs used for searching text within a document. As an example- If you are looking for all the phone numbers/email ids in a document, then Ctrl/Cmd + F won't help you. In such situations, regular expressions are the tool to use.
    </p>

    <p>
        It doesn't matter if you just want to get your feet wet or are a pro looking to brush up, play along and enjoy the tale of Agent Brown, an ex spy who tries to stop a nefarious entity from bringing the internet down. 
    </p>

    <p>
        If you are not familiar with RegEx at all then don't worry, each level is preceded by a lesson to help you. And trust me when I say this, you don't have to memorize all the concepts at all. Once you are aware of the possibilities, then you can always look stuff up over the internet. Even in the game, if you are unsure, just look at the hints at the bottom or pause the game and re-review the lesson. Each level could be potentially solved using multiple regexes and you are free to choose your style, in the end we only evaluate the results obtained by using the provided regex and not the expression itself.
    </p>

    <p>
        PS: More than 90% of the lessons are inspired from <a href="https://twitter.com/ziishaned">@ziishaned</a>'s <a href="https://github.com/ziishaned/learn-regex">awesome github post</a>
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
