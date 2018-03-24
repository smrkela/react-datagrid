import React from "react";
import DataGridHeaderSorter from "./DataGridHeaderSorter";

const DataGridHeaderCell = ({ column, owner }) => {

    const style = { width: column.getWidthString() };

    return (
        <div className="col" style={style} onClick={(event) => owner.sortClicked(column, event)}>
            <span>{column.title}</span>
            <DataGridHeaderSorter column={column} owner={owner} />
        </div>
    );
}

export default DataGridHeaderCell;