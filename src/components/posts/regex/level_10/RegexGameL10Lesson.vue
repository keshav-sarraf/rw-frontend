<template>
<div>
    <h4>Lesson</h4>

    <h5>The Parantheses ()</h5>
    <p>
        Regular expressions allow us to not just match text but also to extract information for further processing. This is done by defining groups of characters and capturing them using the special parentheses <code>(</code> and <code>)</code> metacharacters. Any subpattern inside a pair of parentheses will be memorised by the interpreter separately. In practice, this can be used to extract information.
        <br>
        <code>
            "([cp])ar" => The <mark><span style="background-color: cyan">c</span>ar</mark> is <mark><span style="background-color: cyan">p</span>ar</mark>ked in the garage.
        </code>
        <br>
    </p>
    <p>
        In the above expression, the regex matches both <code>car</code> and <code>par</code> as it would have done without parentheses but with the addition of parentheses, it also captures the letters <code>c</code> and <code>p</code> respectively. It has utility in programming languages where we can extract these captured sections separately for later usage.
    </p>

</div>
</template>
