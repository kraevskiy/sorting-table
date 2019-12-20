# Function sortTable(){};
Function for sorting table 

[DEMO](https://kraevskiy.github.io/sorting-table/demo/)
#### Basic markup HTML
```html
<table>
    <thead>
        <tr>
            <th data-type="number">Rank</th>
            <th data-type="string">ID</th>
            ...
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>btc-bitcoin</td>
            ...
        </tr>
        ...
    </tbody>
</table>
```

#### JS Code for run
```javascript
sortTable({option});
```

#### options:
```javascript
{
    selector: '.sortTable', // *required
    clear: '.clearSort' // default: false
}
```
- selector - selector your table *required
- clear - selector your button for sorting clear *not required (defaul: false);

#### For start
- copy html
- copy function
- call function in you js file 