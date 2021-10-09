<template>
<div>
    <h4>Lesson</h4>

    <h5>ShortHand</h5>
    <p>There are a number of convenient shorthands for commonly used character sets/ regular expressions:</p>
    <div class="p-2">

        <table class="table table-striped">
            <thead>
                <tr class="row">
                    <td class="col-sm-1">
                        #
                    </td>
                    <td class="col-sm-1">
                        Shorthand
                    </td>
                    <td class="col-sm-4">
                        Description
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr class="row">
                    <td class="col-sm-1">
                        1
                    </td>
                    <td class="col-sm-1">
                        <code>.</code>
                    </td>
                    <td class="col-sm-4">
                        Any character except new line
                    </td>
                </tr>
                <tr class="row">
                    <td class="col-sm-1">
                        2
                    </td>
                    <td class="col-sm-1">
                        <code>\w</code>
                    </td>
                    <td class="col-sm-4">
                        Matches alphanumeric characters: <code>[a-zA-Z0-9_]</code>
                    </td>
                </tr>
                <tr class="row">
                    <td class="col-sm-1">
                        3
                    </td>
                    <td class="col-sm-1">
                        <code>\W</code>
                    </td>
                    <td class="col-sm-4">
                        Matches non-alphanumeric characters: <code>[^\w]</code>
                    </td>
                </tr>
                <tr class="row">
                    <td class="col-sm-1">
                        4
                    </td>
                    <td class="col-sm-1">
                        <code>\d</code>
                    </td>
                    <td class="col-sm-4">
                        Matches digits: <code>[0-9]</code>
                    </td>
                </tr>
                <tr class="row">
                    <td class="col-sm-1">
                        5
                    </td>
                    <td class="col-sm-1">
                        <code>\D</code>
                    </td>
                    <td class="col-sm-4">
                        Matches non-digits: <code>[^\d]</code>
                    </td>
                </tr>
                <tr class="row">
                    <td class="col-sm-1">
                        6
                    </td>
                    <td class="col-sm-1">
                        <code>\s</code>
                    </td>
                    <td class="col-sm-4">
                        Matches whitespace characters: <code>[\t\n\f\r\p{Z}]</code>
                    </td>
                </tr>
                <tr class="row">
                    <td class="col-sm-1">
                        7
                    </td>
                    <td class="col-sm-1">
                        <code>\S</code>
                    </td>
                    <td class="col-sm-4">
                        Matches non-whitespace characters: <code>[^\s]</code>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</div>
</template>
