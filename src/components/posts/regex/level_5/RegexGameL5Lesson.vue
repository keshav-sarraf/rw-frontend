<template>
<div>
    <h4>Lesson</h4>

    <h5>[^] Negated Character Sets</h5>

    <p>
        Caret Symbol <code>^</code> in isolation has a different meaning which we'll get to later, but when it is typed after the opening square bracket it negates the character set i.e. it means everything except the character set. For example, the regular expression <code>[^c]ar</code> means: <code>any character except c</code>, followed by the letter <code>a</code>, followed by the letter <code>r</code>.
    </p>

    <code>
        "[^c]ar" => The car <mark>par</mark>ked in the <mark>gar</mark>age.
    </code>

</div>
</template>
