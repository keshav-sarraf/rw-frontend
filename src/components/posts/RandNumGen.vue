// Random Number Generator
// 22nd August 2021

<template>
<div class="container">

    <h2>How random are random numbers ?</h2>
    <h6>Published on 21st August 2021</h6>
    <hr>

    <h5>
        <a href="#tldr">
            tl;dr
        </a>
    </h5>

    <h4>Introduction</h4>
    <p>I think the best way to start would be an XKCD comic strip on the same topic</p>
    <img src="https://imgs.xkcd.com/comics/random_number.png" class="img-fluid" alt="XKCD : Random Number" />
    <br />
    <br />
    <p class="muted">
        Computers were designed to be deterministic in nature. 1 + 1 should always return 2 and nothing else. This is an important and non negotiable prerequisite for us to rely on computers.

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
        Because it is one of those things which on surface appears to be so trivial that we don't even bother looking under the hood, but once we dive into the details, we can see the devil 😈 partying there. I love these sort of things and that's why.
    </p>

    <p>
        Let's start by understanding the concept of randomness. Randomness loosely means lack of certainity. The more certain we are about something, the less random it appears to be. As an example, Let's say I am sitting in a dark room without my phone, and suddenly I have an urge to find which direction North is. I can take a guess but I can never be certain about the answer, Any direction that I point to will have some probability of being North. It's a situation with large degree of randomness and almost zero certainity. On the other hand, if I am in a park and have the same urge, then it'd be a different ball game altogether. Based on the approximate time, ( if it's morning or evening ) and the knowledge that - sun rises in the east and sets in the west, I can point to a fixed direction and say that's north. There would still be some randomness in it because north may lie a bit to the left ( or to the right ) to where I pointed my finger at but in this situation, there is a lot more certainity and significantly less randomnes.

    </p>
    <p>
        Now coming to the case of numbers, a random number generator is meaningful only when we have to generate numbers repeatedly. For e.g. if we need to generate only one number and that too only once then 4 (or any other number) is a perfectly good an answer. It is only when we have to repeat the same task again and again, the concept of randomness comes into picture. If our random number generator is programmed to always give 4 as an answer, then it's not random anymore. I can always predict correctly what the next number would be. My experiments that end up using this random number generator would end up being biased.
        <br>
        <b>For a random number generator to be perfect :
            <ol>
                <li>All numbers should have an equal probability of being the output each and every time we use it and</li>
                <li>The next number that would be outputed should be independent of previous number that was outputed.</li>
            </ol>
        </b>
        First statement holds true only for a class of RNGs (Random Number Generators) called uniform random number generators. They are of importance because other class of RNGs can be derived from a uniform RNG.
    </p>

    <h4>
        How good are human beings at the job ?
    </h4>

    <p>
        Like a lot of things, Internet seems to be divided on the topic. <a href="https://www.reddit.com/r/dataisbeautiful/comments/acow6y/asking_over_8500_students_to_pick_a_random_number/">This reddit post</a> proves that humans don't do a very good job of generating random numbers. According to the post, If a human being is asked to generate a random number between 0-10, then there is a very high probability that the answer would be 7 and a very low probability that the answer would be 0. So even though the numbers would be random, they won't be uniformly distributed. While <a href="https://qr.ae/pGi2nX">an answer on Quora</a> suggests otherwise. The author explains that if we apply some post processing on top of human generated numbers, then the results are fairly acceptable.
    </p>

    <h4>How did the world do it before computers ?</h4>

    <p>
        PS: <i>I'll start the clock around the time of WW-2 because that's when computers were invented and we are mostly interested in how computers do the job.</i>
        <br>
        <br>
        While researching for this article, I came across mention of a book from 1950s called <a href="https://www.rand.org/pubs/monograph_reports/MR1418.html">A Million Random Digits with 100,000 Normal Deviates</a> that has 400 pages filled with random numbers. If you are interested to flip through it, then a .pdf version is freely available on the publisher's website. That was a time unlike today where electronic computers were just being created in military facilities and internet hadn't been invented yet. Acquiring information took considerable amount of effort. If someone had to do statistical experiments, then this book was a lifesaver because then it'd be one less thing off the list for them. They'd already have an acceptable list of random numbers. With availability of the information solved for, speed still remained a bottleneck. I can only imagine how slow those experiments would have been if someone had to do type in / copy huge lists of these random numbers before starting an experiment.
    </p>

    <h4>An electronic computer appears</h4>

    <p>
        A team of scientists were working on the Hydrogen bomb in late 1940s at Los Alamos National Laboratory. A portion of that research involved investigating neutron diffusion in fissionable materials. In simple terms, they were trying to estimate - Once a neutron entered a fissionable material, how will the subsequent chain reaction look like. A chain reaction consists of the following components:

        <ol>
            <li>Given a neutron with a certain postion and velocity, estimate how far will the neutron travel before colliding with an atomic nucleus.</li>
            <li>
                Once a collission has taken place, how much energy will been released in the process.
            </li>
            <li>
                Sometimes, collisions are accompnied by fission ( the nucleus breaks and releases more neutrons ). So for the collision that just happened, determine if a nuclear fission took place.
            </li>
            <li>
                If fission took place, then how many neutrons were released in the process.
            </li>
            <li>
                For each of the neutrons, determine its momentum.
            </li>
            <li>
                Repeat the process again from step 1 using the current position and velocities of all the neutrons.
            </li>
            <li>
                Continue the loop till for a fixed duration or till the collisions die down.
            </li>
        </ol>

        Originally the research used massive groups of people doing huge numbers of calculations, but during the course of the research, <a href="https://en.wikipedia.org/wiki/John_von_Neumann">John Von Neumann</a> and <a href="https://en.wikipedia.org/wiki/Stanislaw_Ulam">Stanislaw Ulam</a> realised that they could use <a href="https://en.wikipedia.org/wiki/ENIAC">ENIAC (Electronic Numerical Integrator and Computer)</a> to do these calculations much more quickly using a statistical approach (as compared to actually solving differential equations using human calculations).

        <br>
        <br>
        PS: <i>The following paragraphs explains what a monte carlo simulation is, if you know it already, then feel free to skip ahead.</i>
        <br>
        <br>

        They experimentally figured out probabilities of various outcomes in the steps mentioned above and created a computer model of the whole process. The model took initial position and momentum of the neutrons along with properties of the material and provided the details of the chain reaction. For e.g. To achieve step 3 above, scientists experimentally figured out the probability of a fission happening on collision. Then they performed multiple computer simulations with slightly varying initial speed and position of neutrons. Whenever the program said that there was a collision, a <b>random number</b> between 0-1 was used to determine if fission took place or not. For e.g. hypothetically, the random number generated was 0.6 and the probability of fission after collision is 0.5, then the simulation assumes that fission has taken place (because 0.6 > 0.5). Based on all the outcomes of all these varying inputs, statistical analyses were performed. This experiment popularised what we now a days call monte carlo simulations.
    </p>

    <h5> Why the name "Monte Carlo" ?</h5>

    <p>
        Being a secret, this work required a code name. A colleague of von Neumann and Ulam, Nicholas Metropolis, suggested using the name Monte Carlo, which refers to the Monte Carlo Casino in Monaco where Ulam's uncle would borrow money from relatives to gamble.
    </p>
    <h5> It was a nice story and all ... but how were random numbers calculated ? </h5>
    <p>
        For performing these simulations, using precompiled lists of random numbers was extremely slow. A person would have to manually feed the list to the computer and at that point of time, people used punch cards to feed data, so feeding data was a slow and complicated process, It was then when von Neumann developed a way to calculate <b>pseudorandom numbers</b> ( I'll talk about it in the next section, loosely speaking it's a number which is not random in reality but gives an appearance of randomness ). He called the algorithm <b>middle-square method</b> (again coming below). Though this method has been criticized as crude, von Neumann was aware of this: he justified it as being faster than any other method at his disposal, and also noted that when it went off it did so in an obvious fashion, unlike methods that could be subtly incorrect. Later on, a <a href="https://mcnp.lanl.gov/pdf_files/nbs_vonneumann.pdf">paper</a> was published describing the algorithm. In that paper, von Neumann wrote the famous words - "Anyone who considers arithmetical methods of producing random digits is, of course, in a state of sin".
        <br>
        <br>
        The above story has been picked from the below mentione sources. Some phrases have been blatantly copied over while others have been created by using my understanding of the story.
        <ol>
            <li><a href="https://en.wikipedia.org/wiki/ENIAC#Role_in_the_hydrogen_bomb"> ENIAC</a></li>
            <li><a href="https://en.wikipedia.org/wiki/Monte_Carlo_method#History">Monte Carlo Method</a></li>
            <li><a href="https://permalink.lanl.gov/object/tr?what=info:lanl-repo/lareport/LA-UR-88-9067">The Beginning of Monte Carlo Method</a></li>
        </ol>
    </p>

    <h4>
        Wtf is a pseudorandom number (PRN)?
    </h4>
    <p>
        Primary idea is to come up with an algorithm to which if we give a random input, it provides an output which solely depends on the input and to use this algorithm to generate a series of random numbers. If by some means we figure out the first number ( called seed ) and feed it to the algorithm, we can then use the algorithm's output as in input for the next number.
        
        in combination with this seemingly random input. We know that computers are deterministic in nature, but they have access to random information around them. For e.g time interval between key strokes or last few digits of time elapsed in milliseconds since 1970. So if we use the above algorithm and the random external input, computer's can generate a statistically random series. A natual question is then, humans are considerably slower than computers so won't the computers be 

        A set of values or elements that is statistically random, but it is derived from a known starting point and is typically repeated over and over. Pseudo-random numbers provide necessary values for processes that require randomness, such as creating test signals or for synchronizing sending and receiving devices in a spread spectrum transmission. It is called "pseudo" random, because the algorithm can repeat the sequence, and the numbers are thus not entirely random.
    </p>

    <h4>
        Middle Square Method
    </h4>

    <p>

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

    <h4 id="tldr">
        tl;dr
    </h4>
    <p>
        Computers cannot generate randomness, however they have access to signals which are generated from events around them ( elapsed milliseconds since 1971 , keyboard / mouse clicks, etc ). Using these signals, a pseudo random number generator outputs which are functions of these random signals only. There have been numerous algorithms over the years to perform this activity. First one was called Middle Square Method which was developed to while researching the hydrogen bomb. It did quite a bad job of creating random numbers but paved way for algorithm X which is now the base of all the modern algorithms.
    </p>
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
