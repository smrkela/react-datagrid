/**
 * Calculate and set width of the column according to their
 * constraints.
 * Constraints are: minWidth, maxWidth, percentWidth, preferredWidth
 * The calculated value is set in width property
 * @param {array} columns 
 * @param {number} displayWidth 
 */
const updateColumnWidths = (columns, displayWidth) => {

    let n;
    let i;

    let visibleColumns = columns.filter(item => item.visible);

    let lastColumn;
    let newSize;
    let visibleColumn;
    let size;

    // count how many resizable columns and how wide they are
    n = visibleColumns.length;

    let { preferredWidth, minWidth, numResizable } = calculateTotals(visibleColumns);

    let ratio;
    let newTotal = displayWidth;

    // if there is more space than the preferred width, we distribute the remaining space to 
    // columns that have percent width
    let excessWidth = 0;

    if (preferredWidth < displayWidth)
        excessWidth = displayWidth - preferredWidth;

    // if we have missing width, resizable columns need to be shortened
    let missingWidth = 0;

    if (preferredWidth > displayWidth)
        missingWidth = preferredWidth - displayWidth;

    if (displayWidth > minWidth && numResizable) {
        // we have flexible columns and room to honor minwidths and non-resizable

        n = visibleColumns.length;
        newSize = 0;

        // if we have excess width, we can increase the size of all resizable columns
        // for the nonresizable columns, we respect their width or calculate percent width
        if (excessWidth >= 0) {

            ratio = (excessWidth + displayWidth) / displayWidth;

            for (i = 0; i < n; i++) {

                visibleColumn = visibleColumns[i];
                size = visibleColumn.size;

                if (size.resizable) {

                    lastColumn = visibleColumn;
                    size.width = Math.floor(size.getPreferredOrMinWidth() * ratio);

                } else {
                    if (size.percentWidth) {
                        size.width = Math.floor(excessWidth * size.percentWidth / 100);
                    } else {
                        size.width = size.getPreferredOrMinWidth();
                    }
                }

                newSize += size.width;
            }

        } else if (missingWidth > 0) {

            // if we have missing width we need to reduce the size of all resizable columns
            // and we don't have space for displaying the percent width columns that have no
            // min width
            ratio = (displayWidth - missingWidth) / displayWidth;

            for (i = 0; i < n; i++) {

                visibleColumn = visibleColumns[i];
                size = visibleColumn.size;

                if (size.resizable) {

                    lastColumn = visibleColumn;
                    size.width = Math.max(size.minWidth, Math.floor(size.preferredWidth * ratio));

                } else {

                    if (size.percentWidth) {
                        size.width = size.minWidth;
                    } else {
                        size.width = preferredWidth;
                    }
                }

                newSize += size.width;
            }
        }

        if (newSize > displayWidth)
            lastColumn.size.width -= newSize - displayWidth;
        else if (newSize < displayWidth)
            lastColumn.size.width += displayWidth - newSize;
    }
    else // can't honor minwidth and non-resizables so just scale everybody
    {

        ratio = preferredWidth / displayWidth;
        n = visibleColumns.length;

        for (i = 0; i < n; i++) {

            lastColumn = visibleColumns[i];
            ratio = lastColumn.size.getPreferredOrMinWidth() / preferredWidth;
            newSize = Math.floor(displayWidth * ratio);
            lastColumn.size.width = newSize;
            newTotal -= newSize;
        }

        if (newTotal && lastColumn) {
            lastColumn.size.width = lastColumn.size.getPreferredOrMinWidth() + newTotal;
        }
    }


}

function calculateTotals(visibleColumns) {

    // sum of min width of columns
    let minWidth = 0;

    // sum of all preferred widths
    let preferredWidth = 0;

    // num of resizable columns
    let numResizable = 0;

    let visibleColumn;
    let i;
    let n = visibleColumns.length;

    for (i = 0; i < n; i++) {

        visibleColumn = visibleColumns[i]

        // preferred width is the sum of preferred or min widths
        preferredWidth += visibleColumn.size.getPreferredOrMinWidth();

        if (visibleColumn.size.minWidth)
            minWidth += visibleColumn.size.minWidth;

        if (visibleColumn.size.resizable)
            numResizable++;
    }

    return { preferredWidth, minWidth, numResizable };
}

export default updateColumnWidths;