<template>
<div>
    <h4>Lesson</h4>

    <h5>Character Sets</h5>

    <p>
        Character sets are represented by square brackets <code>[]</code> to denote a collection of characters. In the previous lesson we saw that, a <code>.</code> can be used to match any character whereas in case of character sets, a match is found only if the character matches <code>any letter inside the defined set</code>. As the story generally goes with sets, order of the characters inside the square brackets doesn't matter. For example, the regular expression <code>[Tt]he</code> means: an uppercase <code>T</code> or lowercase <code>t</code>, followed by the letter <code>h</code>, followed by the letter <code>e</code>.
    </p>
    <p>
        <code>
            "[Tt]he" => <mark>The</mark> car parked in <mark>the</mark> garage.
        </code>
    </p>
    <p>
        <b>Note:</b> A hyphen "<code>-</code>" is used along side characters sets "<code>[]</code>" to describe long ranges. For e.g. <code>[A-D]</code> means all uppercase characters from <code>A</code> to <code>D</code>.

        Other commonly used ranges are: <code>[a-z]</code>, <code>[A-Z]</code>, <code>[0-9]</code>. They can even be combined into a larger collection like <code>[A-Za-z0-9]</code> which represents all alphanumeric characters.
    </p>
</div>
</template>
