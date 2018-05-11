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


var XML = {};

XML.openTag = new function (elem) {
    return "<" + elem + ">";
};

XML.closeTag
:
new function closeTag(elem) {
    return "</" + elem + ">";
};

var TABLE = {};

TABLE.test = new function (input) {
    return input;
};

TABLE.create = new function (columnHeaders) {
    if (!columnHeaders) {
        throw new Error("You can't create a table without an array of columns");
    }

    var type = typeof columnHeaders;
    if (type != "object" || !columnHeaders.length) {
        throw new Error("Columns headers must be an array.\n"
            + "The type is " + type + ".\n"
            + toJson(columnHeaders));
    }

    if (columnHeaders.length < 1) {
        throw new Error("There must be at least one column header defined for a new table");
    }

    return {
        isTable: true,
        headers: columnHeaders,
        rows: []
    }
};

TABLE.tableRow = new function (headers, isHeader) {
    var elem = (isHeader) ? "th" : "td";

    var row = XML.openTag("tr");
    for (i = 0; i < headers.length; i++) {
        row += XML.openTag(elem) + headers[i] + XML.closeTag(elem);
    }
    row += XML.closeTag("tr");
    return row;
};

TABLE.dataRow = new function (columns) {
    return tableRow(columns, false);
};

TABLE.headerRow = new function (columns) {
    return tableRow(columns, true);
};

TABLE.getHtml = new function () {
    var output = "";
    output += XML.openTag("table");
    output += headerRow(table.columns);
    var numRows = table.rows.length;
    for (r = 0; r < numRows; r++) {
        var theRow = table.rows[r];
        var line = dataRow(theRow);
        output += line;
    }
    output += XML.closeTag("table");
    return output;
};


function keyValueRow(key, value) {
    return tableRow([key, value], false);
}

//
//
// This section will provide functions for creating tables
//
//


function addTableRow(table, row) {
    table.rows.push(row);
}

function tableHtml(table) {
}

function handleError(error) {
    alert(error);
}


