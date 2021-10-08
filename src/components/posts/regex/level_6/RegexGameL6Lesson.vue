<template>
<div>
    <h4>Lesson</h4>
    <h5>Repetitions</h5>
    <p>
        The meta characters <code>+</code>, <code>*</code> or <code>?</code> in some way or form are specify repeatitions of a pattern. Although broadly being linked to repetitions, these 3 meta characters serve slightly different purposes. Let's start with <code>*</code>
    </p>

    <h5>The Star</h5>

    <p>
        The <code>*</code> symbol matches zero or more repetitions of the preceding matcher. The regular expression <code>a*</code> means: <code>zero or more repetitions of the preceding lowercase character a</code>. But if it appears after a character set or class then it finds the repetitions of the whole character set. For example, the regular expression <code>[a-z]*</code> means: <code>any number of lowercase letters in a row</code>.
        <br>
        <code>
            "[a-z]*" => T<mark>he car parked in the garage</mark>.
        </code>
        <br>
    </p>
    <p>
        An interesting thing happens when we combine <code>\.</code> and <code>*</code>. The full stop means anything and the star means zero or more copies of it. So this ends up matching everything that comes under full stop's jurisdiction 😀.
    </p>

</div>
</template>
