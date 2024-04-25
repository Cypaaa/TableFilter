/*
    Copyright (c) 2024 Cyprien (github: @Cypaaa)

    Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the
    "Software"), to deal in the Software without restriction, including
    without limitation the rights to use, copy, modify, merge, publish,
    distribute, sublicense, and/or sell copies of the Software, and to
    permit persons to whom the Software is furnished to do so, subject to
    the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
    LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
    WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*
   To use this script, put `data-TableFilter` on your input AND your table element
   If you have multiple input elements and/or tables
   They will all be linked between each others by default
   You can link them with a specific ID using `data-TableFilter="my custom ID"`
   The custom ID must be the same for your table and input element(s)
   Such as:

   // Link 1 input element to 1 table
   <input data-TableFilter="myFirstElementToWatch" />
   table data-TableFilter="myFirstElementToWatch">
       ...
   </table>

   // Link 1 input element to 2 tables
   <input data-TableFilter="mySecondElementToWatch" />
   <table data-TableFilter="mySecondElementToWatch">
       ...
   </table>
   <table data-TableFilter="mySecondElementToWatch">
       ...
   </table>


   Select specific rows to check:
   You can specify rows to check if you don't want all of them to be.
   Just put `data-TableFilter-rows` with the row names you want to check
   Split by a comma (no space after the comma) the content of the th corresponding to the row
   Such as:
   <table data-TableFilter data-TableFilter-rows="Lastname,Firstname,Date Of Birth">
       ...
           <th>Firstname</th>
           <th>Lastname</th>
           <th>Address</th>
           <th>Age</th>
           <th>Date Of Birth</th>
       ...
   </table>
*/

function TableFilterMain() {
    // [...X] because we will need the array filter method
    // inputs is a NodeListOf<Element> which has a forEach so no need a forof (for of) or a fori (for i) loop
    const tables = [...document.querySelectorAll('table[data-TableFilter]')],
        inputs = document.querySelectorAll('input[data-TableFilter]');

    // For each input
    inputs.forEach(input => {
        // get its tables
        const inputTables = tables.filter(table => table.getAttribute("data-TableFilter") === input.getAttribute("data-TableFilter"));
        // listen for inputs
        input.addEventListener("input", e => {
            // get its value (to upper case)
            const inputValue = input.value.toUpperCase();

            // For each table
            inputTables.forEach(table => {
                // get the name of the rows
                const th = table.getElementsByTagName("th");

                // get the name of the rows to check
                const rows = table.getAttribute("data-TableFilter-rows");
                const rowNames = rows != null ? rows.split(",") : null;

                // table.getElementsByTagName returns a IXMLDOMNodeList which has no forEach method, so we will use a forof loop
                // For each tr element (useful to get the row name and hide the whole row)
                for (const tr of table.getElementsByTagName("tr")) {
                    const tds = tr.getElementsByTagName("td")
                    let ok = false;

                    // For each element of a row
                    for (let i = 0; i < tds.length; i++) {
                        const td = tds[i];
                        // If rows to check are defined,
                        // And (The row we are checking has no row name (th)
                        // Or this row name is not to check)
                        if (ok || (rowNames != null && (th.length <= i || !rowNames.includes(th[i].textContent)))) {
                            continue;
                        }

                        // At this point, either data-TableFilter-rows has not been defined
                        // Or the row is to check

                        // If the value of our input element is somewhere in the value of the row
                        if ((td.textContent || td.innerText || "").toUpperCase().indexOf(inputValue) > -1) {
                            ok = true;
                            if (tr.style.display === "none") {
                                tr.style.display = "";
                            }
                        } else {
                            // Hide the row if it doesn't match our input value
                            tr.style.display = "none";
                        }
                    }
                }
            });
        })
    });
    // Just in case, to clean everything
    document.removeEventListener("DOMContentLoaded", TableFilterMain);
}


// Entry point
if (document.readyState === "complete") {
    TableFilterMain();
} else {
    // DOMContentLoaded has not occurred yet
    document.addEventListener("DOMContentLoaded", TableFilterMain);
}
