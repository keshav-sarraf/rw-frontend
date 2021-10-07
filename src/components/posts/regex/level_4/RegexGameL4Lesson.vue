<template>
<div>
    <h4>Lesson</h4>

    <h5>Matching the meta characters themselves</h5>

    <p>
        Meta characters are special characters that help with our searches in regex. Whenever the regex interpreter sees a meta character, it automatically thinks that it has to do a special operation. But what if we have to search for the meta character itself?
        <br>
        Well, in that case, a backslash <code>\</code> comes to rescue. <code>\.</code> will search for literal full stop <code>.</code>, similarly <code>\[</code> will search for literal left square bracket <code>[</code> in the text.
    </p>

    <p>
        Till now, we have seen that <code>.</code> is used to represent anything whereas <code>[]</code> is used to represent anything within a specified set. What happens when we combine both of them to create <code>[.]</code>?
        <br>
        It is same as <code>\.</code>. It also searches for literal full stop.
        <br>
    </p>
    <code>
        "ar[.]" => A garage is a good place to park a c<mark>ar.</mark>
    </code>
</div>
</template>
