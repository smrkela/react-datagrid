import React from "react";
import OverflowTooltip from "../../OverflowTooltip/OverflowTooltip";

const DataGridCell = ({ data, column }) => {

    const customRenderer = column.rendererFunction ? column.rendererFunction(data, column) : null;

    let content;

    if (customRenderer) {
        content = customRenderer;

    } else {

        const cellValue = column.getCellValue(data);

        const styles = column.getCellStyle(data);
        const classNames = column.getCellClasses(data);

        content = (<OverflowTooltip title={cellValue + ""}>
            <div className={classNames} style={styles}>{cellValue}</div>
        </OverflowTooltip>);
    }

    const style = {width: column.getWidthString()};

    return (
        <div className="col" style={style}>
            {content}
        </div>
    );
}

export default DataGridCell;