<template>
<div>
    <h4>Lesson</h4>

    <h5>⚓️ The Anchors ^ $</h5>

    <p>
        If we have to find something specifically from the start of the string (or the end of the string) then anchors are the solution. Anchors are of two types: The first type is the caret <code>^</code> which denotes begining and the second type is the dollar sign <code>$</code> which denotes the end.
    </p>

    <h6><u>The Caret ^</u></h6>

    <p>
        The caret symbol <code>^</code> is used to check if a matching character is the first character of the input string. If we apply the following regular expression <code>^a</code> (meaning <code>a</code> must be the starting character) to the string <code>abc</code> we'll find a match - <code>a</code>. But if we apply the regular expression <code>^b</code> to the above string, there will be no match. Because in the string <code>abc</code>, <code>"b"</code> is not the starting character. Let's take a look at another regular expression <code>^(T|t)he</code> which means: an <code>uppercase T or a lowercase t must be the first character in the string</code>, followed by a <code>lowercase h</code>, followed by a <code>lowercase e</code>.
        <br>
        <code>
            "(T|t)he" => <mark>The</mark> car is parked in <mark>the</mark> garage.
        </code>
        <br>
        <code>
            "^(T|t)he" => <mark>The</mark> car is parked in the garage.
        </code>
    </p>

    <h6><u>The Dollar $</u></h6>

    <p>
        The dollar sign <code>$</code> is used to check if a matching character is the last character in the string. For example, the regular expression <code>(at\.)$</code> means: a <code>lowercase a</code>, followed by a <code>lowercase t</code>, followed by a <code>. character</code> and the matcher must be at the end of the string.
        <br>
        <code>
            "(at\.)" => The fat c<mark>at.</mark> s<mark>at.</mark> on the m<mark>at.</mark>
        </code>
        <br>
        <code>
            "(at\.)$" => The fat cat. sat. on the m<mark>at.</mark>
        </code>
    </p>
</div>
</template>
