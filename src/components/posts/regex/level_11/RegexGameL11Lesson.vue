<template>
<div>
    <h4>Lesson</h4>

    <h5>The Alternation |</h5>

    <p>
        With <code>[]</code>, we can select characters from a collection, but what if we have to select from a collection of regex patterns ? We can achieve this with alternation <code>|</code>. <code>(pattern1|pattern2|pattern3)</code> will match either <code>pattern1</code> OR <code>pattern2</code> OR <code>pattern3</code>.
        <br>
        <br>
        <code>
            "car|par" => The <mark>car</mark> is <mark>par</mark>ked in the garage..
        </code>
        <br>
    </p>
    <p>
        Another interesting thing about alternation <code>|</code> is that, we can combine it with parentheses <code>()</code>. For example, <code>pattern0(pattern1|pattern2)</code> means the text has to match either <code>pattern0pattern1</code> or <code>pattern0pattern2</code>
    </p>

</div>
</template>
