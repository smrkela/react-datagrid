import React from "react";

const DataGridCell = ({ data, column }) => {

    const customRenderer = column.rendererFunction ? column.rendererFunction(data, column) : null;

    let content;

    if (customRenderer) {
        content = customRenderer;
        
    } else {

        content = column.getCellValue(data);

        const styles = column.styleFunction ? column.styleFunction(data) : null;
        const classNames = column.classNameFunction ? column.classNameFunction(data) : null;

        if (styles || classNames)
            content = <span className={classNames} style={styles}>{content}</span>;
    }

    return (
        <td>
            {content}
        </td>
    );
}

export default DataGridCell;