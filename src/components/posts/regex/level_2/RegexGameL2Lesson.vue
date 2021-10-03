<template>
<div>
        <h4>Lesson</h4>

        <h5>Meta Charaters</h5>
        <p>
            Meta characters are the building blocks of regular expressions. Meta characters do not stand for themselves but instead are interpreted in some special way
        </p>

        <h5>The Full Stop</h5>

        <p>
            The full stop <code>.</code> is the simplest example of a meta character. This meta character <code>.</code> matches any single character. It will <b>not</b> match "return" or "newline characters(\n)". For example, the regular expression <code>.ar</code> means: <code>*any single character*</code>, followed by the letter <code>a</code>, followed by the letter <code>r</code>.
        </p>
        <p>
            <code>
                ".ar" => The <mark>car</mark> <mark>par</mark>ked in the <mark>gar</mark>age.
            </code>
        </p>
    </div>
</template>
