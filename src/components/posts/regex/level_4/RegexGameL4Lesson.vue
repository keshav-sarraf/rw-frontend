<template>
<div>
    <h4>Lesson</h4>

    <h5>Matching the meta characters themselves</h5>

    <p>
        Whenever the regex interpreter sees a meta character, it automatically thinks that it has to do a special operation. But what if we have to search for the meta character itself ? Say we have to find the full stop in a sentence, then what ?
        <br>
        Well, in that case, a backslash <code>\</code> comes to rescue. <code>\.</code> will search for the full stop <code>.</code>, similarly <code>\[</code> will do a literal search for left square bracket <code>[</code>.
    </p>

    <p>
        PS: Till now, we have seen that <code>.</code> is used to represent anything whereas <code>[]</code> is used to represent anything within a specified set. What happens when we combine both of them to create <code>[.]</code>?
        <br>
        The answer is that it is same as <code>\.</code>. It also searches for the literal full stop.
        <br>
    </p>
    <code>
        "ar[.]" => A garage is a good place to park a c<mark>ar.</mark>
    </code>
</div>
</template>
