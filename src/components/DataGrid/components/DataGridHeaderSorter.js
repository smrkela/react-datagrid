import React from "react";

const DataGridHeaderSorter = ({ column, owner }) => {

    let content = null;

    if (column.sort) {

        let classes = "sorter ";

        if (column.sort.sorted)
            classes += "sorter-active";

        content = (
            <span className={classes}>
                <span className="sort-arrows">
                    {column.sort.sortAscending ?
                        <i className="fas fa-sort-up"></i>
                        :
                        <i className="fas fa-sort-down"></i>}
                </span>
                <span className="sortIndex">{column.sort.sortIndex}</span>
            </span>
        );
    }

    return (
        content
    );
}

export default DataGridHeaderSorter;