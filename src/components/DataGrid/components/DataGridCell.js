import React from "react";
import OverflowTooltip from "../../OverflowTooltip/OverflowTooltip";

const DataGridCell = ({ data, column }) => {

    const customRenderer = column.rendererFunction ? column.rendererFunction(data, column) : null;

    let content;

    if (customRenderer) {
        content = customRenderer;

    } else {

        const cellValue = column.getCellValue(data);

        content = (<OverflowTooltip title={cellValue + ""}>
            <span>{cellValue}</span>
        </OverflowTooltip>);

        const styles = column.styleFunction ? column.styleFunction(data) : null;
        const classNames = column.classNameFunction ? column.classNameFunction(data) : null;

        if (styles || classNames)
            content = <span className={classNames} style={styles}>
                {content}
            </span>;
    }

    return (
        <td>
            {content}
        </td>
    );
}

export default DataGridCell;