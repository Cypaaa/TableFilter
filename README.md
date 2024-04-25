# TableFilter
An open-source JavaScript script to sort tables thanks to input boxes

## How to use

#### Input

Just make an input with the type you want (text, number, ...), some type such as checkbox might for every value or at all.<br />
Add the `data-TableFilter` attribute

#### Table

Just make a table<br />
Add the `data-TableFilter` attribute

### You're done!

e.g.
```html
<script src="TableFilter.min.js"></script>

<input data-TableFilter placeholder="Type here..." />
<table data-TableFilter>
  ...
</table>
```

## Multiple inputs or/and tables

You can link one or many input and tables by setting and ID to the `data-TableFilter` attribute

```html
<script src="TableFilter.min.js"></script>

<label for="input1">1</label>
<input id="input1" data-TableFilter="my custom id 1"> <!-- For my well being, please don't put this type of ID -->
<label for="input2">2</label>
<input id="input2" data-TableFilter="mySecondCustomID">

<p>Table 1 (linked to input 1)</p>
<table data-TableFilter="my custom id 1">
  ...
</table> 

<p>Table 2 (linked to input 2)</p>
<table data-TableFilter="mySecondCustomID">
  ...
</table>
```

## Specific row

You can specify which row to check using its name<br />
Just put the `data-TableFilter-rows` attribute with row names split by a comma _(not ", " but ",")_ on your table element

e.g.
```html
<script src="TableFilter.min.js"></script>

<input data-TableFilter placeholder="Type here..." />
<table data-TableFilter data-TableFilter-rows="Lastname,Firstname,Date Of Birth">
    ...
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Address</th>
        <th>Age</th>
        <th>Date Of Birth</th>
    ...
</table>
```

## TODO

- If `data-TableFilter-rows` is set on an input box, the input box only check these specific rows (so multiple box for one table)
- Make an attribute for the select element, which will automatically be populated (using a loop to check different values in all rows)
