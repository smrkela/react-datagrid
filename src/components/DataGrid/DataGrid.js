import React from "react";

import "./DataGrid.css";
import DataGridHeaderCell from "./components/DataGridHeaderCell";
import DataGridRow from "./components/DataGridRow";
import ColumnSelectorPopup from "./components/ColumnSelectorPopup/ColumnSelectorPopup";

export default class DataGrid extends React.Component {

    state = {
        update: true
    }

    sortClicked(column, mouseEvent) {

        if (!column.sort)
            return;

        let preventDefault = false;

        if (this.props.sortHandler)
            preventDefault = this.props.sortHandler(column, mouseEvent);

        if (!preventDefault) {

            column.updateSort(this.props.columns, mouseEvent);

            this.setState({ updateToggle: !this.state.updateToggle });
        }
    }

    toggleColumnClicked = column => {

        if (!column.locked)
            column.visible = !column.visible;

        this.setState({ updateToggle: !this.state.updateToggle }); 0
    }

    sort(dataProviderCopy) {

        const sortColumns = this.getSortColumns();

        const sortedDataProvider = dataProviderCopy.sort((a, b) => {

            return this.compareItems(a, b, sortColumns);
        });

        return sortedDataProvider;
    }

    getSortColumns() {
        return this.props.columns
            .filter(column => column.sortObject && column.sortObject.sorted)
            .sort((a, b) => a.sortObject.sortIndex - b.sortObject.sortIndex);
    }

    compareItems(item1, item2, sortColumns) {

        let compareResult = 0;

        if (sortColumns.length > 0) {

            const column = sortColumns[0];

            compareResult = column.sortCompare(item1, item2);

            if (column.sortObject && !column.sortObject.sortAscending)
                compareResult *= -1;

            if (!compareResult && sortColumns.length > 1) {
                compareResult = this.compareItems(item1, item2, sortColumns.slice(1));
            }
        }

        return compareResult;
    }

    render() {

        let dataProviderCopy = this.props.dataProvider.slice();
        dataProviderCopy = this.sort(dataProviderCopy);

        const visibleColumns = this.props.columns.filter(item => item.visible);
        let bodyContent = dataProviderCopy.map(item => <DataGridRow key={item[this.props.dataKey]} data={item} columns={visibleColumns} />);

        if (dataProviderCopy.length === 0 && this.props.emptyMessage) {
            bodyContent = <div className="row"><div className="col" colSpan={visibleColumns.length}>{this.props.emptyMessage}</div></div>;
        }

        return (
            <div className="DataGrid">
                <div className="settings">
                    <ColumnSelectorPopup columns={this.props.columns} onToggleColumn={this.toggleColumnClicked} />
                </div>
                <div className="table">
                    <div className="header">
                        <div className="row">
                            {visibleColumns.map(item => <DataGridHeaderCell key={item.id} owner={this} column={item} />)}
                        </div>
                    </div>
                    <div className="body">
                        {bodyContent}
                    </div>
                </div>
            </div>
        );
    }

}