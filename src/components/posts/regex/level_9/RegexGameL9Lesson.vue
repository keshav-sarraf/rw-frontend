<template>
<div>
    <h4>Lesson</h4>

    <h5>Curly Braces {}</h5>
    <p>
        Curly braces (also called quantifiers) are used to specify the number of times that a character or a group of characters can be repeated. For example, the regular expression <code>[0-9]{2,3}</code> means: Match <code>at least 2 digits, but not more than 3, ranging from 0 to 9</code>
        <br>
        <br>
        <code>
            "[0-9]{2,3}" => The number was 9.<mark>999</mark>7 but we rounded it off to <mark>10</mark>.0.
        </code>
    </p>
    <p>
        We can leave out the second number. For example, the regular expression <code>[0-9]{2,}</code> means: Match <code>2 or more digits</code>. If we also remove the comma, the regular expression <code>[0-9]{3}</code> means: Match <code>exactly 3 digits</code>.
    </p>

</div>
</template>
