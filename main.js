'use strict';

sortTable({
    selector: '.sortTable',
    clear: '.clearSort'
});

// sort table function && clear sort
function sortTable(data) {
    let { selector, clear } = data;
    const arrowTop = '&#9650;', // arrow Top
        arrowBottom = '&#9660;', // arrow Bottom
        sortTop = 'CBA', // order sort
        sortBottom = 'ABC', // order sort
        table = document.querySelector(selector),
        tableBody = table.tBodies[0],
        tableTh = table.querySelectorAll('th'),
        defaultRows = [ ...tableBody.rows], // generate HTML collection to Array
        btnClear = clear ? document.querySelector(clear) : false;
    let previousColumnSorted;
        
    // add attributes for sort
    tableTh.forEach(item => {
        item.setAttribute('data-sort', sortBottom);
        item.setAttribute('data-sorted', 'false');
    });

    // clear arrow after change sort columns
    function clearArrow(item) {
        if(item) item.innerHTML = item.innerHTML.slice(0, item.innerHTML.length-1);
    }

    // clear table sort and set default table
    if(clear) btnClear.addEventListener('click', function () {
        clearArrow(previousColumnSorted);
        defaultRows.forEach(function (item) {
            tableBody.append(item)
        })
    });

    // sort table event
    table.tHead.addEventListener('click', function (e) {
        const { target } = e;

        // checking click on table head
        if (!target.closest('th')) return;

        // set repet click of current row
        const isRepeatCol = target.dataset.sorted === 'true' ? true : false;

        // clear arrow after change sort columns
        if(!isRepeatCol) clearArrow(previousColumnSorted);

        // set data-sorted false on all columns
        if (!isRepeatCol) tableTh.forEach(th => {th.dataset.sorted = 'false'});
        target.dataset.sorted = 'true';

        // add arrow to current column
        if (!isRepeatCol) target.innerHTML += arrowBottom;

        previousColumnSorted = target;

        // generated arrows ufter repeat click
        if (isRepeatCol) generateArrow();
        function generateArrow() {
            let newString = target.dataset.sort === sortBottom 
                ? target.innerHTML.slice(0, target.innerHTML.length-1) + arrowTop 
                : target.innerHTML.slice(0, target.innerHTML.length-1) + arrowBottom;
            target.innerHTML = newString;
        }        

        // the sort order
        let sortOrder = isRepeatCol 
            ? target.dataset.sort === sortBottom 
                ? target.dataset.sort = sortTop 
                : target.dataset.sort = sortBottom 
            : sortBottom;

        // index column
        let sortIndex = target.cellIndex;

        // clone defaul values
        let rows = defaultRows.slice();

        // set sortyng type
        let sortType = target.dataset.type;

        // 
        rows.sort(function (rowA, rowB) {
            let cellA = rowA.cells[sortIndex].textContent; // get text content from row
            let cellB = rowB.cells[sortIndex].textContent; // get text content from row

            return sortType === 'string'
                ? sortOrder === sortBottom ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA)
                : sortOrder === sortBottom ? +cellA - +cellB : +cellB - +cellA;
        }).forEach(function (item) {
            tableBody.append(item); // add new array to body
        });
    });

}
