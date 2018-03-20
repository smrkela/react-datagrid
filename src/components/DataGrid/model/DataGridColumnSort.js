import comparator from "../utils/comparator";

class DataGridColumnSort {

    constructor(sorted = false, sortAscending = true, sortIndex = 1, comparator = null) {
        this.sorted = sorted;
        this.sortAscending = sortAscending;
        this.sortIndex = sortIndex;
        this.comparator = comparator;
    }

    updateSort(column, columns, mouseEvent) {

        if (mouseEvent.ctrlKey) {

            if (this.sorted) {
                this.sortAscending = !this.sortAscending;
            }
            else {
                this.sorted = true;
                this.sortAscending = true;
                this.sortIndex = columns
                    .filter(column => column.sort)
                    .reduce((acc, column) => {
                        return Math.max(acc, column.sort.sortIndex);
                    }, 0) + 1;
            }
        }
        else {

            let newSortAscending = true;

            if (this.sorted) {
                newSortAscending = !this.sortAscending;
            }

            columns
                .filter(column => column.sort)
                .forEach(column => {
                    column.sort.sorted = false;
                    column.sort.sortAscending = true;
                    column.sort.sortIndex = 1;
                });

            this.sorted = true;
            this.sortAscending = newSortAscending;
            this.sortIndex = 1;
        }
    }

    compare(column, item1, item2) {

        let result = 0;

        if (this.comparator) {
            result = this.comparator(item1, item2, column);
        }
        else {
            const value1 = column.getCellValue(item1);
            const value2 = column.getCellValue(item2);

            result = comparator(value1, value2, column);
        }

        return result;
    }
}

export default DataGridColumnSort;