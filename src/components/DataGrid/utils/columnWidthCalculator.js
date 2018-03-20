/**
 * Calculate and set width of the column according to their
 * constraints.
 * Constraints are: minWidth, maxWidth, percentWidth, preferredWidth
 * The calculated value is set in width property
 * @param {array} columns 
 * @param {number} tableWidth 
 */
const updateColumnWidths = (columns, tableWidth) => {

    // first we check if we can even fit all the columns by their min width
    const totalMinWidth = columns
        .filter(item => item.size.minWidth > 0)
        .map(item => item.size.minWidth)
        .reduce((sum, item) => sum + item, 0);

    // reduction factor says how much we need to reduce the widths of columns
    // even below it's min width, e.g. value of 2 means the min width will 
    // actually be halved
    const reductionFactor = 1;

    if (totalMinWidth > tableWidth)
        reductionFactor = tableWidth / totalMinWidth;






}

function calculateColumnSizes(columns) {
    let delta;
    let n;
    let i;
    let totalWidth = 0;
    let col;
    let cw;

    let visibleColumns = columns.filter(item => item.visible);

    var lastColumn;
    var newSize;

    let numResizable = 0;
    let fixedWidth = 0;

    // count how many resizable columns and how wide they are
    n = visibleColumns.length;
    for (i = 0; i < n; i++) {

        if (visibleColumns[i].size.resizable && !visibleColumns[i].newlyVisible) {
            
            if (!isNaN(visibleColumns[i].size.explicitWidth)) {
                // trace("    explicit width " + visibleColumns[i].width);
                fixedWidth += visibleColumns[i].size.width;
            }
            else {
                // trace("    implicitly resizable");
                numResizable++;
                fixedWidth += visibleColumns[i].size.minWidth;
                // trace("    minWidth " + visibleColumns[i].minWidth);
            }
        }
        else {
            // trace("    not resizable");
            fixedWidth += visibleColumns[i].size.width;
        }

        totalWidth += visibleColumns[i].size.width;
    }
    n = visibleLockedColumns.length;
    for (i = 0; i < n; i++) {
        // trace("column " + i + " width = " + visibleLockedColumns[i].width);
        if (visibleLockedColumns[i].resizable && !visibleLockedColumns[i].newlyVisible) {
            // trace("    resizable");
            if (!isNaN(visibleLockedColumns[i].explicitWidth)) {
                // trace("    explicit width " + visibleLockedColumns[i].width);
                fixedWidth += visibleLockedColumns[i].width;
            }
            else {
                // trace("    implicitly resizable");
                numResizable++;
                fixedWidth += visibleLockedColumns[i].minWidth;
                // trace("    minWidth " + visibleLockedColumns[i].minWidth);
            }
        }
        else {
            // trace("    not resizable");
            fixedWidth += visibleLockedColumns[i].width;
        }

        totalWidth += visibleLockedColumns[i].width;
    }
    // trace("totalWidth = " + totalWidth);
    // trace("displayWidth = " + displayWidth);

    var ratio;
    var newTotal = displayWidth;
    var minWidth;
    if (displayWidth > fixedWidth && numResizable) {
        // we have flexible columns and room to honor minwidths and non-resizable
        // trace("have enough room");

        // divide and distribute the excess among the resizable
        n = visibleLockedColumns.length;
        for (i = 0; i < n; i++) {
            if (visibleLockedColumns[i].resizable && !visibleLockedColumns[i].newlyVisible && isNaN(visibleLockedColumns[i].explicitWidth)) {
                lastColumn = visibleLockedColumns[i];
                if (totalWidth > displayWidth)
                    ratio = (lastColumn.width - lastColumn.minWidth) / (totalWidth - fixedWidth);
                else
                    ratio = lastColumn.width / totalWidth;
                newSize = Math.floor(lastColumn.width - (totalWidth - displayWidth) * ratio);
                minWidth = visibleLockedColumns[i].minWidth;
                visibleLockedColumns[i].setWidth(newSize > minWidth ? newSize : minWidth);
                // trace("column " + i + " set to " + visibleLockedColumns[i].width);
            }
            newTotal -= visibleLockedColumns[i].width;
            visibleLockedColumns[i].newlyVisible = false;
        }
        n = visibleColumns.length;
        for (i = 0; i < n; i++) {
            if (visibleColumns[i].resizable && !visibleColumns[i].newlyVisible && isNaN(visibleColumns[i].explicitWidth)) {
                lastColumn = visibleColumns[i];
                if (totalWidth > displayWidth)
                    ratio = (lastColumn.width - lastColumn.minWidth) / (totalWidth - fixedWidth);
                else
                    ratio = lastColumn.width / totalWidth;
                newSize = Math.floor(lastColumn.width - (totalWidth - displayWidth) * ratio);
                minWidth = visibleColumns[i].minWidth;
                visibleColumns[i].setWidth(newSize > minWidth ? newSize : minWidth);
                // trace("column " + i + " set to " + visibleColumns[i].width);
            }
            newTotal -= visibleColumns[i].width;
            visibleColumns[i].newlyVisible = false;
        }
        if (newTotal && lastColumn) {
            // trace("excess = " + newTotal);
            lastColumn.setWidth(lastColumn.width + newTotal);
        }
    }
    else // can't honor minwidth and non-resizables so just scale everybody
    {
        // trace("too small or too big");
        n = visibleLockedColumns.length;
        for (i = 0; i < n; i++) {
            lastColumn = visibleLockedColumns[i];
            ratio = lastColumn.width / totalWidth;
            //totalWidth -= visibleLockedColumns[i].width;
            newSize = Math.floor(displayWidth * ratio);
            lastColumn.setWidth(newSize);
            lastColumn.explicitWidth = NaN;
            // trace("column " + i + " set to " + visibleLockedColumns[i].width);
            newTotal -= newSize;
        }
        n = visibleColumns.length;
        for (i = 0; i < n; i++) {
            lastColumn = visibleColumns[i];
            ratio = lastColumn.width / totalWidth;
            //totalWidth -= visibleColumns[i].width;
            newSize = Math.floor(displayWidth * ratio);
            lastColumn.setWidth(newSize);
            lastColumn.explicitWidth = NaN;
            // trace("column " + i + " set to " + visibleColumns[i].width);
            newTotal -= newSize;
        }
        if (newTotal && lastColumn) {
            // trace("excess = " + newTotal);
            lastColumn.setWidth(lastColumn.width + newTotal);
        }
    }


    lockedColumnWidth = 0;
    if (visibleLockedColumns.length) {
        n = visibleLockedColumns.length;
        for (i = 0; i < n; i++) {
            col = visibleLockedColumns[i];
            lockedColumnWidth += col.width;
        }
    }
}

export default updateColumnWidths;