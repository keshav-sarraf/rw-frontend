<template>
<div>
    <h4>Lesson</h4>

    <h5>Lookarounds</h5>
    <p>Imagine searching for something within a text when we already know what preceededs ( or succeededs ) our target. In such situations we can use this extra knowledge to help with our search. Diving into it, we can break Lookarounds into two categories, one is called lookahead and the other is called lookbehind.</p>

    <h6><u>Lookahead</u></h6>
    <p>
        As the name suggests, lookaheads are used when we want to find something by looking ahead of us. Imagine we have been given a paragraph in english and we are trying to find the last word of each sentence. We can create a regex that looks for words which are succeded by a full stop. The result of such an expression will only capture the word and not the full stop along with it.
        <br>
        Lookaheads can be further classified into two classes. One is called positive lookahead and the other is called negative lookahead.
    </p>
    <h6><u>Positive Lookahead</u></h6>
    <p>
        Positive Lookahead means we are looking for targets that are succeded by a lookahead expression, i.e. first part of the expression must be followed by the lookahead expression. The returned match only contains the text that is matched by the first part of the expression.
        <br>
        Let's take an example:
        <br>
        In the following sentence <code>The fat cat sat on the mat.</code>, we have to find the word <code>the</code> which is <b>comes before the word <code>mat</code></b>. This is an ideal candidate for positive lookahead because we need to return a word which is succeded by another word which we know of..
        <ol>
            <li>
                We start by defining regex for the word <code>the</code> => <code>[Tt]he</code>.
            </li>
            <li>
                Then we define regex for lookahead expression => <code>\smat</code>.
            </li>
            <li>
                Now we combine the two and tell regex to do a positive lookahead. It is achieved by using the following regex => <code>target expression(?=lookahead expression)</code>
            </li>
            <li>
                Result is : <code>"[Tt]he(?=\smat)" => The fat cat sat on <mark>the</mark> mat.</code>
            </li>
        </ol>
    </p>

    <h6><u>Negative Lookahead</u></h6>
    <p>
        Negative lookaheads are used when we need to get all matches from an input string that are not followed by a certain pattern. A negative lookahead is written the same way as a positive lookahead. The only difference is, instead of an equals sign =, we use an exclamation mark <code>!</code> to indicate negation i.e. <code>(?!lookahead expression)</code>. Let's take a look at the following regular expression <code>(T|t)he(?!\smat)</code> which means: get all <code>The or the</code> words from the input string <code>that are not followed by a space character and the word mat</code>.
        <br>
        <code>
            "(T|t)he(?!\smat)" => <mark>The</mark> fat cat sat on the mat.
        </code>
    </p>
    <h6><u>Lookbehind</u></h6>
    <p>
        Lookbehinds are similar to lookahead with an exception that in this case the lookbehind expression must come before the primary expression.
    </p>

    <h6><u>Positive Lookbehind</u></h6>
    <p>
        It is denoted by <code>(?&lt;=lookbehind expression)target expression</code>
        <br>
        <code>
            "(?&lt;=(T|t)he\s)(fat|mat)"=> The <mark>fat</mark> cat sat on the <mark>mat</mark>.
        </code>
    </p>

    <h6><u>Negative Lookbehind</u></h6>
    <p>
        Similar to the lookahead case, in the regex <code>=</code> is replaced by <code>!</code>. It is denoted by <code>(?&lt;!lookbehind expression)target expression</code>
    </p>

</div>
</template>
