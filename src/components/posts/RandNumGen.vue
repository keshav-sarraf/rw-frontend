// Random Number Generator
// 22nd August 2021

<template>
<div class="container">

    <h2>How random are random numbers ?</h2>
    <h6>Published on 21st August 2021</h6>
    <hr>
    <h4>Introduction</h4>
    <p>I think the best way to start would be an XKCD comic strip on the same topic</p>
    <img src="https://imgs.xkcd.com/comics/random_number.png" class="img-fluid" alt="XKCD : Random Number" />
    <br />
    <br />
    <p class="muted">
        Computers were designed to be deterministic in nature. A computer should always give us same answer to any particular question no matter how many times we ask it. 1 + 1 should always be 2 and nothing else. This is quite an important and non negotiable prerequisite for us to rely on computers.

        <a href="#" @click.stop.prevent data-bs-toggle="tooltip" title="" data-bs-html="true" data-bs-original-title="<i>Sometimes I feel it's the other way around, where I am an integral part of my smart phone's life and all my life's decisions revolve around keeping the little bugger charged and running. We'll have the philosophical discussions on this topic some other day ...</i>">They have become an integral part of our lives.</a>

        Computers do a lot of heavy lifting in our lives. We let them fly aeroplanes, manage our bank accounts, help with communications, and a thousand other things. I don't think we trust any other human being as much as we trust our computers. None of which would have been possible if computers were unreliable in reproducing results.

    </p>
    <p>
        Now few days ago, when I asked the computer to give me a sequence of random numbers, it did ... it actually did and the results really seemed random. I checked multiple times, I asked it the same question multiple times and the answer was different every time. 
        
        <a href="#" @click.stop.prevent data-bs-toggle="tooltip" title="" data-bs-html="true" data-bs-original-title="<i>Well my mind gets blown by a lot of things ... but still...</i>">My mind was blown 😱</a>
        
    </p>
    <p>
        With this new found curiosity, I started researching a bit more about this problem and turns out that a lot of people have worked very hard over the years so that we can make computers churn out random number ( or seemingly random numbers ... will delve into it shortly )
    </p>

    <h4>How good are humans at the task ?</h4>

    <p>
        Let's play a small game. Quickly enter a random number between 1-10 in the box below. Don't think about this too much, just enter any number that comes to your head.
    </p>

    <h4>Story about the first Random Number Generator</h4>
    <h4>Statistics</h4>
    <h4>Generators that follow a specific distribution</h4>
    <h4>Tests</h4>
    <h4>Updates</h4>
</div>
</template>

<script>
import {
    Tooltip
} from 'bootstrap/dist/js/bootstrap.esm.min.js'

export default {
    mounted() {
        //init tooltip
        Array.from(document.querySelectorAll('a[data-bs-toggle="tooltip"]'))
            .forEach(tooltipNode => new Tooltip(tooltipNode))
    }
}
</script>
