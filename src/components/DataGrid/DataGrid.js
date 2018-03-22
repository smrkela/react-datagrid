import React from "react";

import "./DataGrid.css";
import DataGridHeaderCell from "./components/DataGridHeaderCell";
import DataGridRow from "./components/DataGridRow";
import ColumnSelectorPopup from "./components/ColumnSelectorPopup/ColumnSelectorPopup";
import updateColumnWidths from "./utils/columnWidthCalculator";

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
            .filter(column => column.sort && column.sort.sorted)
            .sort((a, b) => a.sort.sortIndex - b.sort.sortIndex);
    }

    compareItems(item1, item2, sortColumns) {

        let compareResult = 0;

        if (sortColumns.length > 0) {

            const column = sortColumns[0];

            compareResult = column.sortCompare(item1, item2);

            if (!column.sort.sortAscending)
                compareResult *= -1;

            if (!compareResult && sortColumns.length > 1) {
                compareResult = this.compareItems(item1, item2, sortColumns.slice(1));
            }
        }

        return compareResult;
    }

    render() {

        if (this.table)
            updateColumnWidths(this.props.columns, this.table.offsetWidth);

        let dataProviderCopy = this.props.dataProvider.slice();
        dataProviderCopy = this.sort(dataProviderCopy);

        const visibleColumns = this.props.columns.filter(item => item.visible);
        let bodyContent = dataProviderCopy.map(item => <DataGridRow key={item[this.props.dataKey]} data={item} columns={visibleColumns} />);

        if (dataProviderCopy.length === 0 && this.props.emptyMessage) {
            bodyContent = <tr><td colSpan={visibleColumns.length}>{this.props.emptyMessage}</td></tr>;
        }

        return (
            <div className="DataGrid">
                <div className="settings">
                    <ColumnSelectorPopup columns={this.props.columns} onToggleColumn={this.toggleColumnClicked} />
                </div>
                <table ref={comp => this.table = comp}>
                    <thead>
                        <tr>
                            {visibleColumns.map(item => <DataGridHeaderCell key={item.id} owner={this} column={item} />)}
                        </tr>
                    </thead>
                    <tbody>
                        {bodyContent}
                    </tbody>
                </table>
            </div>
        );
    }

}