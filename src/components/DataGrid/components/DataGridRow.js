import React from "react";
import DataGridCell from "./DataGridCell";

const DataGridRow = ({ data, columns }) => {

    return (
        <tr>
            {columns.map(item => <DataGridCell key={data.id + "-" + item.id} data={data} column={item} />)}
        </tr>
    );
}

export default DataGridRow;