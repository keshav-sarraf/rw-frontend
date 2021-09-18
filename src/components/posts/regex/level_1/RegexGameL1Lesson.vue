<template>
<div>
    <h4>Objective</h4>

    <p>
        You'd be given a block of text and a corresponding target to find something in it. Your task is to to provide a regular expression that provides the information that we are looking for. Remember the laptop is rigged to self destruct after sometime, so beware Agent Brown. Goodluck and godspeed 🏁.
    </p>

    <h4>Lesson</h4>

    <p>
        A regular expression (regex) is just a pattern of characters that we use to search within a given text. For example, the regular expression <code>the</code> means: the letter <code>t</code>, followed by the letter <code>h</code>, followed by the letter <code>e</code>.
    </p>
    <p>
        <code>"the" => The fat cat sat on <mark>the</mark> mat.</code>
    </p>
    <p>
        By default, regexes are normally case-sensitive so the regular expression <code>The</code> would <b>not</b> match the string <code>the</code>.
    </p>
    <p>
        <code>"The" => <mark>The</mark> fat cat sat on the mat.</code>
    </p>
</div>
</template>
