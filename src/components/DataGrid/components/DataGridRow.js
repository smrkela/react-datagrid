import React from "react";
import DataGridCell from "./DataGridCell";

const DataGridRow = ({ data, columns }) => {

    return (
        <div className="row">
            {columns.map(item => <DataGridCell key={data.id + "-" + item.id} data={data} column={item} />)}
        </div>
    );
}

export default DataGridRow;