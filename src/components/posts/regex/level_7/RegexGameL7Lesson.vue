<template>
<div>
    <h4>Lesson</h4>

    <h5>The Plus</h5>
    <p>
        The <code>+</code> symbol matches one or more repetitions of the preceding character. For example, the regular expression <code>c.+t</code> means: a lowercase <code>c</code>, followed by <code>at least one character</code>, followed by a lowercase <code>t</code>. It needs to be clarified that <code>t</code> is the last t in the sentence.
        <br>
        <code>
            "c.+t" => The fat <mark>cat sat on the mat</mark>.
        </code>
    </p>

    <p>
        PS: <code>*</code> means 0 or more repeatitions whereas <code>+</code> means 1 or more repeations.
    </p>

</div>
</template>
