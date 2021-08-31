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
        Computers were designed to be deterministic in nature. If I ask what's 1 + 1, a computer always returns 2 and nothing else. This is an important and non negotiable prerequisite for us to rely on computers.
<!-- 
        <a href="#" @click.stop.prevent data-bs-toggle="tooltip" title="" data-bs-html="true" data-bs-original-title="<i>Sometimes I feel it's the other way around, where I am an integral part of my smart phone's life and all my life's decisions revolve around keeping the little bugger charged and safe. We'll have the philosophical discussions on this topic some other day ...</i>">With time, they have become an integral part of our lives.</a> -->
        <!-- They do a lot of heavy lifting by managing important but monotonous activities in the background. We let them fly airplanes, manage our bank accounts, help with communications, and a thousand other things. I don't think we trust any other human being as much as we trust our computers and smartphones. None of which would have been possible if computers were unpredictable. -->
        This sheer predictability of a computer's behavior makes them such a powerful tool that today's generation can't even imagine a world without them.
    </p>
    <p>
        On the other hand, random sequences are a starting point for a lot of statistical analyses. Even for developing machine learning models, we generally start with random numbers and iteratively build from there. Personally, I have been asking computers to generate random numbers since quite sometime now. And as far as my tiny brain can comprehend, they appear to be doing a decent job of it, because every-time I ask it to give me a random number... well, it gives me a different number and it appears random to me.

        <!-- Few days ago, when I asked the computer to give me a sequence of random numbers, it did ... it actually did and the results really seemed random. I checked multiple times by asking it the same question again and again... guess what ... the answer was different every time.

        <a href="#" @click.stop.prevent data-bs-toggle="tooltip" title="" data-bs-html="true" data-bs-original-title="<i>Well my mind gets blown by a lot of things ... but still...</i>">My mind was blown. 😱 </a>

        In my head, this was analogous to opening the door of my refrigerator to see something other than the leftovers I shoved in yesterday. -->
    </p>
    <p>
        The words deterministic and random are pure antonyms of each other, yet somehow deterministic computers are able to generate random numbers. This weird combination makes me curious about the inner workings of this seemingly banal but widespread problem of today's computing world. With this new found curiosity, I started researching a bit more about this problem and turns out that a lot of people have worked very hard over the years so that we can make computers churn out random numbers ( or seemingly random numbers ... will delve into the details shortly )
    </p>

    <!-- <h4>
        Why are you making such a big deal about random numbers 🎲
    </h4>

    <p>
        Because it is one of those things which on surface appears to be so trivial that we don't even bother looking under the hood, but once we dive into the details, we can see the devil 😈 partying there. I love these sort of things and that's why.
    </p> -->

    <h4>What exactly is a random number ?</h4>

    <p>
        Let's start by understanding the concept of randomness. Randomness loosely means unpredictability. The more certain we are about something, the less random it appears to be. As an example, Let's say someone who I don't know asks me to guess his/her name. I can take a guess but I can never be certain about the answer. I can start with a list of most common names in my head but I can never be sure unless someone / something tells me the answer. It's a situation with large degree of randomness and almost zero certainty. <u>Anything can be the correct answer and I have absolutely no idea about it</u>. On the other hand, if I am in a park and have a sudden urge to find which direction north is, then I'd be much more comfortable. Based on the approximate time, ( if it's morning or evening ) and the knowledge that - sun rises in the east and sets in the west, I can point to a fixed direction and say that's north. There would still be some randomness in it because north may lie a bit to the left ( or to the right ) but in this situation, there is a lot more certainty and significantly less randomness.

    </p>
    <p>
        Coming to the case of numbers, a number is truly random only when all the numbers have an equal probability of arrival ( i.e. we don't have any idea of what the next number would be exactly ). Also, the concept of random numbers is meaningful only when we have to generate numbers repeatedly. For e.g. if we need to generate only one number, then 4 (or any other number) is a perfectly good answer. It is only when we have to repeat the same task again and again, the concept of randomness comes into picture. If our random number generator is programmed to always give 4 as an answer, then it's not random anymore. I can always predict with fair certainity what the next number would be. My experiments that use this random number generator would end up being biased, because the results will not have details about what'll happen when 6 comes ( or any other number ).
        <br>
        <b>For a random number generator to be perfect :
            <ol>
                <li>All numbers should have an equal probability of being the output each and every time we use the generator and</li>
                <li>The next number that would be outputted should be independent of previous number that was outputted.</li>
            </ol>
        </b>
        First statement holds true only for a class of RNGs (Random Number Generators) called uniform random number generators. They are of importance because other class of RNGs can be derived from a uniform RNG.
    </p>

    <h4>
        How good are human beings at the job 🤷‍♀️?
    </h4>

    <p>
        Like a lot of things, Internet seems to be divided on the topic. <a href="https://www.reddit.com/r/dataisbeautiful/comments/acow6y/asking_over_8500_students_to_pick_a_random_number/">This reddit post</a> proves that humans don't do a very good job of generating random numbers. According to the post, If a human being is asked to generate a random number between 0-10, then there is a very high probability that the answer would be 7 and a very low probability that the answer would be 0. So even though the numbers would be random, they won't be uniformly distributed. While <a href="https://qr.ae/pGi2nX">an answer on Quora</a> suggests otherwise. The author explains that if we apply some post processing on top of human generated numbers, then the results are fairly acceptable.
    </p>

    <h4>How did the world do it before computers ?</h4>

    <p>
        PS: <i>I'll start my clock around the time of WW-2 because that's when computers were invented and we are primarily interested in how computers do the job.</i>
        <br>
        <br>
        While researching for this article, I came across mention of a book from 1950s called <a href="https://www.rand.org/pubs/monograph_reports/MR1418.html">A Million Random Digits with 100,000 Normal Deviates</a> that has 400 pages filled with random numbers. If you are interested to flip through it, then a .pdf version is freely available on the publisher's website(linked with the name). That was a time unlike today where electronic computers were just being created and internet hadn't been invented yet. Acquiring information took considerable amount of effort. If someone had to do statistical experiments, then this book was a lifesaver because then it'd be one less thing off the list for them. They'd already have an acceptable list of random numbers. With availability of the information solved for, speed still remained a bottleneck. I can only imagine how slow those experiments would have been if someone had to do manually copy huge lists of these random numbers before starting an experiment.
    </p>

    <h4>An electronic computer appears 👾</h4>

    <p>
        A team of scientists who were working on the Hydrogen bomb in late 1940s at Los Alamos National Laboratory, came across an interesting problem. In scientific terms, it was related to neutron diffusion in fissionable materials. In simple terms, they were trying to estimate - Once a neutron enters a fissionable material, how will the subsequent chain reaction look like. A self sustained chain reaction would mean an explosive release of energy in a short span of time, so understanding it was critical to the research. The involved calculation consisted of the following components:

        <ol>
            <li>Given a neutron with a certain position and velocity, estimate how far will the neutron travel before colliding with an atomic nucleus.</li>
            <li>
                Once a collision has taken place, how much energy will been released.
            </li>
            <li>
                Sometimes the collisions are accompanied by a fission ( the nucleus breaks and releases more neutrons ). So for the collision that just happened, determine if a nuclear fission took place or not.
            </li>
            <li>
                If a fission took place, then how many neutrons were released in the process.
            </li>
            <li>
                For each of the resulting neutrons, determine the momentum.
            </li>
            <li>
                Repeat the process again from step 1 using the updated position and velocities of all the neutrons.
            </li>
        </ol>

        Originally the research used massive groups of people doing huge numbers of calculations, but during the course of the research, <a href="https://en.wikipedia.org/wiki/John_von_Neumann">John Von Neumann</a> and <a href="https://en.wikipedia.org/wiki/Stanislaw_Ulam">Stanislaw Ulam</a> realized that they could use <a href="https://en.wikipedia.org/wiki/ENIAC">ENIAC (Electronic Numerical Integrator and Computer)</a> to do these calculations much more quickly using a statistical approach (as compared to actually solving differential equations using human calculations).

        <!-- In the said statistical approach, a computer model of the process was created and simulations were conducted to determine the chain reaction by providing the initial velocity and position of the triggering neutron. The experiment was then repeated thousands of times with slight modifications to the input. Ultimately all the results were then agregated to get a final sense. Hypothetically speaking, if only 5% of the chain reactions were self sustainable, then scientists would have concluded that the provided experimental setup needed major modifications, but if 90% of them were self sustainable, then they could have had a strong confidence in their design. -->

        <br>
        <br>
        PS: <i>The following paragraph is an imagination of how the statistical calculation would have been performed, if you already know what monte carlo simulations are, then feel free to skip ahead.</i>
        <br>
        <br>

        Researchers experimentally figured out probabilities of various possible outcomes and created a computer model of the whole process. Model is just a fancy term to describe a set of calculations, thats it. In this case, the model performed all the calculations from step 1-6. It took initial position and momentum of a neutron and provided the details of the resulting chain reaction as an output. For e.g. To achieve step 3 above, scientists first figured out the probability of a fission happening on collision using real world experiments. Then they performed multiple computer simulations of the chain reaction with slightly varying initial speed and position of neutrons. Whenever the program said that there was a collision, a <b>random number</b> between 0-1 was used to determine if fission took place or not.
        <!-- For e.g. if the random number generated was 0.6 and the probability of fission after collision was determined to be 0.5, then the simulation assumed that fission has taken place in that particular simulation. Whereas maybe in the next iteration, the generated random number was 0.2 so the simulation said that there was no fission.  -->
        Based on all the outcomes of multiple varying inputs, statistical analyses were performed. A statistical analysis could have been as simple as measuring the fraction of outcomes where acceptable number of fissions took place or measuring the average length of the chain reaction or something entirely different. This experiment popularized what we now a days call monte carlo simulations.
    </p>

    <!-- <p>
        Just imagine a scenario where the random number generator used in the experiment always provided a fixed number, then the reliability of the output would have been very questionable. The model would have always predicted that there would be a fission ( or no fission ) for all cases, i.e. in the model, probability of fission would have been either 0 or 1, while the real world experiments definitely suggested otherwise.
    </p> -->

    <h5> Why the name "Monte Carlo" ?</h5>

    <p>
        Being a secret, this work required a code name. A colleague of von Neumann and Ulam, Nicholas Metropolis, suggested using the name Monte Carlo, which refers to the Monte Carlo Casino in Monaco where Ulam's uncle would borrow money from relatives to gamble.
    </p>
    <h5 id="middle_square_intro"> It was a nice story and all ... but didn't you skip over the part describing how the random numbers were calculated ? </h5>
    <p>
        Ok coming back to the topic at hand. Using a precompiled lists of random numbers was extremely slow. A person would have to manually feed the list to the computer and at that point of time, people used punch cards to feed data, so feeding data was a slow and complicated process, It was then when von Neumann developed a way to calculate <b>pseudorandom numbers</b> ( I'll talk about it in the next section, loosely speaking it's a number which is not random in reality but gives the appearance of randomness ). He called the algorithm <b>middle-square method</b> (again coming below). Though this method has been criticized as crude, von Neumann was aware of this: he justified it as being faster than any other method at his disposal, and also noted that when it went off it did so in an obvious fashion, unlike methods that could be subtly incorrect. Later on, a <a href="https://mcnp.lanl.gov/pdf_files/nbs_vonneumann.pdf">paper</a> was published describing the algorithm. In that paper, von Neumann wrote the famous words - "Anyone who considers arithmetical methods of producing random digits is, of course, in a state of sin".
        <br>
        <br>
        The above story has been picked from the below mentione sources. Some phrases have been blatantly copied over while others have been created by my understanding of the story.
        <ol>
            <li><a href="https://en.wikipedia.org/wiki/ENIAC#Role_in_the_hydrogen_bomb"> ENIAC</a></li>
            <li><a href="https://en.wikipedia.org/wiki/Monte_Carlo_method#History">Monte Carlo Method</a></li>
            <li><a href="https://permalink.lanl.gov/object/tr?what=info:lanl-repo/lareport/LA-UR-88-9067">The Beginning of Monte Carlo Method</a></li>
        </ol>
    </p>

    <h5>
        Wtf is a pseudorandom number (PRN)?
    </h5>
    <p>
        I think by this time you would have realized that true random numbers cannot be generated by arithmetic algorithms, once we know the algorithm, we know exactly what the results would look like. Using tables of random numbers was effective but slow. Additionally the available tables at that time were of limited size thus becoming a bottleneck in scaling of the experiments, so von Neumann did the next best thing. He created an algorithm which facilitated 2 important points.
        <ol>
            <li>It was random enough, i.e. numbers generated were not random in the true sense of randomness but were random enough for him to use them in his experiments without sacrificing the quality of results.
            </li>
            <li>When performing experiments, it is important to have reproducibility, i.e. One should be able to reproduce the results by providing the same set of inputs to the experimental setup. If von Neumann used truly random generators then, he wouldn't have had the ability to reproduce results at all. PRNs provided a deterministic way to regenerate the sequences of random numbers when need arose.
            </li>
        </ol>
        The sequence of random numbers which are generated using such algorithms are called PRN ( Pseudo Random Numbers). von Neumann named his algorithm as middle square method.
    </p>

    <h5> So how did this algorithm work ? </h5>
    <p>
        The algorithm used a simple mathematical operation to generate n digit random numbers.
        <ol>
            <li>
                In the first step, a number with n digits was provided to the algorithm as an input, the algorithm then returned the middle n digits of the number obtained by squaring the provided input.
            </li>
            <li>
                In subsequent steps, when the algorithm was asked for the next random number, it used the previous output as the new input and provided next number in the sequence.
            </li>
        </ol>
        This created a chain of random numbers which could be deterministically calculated with only the knowledge of the starting point. This starting point is called "seed" in the terminology of PRNGs. The next challenge is to figure out this seed, but once we have a seed, we have the needed sequence of random numbers.
        <br>
        A common drawback of PRNGs is of getting stuck in cycles. It is entirely possible that the PRNG outputs a number which we have already seen before. And once we feed it back to the algorithm, the cycle keeps on repeating. Much of today's commonly used algorithms have very long (check the number --- 2^20) cycles, but cycles do exist.
    </p>

    <h5>How is the seed determined ?</h5>
    
    <p>
        I couldn't figure out what numbers von Neumann used as seeds in his experiments but based on my experience, nowadays, we generally use either a fixed number from our whim ( for reproducibility ) or something which is fluctuating ( if reproducibility is not necessary ). The most common fluctuating quantity is the number of elapsed milliseconds since 1970.
    </p>

    <h4>
        Middle Square Method
    </h4>

    <p>
        As mentioned <a href="#middle_square_intro">above</a> the algorithm was not too good. It got stuck in cycles too quickly and more than often the sequences decayed to 0. Below is a toy PRNG based on this algorithm for generating random numbers of 4 digits. You can move around the slider to adjust the seed, and you'll see how short the cycles are. For e.g. if you start with the seed as 3600, you'll see the sequence repeating just after 4 numbers, whereas if you select 1391 as your seed, then the cycle starts after 104 numbers.        
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
        Computers cannot generate randomness, however they have access to signals which are sort of random and are generated from events around them. Using these signals, a pseudo random number generator can produce random looking numbers. There have been numerous algorithms over the years to perform this activity. First one was called Middle Square Method which was developed to while researching the hydrogen bomb. Coincidently that project also led to popularizing monte carlo simulations ( which have a heavy use of random number generators). The algorithm did quite a bad job of creating random numbers but ultimately paved way for algorithm X which is now the base of all the modern algorithms.
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
