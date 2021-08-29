// Random Number Generator
// 22nd August 2021

<template>
<div class="container">

    <h2>How random are random numbers ?</h2>
    <h6>Published on 21st August 2021</h6>
    <hr>

    <h4>
        tl;dr || make an accordian
    </h4>
    <p>
        Give a link to TLDR and place TLDR at bottom.
        Computers cannot generate randomness, however they have access to signals which are generated from events around them ( elapsed milliseconds since 1971 , keyboard / mouse clicks, etc ). Using these signals, a pseudo random number generator outputs which are functions of these random signals only. There have been numerous algorithms over the years to perform this activity. First one was called Middle Square Method which did quite a bad job of it but paved way for algorithm X which is now the base of all the modern algorithms.
    </p>

    <h4>Introduction</h4>
    <p>I think the best way to start would be an XKCD comic strip on the same topic</p>
    <img src="https://imgs.xkcd.com/comics/random_number.png" class="img-fluid" alt="XKCD : Random Number" />
    <br />
    <br />
    <p class="muted">
        Computers were designed to be deterministic in nature. A computer should always give us same answer to any particular question no matter how many times we ask it. 1 + 1 should always be 2 and nothing else. This is an important and non negotiable prerequisite for us to rely on computers.

        <a href="#" @click.stop.prevent data-bs-toggle="tooltip" title="" data-bs-html="true" data-bs-original-title="<i>Sometimes I feel it's the other way around, where I am an integral part of my smart phone's life and all my life's decisions revolve around keeping the little bugger charged and safe. We'll have the philosophical discussions on this topic some other day ...</i>">With time, they have become an integral part of our lives.</a>

        They do a lot of heavy lifting by managing important but monotonous activities in the background. We let them fly aeroplanes, manage our bank accounts, help with communications, and a thousand other things. I don't think we trust any other human being as much as we trust our computers and smartphones. None of which would have been possible if computers were unpredictable. This sheer predictibility of a computer's behaviour makes them such a powerful tool that today's generation can't even imagine a world without them.
    </p>
    <p>
        On the other hand, random sequences are a starting point for a lot of financial and statistical analyses. Even for developing machine learning models, we generally start with random numbers and iteratively build from there. Mostly for those purposes, I have been asking computers to generate random numbers since quite sometime now. And as far as my human brain can comprehend, they appear to be doing a decent job of it, because everytime I ask it to give me a random number, it gives me a different number.

        <!-- Few days ago, when I asked the computer to give me a sequence of random numbers, it did ... it actually did and the results really seemed random. I checked multiple times by asking it the same question again and again... guess what ... the answer was different every time.

        <a href="#" @click.stop.prevent data-bs-toggle="tooltip" title="" data-bs-html="true" data-bs-original-title="<i>Well my mind gets blown by a lot of things ... but still...</i>">My mind was blown. 😱 </a>

        In my head, this was analogous to opening the door of my refrigerator to see something other than the leftovers I shoved in yesterday. -->
    </p>
    <p>
        The words deterministic and random are pure antonyms of each other, yet somehow deterministic computers are able to generate random numbers. This weird combination makes me curious about the inner workings of this seemingly banal but critical problem of today's computing world. With this new found curiosity, I started researching a bit more about this problem and turns out that a lot of people have worked very hard over the years so that we can make computers churn out random number ( or seemingly random numbers ... will delve into the details shortly )
    </p>

    <h4>
        Why are you making such a big deal about random numbers ?
    </h4>

    <p>
        Because it is one of those things which we think is so trivial that we shouldn't even bother about it, but once we dive into the details, we can see the devil partying there. I love these sort of things and that's why I feel like doing some research on the topic.
    </p>

    <p>
        Let's start by understanding the concept of randomness. Randomness loosely means lack of certainity. The more certain we are about something, the less random it appears to be. Let's say I am sitting in a dark room without my phone, and suddenly I have an urge to find which direction North is. I can take a guess but I can never be certain about the answer, it's a situation with large degree of randomness and almost zero certainity. On the other hand, if I am in a park and have the same urge, then it'd be a different ball game altogether. Based on the approximate time, ( if it's morning or evening ) and the knowledge that - sun rises in the east and sets in the west, I can point to a fixed direction and say that's north. There would still be some randomness in it because north may lie a bit to the left ( or to the right ) but in this situation, there is a lot more certainity and significantly less randomnes.

    </p>
    <p>
        Now coming to the case of numbers, a random number generator is meaningful only when we have to generate numbers repeatedly. For e.g. if we only need to generate only one number and that too only once then 4 (or any other number) is a perfectly good an answer. It is only when we have to repeat the same task again and again, the concept of randomness comes into picture. If our random number generator is programmed to always give 4 as an answer, then it's not random anymore. I can always predict correctly what the next number would be. <b>For a random number generator to be perfect, all numbers should have an equal probability of being the output in each and every time</b>. This statement holds true only for a class of RNGs called uniform random number generators. They are of importance because any other class of random numbers can be derived if we have a way to generate uniformly distributed random numbers.
    </p>

    <h4>
        How good are human beings at the job ?
    </h4>

    <p>
        Like a lot of things, Internet seems to be divided on the topic. <a href="https://www.reddit.com/r/dataisbeautiful/comments/acow6y/asking_over_8500_students_to_pick_a_random_number/">This reddit post</a> proves that humans don't do a very good job of generating random numbers. According to the post, If a human being is asked to generate a random number between 0-10, then there is a very high probability that the answer would be 7 and a very low probability that the answer would be 0. So even though the numbers would be random, they won't be uniformly distributed. While <a href="https://qr.ae/pGi2nX">an answer on Quora</a> suggests otherwise. The author explains that if we apply some post processing on top of human generated numbers, then the results are fairly acceptable.
    </p>

    <a href="#" @click.stop.prevent data-bs-toggle="tooltip" title="" data-bs-html="true" data-bs-original-title="<i>I'll start the clock around the time of WW-2 because that's when computers were invented. Here we are mostly interested in how computers do the job</i>">
        <h4>How did the world do it before computers ?</h4>
    </a>

    <p>
        While researching for this article, I came across mention of a book from 1950s called <a href="https://www.rand.org/pubs/monograph_reports/MR1418.html">A Million Random Digits with 100,000 Normal Deviates</a> that has 400 pages filled with random numbers. If you are interested to flip through it, then a .pdf version is freely available on the publisher's website. That was a time unlike today where personal computers didn't exist and internet hadn't been invented yet, so naturally acquiring information took considerable amount of effort. If someone had to do statistical experiments, then this book was a lifesaver because then it'd be one less thing off the list for them. They'd already have an acceptable list of random numbers. With availability of the information solved for, speed still remained a bottleneck. I can only imagine how slow those experiments would have been if someone had to do type in / copy huge lists of these random numbers before starting an experiment.
    </p>

    <h4>An electronic computer appears</h4>

    <p>
        A team of scientists were working on the Hydrogen bomb in late 1940s at Los Alamos National Laboratory. A portion of that research involved investigating neutron diffusion in fissionable materials. In simple terms, they were trying to estimate - Once a neutron entered a fissionable material, how will the subsequent chain reaction look like. A chain reaction consisted of the following components:

        <ol>
            <li>Given a neutron with a certain postion and velocity, how far will the neutron travel before colliding with an atomic nucleus.</li>
            <li>
                Once the collission has taken place, how much energy has been released in the collision.
            </li>
            <li>
                Sometimes, collisions are also accompnied by a fission ( the nucleus breaks and releases more neutrons ). So depending the collision that just happened, scientists had to determine if fission took place.
            </li>
            <li>
                If a fission took place, then how many neutrons were released in the process. Momentums of these newly released neutrons have to be calculated.
            </li>
            <li>
                Then the whole process is applied for these newly generated neutrons as well
            </li>
        </ol>

        Originally the research used massive groups of people doing huge numbers of calculations, but during the course of the research, <a href="https://en.wikipedia.org/wiki/John_von_Neumann">John Von Neumann</a> and <a href="https://en.wikipedia.org/wiki/Stanislaw_Ulam">Stanislaw Ulam</a> realised that they could use <a href="https://en.wikipedia.org/wiki/ENIAC">ENIAC (Electronic Numerical Integrator and Computer)</a> to do these calculations much more quickly using a statistical approach. Being secret, the work of von Neumann and Ulam required a code name. A colleague of von Neumann and Ulam, Nicholas Metropolis, suggested using the name Monte Carlo, which refers to the Monte Carlo Casino in Monaco where Ulam's uncle would borrow money from relatives to gamble. Using lists of "truly random" random numbers was extremely slow (someone would have to feed it to the computer and at that point of time, people used punch cards to feed data), but von Neumann developed a way to calculate pseudorandom numbers, using the middle-square method (coming below shortly). Though this method has been criticized as crude, von Neumann was aware of this: he justified it as being faster than any other method at his disposal, and also noted that when it went off it did so in an obvious fashion, unlike methods that could be subtly incorrect. Later on a <a href="https://mcnp.lanl.gov/pdf_files/nbs_vonneumann.pdf">paper</a>  was published describing the algorithm. In that paper, Von Neumann wrote the famous words - "Anyone who considers arithmetical methods of producing random digits is, of course, in a state of sin.".

        <br>
        The above story has been picked from the following sources:
        <ol>
            <li><a href="https://en.wikipedia.org/wiki/ENIAC#Role_in_the_hydrogen_bomb"> ENIAC</a></li>
            <li><a href="https://en.wikipedia.org/wiki/Monte_Carlo_method#History">Monte Carlo Method</a></li>
            <li><a href="https://permalink.lanl.gov/object/tr?what=info:lanl-repo/lareport/LA-UR-88-9067">The Beginning of Monte Carlo Method</a></li>
        </ol>
    </p>

    
    <MiddleSquareCalculation />
    <h4>Statistics</h4>

    <p>
        distribution of chain length
        x -> seed, y -> length

        distribution of end point
        x -> seed, y -> ending point
    </p>

    <h4>Generators that follow a specific distribution</h4>
    <h4>Tests</h4>
    <h4>Updates</h4>
</div>
</template>

<script>
import {
    Tooltip
} from 'bootstrap/dist/js/bootstrap.esm.min.js';
import {
    onMounted
} from '@vue/runtime-core'

import MiddleSquareCalculation from '../interactive/MiddleSquareCalculation.vue';

export default {
    components: {
        MiddleSquareCalculation
    },
    setup() {

        onMounted(() => {
            //init tooltip
            Array.from(document.querySelectorAll('a[data-bs-toggle="tooltip"]'))
                .forEach(tooltipNode => new Tooltip(tooltipNode))
        });

    }
}
</script>
