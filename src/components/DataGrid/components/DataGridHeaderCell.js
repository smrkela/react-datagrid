import React from "react";
import DataGridHeaderSorter from "./DataGridHeaderSorter";

const DataGridHeaderCell = ({ column, owner }) => {

    return (
        <th width={`${column.size.width}px`} onClick={(event) => owner.sortClicked(column, event)}>
            <span>{column.title}</span>
            <DataGridHeaderSorter column={column} owner={owner} />            
        </th>
    );
}

export default DataGridHeaderCell;