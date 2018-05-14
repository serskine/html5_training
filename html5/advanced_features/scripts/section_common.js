window.onload = function (event) {
    document.getElementById("theTitle").innerHTML = document.getElementById("theBanner").innerHTML;
}

function toJson(item) {
    return JSON.stringify(item, undefined, 2);
}


function yesNo(obj) {
    if (obj) {
        return (obj == true) ? "Yes" : "No";
    } else {
        return "No";
    }
}

function existsYesNo(obj) {
    if (obj) {
        return "Yes";
    } else {
        return "No";
    }
}


var XML = {
    openTag(tagName) {
        return "<" + tagName + ">";
    },
    closeTag(tagName) {
        return "</" + tagName + ">";
    },
    element(tagName, tagValue) {
        return openTag(tagName) + tagValue + closeTag(tagName);
    }
};


function Table(columnHeaders) {
    if ((!columnHeaders)
        || (columnHeaders.length < 1)
    ) {
        throw new Error(
            "You must pass in an array of columns headers with at least one entry.\n"
            + "The type is " + (typeof columnHeaders) + ".\n"
            + toJson(columnHeaders)
        );
    }

    this.headers = columnHeaders;
    this.rows = [];
    console.log("Created a new table\n" + toJson(this));
};

Table.prototype.numRows = function () {
    return this.rows.length;
}

Table.prototype.numCols = function () {
    return this.headers.length;
}

Table.prototype.tableRow = function (headers, isHeader) {
    var elem = (isHeader) ? "th" : "td";
    var row = "theRow";
    row = XML.openTag("tr");

    for (i = 0; i < headers.length; i++) {
        row += XML.openTag(elem) + headers[i] + XML.closeTag(elem);
    }
    row += XML.closeTag("tr");
    return row;
};

Table.prototype.dataRow = function (columns) {
    return this.tableRow(columns, false);
};

Table.prototype.headerRow = function (columns) {
    return this.tableRow(columns, true);
};

Table.prototype.getHtml = function () {
    var output = "";
    output += XML.openTag("table");
    output += this.headerRow(this.headers);
    var numRows = this.numRows();
    for (var r = 0; r < numRows; r++) {
        var line = this.dataRow(this.rows[r]);
        output += line;
    }
    output += XML.closeTag("table");
    return output;
};

/**
 * This will add a row to a table
 * @param theRow
 */
Table.prototype.add = function (theRow) {
    if ((!theRow)
        || (theRow.length != this.numCols())
    ) {
        throw new Error(
            "You must pass in an array with " + this.numCols() + " elements.\n"
            + "The type is " + (typeof theRow) + ".\n"
            + toJson(theRow)
        );
    }
    this.rows.push(theRow);
    console.log("Added table row\n", toJson(this));

}

Table.prototype.deleteRow = function (row) {
    if (!theRow || row < 0 || row > this.numRows()) {
        throw new Error("The specified row (" + row + ") does not exist. This table contains " + this.numRows() + " rows.");
    }
    this.rows = this.rows.splice(row);
}

/**
 * This will set the cell at the specified coordinates to the given value. If the coordinates
 * are out of bounds for the table an error will be thrown
 * @param rowIdx specifies the desired row
 * @param colIdx specifies the desired column
 * @param value is the value we want placed in that cell
 * @returns {The previous value at that location}
 */
Table.prototype.setCell = function (rowIdx, colIdx, value) {
    var prev = getCell(rowIdx, colIdx);
    (this.rows[rowIds])[colIdx] = value;
    return prev;
}

/**
 * This will return the value stored in the specified cell. If the coordinated provided are out of
 * bounds then an error will be thrown
 * @param rowIdx specifies the desired row
 * @param colIdx specifies the desired column
 * @returns {*}
 */
Table.prototype.getCell = function (rowIdx, colIdx) {
    if (rowIdx < 0 || rowIdx >= this.numRows() || colIdx < 0 || colIdx >= this.numCols()) {
        throw new Error(
            "Position [" + rowIdx + ", " + colIdx + "] is out of bounds.\n"
            + "Table dimensions are " + this.numRows() + " rows x " + this.numCols() + " columns."
        );
    }
    return (this.rows[rowIdx])[colIdx];
}

function createTableFromObject(obj) {
    if (!obj) {
        throw new Error("Object does not exist!");
    }

    var properties = Object.getOwnPropertyNames(obj);
    myTable = new Table(["Property", "Value"]);

    for (i = 0; i < properties.length; i++) {
        propertyName = properties[i];
        value = obj[propertyName];
        type = typeof value;

        if (type == "object") {
            subTable = createTableFromObject(value);
            propertyValue = subTable.getHtml();
        } else {
            propertyValue = value;
        }

        myTable.add([propertyName, propertyValue]);
    }
    return myTable;
}


function keyValueRow(key, value) {
    return tableRow([key, value], false);
}

//
//
// This section will provide functions for creating tables
//
//


function handleError(error) {
    alert(error);
}


